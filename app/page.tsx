import Link from "next/link";

export default function Home() {
  return (
    <div className="py-20 text-center max-w-2xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
        ស្វាគមន៍មកកាន់ការទិញទំនិញបែប <span className="text-blue-600">ឌីជីថល</span>
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        ស្វែងរកទំនិញអេឡិចត្រូនិក និងសម្ភារៈទំនើបៗជាច្រើនប្រភេទជាមួយតម្លៃសមរម្យបំផុត។
      </p>
      <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition shadow-lg shadow-blue-600/20">
        ទិញទំនិញឥឡូវនេះ
      </Link>
    </div>
  );
}