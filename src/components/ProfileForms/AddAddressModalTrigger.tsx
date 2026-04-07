"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import AddAddressForm from "@/components/ProfileForms/AddAddressForm";

type AddAddressModalTriggerProps = {
  large?: boolean;
};

export default function AddAddressModalTrigger({
  large = false,
}: AddAddressModalTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          large
            ? "inline-flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-4 text-2xl font-semibold text-white shadow-lg transition hover:bg-green-700"
            : "inline-flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-700"
        }
      >
        <Plus className={large ? "size-6" : "size-5"} />
        {large ? "Add Your First Address" : "Add Address"}
      </button>

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

            <AddAddressForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}