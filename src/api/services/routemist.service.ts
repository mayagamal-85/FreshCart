import {
  BrandsResponse,
  CategoriesResponse,
  ProductsResponse,
  SingleBrandResponse,
  SingleCategoryResponse,
  SingleProductResponse,
} from "@/api/types/routemist.type";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getFeaturedProducts(limit = 8): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch featured products");
  }

  return response.json();
}

export async function getAllProducts(params?: {
  page?: number;
  limit?: number;
  keyword?: string;
  category?: string;
  brand?: string;
  sort?: string;
}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.keyword) searchParams.set("keyword", params.keyword);
  if (params?.category) searchParams.append("category[in]", params.category);
  if (params?.brand) searchParams.set("brand", params.brand);
  if (params?.sort) searchParams.set("sort", params.sort);

  const query = searchParams.toString();
  const response = await fetch(`${BASE_URL}/products${query ? `?${query}` : ""}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getSpecificProduct(id: string): Promise<SingleProductResponse> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getAllCategories(limit = 12): Promise<CategoriesResponse> {
  const response = await fetch(`${BASE_URL}/categories?limit=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function getSpecificCategory(id: string): Promise<SingleCategoryResponse> {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
}

export async function getAllBrands(limit = 12): Promise<BrandsResponse> {
  const response = await fetch(`${BASE_URL}/brands?limit=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }

  return response.json();
}

export async function getSpecificBrand(id: string): Promise<SingleBrandResponse> {
  const response = await fetch(`${BASE_URL}/brands/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch brand");
  }

  return response.json();
}