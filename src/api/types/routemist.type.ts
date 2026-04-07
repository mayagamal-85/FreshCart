export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductType {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  imageCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: CategoryType;
  subcategory?: CategoryType[];
  brand?: BrandType;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  results: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: ProductType[];
}

export interface CategoriesResponse {
  results: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: CategoryType[];
}

export interface BrandsResponse {
  results: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: BrandType[];
}

export interface SingleProductResponse {
  data: ProductType;
}

export interface SingleCategoryResponse {
  data: CategoryType;
}

export interface SingleBrandResponse {
  data: BrandType;
}