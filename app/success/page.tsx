"use client";

import { useCartStore } from "@/store/CartStore";
import { DeliveryFormValues } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const SuccessPage = () => {
  const { data: session } = useSession();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (session && items.length > 0) {
      const saveOrder = async () => {
        const deliveryRaw = localStorage.getItem("delivery");
        const delivery: DeliveryFormValues | null = deliveryRaw
          ? JSON.parse(deliveryRaw)
          : null;

        await fetch("http://localhost:5185/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: session.user?.email,
            items,
            recipientName: delivery?.name,
            phone: delivery?.phone,
            city: delivery?.city,
            address: delivery?.address,
            zip: delivery?.zip,
            createdAt: new Date().toISOString(),
          }),
        });

        localStorage.removeItem("delivery");
      };

      saveOrder();
      clearCart();
    }
  }, [session, items, clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-green-600 mb-4">
        Платеж прошел успешно!
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Спасибо за покупку. Ваш заказ обрабатывается. Следите за вашим заказом в{" "}
        <Link href={"/profile"} className="underline">
          профиле
        </Link>
      </p>

      <Link
        href="/products"
        className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
      >
        Продолжить покупки
      </Link>
    </div>
  );
};

export default SuccessPage;
