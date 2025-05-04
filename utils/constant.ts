export const MAX_COUNT_REGULAR = 25;
export const MAX_COUNT_MEDIUM = 3;
export const MAX_COUNT_EXCLUSIVE = 1;

export const NAVIGATION_TITLES = [
  {
    name: "Главная",
    link: "",
  },
  {
    name: "Магазин",
    link: "/products",
  },
  {
    name: "Оформления заказа",
    link: "checkout",
  },
];

export const ProductsTypes = [
  { value: "bags", label: "Сумки" },
  { value: "sunglasses", label: "Очки" },
  { value: "watches", label: "Часы" },
];

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
}
