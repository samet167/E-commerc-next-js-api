"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface InvoiceItem {
  item_name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface InvoiceData {
  order_id: number;
  status: string;
  created_at: string;
  total_price: number;
  customer: string;
  items: InvoiceItem[];
}

export default function InvoicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("សូមចូលគណនីជាមុនសិន!");
      router.push("/login");
      return;
    }

    fetch(`http://127.0.0.1:8000/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("រកមិនឃើញវិក្កយបត្រ");
        return res.json();
      })
      .then((data) => {
        setInvoice(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handlePrint = () => window.print();

  if (loading) return <div className="text-center py-20">កំពុងទាញយកវិក្កយបត្រ...</div>;
  if (!invoice) return <div className="text-center py-20 text-red-500">រកមិនឃើញវិក្កយបត្រឡើយ!</div>;

  return (
    <>
      <style jsx global>{`
        @media print {
          header, footer, nav, button, .no-print {
            display: none !important;
          }
          body, html {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .invoice-container {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20px !important;
            max-width: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>

      <div className="invoice-container max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
          {/* Header Bar (លាក់ពេល Print) */}
          <div className="no-print flex justify-between items-center px-8 py-5 border-b bg-gray-50">
            <Link href="/store" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              ← ត្រឡប់ទៅទំព័រដើម
            </Link>
            <button
              onClick={handlePrint}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-2xl hover:bg-black transition flex items-center gap-2"
            >
              🖨️ ព្រីន / ទាញយក PDF
            </button>
          </div>

          {/* Invoice Content */}
          <div className="p-10">
            {/* Invoice Title */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="text-4xl font-bold tracking-tighter text-gray-900">K-STORE</div>
                <p className="text-gray-400 text-sm">វិក្កយបត្រ</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold">លេខវិក្កយបត្រ #00{invoice.order_id}</p>
                <p className="text-sm text-gray-500 mt-1">{invoice.created_at}</p>
                <div className="mt-3 inline-block px-4 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {invoice.status}
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-10 bg-gray-50 p-6 rounded-2xl">
              <p className="uppercase text-xs tracking-widest text-gray-500 mb-2">អតិថិជន</p>
              <p className="font-medium text-lg">{invoice.customer}</p>
            </div>

            {/* Items Table */}
            <table className="w-full mb-10">
              <thead>
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="pb-4 font-medium">ឈ្មោះផលិតផល</th>
                  <th className="pb-4 font-medium text-center">តម្លៃរាយ</th>
                  <th className="pb-4 font-medium text-center">ចំនួន</th>
                  <th className="pb-4 font-medium text-right">សរុប</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="py-5">
                    <td className="py-5 font-medium">{item.item_name}</td>
                    <td className="py-5 text-center">${item.price}</td>
                    <td className="py-5 text-center">{item.quantity}</td>
                    <td className="py-5 text-right font-semibold">${item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="flex justify-end">
              <div className="w-72">
                <div className="flex justify-between text-gray-600 py-2">
                  <span>ទឹកប្រាក់សរុប</span>
                  <span className="font-medium">${invoice.total_price}</span>
                </div>
                <div className="flex justify-between text-gray-600 py-2 border-t">
                  <span>ពន្ធ (VAT)</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t mt-2">
                  <span>ទឹកប្រាក់ត្រូវទូទាត់</span>
                  <span>${invoice.total_price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-8 text-center text-xs text-gray-400">
            អរគុណសម្រាប់ការទិញទំនិញជាមួយ K-Store<br />
            វិក្កយបត្រនេះត្រូវបានបង្កើតដោយប្រព័ន្ធស្វ័យប្រវត្តិ • ២០២៦
          </div>
        </div>
      </div>
    </>
  );
}