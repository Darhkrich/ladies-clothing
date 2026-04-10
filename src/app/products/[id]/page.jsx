"use client";

import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { products } from "@/lib/data";
import { addToCart } from "@/lib/cartStore";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const [added, setAdded] = useState(false);

  if (!product) return <div className="p-10">Product not found</div>;

  return (
    <main className="bg-white min-h-screen">

      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="rounded-xl overflow-hidden">
          <img
            src={product.image}
            className="w-full h-[600px] object-cover"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-6">
            GH₵{product.price}
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col gap-3">

            {/* ADD TO CART */}
            <button
              onClick={() => {
                addToCart(product);

                setAdded(true);

                setTimeout(() => {
                  setAdded(false);
                }, 1500);
              }}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200
                ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-black text-white hover:bg-gray-900"
                }
              `}
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>

            {/* WHATSAPP */}
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/233XXXXXXXXX?text=${encodeURIComponent(
                    `Hello, I want to order ${product.name}`
                  )}`,
                  "_blank"
                )
              }
              className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
            >
              Order on WhatsApp
            </button>

          </div>

          {/* TRUST */}
          <div className="mt-10 text-sm text-gray-600 space-y-2">
            <p>✔ Fast delivery within Ghana</p>
            <p>✔ Quality guaranteed</p>
            <p>✔ Easy WhatsApp ordering</p>
          </div>

        </div>

      </section>

    </main>
  );
}