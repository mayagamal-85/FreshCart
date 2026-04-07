"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { verifyResetCode } from "@/actions/reset.actions";

export default function VerifyResetCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resetCode, setResetCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const result = await verifyResetCode(resetCode);

    setIsLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    setTimeout(() => {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    }, 1000);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Verify reset code</h1>
        <p className="mt-3 text-sm text-slate-500">
          Enter the code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            type="text"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-green-600"
            placeholder="Enter reset code"
            required
          />

          <button
            disabled={isLoading}
            className="w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {isLoading ? "Verifying..." : "Verify code"}
          </button>
        </form>
      </div>
    </section>
  );
}