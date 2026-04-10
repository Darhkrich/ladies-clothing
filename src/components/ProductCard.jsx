"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
      <img
        src={product.image}
        className="w-full aspect-[3/4] object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-black-700 text-sm mt-1">
          GH₵{product.price}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="block mt-3 text-sm underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}