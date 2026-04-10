"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cartStore";

export default function Navbar() {
  const [count, setCount] = useState(0);

  const updateCartCount = () => {
    const cart = getCart();
    const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();

    // ✅ Listen to custom cart update event
    window.addEventListener("cartUpdated", updateCartCount);

    return () =>
      window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-lg md:text-xl font-bold text-gray-900"
        >
          Luxe Boutique
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* SHOP */}
          <Link
            href="/products"
            className="text-sm md:text-base font-medium text-gray-800 hover:text-black hover:underline underline-offset-4 transition"
          >
            Shop
          </Link>

          {/* CART */}
          <Link href="/cart" className="relative">
            <FiShoppingCart className="text-xl md:text-2xl text-gray-800" />

            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-[2px] rounded-full min-w-[20px] text-center">
                {count}
              </span>
            )}
          </Link>

        </div>

      </div>

    </nav>
  );
}