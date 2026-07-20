import Link from "next/link";
import { ShoppingBag, Truck, Shield, RotateCcw, Star } from "lucide-react";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Hero */}
      <section style={{ backgroundColor: "var(--bg-section)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border rounded-[var(--radius-full)] px-4 py-1.5 text-sm mb-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}>
                <Star size={14} className="text-warning" fill="currentColor" />
                <span>ផលិតផលគុណភាពខ្ពស់បំផុត</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6" style={{ color: "var(--heading)" }}>
                ទិញទំនិញ<br /><span className="text-primary">ទំនើបៗ</span> តាមអនឡាញ
              </h1>
              <p className="text-lg max-w-md mb-8 leading-relaxed" style={{ color: "var(--muted)" }}>
                ស្វែងរកផលិតផលអេឡិចត្រូនិក និងសម្ភារៈទំនើបៗ ជាមួយតម្លៃសមរម្យ និងការដឹកជញ្ជូនរហ័ស។
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/store/products" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3.5 rounded-[var(--radius-full)] text-sm shadow-sm">
                  <ShoppingBag size={18} /> រកមើលផលិតផល
                </Link>
                <Link href="/store" className="inline-flex items-center justify-center border font-medium px-6 py-3.5 rounded-[var(--radius-full)] text-sm hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)", color: "var(--heading)", backgroundColor: "var(--card)" }}>
                  មើលការផ្សព្វផ្សាយ
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-80 h-80 rounded-[var(--radius-2xl)] border flex items-center justify-center" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-md)" }}>
                <div className="text-center p-8">
                  <div className="text-8xl mb-3">🛍️</div>
                  <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>ផលិតផល Premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y py-8" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "ដឹកជញ្ជូនឥតគិតថ្លៃ", sub: "ការទិញលើស $50" },
              { icon: RotateCcw, title: "ប្រាក់វិញក្នុង 30 ថ្ងៃ", sub: "គោលការណ៍ត្រឡប់ទំនិញ" },
              { icon: Shield, title: "ទូទាត់មានសុវត្ថិភាព", sub: "100% សុវត្ថិភាព" },
              { icon: ShoppingBag, title: "ផលិតផលគុណភាព", sub: "យីហោល្បីៗ" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center bg-primary-light">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--heading)" }}>{item.title}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--heading)" }}>ប្រភេទផលិតផលពេញនិយម</h2>
            <p style={{ color: "var(--muted)" }}>ស្វែងរកផលិតផលតាមប្រភេទដែលអ្នកចង់បាន</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: "📱", label: "ទូរស័ព្ទ & ថេប្លេត" }, { icon: "💻", label: "កុំព្យូទ័រ & Laptop" },
              { icon: "🎧", label: "ឧបករណ៍ស្តាប់សំឡេង" }, { icon: "⌚", label: "នាឡិកា & Smart Watch" },
              { icon: "📷", label: "កាមេរ៉ា & Photo" }, { icon: "🎮", label: "Gaming & Console" },
              { icon: "🖥️", label: "ម៉ូនីទ័រ & TV" }, { icon: "🔌", label: "គ្រឿងបន្ថែម" },
            ].map((item, i) => (
              <Link href="/store/products" key={i} className="rounded-[var(--radius-xl)] p-6 text-center border hover:border-primary/40 group" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-xs)" }}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-sm font-medium group-hover:text-primary" style={{ color: "var(--heading)" }}>{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto rounded-[var(--radius-2xl)] py-14 px-6 text-center bg-[#111827]">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">ចាប់ផ្តើមទិញទំនិញឥឡូវនេះ</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">រួមជាមួយអតិថិជនរាប់ពាន់នាក់ដែលជឿជាក់លើ K-Store។</p>
          <Link href="/register" className="inline-flex items-center justify-center bg-white text-[#111827] font-semibold px-6 py-3 rounded-[var(--radius-full)] text-sm hover:bg-slate-100">
            បង្កើតគណនីឥតគិតថ្លៃ
          </Link>
        </div>
      </section>
    </div>
  );
}
