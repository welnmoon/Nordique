import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import Image from "next/image";
import { montserrat } from "@/utils/fonts";
import Logotype from "@/components/Logotype";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <>
      {/* Внутри контейнера */}
      <div>
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

        <section className="mb-16 px-4">
          <Carousel products={products.data} />
        </section>
      </div>

      {/* Полноэкранная секция вне контейнера */}
      <section className="mb-8 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[500px] md:h-[600px]">
        <Image
          alt="Full Width Image"
          src="/watch_fossil.jpg"
          fill
          className="object-cover"
        />
      </section>

      {/* Цитата */}
      <div className="text-center mb-10">
        <p
          className={`${montserrat.className} w-100 px-4 max-w-2xl mx-auto text-gray-800 text-lg md:text-xl font-semibold tracking-wide mb-4`}
        >
          Townsman Automatic Brown Leather Watch
        </p>
        <Button className="bg-amber-900">Посмотреть {`->`}</Button>
      </div>

      {/* Hero Section */}
      <section className="max-w-full bg-neutral-100 p-10 ">
        <div className="text-center pb-4">
          <Logotype />
        </div>
        <h1
          className={`${montserrat.className} text-4xl md:text-6xl font-serif font-semibold text-center text-amber-900`}
        >
          Здесь начинается твой стиль
        </h1>
        <p className="mt-4 text-center text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Стань частью мира, где детали говорят громче слов. Только лучшие
          аксессуары, вдохновлённые индивидуальностью.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link href="/products">
            <Button variant="default">Посмотреть коллекцию</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">Войти</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
