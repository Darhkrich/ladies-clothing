"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/cartStore";
import { checkoutWhatsApp } from "@/lib/whatsapp";
import { useEffect, useState } from "react";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck } from "lucide-react";

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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);



const handleCheckout = () => {
  checkoutWhatsApp();
  // Force immediate cart clear and UI update
  setCart([]);
};
  const handleUpdateQuantity = (id, action) => {
    updateQuantity(id, action);
    setCart(getCart());
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
            Shopping Cart
          </h1>
          {cart.length > 0 && (
            <p className="text-gray-500 text-sm mt-1">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link href={`/products/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg bg-gray-100"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <Link href={`/products/${item.id}`}>
                            <h3 className="font-medium text-gray-900 hover:underline text-sm sm:text-base line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          {item.selectedColor && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              Color: {item.selectedColor}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 mt-1">
                            GH₵{item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Item Total (Desktop) */}
                        <p className="hidden sm:block font-semibold text-gray-900">
                          GH₵{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, "dec")}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, "inc")}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="flex items-center gap-1 text-xs sm:text-sm text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>

                      {/* Mobile Item Total */}
                      <p className="sm:hidden font-semibold text-gray-900 text-right mt-2">
                        GH₵{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition mt-4"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>

                {/* Summary Lines */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>GH₵{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      Shipping
                    </span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-gray-900 text-base">
                      <span>Total</span>
                      <span>GH₵{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={checkoutWhatsApp}
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3.5 px-4 rounded-full flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Checkout on WhatsApp
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You'll complete your order via WhatsApp. We'll confirm within minutes.
                </p>

                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span>✓ Secure Order</span>
                  <span>✓ Fast Delivery</span>
                  <span>✓ Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-gray-200 mt-8 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © 2026 Your Store. All rights reserved.
        </div>
      </footer>
    </main>
  );
}