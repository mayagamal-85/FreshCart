"use server";

import { authOptions } from "@/next-auth/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const BASE_URL = "https://ecommerce.routemisr.com/api/v2";

async function getToken() {
  const session = await getServerSession(authOptions);
  return session?.user?.token;
}

export async function addProductToCart(productId: string) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      auth: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/cart`, {
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
      message: result.message || "Failed to add product to cart",
    };
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/cart");
  revalidatePath("/products/[id]", "page");

  return {
    success: true,
    auth: true,
    message: result.message || "Product added to cart",
  };
}

export async function updateCartProductQuantity(productId: string, count: number) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ count }),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to update quantity",
    };
  }

  revalidatePath("/cart");

  return {
    success: true,
    message: result.message || "Quantity updated",
  };
}

export async function removeProductFromCart(productId: string) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
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
      message: result.message || "Failed to remove item",
    };
  }

  revalidatePath("/cart");

  return {
    success: true,
    message: result.message || "Item removed",
  };
}

export async function clearUserCart() {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/cart`, {
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
      message: result.message || "Failed to clear cart",
    };
  }

  revalidatePath("/cart");

  return {
    success: true,
    message: result.message || "Cart cleared",
  };
}

export async function applyCouponToCart(couponName: string) {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const response = await fetch(`${BASE_URL}/cart/applyCoupon`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ couponName }),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to apply coupon",
    };
  }

  revalidatePath("/cart");

  return {
    success: true,
    message: result.message || "Coupon applied",
  };
}

export async function getLoggedUserCart() {
  const token = await getToken();

  if (!token) {
    return {
      success: false,
      message: "Please login first",
      data: null,
    };
  }

  const response = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to get cart",
      data: null,
    };
  }

  return {
    success: true,
    message: "Cart fetched successfully",
    data: result.data,
  };
}

export const addToCart = addProductToCart;
export const updateProductQuantity = updateCartProductQuantity;
export const RemoveProductFromCart = removeProductFromCart;
export const ClearAllCartProducts = clearUserCart;