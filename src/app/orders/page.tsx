import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ClipboardList,
  MapPin,
  Package,
  ShoppingBag,
  ChevronDown,
  Wallet,
  Phone,
} from "lucide-react";
import { getLoggedUserOrders } from "@/api/services/user.service";

export default async function OrdersPage() {
  const orders = await getLoggedUserOrders();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-200">
            <ShoppingBag className="size-8" />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              My Orders
            </h1>
            <p className="mt-2 text-lg text-slate-500">
              Track and manage your order
            </p>
          </div>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-green-600 transition hover:bg-green-50"
        >
          <ShoppingBag className="size-4" />
          Continue Shopping
        </Link>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Package className="size-10" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            No Orders Yet
          </h2>
          <p className="mt-2 text-slate-500">
            You haven&apos;t placed any orders yet.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order: any) => {
            const firstItem = order.cartItems?.[0];
            const extraCount =
              order.cartItems && order.cartItems.length > 1
                ? order.cartItems.length - 1
                : 0;

            const createdAt = new Date(order.createdAt);

            return (
              <details
                key={order._id}
                className="group overflow-hidden rounded-[28px] border border-green-200 bg-white shadow-sm"
              >
                <summary className="list-none cursor-pointer">
                  <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 items-start gap-5">
                      <div className="relative shrink-0">
                        <div className="relative flex size-28 items-center justify-center overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50">
                          {firstItem?.product?.imageCover ? (
                            <Image
                              src={firstItem.product.imageCover}
                              alt={firstItem.product.title}
                              fill
                              sizes="112px"
                              className="object-contain p-3"
                            />
                          ) : null}
                        </div>

                        {extraCount > 0 ? (
                          <div className="absolute -right-3 -top-3 flex size-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-lg">
                            +{extraCount}
                          </div>
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                            {order.isDelivered
                              ? "Delivered"
                              : order.isPaid
                              ? "Processing"
                              : "Pending"}
                          </span>
                        </div>

                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                          #{String(order.id || order._id).slice(-3)}
                        </h2>

                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-lg text-slate-500">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays className="size-4" />
                            {createdAt.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <ClipboardList className="size-4" />
                            {order.cartItems?.length || 0} items
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <MapPin className="size-4" />
                            {order.shippingAddress?.city || "No city"}
                          </span>
                        </div>

                        <div className="mt-6 flex items-end gap-1">
                          <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                            {order.totalOrderPrice}
                          </span>
                          <span className="mb-1 text-2xl font-medium text-slate-400">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                        <Wallet className="size-5" />
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-base font-semibold text-slate-700 transition group-open:bg-green-600 group-open:text-white">
                        <span className="group-open:hidden">Details</span>
                        <span className="hidden group-open:inline">Hide</span>
                        <ChevronDown className="size-4 transition group-open:rotate-180" />
                      </div>
                    </div>
                  </div>
                </summary>

                <div className="border-t border-slate-100 bg-slate-50/60 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-green-100 text-green-600">
                      <ClipboardList className="size-4" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Order Items
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {order.cartItems?.map((item: any, index: number) => (
                      <div
                        key={`${item.product?._id || index}-${index}`}
                        className="flex items-center justify-between gap-4 rounded-3xl border border-slate-100 bg-white p-5"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
                            {item.product?.imageCover ? (
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                fill
                                sizes="80px"
                                className="object-contain p-2"
                              />
                            ) : null}
                          </div>

                          <div className="min-w-0">
                            <h4 className="truncate text-2xl font-bold text-slate-900">
                              {item.product?.title}
                            </h4>
                            <p className="mt-1 text-lg text-slate-500">
                              {item.count} × {item.price} EGP
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-3xl font-extrabold text-slate-900">
                            {item.price}
                          </div>
                          <div className="text-lg text-slate-400">EGP</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-3xl border border-slate-100 bg-white p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <MapPin className="size-4" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          Delivery Address
                        </h3>
                      </div>

                      <div className="space-y-2 text-lg text-slate-600">
                        <p className="font-semibold text-slate-900">
                          {order.shippingAddress?.city || "No city"}
                        </p>
                        <p>{order.shippingAddress?.details || "No details"}</p>
                        <p className="inline-flex items-center gap-2">
                          <Phone className="size-4" />
                          {order.shippingAddress?.phone || "No phone"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                          <Wallet className="size-4" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          Order Summary
                        </h3>
                      </div>

                      <div className="space-y-3 text-lg">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Subtotal</span>
                          <span>{order.totalOrderPrice} EGP</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Shipping</span>
                          <span>
                            {order.shippingPrice
                              ? `${order.shippingPrice} EGP`
                              : "Free"}
                          </span>
                        </div>
                        <div className="border-t border-amber-200 pt-3">
                          <div className="flex items-center justify-between text-2xl font-extrabold text-slate-900">
                            <span>Total</span>
                            <span>{order.totalOrderPrice} EGP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </section>
  );
}