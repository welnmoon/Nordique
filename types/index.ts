export interface CartItem {
  id: string;
  name: string;
  images: string[];
  price: number;
  currency: string;
  quantity: number;
  product_count_max?: number;
}
