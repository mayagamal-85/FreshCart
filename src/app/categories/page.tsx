import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/api/services/routemist.service";

export default async function CategoriesPage() {
  const categories = await getAllCategories(30);

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 lg:px-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
        <p className="mt-2 text-sm text-slate-500">
          Explore all available categories.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {categories.data.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-72 w-full bg-slate-50">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold text-slate-900 group-hover:text-green-600">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}