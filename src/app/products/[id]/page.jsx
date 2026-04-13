"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/data";
import { addToCart } from "@/lib/cartStore";
import { useState } from "react";
import { Star, Truck, Shield, MessageCircle, ChevronRight, Heart } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="bg-white min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-medium text-gray-900">Product Not Found</h1>
          <p className="text-gray-500 mt-2">The item you're looking for doesn't exist.</p>
          <Link href="/products" className="mt-6 inline-block bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const hasDiscount = product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello! I'm interested in ordering:%0A%0A*${product.name}*%0AQuantity: ${quantity}%0AColor: ${selectedColor || "N/A"}%0APrice: GH₵${product.price}%0A%0APlease confirm availability.`;
    window.open(`https://wa.me/233XXXXXXXXX?text=${message}`, "_blank");
  };

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-gray-900">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto aspect-[3/4] md:aspect-auto md:h-[650px] object-cover"
              />
            </div>
            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {!product.inStock && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  Out of Stock
                </span>
              )}
              {hasDiscount && (
                <span className="bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{discountPercent}%
                </span>
              )}
              {product.badge && (
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium px-3 py-1.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
            {/* Wishlist button (optional) */}
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="ml-1 text-base font-medium text-gray-700">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-semibold text-gray-900">
                GH₵{product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  GH₵{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Color: <span className="font-normal">{selectedColor || "Select a color"}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selectedColor === color
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  disabled={!product.inStock}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            {!product.inStock ? (
              <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
                This item is currently out of stock.
              </div>
            ) : (
              <p className="text-sm text-green-600 mb-6 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                In stock – ready to ship
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3.5 px-6 rounded-full font-medium text-center transition ${
                  added
                    ? "bg-green-500 text-white"
                    : product.inStock
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleWhatsAppOrder}
                disabled={!product.inStock}
                className={`flex-1 py-3.5 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition ${
                  product.inStock
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </button>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gray-400" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span>Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <span>WhatsApp Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Footer (simple) */}
      <footer className="border-t border-gray-100 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © 2026 Your Store. All rights reserved.
        </div>
      </footer>
    </main>
  );
}