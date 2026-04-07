import { MapPin, Plus } from "lucide-react";

export default function ProfileAddressesPage() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-4xl font-bold text-slate-900">My Addresses</h2>
      <p className="mt-3 text-xl text-slate-500">
        Manage your saved delivery addresses
      </p>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white px-8 py-16 text-center">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-slate-100">
          <MapPin className="size-10 text-slate-400" />
        </div>

        <h3 className="mt-8 text-4xl font-semibold text-slate-900">
          No Addresses Yet
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-2xl leading-9 text-slate-500">
          Add your first delivery address to make checkout faster and easier.
        </p>

        <button className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-4 text-2xl font-semibold text-white shadow-lg transition hover:bg-green-700">
          <Plus className="size-6" />
          Add Your First Address
        </button>
      </div>
    </section>
  );
}