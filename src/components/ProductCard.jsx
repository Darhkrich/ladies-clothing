"use client";

import Link from "next/link";
import { Star, TrendingUp, Sparkles, Tag } from "lucide-react"; // optional, but nice

export default function ProductCard({ product }) {
  const hasDiscount = product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const badgeConfig = {
    "Best Seller": { icon: TrendingUp, color: "bg-amber-50 text-amber-700 border-amber-200" },
    "New": { icon: Sparkles, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    "Sale": { icon: Tag, color: "bg-rose-50 text-rose-700 border-rose-200" },
  };

  const BadgeIcon = product.badge ? badgeConfig[product.badge]?.icon : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Image container with badges */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Product badge (New, Best Seller, etc.) */}
        {product.badge && BadgeIcon && (
          <div className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${badgeConfig[product.badge].color}`}>
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{product.badge}</span>
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discountPercent}%
          </div>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-gray-900 text-white text-sm font-medium px-4 py-1.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category */}
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 line-clamp-2 text-sm sm:text-base mb-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700 ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gray-900">
              GH₵{product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                GH₵{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors (optional, if you want to show swatches) */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color}
                  className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {color}
                </span>
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-gray-400">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link
          href={`/products/${product.id}`}
          className="mt-4 w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-800 text-sm font-medium py-2.5 px-4 rounded-xl transition-colors border border-gray-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}