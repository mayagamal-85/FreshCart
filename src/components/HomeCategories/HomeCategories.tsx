import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/api/services/routemist.service";

export default async function HomeCategories() {
  const categories = await getAllCategories(8);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Shop by Category</h2>
        <p className="mt-2 text-sm text-slate-500">
          Browse our top categories from the Route API.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.data.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-56 w-full bg-slate-50">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-800 transition group-hover:text-green-600">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}