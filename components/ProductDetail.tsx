"use client";

import Stripe from "stripe";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/CartStore";
import { CartItem } from "@/types";
import { useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { formatPrice } from "@/utils/formatPrice";
import {
  MAX_COUNT_EXCLUSIVE,
  MAX_COUNT_MEDIUM,
  MAX_COUNT_REGULAR,
} from "@/utils/constant";
import { useSidebar } from "./ui/sidebar";

const ProductDetail = ({
  product,
}: {
  product: Stripe.Response<Stripe.Product>;
}) => {
  const price = product.default_price as Stripe.Price;
  const [count, setCount] = useState<number>(0);
  const { setOpen } = useSidebar();

  const countHandler = (operation: string) => {
    const max = productCountMax();
    if (operation === "+" && count < max) setCount((prev) => prev + 1);
    if (operation === "-" && count > 0)
      setCount((prev) => Math.max(prev - 1, 0));
  };

  const productCountMax = () => {
    const productPrice = (price?.unit_amount ?? 0) / 100;
    if (productPrice < 25000) return MAX_COUNT_REGULAR;
    if (productPrice >= 25000 && productPrice < 60000) return MAX_COUNT_MEDIUM;
    if (productPrice >= 60000) return MAX_COUNT_EXCLUSIVE;

    return MAX_COUNT_EXCLUSIVE;
  };

  const productObj: CartItem = {
    id: product.id,
    name: product.name,
    images: product.images || [],
    price: (price?.unit_amount ?? 0) / 100,
    currency: price.currency,
    quantity: count,
    product_count_max: productCountMax(),
  };
  const formattedPrice = formatPrice(price.unit_amount! / 100);

  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  let alreadyExists = items.some((i) => i.id === product.id);

  const addToCart = (productObj: CartItem) => {
    alreadyExists = items.some((i) => i.id === product.id);
    if (!alreadyExists) addItem(productObj);

    setCount(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden shadow-md">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-8"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

        <p className="text-gray-600 text-md">{product.description}</p>

        {price?.unit_amount && (
          <p className="text-2xl text-gray-900 font-semibold">
            {formattedPrice}
            <p className="text-sm font-thin text-gray-400">
              Максимум: {productObj.product_count_max} шт.
            </p>
          </p>
        )}

        <div className="flex gap-2 items-center">
          <div>
            <Button
              variant="outline"
              onClick={() => countHandler("+")}
              disabled={count >= productObj.product_count_max!}
            >
              +
            </Button>
          </div>
          <p>{count}</p>
          <div>
            <Button
              variant="secondary"
              onClick={() => countHandler("-")}
              disabled={count === 0}
              className="hover:bg-[#cfcfcf]"
            >
              -
            </Button>
          </div>

          <BsCartPlusFill
            size="2rem"
            className={`cursor-pointer text-gray-500 hover:text-gray-600`}
            onClick={() => {
              if (count === 0) return;
              const timeout = setTimeout(() => {
                addToCart(productObj);
              }, 5000);
              if (!alreadyExists) {
                toast("Продукт успешно добавлен в корзину", {
                  action: {
                    label: "Отменить",
                    onClick: () => clearTimeout(timeout),
                  },
                });
              } else {
                toast("Продукт уже в корзине.", {
                  action: {
                    label: "Открыть корзину",
                    onClick: () => setOpen(true),
                  },
                });
              }
            }}
          />
          {alreadyExists && (
            <p className="text-md text-gray-400">Уже в корзине</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
