import type { Metadata } from "next";
import { CartProvider } from "@/components/CartProvider";
import { TopNavbar } from "@/components/TopNavbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mobile Store",
  description: "Smartphone catalog and cart experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-neutral-100 text-neutral-950">
        <CartProvider>
          <TopNavbar />
          <main className="mx-auto flex w-full max-w-[1300px] flex-1 flex-col">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
