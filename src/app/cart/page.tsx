"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Minus, Plus, ShoppingCart, Trash2, Tag } from "lucide-react";
import {
  applyCouponToCart,
  clearUserCart,
  getLoggedUserCart,
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/actions/cart.actions";

type CartProduct = {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category?: {
      name?: string;
    };
  };
};

type CartData = {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
};

export default function CartPage() {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [coupon, setCoupon] = useState("");

  async function loadCart() {
    try {
      setLoading(true);

      const response = await getLoggedUserCart();

      if (!response.success || !response.data) {
        setCartData(null);
        return;
      }

      setCartData(response.data);
    } catch (error) {
      console.log(error);
      setCartData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function updateProduct(productId: string, count: number) {
    if (count < 1) return;

    try {
      setCurrentId(productId);

      const response = await updateCartProductQuantity(productId, count);

      if (!response.success) {
        alert(response.message || "Failed to update quantity");
        return;
      }

      await loadCart();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setCurrentId(null);
    }
  }

  async function removeProduct(productId: string) {
    try {
      setCurrentId(productId);

      const response = await removeProductFromCart(productId);

      if (!response.success) {
        alert(response.message || "Failed to remove item");
        return;
      }

      await loadCart();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setCurrentId(null);
    }
  }

  async function clearCart() {
    try {
      setClearing(true);

      const response = await clearUserCart();

      if (!response.success) {
        alert(response.message || "Failed to clear cart");
        return;
      }

      await loadCart();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setClearing(false);
    }
  }

  async function handleApplyCoupon(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!coupon.trim()) return;

    try {
      setCouponLoading(true);

      const response = await applyCouponToCart(coupon);

      if (!response.success) {
        alert(response.message || "Failed to apply coupon");
        return;
      }

      setCoupon("");
      await loadCart();
      alert("Coupon applied successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setCouponLoading(false);
    }
  }

  const shipping = useMemo(() => {
    if (!cartData?.products?.length) return 0;
    return 50;
  }, [cartData]);

  const total = useMemo(() => {
    return (cartData?.totalCartPrice || 0) + shipping;
  }, [cartData, shipping]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="flex min-h-[50vh] items-center justify-center text-2xl font-bold text-slate-700">
          Loading...
        </div>
      </section>
    );
  }

  if (!cartData || cartData.products.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-green-600 text-white">
              <ShoppingCart className="size-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Shopping Cart
              </h1>
              <p className="mt-1 text-lg text-slate-500">Your cart is empty.</p>
            </div>
          </div>

          <div className="mt-12 flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <div className="flex size-24 items-center justify-center rounded-full bg-white shadow-sm">
              <ShoppingCart className="size-12 text-slate-300" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
              No items yet
            </h2>
            <p className="mt-3 max-w-md text-lg text-slate-500">
              Looks like you haven&apos;t added anything to your cart.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center rounded-2xl bg-green-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_420px]">
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                <ShoppingCart className="size-8" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900">
                  Shopping Cart
                </h1>
                <p className="mt-1 text-xl text-slate-500">
                  You have{" "}
                  <span className="font-bold text-green-600">
                    {cartData.products.length} item
                    {cartData.products.length > 1 ? "s" : ""}
                  </span>{" "}
                  in your cart
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {cartData.products.map((item) => {
              const productId = item.product._id;
              const isLoading = currentId === productId;

              return (
                <div
                  key={productId}
                  className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-1 gap-5">
                      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          className="object-contain p-3"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            {item.product.title}
                          </h2>

                          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded-full bg-green-50 px-4 py-2 font-semibold text-green-700">
                              {item.product.category?.name || "Category"}
                            </span>
                            <span className="text-slate-400">
                              SKU: {productId.slice(-6).toUpperCase()}
                            </span>
                          </div>

                          <div className="mt-4 flex items-end gap-2">
                            <span className="text-4xl font-black text-green-600">
                              {item.price} EGP
                            </span>
                            <span className="pb-1 text-lg text-slate-400">
                              per unit
                            </span>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-4">
                          <span className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white">
                            ✓ In Stock
                          </span>

                          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateProduct(productId, item.count - 1)
                              }
                              disabled={isLoading || item.count <= 1}
                              className="flex size-11 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Minus className="size-5" />
                            </button>

                            <div className="flex min-w-14 items-center justify-center text-2xl font-extrabold text-slate-900">
                              {isLoading ? (
                                <Loader2 className="size-5 animate-spin" />
                              ) : (
                                item.count
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                updateProduct(productId, item.count + 1)
                              }
                              disabled={isLoading}
                              className="flex size-11 items-center justify-center rounded-xl bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Plus className="size-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-end justify-between gap-4 lg:min-w-[160px] lg:flex-col">
                      <div className="text-right">
                        <p className="text-lg text-slate-400">Total</p>
                        <p className="text-4xl font-black text-slate-900">
                          {item.price * item.count}
                          <span className="ml-1 text-2xl font-bold text-slate-400">
                            EGP
                          </span>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeProduct(productId)}
                        disabled={isLoading}
                        className="flex size-14 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="size-5 animate-spin" />
                        ) : (
                          <Trash2 className="size-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <Link
                href="/shop"
                className="text-lg font-semibold text-green-600 transition hover:text-green-700"
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                onClick={clearCart}
                disabled={clearing}
                className="inline-flex items-center gap-2 text-lg font-semibold text-slate-400 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {clearing ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Trash2 className="size-5" />
                )}
                Clear all items
              </button>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="rounded-t-[28px] bg-green-600 px-7 py-6 text-white">
            <h2 className="text-4xl font-black tracking-tight">Order Summary</h2>
            <p className="mt-2 text-lg text-green-50">
              {cartData.products.length} item
              {cartData.products.length > 1 ? "s" : ""} in your cart
            </p>
          </div>

          <div className="space-y-6 p-6">
            <div className="rounded-3xl bg-amber-50 p-5">
              <div className="flex items-center gap-3 text-xl font-bold text-amber-600">
                <span>🚚</span>
                <span>
                  Add {Math.max(0, 500 - cartData.totalCartPrice)} EGP for free
                  shipping
                </span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-amber-100">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{
                    width: `${Math.min(
                      100,
                      (cartData.totalCartPrice / 500) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="space-y-3">
              <label className="text-sm font-semibold text-slate-600">
                Promo Code
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Tag className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Apply Promo Code"
                    className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 text-base outline-none transition focus:border-green-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={couponLoading}
                  className="rounded-2xl border border-slate-200 px-5 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {couponLoading ? "..." : "Apply"}
                </button>
              </div>
            </form>

            <div className="space-y-4 border-y border-slate-200 py-5">
              <div className="flex items-center justify-between text-2xl text-slate-600">
                <span>Subtotal</span>
                <span>{cartData.totalCartPrice} EGP</span>
              </div>

              <div className="flex items-center justify-between text-2xl text-slate-600">
                <span>Shipping</span>
                <span>{shipping} EGP</span>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <span className="text-4xl font-black text-slate-900">Total</span>
              <div className="text-right">
                <span className="text-5xl font-black text-slate-900">{total}</span>
                <span className="ml-1 text-3xl font-bold text-slate-400">EGP</span>
              </div>
            </div>

            <Link
              href={`/checkout/${cartData._id}`}
              className="flex h-16 w-full items-center justify-center rounded-2xl bg-green-600 text-xl font-black text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
            >
              Secure Checkout
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}