"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Dresses", "Bags", "Accessories"];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">
          Shop Collection
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse our latest fashion pieces
        </p>
      </div>

      {/* Simple Filter - Horizontal Scroll */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-3 text-sm font-medium text-gray-900 underline"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}