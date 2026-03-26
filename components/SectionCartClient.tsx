"use client";

import { ButtonContinueShopping } from "@/components/ButtonContinueShopping";
import { getCartItemKey, useCart } from "@/components/CartProvider";
import { formatEuro } from "@/lib/format";
import Image from "next/image";

export function SectionCartClient() {
  const { items, removeFromCart, totalPrice } = useCart();

  if (!items.length) {
    return (
      <section className="px-4 py-10 sm:px-8">
        <h1 className="text-2xl uppercase">Cart</h1>
        <p className="mt-4 text-neutral-600">Your cart is empty.</p>
        <ButtonContinueShopping className="mt-6" />
      </section>
    );
  }

  return (
    <section className="px-4 py-8 sm:px-8">
      <h1 className="mb-6 text-2xl uppercase">Cart</h1>
      <div className="space-y-3">
        {items.map((item) => {
          const itemKey = getCartItemKey(item);
          return (
            <article
              key={itemKey}
              className="grid gap-4 border border-neutral-300 bg-white p-4 sm:grid-cols-[120px_1fr_auto]"
            >
              <div className="flex items-center justify-center">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-auto w-auto object-contain"
                />
              </div>
              <div>
                <p className="text-xs uppercase text-neutral-500">{item.brand}</p>
                <h2 className="text-base uppercase">{item.name}</h2>
                <p className="mt-1 text-sm text-neutral-700">{item.storageCapacity}</p>
                <p className="text-sm text-neutral-700">{item.colorName}</p>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <p>{formatEuro(item.price)}</p>
                <button
                  type="button"
                  onClick={() => removeFromCart(itemKey)}
                  className="text-sm underline"
                >
                  Remove
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-neutral-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg uppercase">Total: {formatEuro(totalPrice)}</p>
        <ButtonContinueShopping className="mt-6 sm:mt-0" />
      </div>
    </section>
  );
}
