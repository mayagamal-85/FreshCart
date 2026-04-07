"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { startCheckout } from "@/actions/account.actions";

type CheckoutFormProps = {
  cartId: string;
};

export default function CheckoutForm({ cartId }: CheckoutFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    details: "",
    phone: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const result = await startCheckout(cartId, formData);

    setIsLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    if (result.sessionUrl) {
      window.location.href = result.sessionUrl;
      return;
    }

    router.push("/orders");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Details
        </label>
        <input
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-green-600"
          placeholder="Street, building, apartment..."
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Phone
        </label>
        <input
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-green-600"
          placeholder="010..."
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          City
        </label>
        <input
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-green-600"
          placeholder="Cairo"
          required
        />
      </div>

      <button
        disabled={isLoading}
        className="w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {isLoading ? "Loading..." : "Continue to payment"}
      </button>
    </form>
  );
}