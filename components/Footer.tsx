import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-auto" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-[var(--radius-lg)] flex items-center justify-center text-white font-semibold text-sm bg-primary">K</div>
              <span className="text-base font-semibold" style={{ color: "var(--heading)" }}>K-Store</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              ហាងលក់ទំនិញអនឡាញឈានមុខ ផ្តល់នូវផលិតផលគុណភាពខ្ពស់ តម្លៃសមរម្យ និងបទពិសោធន៍ទិញទំនិញដ៏ងាយស្រួល។
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--heading)" }}>ផ្នែកទិញទំនិញ</h4>
            <ul className="space-y-2.5">
              <li><Link href="/store/products" className="text-sm hover:text-primary" style={{ color: "var(--muted)" }}>ផលិតផលទាំងអស់</Link></li>
              <li><Link href="/store/cart" className="text-sm hover:text-primary" style={{ color: "var(--muted)" }}>កន្ត្រកទំនិញ</Link></li>
              <li><Link href="/store" className="text-sm hover:text-primary" style={{ color: "var(--muted)" }}>ការផ្សព្វផ្សាយ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--heading)" }}>ជំនួយ</h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-sm hover:text-primary" style={{ color: "var(--muted)" }}>សំណួរញឹកញាប់</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary" style={{ color: "var(--muted)" }}>ការដឹកជញ្ជូន</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary" style={{ color: "var(--muted)" }}>គោលការណ៍ត្រឡប់ទំនិញ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--heading)" }}>ទំនាក់ទំនង</h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
              <li>ភ្នំពេញ, កម្ពុជា</li>
              <li><a href="tel:012345678" className="hover:text-primary">012 345 678</a></li>
              <li><a href="mailto:info@kstore.com.kh" className="hover:text-primary">info@kstore.com.kh</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted)" }}>© 2026 K-Store. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
          <div className="flex items-center gap-5 text-xs" style={{ color: "var(--muted)" }}>
            <Link href="#" className="hover:text-primary">គោលការណ៍ឯកជនភាព</Link>
            <Link href="#" className="hover:text-primary">លក្ខខណ្ឌ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
