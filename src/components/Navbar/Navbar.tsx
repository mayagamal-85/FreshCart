"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Headphones,
  Heart,
  Search,
  ShoppingCart,
  User,
  LogOut,
  MapPin,
  Settings,
  Package,
} from "lucide-react";

function navLinkClass(pathname: string, href: string) {
  const active = pathname === href;
  return `transition hover:text-green-600 ${
    active ? "text-green-600 font-semibold" : "text-slate-700"
  }`;
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";
  const userName = session?.user?.name || "My Account";
  const userEmail = session?.user?.email || "";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="hidden border-b border-slate-200 bg-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-sm lg:px-8">
          <div className="flex items-center gap-6 text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-green-600">🚚</span>
              <span>Free Shipping on Orders 500 EGP</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-green-600">🎁</span>
              <span>New Arrivals Daily</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-slate-500">
            <span>+1 (800) 123-4567</span>
            <span>support@freshcart.com</span>

            {!isLoggedIn ? (
              <>
                <Link href="/login" className="transition hover:text-green-600">
                  Sign In
                </Link>
                <Link href="/register" className="transition hover:text-green-600">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="max-w-[160px] truncate">{userName}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="transition hover:text-red-500"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
        <Link href="/" className="shrink-0">
          <span className="text-[20px] font-extrabold tracking-tight text-slate-900 sm:text-[22px]">
            <span className="mr-1 text-green-600">🛒</span>FreshCart
          </span>
        </Link>

        <div className="hidden max-w-xl flex-1 lg:block">
          <form action="/search" method="GET" className="relative">
            <input
              type="text"
              name="q"
              placeholder="Search for products, brands and more..."
              className="h-12 w-full rounded-full border border-slate-200 bg-white pl-5 pr-14 text-sm text-slate-700 outline-none transition focus:border-green-600"
            />

            <button
              type="submit"
              className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/" className={navLinkClass(pathname, "/")}>
            Home
          </Link>

          <Link href="/shop" className={navLinkClass(pathname, "/shop")}>
            Shop
          </Link>

          <Link
            href="/categories"
            className={navLinkClass(pathname, "/categories")}
          >
            Categories
          </Link>

          <Link href="/brands" className={navLinkClass(pathname, "/brands")}>
            Brands
          </Link>
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-full border border-transparent px-3 py-2 transition hover:bg-slate-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Headphones className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-xs text-slate-400">Support</p>
              <p className="text-sm font-semibold text-slate-700">24/7 Help</p>
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="text-slate-600 transition hover:text-green-600"
          >
            <Heart className="h-6 w-6" />
          </Link>

          <Link
            href="/cart"
            className="text-slate-600 transition hover:text-green-600"
          >
            <ShoppingCart className="h-6 w-6" />
          </Link>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="inline-flex h-12 items-center rounded-full bg-green-600 px-6 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Sign In
            </Link>
          ) : (
            <div className="group relative">
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-green-600 hover:text-green-600">
                <User className="h-5 w-5" />
              </button>

              <div className="invisible absolute right-0 top-[calc(100%+12px)] w-72 rounded-3xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="truncate text-base font-semibold text-slate-900">
                    {userName}
                  </p>
                  <p className="truncate text-sm text-slate-500">{userEmail}</p>
                </div>

                <div className="mt-3 space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/orders"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <Package className="h-4 w-4" />
                    <span>My Orders</span>
                  </Link>

                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <Heart className="h-4 w-4" />
                    <span>My Wishlist</span>
                  </Link>

                  <Link
                    href="/profile/addresses"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Addresses</span>
                  </Link>

                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </div>

                <div className="mt-3 border-t border-slate-200 pt-3">
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-3 lg:hidden">
        <form action="/search" method="GET" className="relative">
          <input
            type="text"
            name="q"
            placeholder="Search for products, brands and more..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-4 pr-12 text-sm outline-none transition focus:border-green-600"
          />

          <button
            type="submit"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-3 flex items-center justify-between text-sm font-medium text-slate-700">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/brands">Brands</Link>
          <Link href="/contact">Support</Link>
        </div>
      </div>
    </header>
  );
}