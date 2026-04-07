"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  User,
} from "lucide-react";

type ProfileDropdownProps = {
  userName?: string | null;
  userEmail?: string | null;
};

export default function ProfileDropdown({
  userName,
  userEmail,
}: ProfileDropdownProps) {
  return (
    <div className="absolute right-0 top-full z-50 mt-4 w-[280px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
      <div className="border-b border-slate-100 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <User className="size-6" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-slate-900">
              {userName || "FreshCart User"}
            </p>
            <p className="truncate text-sm text-slate-500">
              {userEmail || "user@email.com"}
            </p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <Link
          href="/profile"
          className="flex items-center gap-3 px-5 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-600"
        >
          <User className="size-5" />
          <span className="text-sm font-medium">My Profile</span>
        </Link>

        <Link
          href="/profile/orders"
          className="flex items-center gap-3 px-5 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-600"
        >
          <Package className="size-5" />
          <span className="text-sm font-medium">My Orders</span>
        </Link>

        <Link
          href="/wishlist"
          className="flex items-center gap-3 px-5 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-600"
        >
          <Heart className="size-5" />
          <span className="text-sm font-medium">My Wishlist</span>
        </Link>

        <Link
          href="/profile/addresses"
          className="flex items-center gap-3 px-5 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-600"
        >
          <MapPin className="size-5" />
          <span className="text-sm font-medium">Addresses</span>
        </Link>

        <Link
          href="/profile/settings"
          className="flex items-center gap-3 px-5 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-600"
        >
          <Settings className="size-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>

      <div className="border-t border-slate-100 p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-red-500 transition hover:bg-red-50"
        >
          <LogOut className="size-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}