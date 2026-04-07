"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addAddress } from "@/actions/account.actions";

type AddAddressFormProps = {
  onSuccess?: () => void;
};

export default function AddAddressForm({
  onSuccess,
}: AddAddressFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    phone: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const result = await addAddress(formData);

    setIsLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    setFormData({
      name: "",
      details: "",
      phone: "",
      city: "",
    });

    onSuccess?.();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Address name
        </label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-600"
          placeholder="Home"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Details
        </label>
        <input
          value={formData.details}
          onChange={(e) =>
            setFormData({ ...formData, details: e.target.value })
          }
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-600"
          placeholder="Street, building..."
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
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-600"
          placeholder="01xxxxxxxxx"
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
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-600"
          placeholder="Cairo"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Add address"}
      </button>
    </form>
  );
}