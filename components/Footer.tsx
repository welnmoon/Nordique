"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-white text-gray-600 text-sm mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-gray-800 font-semibold mb-4">О нас</h3>
          <p className="text-sm leading-6 text-gray-500">
            Nordique — это место, где стиль и функциональность сочетаются в каждой детали. Мы предлагаем только то, что хотели бы носить сами.
          </p>
        </div>

        <div>
          <h3 className="text-gray-800 font-semibold mb-4">Каталог</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/products?category=watches" className="hover:text-black transition">Часы</Link>
            </li>
            <li>
              <Link href="/products?category=glasses" className="hover:text-black transition">Очки</Link>
            </li>
            <li>
              <Link href="/products?category=bags" className="hover:text-black transition">Сумки</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-800 font-semibold mb-4">Поддержка</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="hover:text-black transition">FAQ</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black transition">Связаться с нами</Link>
            </li>
            <li>
              <Link href="/policy" className="hover:text-black transition">Политика конфиденциальности</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-800 font-semibold mb-4">Следите за нами</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-black">Instagram</Link>
            <Link href="#" className="hover:text-black">Telegram</Link>
            <Link href="#" className="hover:text-black">TikTok</Link>
          </div>
        </div>
      </div>

      <div className="border-t text-center text-xs text-gray-400 py-4">
        &copy; {new Date().getFullYear()} Nordique. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
