import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { ProductType } from "@/api/types/routemist.type";
import AddBtn from "@/components/AddBtn/AddBtn";
import WishlistBtn from "@/components/WishlistBtn/WishlistBtn";

type ProductCardProps = {
  productInfo: ProductType;
};

export default function ProductCard({ productInfo }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/productdetails/${productInfo._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-white">
          <Image
            src={productInfo.imageCover}
            alt={productInfo.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-contain p-4 transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
          {productInfo.category?.name}
        </p>

        <Link
          href={`/productdetails/${productInfo._id}`}
          className="line-clamp-2 min-h-12 text-sm font-semibold text-slate-800 transition hover:text-green-600"
        >
          {productInfo.title}
        </Link>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-slate-900">
              EGP {productInfo.priceAfterDiscount || productInfo.price}
            </span>

            {productInfo.priceAfterDiscount && (
              <span className="text-sm text-slate-400 line-through">
                EGP {productInfo.price}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-700">
              {productInfo.ratingsAverage}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {productInfo.brand?.name || "FreshCart"}
          </span>

          <div className="flex items-center gap-2">
            <WishlistBtn productId={productInfo._id} />
            <AddBtn productId={productInfo._id} />
          </div>
        </div>
      </div>
    </div>
  );
}