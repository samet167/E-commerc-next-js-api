"use client";

import { useState, useEffect } from "react";
import { productService } from "@/services/product.service";
import { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "មានបញ្ហាក្នុងការទាញយកទិន្នន័យ");
      } {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}