"use client";

import { useState } from "react";
import { MapPin, Plus, X } from "lucide-react";
import AddAddressForm from "@/components/ProfileForms/AddAddressForm";

export default function ProfileAddressesClient() {
  const [open, setOpen] = useState(false);

  return (
    <>
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

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-4 text-2xl font-semibold text-white shadow-lg transition hover:bg-green-700"
          >
            <Plus className="size-6" />
            Add Your First Address
          </button>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-3xl font-bold text-slate-900">
                Add New Address
              </h3>
              <p className="mt-2 text-base text-slate-500">
                Fill in your delivery details below.
              </p>
            </div>

            <AddAddressForm />
          </div>
        </div>
      )}
    </>
  );
}