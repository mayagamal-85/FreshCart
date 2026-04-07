"use client";

import { useState } from "react";
import { toast } from "sonner";
import { applyCouponToCart } from "@/actions/cart.actions";

export default function CouponForm() {
  const [couponName, setCouponName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const result = await applyCouponToCart(couponName);

    setIsLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setCouponName("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm sm:flex-row">
      <input
        value={couponName}
        onChange={(e) => setCouponName(e.target.value)}
        placeholder="Coupon code"
        className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-green-600"
        required
      />
      <button
        disabled={isLoading}
        className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {isLoading ? "Applying..." : "Apply coupon"}
      </button>
    </form>
  );
}