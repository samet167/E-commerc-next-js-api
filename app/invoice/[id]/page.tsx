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

    fetch("http://127.0.0.1:8000/orders/" + id, {
      headers: { Authorization: "Bearer " + token },
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

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="text-center p-10">កំពុងទាញយកវិក្កយបត្រ...</div>;
  if (!invoice) return <div className="text-center p-10 text-red-500">មិនមានទិន្នន័យវិក្កយបត្រឡើយ!</div>;

  return (
    <>
      {/* 🛠️ ✅ បន្ថែម Style ពិសេសនេះ ដើម្បីបង្ខំលាក់ Header/Footer របស់ Layout និងលុបផ្ទៃប្រផេះចោលពេល Print */}
      <style jsx global>{`
        @media print {
          /* លាក់ Header និង Footer របស់គេហទំព័រធំ */
          header, footer, nav, .print-hidden {
            display: none !important;
          }
          /* កំណត់ឱ្យផ្ទៃខាងក្រោយរលុបពណ៌ប្រផេះ និងដក Margin ចេញ */
          body, html {
            background-color: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /* បង្ខំឱ្យតំបន់វិក្កយបត្ររីកពេញក្រដាស */
          .invoice-box {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* 📦 តួវិក្កយបត្រមេ */}
      <div className="invoice-box max-w-3xl mx-auto my-10 p-8 bg-white rounded-xl shadow-md border border-gray-100 print:my-0 print:p-4 print:w-full print:max-w-full">
        
        {/* ផ្នែកខាងលើ៖ ប៊ូតុងបញ្ជា (នឹងត្រូវលាក់ពេលព្រីន) */}
        <div className="flex justify-between items-center mb-8 print:hidden print-hidden">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
            ⬅ ត្រឡប់ទៅទំព័រដើម
          </Link>
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition shadow-sm flex items-center gap-2"
          >
            🖨 ព្រីន / ទាញយកជា PDF
          </button>
        </div>

        {/* ក្បាលវិក្កយបត្រ (Invoice Header) */}
        <div className="border-b pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">K-STORE INVOICE</h1>
            <p className="text-gray-500 text-sm mt-1">អរគុណសម្រាប់ការគាំទ្រសេវាកម្មរបស់យើងខ្ញុំ!</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-800">វិក្កយបត្រលេខ៖ #00{invoice.order_id}</p>
            <p className="text-sm text-gray-500 mt-1">កាលបរិច្ឆេទ៖ {invoice.created_at}</p>
            <span className="inline-block bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-semibold mt-2">
              ស្ថានភាព៖ បានទូទាត់ ({invoice.status})
            </span>
          </div>
        </div>

        {/* ព័ត៌មានអតិថិជន */}
        <div className="my-6 bg-gray-50 p-4 rounded-xl border">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">ព័ត៌មានអតិថិជន</h3>
          <p className="text-gray-800 font-semibold text-base">ឈ្មោះគណនី៖ <span className="text-blue-600">{invoice.customer}</span></p>
          <p className="text-gray-500 text-sm">វិធីសាស្ត្រទូទាត់៖ ប្រព័ន្ធអនឡាញ (Wallet/Card)</p>
        </div>

        {/* តារាងបញ្ជីទំនិញ (Invoice Table) */}
        <div className="mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 text-gray-700 text-sm font-bold">
                <th className="py-3 px-4">ឈ្មោះទំនិញ</th>
                <th className="py-3 px-4 text-center">តម្លៃរាយ</th>
                <th className="py-3 px-4 text-center">ចំនួន</th>
                <th className="py-3 px-4 text-right">តម្លៃសរុប</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divider-y">
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-medium text-gray-900">{item.item_name}</td>
                  <td className="py-4 px-4 text-center">${item.price}</td>
                  <td className="py-4 px-4 text-center">{item.quantity}</td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900">${item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ផ្នែកសរុបលុយខាងក្រោម */}
        <div className="mt-8 flex justify-end">
          <div className="w-64 space-y-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>តម្លៃសរុប៖</span>
              <span className="font-semibold text-gray-900">${invoice.total_price}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>ពន្ធ (VAT 0%)៖</span>
              <span className="font-semibold text-gray-900">$0.00</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-800 border-t pt-3">
              <span>ទឹកប្រាក់ត្រូវទូទាត់៖</span>
              <span className="text-xl text-green-600">${invoice.total_price}</span>
            </div>
          </div>
        </div>

        {/* ជើងក្រោមវិក្កយបត្រ (Footer) */}
        <div className="mt-16 text-center border-t pt-6 text-xs text-gray-400">
          <p>វិក្កយបត្រនេះត្រូវបានបង្កើតឡើងដោយប្រព័ន្ធស្វ័យប្រវត្ត និងមិនតម្រូវឱ្យមានហត្ថលេខាឡើយ។</p>
          <p className="mt-1">K-Store Co., Ltd. — រក្សាសិទ្ធិគ្រប់យ៉ាង ២០២៦</p>
        </div>

      </div>
    </>
  );
}