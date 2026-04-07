import { authOptions } from "@/next-auth/authOptions";
import { getServerSession } from "next-auth";
import {
  CartResponse,
  WishlistResponse,
  OrderType,
  AddressItem,
} from "@/api/types/user.type";

const BASE_URL_V1 = "https://ecommerce.routemisr.com/api/v1";
const BASE_URL_V2 = "https://ecommerce.routemisr.com/api/v2";

async function getAuthToken() {
  const session = await getServerSession(authOptions);
  return session?.user?.token;
}

export async function getLoggedUserCart(): Promise<CartResponse | null> {
  const token = await getAuthToken();

  if (!token) return null;

  const response = await fetch(`${BASE_URL_V2}/cart`, {
    headers: {
      token,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function getLoggedUserWishlist(): Promise<WishlistResponse | null> {
  const token = await getAuthToken();

  if (!token) return null;

  const response = await fetch(`${BASE_URL_V1}/wishlist`, {
    headers: {
      token,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function getLoggedUserOrders(): Promise<OrderType[] | null> {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const userId = session?.user?.id;

  console.log("orders session debug:", session);

  if (!token || !userId) {
    console.log("orders debug: missing token or userId", { token, userId });
    return null;
  }

  const response = await fetch(`${BASE_URL_V1}/orders/user/${userId}`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json().catch(() => null);

  console.log("orders api debug:", result);

  if (!response.ok) {
    console.log("orders api failed:", response.status, result);
    return null;
  }

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  return [];
}

export async function getLoggedUserAddresses(): Promise<AddressItem[] | null> {
  const token = await getAuthToken();

  if (!token) return null;

  const response = await fetch(`${BASE_URL_V1}/addresses`, {
    headers: {
      token,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result.data ?? [];
}

export async function getCheckoutCartById(cartId: string): Promise<CartResponse["data"] | null> {
  const token = await getAuthToken();

  if (!token) return null;

  const response = await fetch(`${BASE_URL_V2}/cart`, {
    headers: {
      token,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  if (!result?.data?._id) return null;

  if (result.data._id !== cartId) {
    return result.data;
  }

  return result.data;
}