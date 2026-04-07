import Image from "next/image";
import ProductCard from "@/components/ProductCard/ProductCard";
import AddBtn from "@/components/AddBtn/AddBtn";
import WishlistBtn from "@/components/WishlistBtn/WishlistBtn";
import {
  getAllProducts,
  getSpecificProduct,
} from "@/api/services/routemist.service";

type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const productResponse = await getSpecificProduct(id);
  const product = productResponse.data;

  const relatedProductsResponse = await getAllProducts({
    category: product.category._id,
    limit: 8,
  });

  const relatedProducts = relatedProductsResponse.data.filter(
    (item) => item._id !== product._id
  );

  return (
    <section className="mx-auto max-w-7xl space-y-12 px-4 py-10 lg:px-8">
      <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-6"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {product.images?.slice(0, 4).map((img, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <Image
                  src={img}
                  alt={`${product.title}-${index}`}
                  fill
                  sizes="25vw"
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
            {product.category?.name}
          </p>

          <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>

          <p className="leading-7 text-slate-600">{product.description}</p>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-green-600">
              EGP {product.priceAfterDiscount || product.price}
            </span>

            {product.priceAfterDiscount && (
              <span className="text-lg text-slate-400 line-through">
                EGP {product.price}
              </span>
            )}
          </div>

          <div className="grid gap-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-800">Brand:</span>{" "}
              {product.brand?.name || "FreshCart"}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Available:</span>{" "}
              {product.quantity}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Rating:</span>{" "}
              {product.ratingsAverage} ({product.ratingsQuantity} reviews)
            </p>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <AddBtn productId={product._id} />
            <WishlistBtn productId={product._id} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedProducts.slice(0, 4).map((item) => (
            <ProductCard key={item._id} productInfo={item} />
          ))}
        </div>
      </div>
    </section>
  );
}