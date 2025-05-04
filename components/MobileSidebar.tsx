"use client";
import { useCartStore } from "@/store/CartStore";
import { NAVIGATION_TITLES } from "@/utils/constant";
import { formatPrice } from "@/utils/formatPrice";
import { Button, Drawer, Flex } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ open, onClose }: Props) => {
  // const pathname = usePathname();

  // useEffect(() => {
  //   onClose();
  // }, [pathname]);

  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartStore((state) => state.items);
  const itemsPrice = items
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  return (
    <Drawer
      title="Меню"
      width={520}
      closable={false}
      onClose={onClose}
      open={open}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <VscAccount size="2rem" />
          <Link href="/profile">
            <span className="text-xl cursor-pointer text-black hover:text-gray-800">
              Аккаунт
            </span>
          </Link>
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setChildrenDrawer(true)}
        >
          <RiShoppingCartFill size="2rem" />
          <span className="text-xl">Корзина</span>
        </div>
        <hr />
        {NAVIGATION_TITLES.map((n) => (
          <Link
            className=""
            key={n.link}
            href={`/${n.name === "Главная" ? "" : n.link}`}
          >
            <p className="text-xl text-black">{n.name}</p>
          </Link>
        ))}
      </div>

      <Drawer
        title="Корзина"
        width={320}
        closable={false}
        onClose={() => setChildrenDrawer(false)}
        open={childrenDrawer}
      >
        <div className="flex flex-col h-full">
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
                    <div>
                      <Link href={`/products/${item.id}`}>
                        <p className="cursor-pointer font-semibold">
                          {item.name}
                        </p>
                      </Link>
                      <p>
                        {item.price} {item.currency?.toUpperCase()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>{item.quantity}</p>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
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
                <span>{formatPrice(Number(itemsPrice))}</span>
              </div>
              <Button variant="solid" color="default" block>
                <Link href="/checkout">Оформить заказ</Link>
              </Button>
            </Flex>
          </div>
        </div>
      </Drawer>
    </Drawer>
  );
};

export default MobileDrawer;
