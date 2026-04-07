import Link from "next/link";

export default function HomeDeals() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl bg-[#fff4e5] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange-500">
          Deal of the Day
        </p>
        <h3 className="mt-3 text-3xl font-bold text-slate-900">
          Fresh Organic Fruits
        </h3>
        <p className="mt-3 max-w-md text-slate-600">
          Get up to 40% off on selected organic fruits
        </p>
        <div className="mt-5 space-y-1">
          <p className="text-2xl font-bold text-orange-500">40% OFF</p>
          <p className="text-sm text-slate-600">Use code: ORGANIC40</p>
        </div>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Shop Now
        </Link>
      </div>

      <div className="rounded-3xl bg-[#ecfdf3] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-600">
          ✨New Arrivals
        </p>
        <h3 className="mt-3 text-3xl font-bold text-slate-900">
          Exotic Vegetables
        </h3>
        <p className="mt-3 max-w-md text-slate-600">
          Discover our latest collection of premium vegetables
        </p>
        <div className="mt-5 space-y-1">
          <p className="text-2xl font-bold text-green-600">25% OFF</p>
          <p className="text-sm text-slate-600">Use code: FRESH25</p>
        </div>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          Explore Now
        </Link>
      </div>
    </section>
  );
}