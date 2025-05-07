export interface CartItem {
  id: string;
  name: string;
  images: string[];
  price: number;
  currency: string;
  quantity: number;
  product_count_max?: number;
}

export interface DeliveryFormValues {
  name: string;
  phone: string;
  city: string;
  address?: string;
  zip?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

export interface Order {
  id: string;
  userEmail: string;
  items: OrderItem[];
  createdAt: string;

  recipientName: string;
  phone: string;
  city: string;
  address: string;
  zip: string;
}

export interface FavoriteItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  userEmail: string;
  createdAt: string;
}
