"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { products } from "@/lib/data";

export default function Products() {
  const [active, setActive] = useState("All");

  const categories = ["All", "Dresses", "Bags", "Accessories"];

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <main className="bg-[#f8f8f8] min-h-screen">

      <Navbar />

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 pt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          Shop Collection
        </h1>
        <p className="text-black mt-2">
          Browse our latest fashion pieces
        </p>
      </section>

      {/* FILTER */}
      <div className="max-w-6xl mx-auto px-6 mt-6 flex gap-3 overflow-x-auto">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm transition
              ${
                active === cat
                  ? "bg-black text-white"
                  : "bg-white text-black shadow-sm hover:bg-gray-100"
              }
            `}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {filtered.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition">

               


                
  <div className="relative overflow-hidden">

    <img
      src={p.image}
      className="w-full aspect-[3/4] md:h-96 object-cover group-hover:scale-105 transition"
    />

    {/* HOVER BUTTON */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
      <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
        view details
      </button>
    </div>

  </div>


                <div className="p-4">
                  <h3 className="font-medium text-black">
                    {p.name}
                  </h3>
                  <p className="text-black mt-1 font-medium">
                    GH₵{p.price}
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </section>

    </main>
  );
}