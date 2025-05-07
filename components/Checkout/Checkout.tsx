"use client";

import { useCartStore } from "@/store/CartStore";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import DeliveryForm from "./DeliveryForm";
import CartItem from "./CartItem";
import DeliveryOptions from "./DeliveryOptions";

import { TbFlagFilled } from "react-icons/tb";
import { useState } from "react";
import { deliveryOptions } from "@/data/deliveryOptions";
import { formatPrice } from "@/utils/formatPrice";
import { checkoutAction } from "@/app/checkout/checkout-action";
import { DeliveryFormValues } from "@/types";

const Checkout = () => {
  const { data: session, status } = useSession();
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrices = totalPrice();
  const itemsQuantity = totalItems();

  const [selectedDeliveryID, setSelectedDeliveryID] = useState(1);
  const selectedDelivery = deliveryOptions.find(
    (d) => d.id === selectedDeliveryID
  );

  const total = formatPrice(totalPrices + (selectedDelivery?.price ?? 0));

  if (status === "loading")
    return <p className="text-center text-gray-500 ">Загрузка...</p>;

  const handleCheckout = async (values: DeliveryFormValues) => {
    const formData = new FormData();
    formData.append("items", JSON.stringify(items));
    formData.append("delivery", JSON.stringify(values));

    const url = await checkoutAction(formData);
    localStorage.setItem("delivery", JSON.stringify(values));
    window.location.href = url;
  };

  return (
    <div className="p-6">
      {session ? (
        <div>
          <p className="flex gap-2 text-sm text-gray-500 items-center mb-2 italic">
            Только по Казахстану
            <TbFlagFilled />
          </p>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Левая колонка - форма доставки */}

            <div className="order-2 lg:order-1 lg:w-1/2 bg-white flex flex-col gap-4">
              <div className="p-6 rounded-xl border-1 border-solid">
                <h2 className="text-2xl font-semibold mb-4">Тип доставки</h2>
                <DeliveryOptions
                  selectedDelivery={selectedDeliveryID}
                  setSelectedDelivery={setSelectedDeliveryID}
                />
              </div>
              <div className="p-6 rounded-xl border-1 border-solid">
                <h2 className="text-2xl font-semibold mb-4">
                  Данные для доставки
                </h2>
                <DeliveryForm onFinish={handleCheckout} />
              </div>
            </div>

            {/* Правая колонка - список товаров */}
            <div className="order-1 lg:order-2 lg:w-1/2">
              <div className="bg-white p-6 rounded-xl sticky top-6 max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">Ваши товары</h2>
                <div className="mb-4">
                  {items.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {items.map((i) => (
                        <CartItem key={i.id} item={i} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 text-lg">Пусто</p>
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <p>Кол-во товаров:</p>
                    <span className="text-gray-500 font-bold">
                      {itemsQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Цена доставки ({selectedDelivery?.title}):</p>
                    <span className="text-gray-500 font-bold">
                      {formatPrice(selectedDelivery?.price ?? 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <p>Итого:</p>
                    <span>{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-4">Вы не авторизованы</h2>
          <Button onClick={() => signIn()}>Войти</Button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
