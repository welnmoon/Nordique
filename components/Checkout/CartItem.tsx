"use client";

import { useCartStore } from "@/store/CartStore";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { Card } from "antd";
import Image from "next/image";

import { IoClose } from "react-icons/io5";

interface Props {
  item: CartItemType;
}

const CartItem = ({ item }: Props) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const total = formatPrice(item.price * item.quantity);
  return (
    <Card>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <Image
              alt={item.name}
              src={item.images[0]}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <h2 className="text-md font-semibold">{item?.name}</h2>
            <p>
              {item.quantity} <span className="text-gray-500">X</span>{" "}
              {item.price} = {total}
            </p>
          </div>
        </div>
        <div className="">
          <IoClose
            size={"1.2rem"}
            className="cursor-pointer hover:text-gray-600"
            onClick={() => removeItem(item.id)}
          />
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
