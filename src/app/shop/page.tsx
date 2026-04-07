import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import {
  getAllBrands,
  getAllCategories,
  getAllProducts,
} from "@/api/services/routemist.service";
import { Layers3, ShieldCheck } from "lucide-react";

type ShopPageProps = {
  searchParams: Promise<{
    keyword?: string;
    category?: string;
    brand?: string;
    sort?: string;
  }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const [products, categories, brands] = await Promise.all([
    getAllProducts({
      limit: 100,
      keyword: params.keyword,
      category: params.category,
      brand: params.brand,
      sort: params.sort,
    }),
    getAllCategories(50),
    getAllBrands(50),
  ]);

  return (
    <section className="pb-14">
      <div className="w-full bg-gradient-to-r from-green-500 to-emerald-400">
        <div className="mx-auto flex min-h-[150px] max-w-[1280px] items-center px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
              <ShieldCheck className="size-6" />
            </div>

            <div>
              <div className="mb-2 text-xs text-white/80">Home / All Products</div>
              <h1 className="text-3xl font-bold text-white">All Products</h1>
              <p className="mt-1 text-sm text-white/85">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-slate-500">
            Showing {products.data.length} products
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:flex">
            <form action="/shop" className="flex gap-3 lg:flex-nowrap">
              <input type="hidden" name="keyword" value={params.keyword || ""} />
              <input type="hidden" name="brand" value={params.brand || ""} />
              <input type="hidden" name="sort" value={params.sort || ""} />

              <select
                name="category"
                defaultValue={params.category || ""}
                className="h-10 min-w-[180px] rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-green-600"
              >
                <option value="">All Categories</option>
                {categories.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <button className="hidden" />
            </form>

            <form action="/shop" className="flex gap-3 lg:flex-nowrap">
              <input type="hidden" name="keyword" value={params.keyword || ""} />
              <input type="hidden" name="category" value={params.category || ""} />
              <input type="hidden" name="sort" value={params.sort || ""} />

              <select
                name="brand"
                defaultValue={params.brand || ""}
                className="h-10 min-w-[180px] rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-green-600"
              >
                <option value="">All Brands</option>
                {brands.data.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>

              <button className="hidden" />
            </form>

            <form action="/shop" className="flex gap-3 lg:flex-nowrap">
              <input type="hidden" name="keyword" value={params.keyword || ""} />
              <input type="hidden" name="category" value={params.category || ""} />
              <input type="hidden" name="brand" value={params.brand || ""} />

              <select
                name="sort"
                defaultValue={params.sort || ""}
                className="h-10 min-w-[180px] rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-green-600"
              >
                <option value="">Default sorting</option>
                <option value="price">Price low to high</option>
                <option value="-price">Price high to low</option>
              </select>

              <button className="hidden" />
            </form>
          </div>
        </div>

        {(params.keyword || params.category || params.brand || params.sort) && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <Layers3 className="size-4" />
              Filters applied
            </div>

            <Link
              href="/shop"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-green-600 hover:text-green-600"
            >
              Clear all
            </Link>
          </div>
        )}

        {products.data.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.data.map((product) => (
              <ProductCard key={product._id} productInfo={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center">
            <h2 className="text-2xl font-bold text-slate-800">No products found</h2>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your filters or search keyword.
            </p>
            <Link
              href="/shop"
              className="mt-5 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Reset filters
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}