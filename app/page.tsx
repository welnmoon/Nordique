import Carousel from "@/components/Carousel";
import { stripe } from "@/lib/stripe";
import HeroSection from "@/components/HeroSection";
import FullWidthBanner from "@/components/MainPageComponents/FullWidthBanner";
import JoinStyleSection from "@/components/MainPageComponents/JoinStyleSection";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <>
      {/* Внутри контейнера */}
      <div>
        <HeroSection products={products} />

        <Carousel products={products.data} />
      </div>

      {/* Полноэкранная секция вне контейнера */}
      <FullWidthBanner />

      {/* Цитата */}

      {/* Hero Section */}
      <JoinStyleSection />
    </>
  );
}
