import Link from "next/link";

export default function FirstNav() {
  return (
    <div className="hidden border-b border-slate-200 bg-[#f8f9fa] lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm lg:px-8">
        <div className="flex items-center gap-4 text-slate-600">
          <span>Free Shipping on Orders 500 EGP</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>New Arrivals Daily</span>
        </div>

        <div className="flex items-center gap-5 text-slate-600">
          <span>+1 (800) 123-4567</span>
          <span>support@freshcart.com</span>
          <Link href="/login" className="transition hover:text-green-600">
            Sign In
          </Link>
          <Link href="/register" className="transition hover:text-green-600">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}