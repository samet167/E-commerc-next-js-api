"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import ProductImage from "./ProductImage";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div
      className="rounded-[var(--radius-xl)] flex flex-col h-full overflow-hidden border"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-sm)" }}
    >
      {/* Image — soft gray bg so white products stand out */}
      <div className="relative h-52 w-full overflow-hidden" style={{ backgroundColor: "var(--img-bg)" }}>
        <Link href={`/store/products/${product.id}`} aria-label={`មើល ${product.name}`}>
          <ProductImage src={product.image} alt={product.name} className="object-contain p-5" />
        </Link>
        {product.category && (
          <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-[var(--radius-full)] bg-primary-light text-primary">
            {product.category.name}
          </span>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border hover:text-danger hover:border-danger/30"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}
          aria-label="Wishlist"
        >
          <Heart size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/store/products/${product.id}`}>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 hover:text-primary" style={{ color: "var(--heading)" }}>
            {product.name}
          </h3>
        </Link>
        <p className="text-xs mt-1.5 line-clamp-2 flex-grow" style={{ color: "var(--muted)" }}>
          {product.description}
        </p>

        {product.quantity !== undefined && (
          <div className="mt-3">
            {product.quantity > 10 ? (
              <span className="text-[11px] font-medium text-success bg-success-light px-2 py-0.5 rounded-[var(--radius-full)]">មានក្នុងស្តុក</span>
            ) : product.quantity > 0 ? (
              <span className="text-[11px] font-medium text-warning bg-warning-light px-2 py-0.5 rounded-[var(--radius-full)]">នៅសល់ {product.quantity}</span>
            ) : (
              <span className="text-[11px] font-medium text-danger bg-danger-light px-2 py-0.5 rounded-[var(--radius-full)]">អស់ពីស្តុក</span>
            )}
          </div>
        )}

        <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <span className="text-base font-semibold" style={{ color: "var(--heading)" }}>${product.price}</span>
          <button
            onClick={() => addToCart(product.id, 1)}
            className="flex items-center gap-1.5 text-white text-xs font-medium px-3.5 py-2 rounded-[var(--radius-full)] bg-primary hover:bg-primary-hover shadow-xs"
            aria-label="Add to cart"
          >
            <ShoppingCart size={13} />
            <span className="hidden sm:inline">បន្ថែម</span>
          </button>
        </div>
      </div>
    </div>
  );
}
