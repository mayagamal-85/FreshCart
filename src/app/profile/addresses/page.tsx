import { MapPin } from "lucide-react";
import { getLoggedUserAddresses } from "@/api/services/user.service";
import RemoveAddressButton from "@/components/ProfileActions/RemoveAddressButton";
import AddAddressModalTrigger from "@/components/ProfileForms/AddAddressModalTrigger";

export default async function ProfileAddressesPage() {
  const addresses = await getLoggedUserAddresses();

  const hasAddresses = !!addresses && addresses.length > 0;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">My Addresses</h2>
          <p className="mt-3 text-xl text-slate-500">
            Manage your saved delivery addresses
          </p>
        </div>

        <AddAddressModalTrigger />
      </div>

      {!hasAddresses ? (
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

          <div className="mt-8">
            <AddAddressModalTrigger large />
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-green-50">
                    <MapPin className="size-6 text-green-600" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {address.name}
                    </h3>
                    <p className="mt-2 text-lg leading-8 text-slate-500">
                      {address.details}
                    </p>
                    <p className="mt-2 text-lg text-slate-600">{address.city}</p>
                    <p className="mt-1 text-lg text-slate-600">{address.phone}</p>
                  </div>
                </div>

                <RemoveAddressButton addressId={address._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}