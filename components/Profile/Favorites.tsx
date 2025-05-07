"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FavoriteItem } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { IoHeart } from "react-icons/io5";
import { getFavorites, removeFavorite } from "@/utils/favorites";

const Favorites = () => {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && status === "authenticated")
      getFavorites({ setFavorites, setLoading, status, session });
  }, [status, session]);

  const handleRemove = async (productId: string) => {
    if (!session) return;
    await removeFavorite({ productId, setFavorites, session });
  };

  if (loading) return <p className="text-center">Загрузка...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Избранные товары</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">У вас пока нет избранных товаров.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-sm bg-white overflow-hidden flex flex-col justify-between"
            >
              <Link href={`/products/${item.productId}`}>
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="p-4 flex flex-col gap-2 flex-grow">
                <Link href={`/products/${item.productId}`}>
                  <p className="font-semibold">{item.name}</p>
                </Link>
                <p className="text-gray-700">{formatPrice(item.price)}</p>
              </div>

              <button
                onClick={() => handleRemove(item.productId)}
                className="cursor-pointer text-red-500 flex items-center gap-1 mt-auto p-4 hover:text-red-600 transition"
              >
                <IoHeart />
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
