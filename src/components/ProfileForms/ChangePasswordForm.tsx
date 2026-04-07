"use client";

import { useState } from "react";
import { toast } from "sonner";
import { changeMyPassword } from "@/actions/account.actions";

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    rePassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const result = await changeMyPassword(formData);

    setIsLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setFormData({
      currentPassword: "",
      password: "",
      rePassword: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Current password
        </label>
        <input
          type="password"
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-green-600"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          New password
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-green-600"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Confirm new password
        </label>
        <input
          type="password"
          value={formData.rePassword}
          onChange={(e) =>
            setFormData({ ...formData, rePassword: e.target.value })
          }
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-green-600"
          required
        />
      </div>

      <button
        disabled={isLoading}
        className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Change password"}
      </button>
    </form>
  );
}