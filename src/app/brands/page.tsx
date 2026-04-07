import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";
import { getAllBrands } from "@/api/services/routemist.service";

export default async function BrandsPage() {
  const brands = await getAllBrands(100);

  return (
    <section className="pb-14">
      <div className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500">
        <div className="mx-auto flex min-h-[140px] max-w-[1280px] items-center px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
              <Tag className="size-6" />
            </div>

            <div>
              <div className="mb-2 text-xs text-white/80">Home / Brands</div>
              <h1 className="text-3xl font-bold text-white">Top Brands</h1>
              <p className="mt-1 text-sm text-white/85">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {brands.data.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-md"
            >
              <div className="flex h-[96px] items-center justify-center rounded-xl bg-slate-50">
                <div className="relative h-12 w-full">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-contain px-3"
                  />
                </div>
              </div>

              <p className="mt-4 text-sm font-medium text-slate-700 transition group-hover:text-violet-600">
                {brand.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}