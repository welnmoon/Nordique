"use client";
import Stripe from "stripe";
import ProductCard from "./ProductCard";
import { useEffect, useMemo, useState } from "react";
import { useSidebar } from "./ui/sidebar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductsTypes } from "@/utils/constant";

interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const { open } = useSidebar();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const nameMatch = p.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const categoryMatch = sort ? p.metadata?.category === sort : true;
      return nameMatch && categoryMatch;
    });
  }, [search, sort, products]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={`${open ? "overflow-hidden" : ""}`}>
      <div className="mb-8">
        <div className="relative mb-2">
          <input
            value={search}
            onChange={(e) => onInputChange(e)}
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none "
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
        <Select onValueChange={(e) => setSort(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Категория</SelectLabel>
              {ProductsTypes.map((pt) => (
                <SelectItem value={pt.value} key={pt.value}>
                  {pt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-lg">Пусто</p>
      )}
    </div>
  );
};

export default ProductList;
