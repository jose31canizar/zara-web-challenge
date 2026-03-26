"use client";

import { formatEuro } from "@/lib/format";
import { ProductListItem } from "@/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function CardProductGrid({ product }: { product: ProductListItem }) {
  return (
    <motion.div initial="rest" whileHover="hover">
      <Link
        href={`/product/${product.id}`}
        className="mobile-grid-card group relative block overflow-hidden bg-neutral-100 p-5 transition-colors hover:bg-white"
      >
        <motion.div
          aria-hidden
          variants={{
            rest: { y: "100%" },
            hover: { y: 0 },
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-neutral-950"
        />

        <div className="relative z-10 flex h-48 items-center justify-center sm:h-56">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={240}
            height={240}
            className="h-full w-auto object-contain"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />
        </div>
        <div className="relative z-10 mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-neutral-500 transition-colors group-hover:text-white/80">
              {product.brand}
            </p>
            <h2 className="text-base uppercase transition-colors group-hover:text-white">
              {product.name}
            </h2>
          </div>
          <p className="text-sm transition-colors group-hover:text-white">
            {formatEuro(product.basePrice)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
