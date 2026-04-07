export interface CartProductItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category?: {
      _id: string;
      name: string;
    };
    brand?: {
      _id: string;
      name: string;
    };
  };
}

export interface CartData {
  _id: string;
  cartOwner: string;
  totalCartPrice: number;
  products: CartProductItem[];
}

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId?: string;
  data: CartData;
}

export interface WishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  category?: {
    _id: string;
    name: string;
  };
  brand?: {
    _id: string;
    name: string;
  };
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}

export interface OrderProductItem {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
}

export interface OrderType {
  _id: string;
  id?: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  shippingAddress?: {
    details?: string;
    phone?: string;
    city?: string;
  };
  cartItems: OrderProductItem[];
}

export interface AddressItem {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}