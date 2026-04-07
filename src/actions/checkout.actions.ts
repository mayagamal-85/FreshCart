"use server";

import { authOptions } from "@/next-auth/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

async function getToken() {
  const session = await getServerSession(authOptions);
  return session?.user?.token;
}

type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
};

export async function cashOrder(cartId: string, data: ShippingAddress) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({
      shippingAddress: data,
    }),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to create cash order",
    };
  }

  revalidatePath("/cart");
  revalidatePath("/orders");
  revalidatePath("/checkout");
  revalidatePath("/");

  return {
    success: true,
    message: result.message || "Order placed successfully",
    data: result,
  };
}

export async function onlinePayment(cartId: string, data: ShippingAddress) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const baseAppUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(
    `${BASE_URL}/orders/checkout-session/${cartId}?url=${baseAppUrl}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        shippingAddress: data,
      }),
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to start online payment",
    };
  }

  return {
    success: true,
    message: result.message || "Checkout session created",
    sessionUrl: result.session?.url || null,
  };
}