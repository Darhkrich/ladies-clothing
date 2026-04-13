import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg" // Replace with your actual hero image path
          alt="Elegant fashion model"
          className="w-full h-full object-cover object-top sm:object-center"
          loading="eager"
        />
        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 sm:bg-gradient-to-r sm:from-black/60 sm:via-black/30 sm:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 text-center sm:text-left">
        <div className="max-w-2xl mx-auto sm:mx-0">
          {/* Small eyebrow text */}
          <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.3em] text-white/80 mb-4 sm:mb-6">
            New Collection 2026
          </span>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light sm:font-normal text-white leading-[1.1] sm:leading-tight mb-4 sm:mb-6">
            Elevate Your{" "}
            <span className="block sm:inline font-semibold italic">Style</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-lg mx-auto sm:mx-0 mb-8 sm:mb-10">
            Discover premium fashion curated for the modern woman. 
            Dresses, bags, and accessories that define elegance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#categories"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:border-white/60 text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-sm sm:text-base font-medium backdrop-blur-sm transition-all duration-300"
            >
              Explore Categories
            </Link>
          </div>

          {/* Trust indicators (optional) */}
          <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-6 justify-center sm:justify-start text-white/70 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-white/40"></span>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-white/40"></span>
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-white/40"></span>
              <span>WhatsApp Ordering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center">
          <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}