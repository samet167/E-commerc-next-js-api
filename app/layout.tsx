import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "K-Store — ហាងលក់ទំនិញអនឡាញ",
  description: "ទិញទំនិញអេឡិចត្រូនិក និងសម្ភារៈទំនើបៗ ដោយមានតម្លៃសមរម្យ និងការដឹកជញ្ជូនរហ័ស",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
