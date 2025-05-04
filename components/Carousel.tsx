"use client";

import { useKeenSlider, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface Props {
  products: Stripe.Product[];
}

const Carousel = ({ products }: Props) => {
  const sliderRef = useRef<KeenSliderInstance | null>(null);

  const [containerRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    renderMode: "performance",
    slides: {
      perView: 3,
      spacing: 16,
    },
    created(slider) {
      sliderRef.current = slider;
    },
  });

  const animationRef = useRef<number>(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.next(); // просто переходит к следующему слайду
    }, 2500);

    return () => clearInterval(interval); // очистка при размонтировании
  }, []);

  return (
    <div ref={containerRef} className="keen-slider py-4">
      {products.concat(products).map((product, idx) => (
        <div
          key={`${product.id}-${idx}`}
          className="keen-slider__slide min-w-[260px] bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative w-full h-48">
            <Image
              src={product.images?.[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg text-gray-800">
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
