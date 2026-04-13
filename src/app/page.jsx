// app/page.jsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { products } from "@/lib/data";
import { ArrowRight, ShoppingBag, Truck, Shield, MessageCircle } from "lucide-react";

export default function Home() {
  const featuredProducts = products.filter(p => p.inStock).slice(0, 6);

  const categories = [
    { name: "Dresses", image: "/cloths.jpg", slug: "dresses" },
    { name: "Bags", image: "/bags.jpg", slug: "bags" },
    { name: "Accessories", image: "/acces.jpg", slug: "accessories" },
  ];

  return (
    <main className="bg-white text-gray-900">
      <Navbar />

      {/* HERO SECTION */}
      <Hero />

      {/* QUICK INFO BAR */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Truck className="w-4 h-4" />
            <span>Fast Delivery Across Ghana</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <MessageCircle className="w-4 h-4" />
            <span>Order via WhatsApp in Seconds</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Shield className="w-4 h-4" />
            <span>Premium Quality Guaranteed</span>
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900">
              Featured Collection
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Handpicked styles you'll love
            </p>
          </div>
          <Link
            href="/products"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 text-center mb-8 sm:mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/products?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl sm:text-2xl font-medium">
                    {cat.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-white/80 text-sm mt-2 group-hover:gap-2 transition-all">
                    Shop Now
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SHOP WITH US */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-medium text-gray-900">
          Why Shop With Us
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast & Free Delivery</h3>
            <p className="text-gray-600 text-sm">
              Orders arrive in 2‑3 days across all regions of Ghana
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-sm">
              Every item is carefully inspected before shipping
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy WhatsApp Ordering</h3>
            <p className="text-gray-600 text-sm">
              Just send a message with your item and we handle the rest
            </p>
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-medium">
            Ready to Order?
          </h2>
          <p className="mt-3 text-gray-300 max-w-xl mx-auto">
            Skip the complicated checkout. Send your order directly via WhatsApp and we'll confirm within minutes.
          </p>
          <Link
            href="/cart"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-medium transition shadow-lg shadow-green-500/20"
          >
            <MessageCircle className="w-5 h-5" />
            Order on WhatsApp
          </Link>
         
        </div>
      </section>

      {/* FOOTER (simple version – can be extracted to separate component later) */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2026 DevMasters. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}