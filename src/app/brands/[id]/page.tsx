import Image from "next/image";
import ProductCard from "@/components/ProductCard/ProductCard";
import {
  getAllProducts,
  getSpecificBrand,
} from "@/api/services/routemist.service";

type BrandDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BrandDetailsPage({
  params,
}: BrandDetailsPageProps) {
  const { id } = await params;

  const [brand, products] = await Promise.all([
    getSpecificBrand(id),
    getAllProducts({
      brand: id,
      limit: 100,
    }),
  ]);

  return (
    <section className="pb-14">
      <div className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500">
        <div className="mx-auto flex min-h-[160px] max-w-[1280px] items-center px-4 lg:px-6">
          <div className="flex items-center gap-5">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-white p-4 shadow-md">
              <div className="relative h-10 w-full">
                <Image
                  src={brand.data.image}
                  alt={brand.data.name}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs text-white/80">Home / Brands / {brand.data.name}</div>
              <h1 className="text-3xl font-bold text-white">{brand.data.name}</h1>
              <p className="mt-1 text-sm text-white/85">
                Products from this brand
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {products.data.length} products
          </p>
        </div>

        {products.data.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.data.map((product) => (
              <ProductCard key={product._id} productInfo={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">No products found</h2>
              <p className="mt-2 text-sm text-slate-500">
                There are no products for this brand right now.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}