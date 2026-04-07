"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { resetPassword } from "@/actions/reset.actions";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const result = await resetPassword(email, newPassword);

    setIsLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Reset password</h1>
        <p className="mt-3 text-sm text-slate-500">
          Enter your new password for {email || "your account"}.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-green-600"
            placeholder="Enter new password"
            required
          />

          <button
            disabled={isLoading}
            className="w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Reset password"}
          </button>
        </form>
      </div>
    </section>
  );
}