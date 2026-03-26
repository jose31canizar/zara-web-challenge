"use client";

import { CartItem } from "@/types/product";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type CartContextValue = {
  items: CartItem[];
  itemsCount: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemKey: string) => void;
};

const STORAGE_KEY = "smartphones-cart";

const CartContext = createContext<CartContextValue | null>(null);

function buildItemKey(item: CartItem): string {
  return `${item.productId}-${item.colorName}-${item.storageCapacity}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as CartItem[];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    return {
      items,
      itemsCount: items.length,
      totalPrice,
      addToCart: (item) => {
        setItems((currentItems) => [...currentItems, item]);
      },
      removeFromCart: (itemKey) => {
        setItems((currentItems) =>
          currentItems.filter((item) => buildItemKey(item) !== itemKey),
        );
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function getCartItemKey(item: CartItem): string {
  return buildItemKey(item);
}
