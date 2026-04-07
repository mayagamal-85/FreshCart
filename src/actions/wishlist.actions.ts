"use server";

import { authOptions } from "@/next-auth/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

async function getToken() {
  const session = await getServerSession(authOptions);
  return session?.user?.token;
}

export async function addProductToWishlist(productId: string) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      auth: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      auth: true,
      message: result.message || "Failed to add to wishlist",
    };
  }

  revalidatePath("/wishlist");
  revalidatePath("/");
  revalidatePath("/shop");

  return {
    success: true,
    auth: true,
    message: result.message || "Added to wishlist",
  };
}

export async function removeProductFromWishlist(productId: string) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to remove from wishlist",
    };
  }

  revalidatePath("/wishlist");

  return {
    success: true,
    message: result.message || "Removed from wishlist",
  };
}