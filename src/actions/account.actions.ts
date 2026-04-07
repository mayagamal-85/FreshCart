"use server";

import { authOptions } from "@/next-auth/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

async function getToken() {
  const session = await getServerSession(authOptions);
  return session?.user?.token;
}

export async function changeMyPassword(data: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to change password",
    };
  }

  return {
    success: true,
    message: result.message || "Password changed successfully",
  };
}

export async function addAddress(data: {
  name: string;
  details: string;
  phone: string;
  city: string;
}) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to add address",
    };
  }

  revalidatePath("/profile/addresses");

  return {
    success: true,
    message: result.message || "Address added successfully",
  };
}

export async function removeAddress(addressId: string) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/addresses/${addressId}`, {
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
      message: result.message || "Failed to remove address",
    };
  }

  revalidatePath("/profile/addresses");

  return {
    success: true,
    message: result.message || "Address removed successfully",
  };
}