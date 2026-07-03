// components/Footer.tsx
import Link from "next/link";

export default function FooterContent() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-black text-gray-900">K</span>
              <span className="text-2xl font-light text-gray-400">Store</span>
            </div>
            <p className="text-gray-500 max-w-md">
              ហាងលក់ទំនិញអនឡាញឈានមុខ ផ្តល់នូវផលិតផលគុណភាពខ្ពស់ 
              តម្លៃសមរម្យ និងបទពិសោធន៍ទិញទំនិញដ៏ងាយស្រួល។
            </p>
            <p className="text-xs text-gray-400 mt-6">© 2026 K-Store. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">រុករក</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-gray-900 transition">ទំព័រដើម</Link></li>
              <li><Link href="/store/products" className="hover:text-gray-900 transition">ផលិតផលទាំងអស់</Link></li>
              <li><Link href="/store/cart" className="hover:text-gray-900 transition">កន្ត្រកទំនិញ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">ជំនួយ</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900 transition">សំណួរញឹកញាប់</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition">ការដឹកជញ្ជូន</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition">គោលការណ៍ត្រឡប់ទំនិញ</Link></li>
              <li><Link href="#" className="hover:text-gray-900 transition">ទំនាក់ទំនងយើង</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>ភ្នំពេញ, កម្ពុជា</div>
          <div className="flex items-center gap-6">
            <a href="tel:012345678" className="hover:text-gray-600 transition">012 345 678</a>
            <span>info@kstore.com.kh</span>
          </div>
          <div>Made with ❤️ for Cambodia</div>
        </div>
      </div>
    </footer>
  );
}