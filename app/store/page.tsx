import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 text-sm mb-6">
          <span className="text-green-600">●</span>
          បើកដំណើរការជារៀងរាល់ថ្ងៃ
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight tracking-tighter mb-6">
          ស្វាគមន៍មកកាន់ <span className="text-black">K-Store</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-xl mx-auto mb-10">
          ទិញទំនិញអេឡិចត្រូនិក និងសម្ភារៈទំនើបៗ ដោយមានតម្លៃសមរម្យ និងការដឹកជញ្ជូនរហ័ស
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/store/products"
            className="bg-gray-900 text-white font-medium px-10 py-4 rounded-2xl hover:bg-black transition text-lg"
          >
            រកមើលផលិតផល
          </Link>
          <Link
            href="/store"
            className="border border-gray-300 font-medium px-8 py-4 rounded-2xl hover:bg-gray-50 transition text-lg"
          >
            មើលការផ្សព្វផ្សាយ
          </Link>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-b border-gray-100 py-6 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-sm text-gray-500">
          <div>🚚 ដឹកជញ្ជូនឥតគិតថ្លៃលើការទិញលើស $50</div>
          <div>🔄 បើកប្រាក់វិញក្នុងរយៈពេល 30 ថ្ងៃ</div>
          <div>🔒 ទូទាត់ប្រាក់មានសុវត្ថិភាព 100%</div>
        </div>
      </div>

      {/* Simple Categories / Features */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-center text-2xl font-semibold mb-12 text-gray-900">
          ប្រភេទផលិតផលពេញនិយម
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { emoji: "📱", label: "ទូរស័ព្ទ & ថេប្លេត" },
            { emoji: "💻", label: "កុំព្យូទ័រ & Laptop" },
            { emoji: "🎧", label: "ឧបករណ៍ស្តាប់សំឡេង" },
            { emoji: "⌚", label: "នាឡិកា & Smart Watch" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 hover:border-gray-200 rounded-3xl p-8 text-center transition hover:shadow-md group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">{item.emoji}</div>
              <p className="font-medium text-gray-800">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}