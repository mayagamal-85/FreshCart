import Image from "next/image";
import Link from "next/link";
import { getLoggedUserWishlist } from "@/api/services/user.service";
import {
  MoveWishlistToCartButton,
  RemoveWishlistItemButton,
} from "@/components/WishlistActions/WishlistActions";

export default async function WishlistPage() {
  const wishlist = await getLoggedUserWishlist();

  if (!wishlist || wishlist.data.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Your wishlist is empty</h1>
          <p className="mt-3 text-slate-500">Save your favorite products here.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            Explore products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 lg:px-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Wishlist</h1>
        <p className="mt-2 text-sm text-slate-500">
          Your saved favorite products.
        </p>
      </div>

      <div className="space-y-4">
        {wishlist.data.map((item) => (
          <div
            key={item._id}
            className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[120px_1fr_auto]"
          >
            <div className="relative h-28 w-full overflow-hidden rounded-xl bg-slate-50">
              <Image
                src={item.imageCover}
                alt={item.title}
                fill
                sizes="120px"
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-500">EGP {item.price}</p>
              <RemoveWishlistItemButton productId={item._id} />
            </div>

            <div className="flex items-center md:justify-end">
              <MoveWishlistToCartButton productId={item._id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}