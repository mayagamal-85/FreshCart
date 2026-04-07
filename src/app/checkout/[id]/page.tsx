"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BadgeDollarSign,
  CreditCard,
  Loader2,
  MapPin,
  Phone,
  ReceiptText,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { cashOrder, onlinePayment } from "@/actions/checkout.actions";

const checkoutSchema = z.object({
  city: z.string().min(2, "City is required"),
  details: z.string().min(5, "Address details are required"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Egyptian phone number is invalid"),
});

type CheckoutType = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const cartId = id;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: "",
      details: "",
      phone: "",
    },
  });

  const subtotal = 149;
  const shipping = 50;
  const total = useMemo(() => subtotal + shipping, []);

  async function onSubmit(data: CheckoutType) {
    try {
      setLoading(true);

      if (paymentMethod === "online") {
        const response = await onlinePayment(cartId, {
          city: data.city,
          details: data.details,
          phone: data.phone,
        });

        if (response?.success && response?.sessionUrl) {
          window.location.href = response.sessionUrl;
          return;
        }

        alert(response?.message || "Failed to start checkout");
        return;
      }

      const response = await cashOrder(cartId, {
        city: data.city,
        details: data.details,
        phone: data.phone,
      });

      if (!response?.success) {
        alert(response?.message || "Failed to create cash order");
        return;
      }

      router.push("/orders");
      router.refresh();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-3 text-sm text-slate-500">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-green-600">
              Cart
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-900">Checkout</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20">
              <ReceiptText className="size-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Complete Your Order
              </h1>
              <p className="mt-1 text-xl text-slate-500">
                Review your items and complete your purchase
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-lg font-semibold text-green-600 transition hover:text-green-700"
        >
          <ArrowLeft className="size-5" />
          Back to Cart
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="bg-green-600 px-7 py-6 text-white">
              <h2 className="text-3xl font-black">Shipping Address</h2>
              <p className="mt-1 text-lg text-green-50">
                Where should we deliver your order?
              </p>
            </div>

            <div className="space-y-6 p-6">
              <div className="rounded-2xl bg-blue-50 p-5 text-blue-700">
                <p className="text-lg font-semibold">Delivery Information</p>
                <p className="mt-1 text-sm">
                  Please ensure your address is accurate for smooth delivery
                </p>
              </div>

              <div>
                <label className="mb-2 block text-lg font-semibold text-slate-800">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("city")}
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    className="h-16 w-full rounded-2xl border border-slate-200 pl-12 pr-4 text-lg outline-none transition focus:border-green-600"
                  />
                </div>
                {errors.city && (
                  <p className="mt-2 text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-lg font-semibold text-slate-800">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-6 size-5 text-slate-400" />
                  <textarea
                    {...register("details")}
                    placeholder="Street name, building number, floor, apartment..."
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 pl-12 pr-4 pt-5 text-lg outline-none transition focus:border-green-600"
                  />
                </div>
                {errors.details && (
                  <p className="mt-2 text-sm text-red-500">{errors.details.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-lg font-semibold text-slate-800">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("phone")}
                    placeholder="01xxxxxxxxx"
                    className="h-16 w-full rounded-2xl border border-slate-200 pl-12 pr-40 text-lg outline-none transition focus:border-green-600"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    Egyptian numbers only
                  </span>
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="bg-green-600 px-7 py-6 text-white">
              <h2 className="text-3xl font-black">Payment Method</h2>
              <p className="mt-1 text-lg text-green-50">
                Choose how you&apos;d like to pay
              </p>
            </div>

            <div className="space-y-5 p-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`flex w-full items-center justify-between rounded-[24px] border p-5 text-left transition ${
                  paymentMethod === "cash"
                    ? "border-green-600 bg-green-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-green-600 text-white">
                    <BadgeDollarSign className="size-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">
                      Cash on Delivery
                    </p>
                    <p className="mt-1 text-lg text-slate-500">
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>
                </div>

                <div
                  className={`flex size-10 items-center justify-center rounded-full border-2 ${
                    paymentMethod === "cash"
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {paymentMethod === "cash" ? "✓" : ""}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("online")}
                className={`flex w-full items-center justify-between rounded-[24px] border p-5 text-left transition ${
                  paymentMethod === "online"
                    ? "border-green-600 bg-green-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    <CreditCard className="size-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">Pay Online</p>
                    <p className="mt-1 text-lg text-slate-500">
                      Secure payment with Credit/Debit Card via Stripe
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="rounded bg-blue-700 px-2 py-1 font-bold text-white">
                        VISA
                      </span>
                      <span className="rounded bg-red-500 px-2 py-1 font-bold text-white">
                        MC
                      </span>
                      <span className="rounded bg-blue-500 px-2 py-1 font-bold text-white">
                        AMEX
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex size-10 items-center justify-center rounded-full border-2 ${
                    paymentMethod === "online"
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {paymentMethod === "online" ? "✓" : ""}
                </div>
              </button>

              <div className="rounded-2xl bg-green-50 p-5">
                <div className="flex items-center gap-3 text-green-700">
                  <ShieldCheck className="size-6" />
                  <div>
                    <p className="text-xl font-bold">Secure & Encrypted</p>
                    <p className="text-sm">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <aside className="h-fit rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="rounded-t-[28px] bg-green-600 px-7 py-6 text-white">
            <h2 className="text-4xl font-black tracking-tight">Order Summary</h2>
            <p className="mt-2 text-lg text-green-50">1 item</p>
          </div>

          <div className="space-y-6 p-6">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <Image
                    src="https://ecommerce.routemisr.com/Route-Academy-products/1680403397482-1.jpeg"
                    alt="Cart Product"
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-2xl font-bold text-slate-900">Woman Shawl</p>
                  <p className="mt-1 text-slate-500">1 × 149 EGP</p>
                </div>

                <p className="text-3xl font-black text-slate-900">149</p>
              </div>
            </div>

            <div className="space-y-4 border-y border-slate-200 py-5">
              <div className="flex items-center justify-between text-2xl text-slate-600">
                <span>Subtotal</span>
                <span>{subtotal} EGP</span>
              </div>

              <div className="flex items-center justify-between text-2xl text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <Truck className="size-5" />
                  Shipping
                </span>
                <span>{shipping} EGP</span>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <span className="text-4xl font-black text-slate-900">Total</span>
              <div className="text-right">
                <span className="text-5xl font-black text-green-600">{total}</span>
                <span className="ml-1 text-3xl font-bold text-slate-400">EGP</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="flex h-16 w-full items-center justify-center rounded-2xl bg-green-600 text-xl font-black text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                "Place Order"
              )}
            </button>

            <div className="flex items-center justify-center gap-5 border-t border-slate-200 pt-5 text-sm font-medium text-slate-500">
              <span>🛡️ Secure</span>
              <span>🚚 Fast Delivery</span>
              <span>🔶 Easy Returns</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}