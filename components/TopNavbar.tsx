"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";

export function TopNavbar() {
  const { itemsCount } = useCart();

  return (
    <header className="w-full border-b border-neutral-300 bg-neutral-100">
      <nav className="mx-auto flex h-16 w-full max-w-[1300px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          MBST
        </Link>
        <Link
          href="/cart"
          className="flex items-center gap-2 text-sm font-medium"
          aria-label="Open cart"
        >
          <span className="text-base">Cart</span>
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-neutral-900 px-2 text-xs">
            {itemsCount}
          </span>
        </Link>
      </nav>
    </header>
  );
}
