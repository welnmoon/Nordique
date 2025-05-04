"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { useCartStore } from "@/store/CartStore";
import { formatPrice } from "@/utils/formatPrice";
import { Button, Flex } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";

const MySidebar = () => {
  const { open, setOpen } = useSidebar();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  const itemsPrice = formatPrice(
    items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Корзина</h2>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {items.length === 0 ? (
            <p className="text-gray-500">Корзина пуста</p>
          ) : (
            items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between mb-2">
                  <div className="relative w-14 h-14 shrink-0">
                    <Image
                      alt={item.name}
                      src={item.images[0]}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <MdDelete
                    size="1.4rem"
                    color="red"
                    className="cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  />
                </div>
                <div className="flex justify-between border-b pb-2">
                  <div className="w-2/3">
                    <Link href={`/products/${item.id}`}>
                      <p className="cursor-pointer font-semibold">
                        {item.name}
                      </p>
                    </Link>
                    <p>{formatPrice(item.price)}</p>
                  </div>
                  <div className="text-right w-1/3 text-gray-500">
                    <p>{item.quantity}</p>
                    <p>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <Flex vertical style={{ width: "100%" }}>
            <div className="mb-4 flex gap-1">
              <p className="font-bold text-gray-800">Итого:</p>
              <span>{itemsPrice}</span>
            </div>
            <Button variant="solid" color="default" block>
              <Link href="/checkout">Оформить заказ</Link>
            </Button>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default MySidebar;
