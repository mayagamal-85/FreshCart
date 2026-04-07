import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import {
  getAllBrands,
  getAllCategories,
  getAllProducts,
} from "@/api/services/routemist.service";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    sort?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const q = params.q?.trim() || "";

  const [products, categories, brands] = await Promise.all([
    getAllProducts({
      keyword: q || undefined,
      category: params.category,
      brand: params.brand,
      sort: params.sort,
      limit: 50,
    }),
    getAllCategories(50),
    getAllBrands(50),
  ]);

  const createSearchLink = (extraParams: Record<string, string>) => {
    const urlParams = new URLSearchParams();

    if (q) urlParams.set("q", q);
    if (params.category) urlParams.set("category", params.category);
    if (params.brand) urlParams.set("brand", params.brand);
    if (params.sort) urlParams.set("sort", params.sort);

    Object.entries(extraParams).forEach(([key, value]) => {
      if (value) {
        urlParams.set(key, value);
      } else {
        urlParams.delete(key);
      }
    });

    return `/search?${urlParams.toString()}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-900">Search Results</span>
        </div>

        <form action="/search" method="GET" className="relative max-w-3xl">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search products..."
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-4 text-3xl font-medium text-slate-900 shadow-sm outline-none transition focus:border-green-600"
          />
          <svg
            className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
          </svg>
        </form>

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
          Search Results{q ? ` for "${q}"` : ""}
        </h1>
        <p className="mt-3 text-xl text-slate-500">
          We found {products.data.length} products for you
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">Categories</h2>
            <div className="max-h-[260px] space-y-3 overflow-y-auto pr-2">
              {categories.data.map((category) => (
                <Link
                  key={category._id}
                  href={createSearchLink({ category: category._id })}
                  className="block text-base text-slate-600 transition hover:text-green-600"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">Brands</h2>
            <div className="max-h-[260px] space-y-3 overflow-y-auto pr-2">
              {brands.data.map((brand) => (
                <Link
                  key={brand._id}
                  href={createSearchLink({ brand: brand._id })}
                  className="block text-base text-slate-600 transition hover:text-green-600"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/search"
            className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear All Filters
          </Link>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h7v7H4V6Zm9 0h7v7h-7V6ZM4 15h7v3H4v-3Zm9 0h7v3h-7v-3Z" />
                </svg>
              </div>
            </div>

            <form action="/search" method="GET" className="flex items-center gap-3">
              {q && <input type="hidden" name="q" value={q} />}
              {params.category && <input type="hidden" name="category" value={params.category} />}
              {params.brand && <input type="hidden" name="brand" value={params.brand} />}

              <label className="text-lg text-slate-500">Sort by:</label>
              <select
                name="sort"
                defaultValue={params.sort || ""}
                onChange={undefined}
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-700 outline-none"
              >
                <option value="">Relevance</option>
                <option value="price">Price low to high</option>
                <option value="-price">Price high to low</option>
              </select>

              <button
                type="submit"
                className="hidden rounded-xl bg-green-600 px-4 py-2 text-white md:block"
              >
                Apply
              </button>
            </form>
          </div>

          {(q || params.category || params.brand) && (
            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-slate-500">Active:</span>

              {q && (
                <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-700">
                  "{q}"
                </span>
              )}

              <Link
                href="/search"
                className="ml-2 text-slate-500 underline transition hover:text-green-600"
              >
                Clear all
              </Link>
            </div>
          )}

          {products.data.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.data.map((product) => (
                <ProductCard key={product._id} productInfo={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl bg-white px-6 text-center shadow-sm">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                <svg
                  className="h-12 w-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                </svg>
              </div>

              <h2 className="text-4xl font-bold text-slate-900">No Products Found</h2>
              <p className="mt-4 max-w-xl text-lg text-slate-500">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>

              <Link
                href="/search"
                className="mt-8 rounded-2xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
              >
                Clear Filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}