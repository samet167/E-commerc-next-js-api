"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";

interface InvoiceItem { item_name: string; price: number; quantity: number; subtotal: number; }
interface InvoiceData { order_id: number; status: string; created_at: string; total_price: number; customer: string; items: InvoiceItem[]; }

export default function InvoicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetch(`http://127.0.0.1:8000/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { setInvoice(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto py-8 space-y-4"><div className="h-8 w-48 rounded-[var(--radius-md)]" style={{ backgroundColor: "var(--hover-bg)" }} /><div className="h-96 rounded-[var(--radius-xl)]" style={{ backgroundColor: "var(--hover-bg)" }} /></div>;
  if (!invoice) return <div className="text-center py-20"><div className="text-5xl mb-4">📄</div><h2 className="text-xl font-semibold" style={{ color: "var(--heading)" }}>រកមិនឃើញវិក្កយបត្រ</h2><Link href="/store" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">ត្រឡប់ទៅទំព័រដើម</Link></div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="no-print flex items-center justify-between mb-6">
        <Link href="/store" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary" style={{ color: "var(--muted)" }}><ArrowLeft size={16} /> ត្រឡប់ទៅទំព័រដើម</Link>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium shadow-xs"><Printer size={16} /> ព្រីន / PDF</button>
      </div>

      <div className="invoice-container rounded-[var(--radius-xl)] border overflow-hidden" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-md)" }}>
        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1"><div className="w-8 h-8 bg-primary rounded-[var(--radius-md)] flex items-center justify-center"><span className="text-white font-semibold text-sm">K</span></div><span className="text-base font-semibold" style={{ color: "var(--heading)" }}>K-Store</span></div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>វិក្កយបត្រ</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold" style={{ color: "var(--heading)" }}>វិក្កយបត្រ #00{invoice.order_id}</p>
              <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{invoice.created_at}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-success-light text-success text-xs font-medium rounded-[var(--radius-sm)]">{invoice.status}</span>
            </div>
          </div>

          <div className="mb-8 p-4 rounded-[var(--radius-lg)] border" style={{ backgroundColor: "var(--hover-bg)", borderColor: "var(--border)" }}>
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>អតិថិជន</p>
            <p className="font-medium text-sm" style={{ color: "var(--heading)" }}>{invoice.customer}</p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead><tr className="border-b" style={{ borderColor: "var(--border)" }}><th className="text-left pb-3 font-medium" style={{ color: "var(--muted)" }}>ផលិតផល</th><th className="text-center pb-3 font-medium" style={{ color: "var(--muted)" }}>តម្លៃ</th><th className="text-center pb-3 font-medium" style={{ color: "var(--muted)" }}>ចំនួន</th><th className="text-right pb-3 font-medium" style={{ color: "var(--muted)" }}>សរុប</th></tr></thead>
              <tbody>{invoice.items.map((item, i) => (
                <tr key={i} className="border-b" style={{ borderColor: "var(--border)" }}>
                  <td className="py-3.5 font-medium" style={{ color: "var(--heading)" }}>{item.item_name}</td>
                  <td className="py-3.5 text-center" style={{ color: "var(--muted)" }}>${item.price}</td>
                  <td className="py-3.5 text-center" style={{ color: "var(--muted)" }}>{item.quantity}</td>
                  <td className="py-3.5 text-right font-medium" style={{ color: "var(--heading)" }}>${item.subtotal}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-56 space-y-2">
              <div className="flex justify-between text-sm" style={{ color: "var(--muted)" }}><span>សរុប</span><span className="font-medium" style={{ color: "var(--heading)" }}>${invoice.total_price}</span></div>
              <div className="flex justify-between text-sm" style={{ color: "var(--muted)" }}><span>VAT</span><span className="font-medium" style={{ color: "var(--heading)" }}>$0.00</span></div>
              <div className="flex justify-between text-base font-semibold pt-3 border-t" style={{ borderColor: "var(--border)", color: "var(--heading)" }}><span>ត្រូវទូទាត់</span><span>${invoice.total_price}</span></div>
            </div>
          </div>
        </div>

        <div className="border-t p-5 text-center text-xs" style={{ borderColor: "var(--border)", backgroundColor: "var(--hover-bg)", color: "var(--muted)" }}>
          អរគុណសម្រាប់ការទិញទំនិញជាមួយ K-Store • 2026
        </div>
      </div>
    </div>
  );
}
