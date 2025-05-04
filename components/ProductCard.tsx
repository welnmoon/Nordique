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

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const formattedPrice = formatPrice(price.unit_amount! / 100);

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
            <Link href={`/products/${product.id}`}>
              <Button className="w-full cursor-pointer">Подробнее</Button>
            </Link>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
