import ProductCard from "@/components/ProductCard/ProductCard";
import { getFeaturedProducts } from "@/api/services/routemist.service";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts(24);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-600">
          Featured Products
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Featured Products
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products.data.slice(0, 20).map((product) => (
          <ProductCard key={product._id} productInfo={product} />
        ))}
      </div>
    </section>
  );
}