"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductGrid from "@/components/ProductGrid";
import Loading from "@/components/Loading";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">ផលិតផលទាំងអស់</h2>
        <p className="text-gray-500 text-sm">បង្ហាញទំនិញដែលមានស្រាប់ក្នុងស្តុក</p>
      </div>

      {loading && <Loading />}
      
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      {!loading && !error && <ProductGrid products={products} />}
    </div>
  );
}