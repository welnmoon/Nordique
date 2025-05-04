"use client";
import Link from "next/link";
import { RiShoppingCartFill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import MySidebar from "./MySidebar";
import { useSidebar } from "./ui/sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileDrawer from "./MobileSidebar";
import { useState } from "react";
import { useCartStore } from "@/store/CartStore";
import { NAVIGATION_TITLES } from "@/utils/constant";

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const { setOpen } = useSidebar();
  const [open, setOpenMenu] = useState(false);
  const showDrawer = () => setOpenMenu(true);
  const onClose = () => setOpenMenu(false);

  const itemsQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="w-full px-6 md:px-12 lg:px-20 py-4">
      <div className="relative flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide font-serif uppercase">
          <Link href="/">Nordique</Link>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="flex gap-4">
            {NAVIGATION_TITLES.map((n) => (
              <Link
                key={n.link}
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/${
                  n.name === "Главная" ? "" : n.link
                }`}
              >
                {n.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="ml-auto md:hidden cursor-pointer">
          <RxHamburgerMenu className="size-7" onClick={showDrawer} />
        </div>

        <div className="flex gap-2">
          <div className="hidden md:flex gap-2 relative">
            <span className="absolute w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs top-0 right-0 translate-x-1/2 -translate-y-1/2">
              {itemsQuantity > 99 ? "+99" : itemsQuantity}
            </span>
            <RiShoppingCartFill
              size="1.4rem"
              className="cursor-pointer"
              onClick={() => setOpen(true)}
              aria-label="Открыть корзину"
            />
          </div>

          <div className="hidden md:flex">
            <Link href="/profile">
              <VscAccount size="1.4rem" />
            </Link>
          </div>
        </div>
      </div>

      <MobileDrawer open={open} onClose={onClose} />
      <MySidebar />
    </nav>
  );
};

export default Navbar;
