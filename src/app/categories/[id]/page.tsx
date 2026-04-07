import ProductCard from "@/components/ProductCard/ProductCard";
import {
  getAllProducts,
  getSpecificCategory,
} from "@/api/services/routemist.service";

type CategoryDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CategoryDetailsPage({
  params,
}: CategoryDetailsPageProps) {
  const { id } = await params;

  const category = await getSpecificCategory(id);
  const products = await getAllProducts({
    category: id,
    limit: 20,
  });

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 lg:px-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">{category.data.name}</h1>
        <p className="mt-2 text-sm text-slate-500">
          Products inside this category.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.data.map((product) => (
          <ProductCard key={product._id} productInfo={product} />
        ))}
      </div>
    </section>
  );
}