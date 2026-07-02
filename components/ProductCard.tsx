import Link from "next/link";
import { Product } from "@/types/product";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-200 flex flex-col h-full">
      <div className="h-48 w-full bg-gray-50 relative">
        <ProductImage src={product.image} alt={product.name} />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium">
          {product.category.name}
        </span>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <Link 
            href={`/products/${product.id}`} 
            className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            មើលលម្អិត
          </Link>
        </div>
      </div>
    </div>
  );
}