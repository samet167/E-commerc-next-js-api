import { productService } from "@/services/product.service";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  let product = null;
  let error = null;

  try {
    product = await productService.getProductById(id);
  } catch (err) {
    error = "មិនអាចទាញយកព័ត៌មានផលិតផលនេះបានទេ ឬរកមិនឃើញឡើយ។";
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <Link href="/products" className="text-blue-600 hover:underline">ត្រឡប់ទៅកាន់បញ្ជីផលិតផល</Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* រូបភាព */}
        <div className="bg-gray-50 rounded-xl overflow-hidden h-80 md:h-96">
          <ProductImage src={product.image} alt={product.name} />
        </div>

        {/* ព័ត៌មាន */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-semibold inline-block">
              {product.category.name}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="text-2xl font-extrabold text-gray-900">${product.price}</div>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          <div className="pt-6 border-t border-gray-100 mt-6 space-y-4">
            <div className="text-sm text-gray-500 flex justify-between">
              <span>ស្ថានភាពស្តុក៖</span>
              <span className={product.quantity > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                {product.quantity > 0 ? `មានទំនិញក្នុងស្តុក (${product.quantity})` : "អស់ពីស្តុក"}
              </span>
            </div>
            
            <button 
              disabled={product.quantity === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition text-center"
            >
              បន្ថែមទៅក្នុងកន្ត្រក
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}