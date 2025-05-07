import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { formatPrice } from "@/utils/formatPrice";

import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { checkFavorite, postFavorite, removeFavorite } from "@/utils/favorites";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const formattedPrice = formatPrice(price.unit_amount! / 100);
  const { data: session, status } = useSession();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // находим продукт
  useEffect(() => {
    if (!session) return;
    checkFavorite({ setIsFavorite, status, session, product });
  }, [session, product.id, product, status]);

  const handleToggleFavorite = async () => {
    if (!session?.user?.email) return alert("Сначала войдите в аккаунт");

    if (isFavorite) {
      removeFavorite({ productId: product.id, session });
      setIsFavorite(false);
    } else {
      postFavorite({ product, price, session, status });
      setIsFavorite(true);
    }
  };

  return (
    <div className="block group:">
      <Card className="w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-300 p-0 gap-2">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] group">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-90"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-4 pb-4 text-left">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-md text-black font-semibold group-hover:text-gray-800 transition-colors line-clamp-1">
              {product.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <CardDescription className="mb-4">
              <p className="mb-2">{product.description}</p>
              {price?.unit_amount && (
                <p className="text-black font-semibold text-lg ">
                  {formattedPrice}
                </p>
              )}
            </CardDescription>
            <div className="flex items-center gap-2">
              <div
                onClick={handleToggleFavorite}
                className="shrink-0 text-xl text-gray-500 hover:text-gray-400 cursor-pointer"
              >
                {isFavorite ? <IoHeart /> : <IoHeartOutline />}
              </div>
              <Link href={`/products/${product.id}`} className="flex-1">
                <Button className="w-full cursor-pointer">Подробнее</Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
