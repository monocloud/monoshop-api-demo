"use client";

import { useState } from "react";
import type { Product } from "../actions/api";
import { EmptyState } from "../components/empty-state";
import { ProductCard } from "../components/product-card";

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "$0 – $50", min: 0, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $500", min: 100, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

const sortOptions = [
  { label: "Name A–Z", fn: (a: Product, b: Product) => a.name.localeCompare(b.name) },
  { label: "Name Z–A", fn: (a: Product, b: Product) => b.name.localeCompare(a.name) },
  { label: "Price ↑", fn: (a: Product, b: Product) => a.price - b.price },
  { label: "Price ↓", fn: (a: Product, b: Product) => b.price - a.price },
];

export default function ProductGrid({ products }: { products: Product[] }) {
  const [activeRange, setActiveRange] = useState(0);
  const [activeSort, setActiveSort] = useState(0);

  const range = priceRanges[activeRange];
  const filtered = products
    .filter((p) => p.price >= range.min && p.price < range.max)
    .sort(sortOptions[activeSort].fn);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {priceRanges.map((r, i) => (
          <button
            key={r.label}
            onClick={() => setActiveRange(i)}
            className={`px-5 py-2 rounded-full text-sm font-bold border transition-all hover:scale-105 ${
              activeRange === i
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
            }`}
          >
            {r.label}
          </button>
        ))}

        <div className="ml-auto flex gap-2">
          {sortOptions.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveSort(i)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all hover:scale-105 ${
                activeSort === i
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              message="No products match this filter."
              tone="subtle"
            />
          </div>
        ) : (
          filtered.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))
        )}
      </div>
    </>
  );
}
