"use client";

import Navbar from "@/components/Navbar";
import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/cartStore";
import { checkoutWhatsApp } from "@/lib/whatsapp";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      setCart(getCart());
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  // ✅ Calculate total from state (NOT from localStorage directly)
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="bg-[#f8f8f8] min-h-screen">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT - CART ITEMS */}
          <div className="md:col-span-2 space-y-6">

            {cart.length === 0 && (
              <div className="bg-white p-10 rounded-xl text-center shadow-sm">
                <p className="text-gray-600">
                  Your cart is empty
                </p>
              </div>
            )}

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center transition-all duration-300 hover:shadow-md"
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-gray-700 mt-1">
                    GH₵{item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                     onClick={() => {
  updateQuantity(item.id, "dec");
  setCart(getCart());
}}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                    onClick={() => {
  updateQuantity(item.id, "inc");
  setCart(getCart());
}} 
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => {
  removeFromCart(item.id);
  setCart(getCart()); // 🔥 force UI update instantly
}}
                    className="text-sm text-red-500 mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* ITEM TOTAL */}
                <div className="font-semibold text-gray-900">
                  GH₵{item.price * item.quantity}
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-10">

            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="flex justify-between mt-6 text-gray-700">
              <span>Total</span>
              <span className="font-bold text-gray-900">
                GH₵{total}
              </span>
            </div>

            <button
              onClick={checkoutWhatsApp}
              className="mt-6 w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Order on WhatsApp
            </button>

            <p className="text-xs text-gray-500 mt-3">
              You will complete your order via WhatsApp
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}