"use client";

import Link from "next/link";
import Logotype from "../Logotype";
import { montserrat } from "@/utils/fonts";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const JoinStyleSection = () => {
  return (
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
          <Button variant="outline" onClick={() => signIn()}>
            Войти
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default JoinStyleSection;
