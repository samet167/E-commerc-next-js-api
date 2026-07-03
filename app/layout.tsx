// ឯកសារ: app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <body className="bg-gray-50 text-gray-950">{children}</body>
    </html>
  );
}