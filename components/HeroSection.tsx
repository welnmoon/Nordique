import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import Stripe from "stripe";

interface Props {
  products: Stripe.Response<Stripe.ApiList<Stripe.Product>>;
}

const HeroSection = ({ products }: Props) => {
  return (
    <section className="flex justify-center px-4">
      <div
        className="flex flex-col md:flex-row gap-6 
            w-full max-w-[400px] md:max-w-[800px] lg:max-w-[1100px] 
            items-center text-center md:text-left mb-10"
      >
        <div className="flex flex-col justify-center items-center md:items-start flex-1">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight font-serif uppercase mb-4">
            <Link href="/">Nordique</Link>
          </h2>
          <p className="text-sm md:text-md text-gray-600 mb-6 leading-relaxed max-w-[500px]">
            Откройте для себя неподвластные времени аксессуары и подчеркните
            свой стиль с помощью нашей коллекции премиум-класса.
          </p>
          <Button asChild variant="default" className="px-6 py-2 text-base">
            <Link href="/products">Посмотреть магазин</Link>
          </Button>
        </div>
        <div className="hidden md:block flex-1">
          <Image
            alt="Banner Image"
            width={450}
            height={450}
            className=""
            src={products.data[2].images[0]}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
