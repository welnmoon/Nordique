"use client";

import { Order } from "@/utils/constant";
import { formatPrice } from "@/utils/formatPrice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const Orders = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(
          `http://localhost:5185/api/orders?email=${session.user.email}`
        );
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Ошибка при получении заказов:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [session]);

  if (loading) {
    return <p className="text-center text-gray-500">Загрузка ваших заказов...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Мои заказы</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">У вас пока нет заказов.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 border p-4 rounded-lg shadow-sm bg-white"
          >
            <p className="text-sm text-gray-500 mb-2">
              Дата: {new Date(order.createdAt).toLocaleString()}
            </p>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <Link href={`/products/${item.id}`}>
                      <p className="font-semibold">{item.name}</p>
                    </Link>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × {item.price} ₸
                    </p>
                    <p className="text-md text-gray-500">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <div className="w-14 h-14 relative shrink-0">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                </div>
              ))}
              <p className="text-xl font-medium">
                {formatPrice(
                  order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
                )}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
