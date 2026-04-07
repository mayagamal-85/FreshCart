"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Settings, User } from "lucide-react";
import clsx from "clsx";

const links = [
  {
    href: "/profile/addresses",
    label: "My Addresses",
    icon: MapPin,
  },
  {
    href: "/profile/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-3xl font-semibold text-slate-900">My Account</h2>

      <div className="space-y-3">
        <Link
          href="/profile"
          className={clsx(
            "flex items-center justify-between rounded-2xl px-4 py-4 transition",
            pathname === "/profile"
              ? "bg-green-50 text-green-600"
              : "text-slate-700 hover:bg-slate-50"
          )}
        >
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                "flex size-11 items-center justify-center rounded-xl",
                pathname === "/profile"
                  ? "bg-green-500 text-white"
                  : "bg-slate-100 text-slate-500"
              )}
            >
              <User className="size-5" />
            </span>
            <span className="text-2xl font-medium">My Profile</span>
          </div>
          <span className="text-2xl">›</span>
        </Link>

        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center justify-between rounded-2xl px-4 py-4 transition",
                active
                  ? "bg-green-50 text-green-600"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={clsx(
                    "flex size-11 items-center justify-center rounded-xl",
                    active
                      ? "bg-green-500 text-white"
                      : "bg-slate-100 text-slate-500"
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <span className="text-2xl font-medium">{label}</span>
              </div>
              <span className="text-2xl">›</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}