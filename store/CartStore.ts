import { CartItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i?.id === item.id);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i?.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i?.id !== id) });
      },

      clearCart: () => {
        set({ items: [] });
      },

      totalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
