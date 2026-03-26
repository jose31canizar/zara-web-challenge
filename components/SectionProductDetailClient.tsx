"use client";

import { useCart } from "@/components/CartProvider";
import { formatEuro } from "@/lib/format";
import { ProductDetail } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type SectionProductDetailClientProps = {
  product: ProductDetail;
};

export function SectionProductDetailClient({ product }: SectionProductDetailClientProps) {
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedStorageCapacity, setSelectedStorageCapacity] = useState("");
  const { addToCart } = useCart();

  const selectedColor = useMemo(
    () => product.colorOptions.find((color) => color.name === selectedColorName),
    [product.colorOptions, selectedColorName],
  );

  const selectedStorage = useMemo(
    () => product.storageOptions.find((storage) => storage.capacity === selectedStorageCapacity),
    [product.storageOptions, selectedStorageCapacity],
  );

  const currentImageUrl = selectedColor?.imageUrl ?? product.colorOptions[0]?.imageUrl;
  const selectedPrice = selectedStorage?.price ?? product.basePrice;
  const hasCompleteSelection = Boolean(selectedColor && selectedStorage);

  function handleAddToCart() {
    if (!selectedColor || !selectedStorage) return;
    addToCart({
      productId: product.id,
      brand: product.brand,
      name: product.name,
      imageUrl: selectedColor.imageUrl,
      colorName: selectedColor.name,
      storageCapacity: selectedStorage.capacity,
      price: selectedStorage.price,
    });
  }

  return (
    <section className="px-4 py-8 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex min-h-[360px] items-center justify-center border border-neutral-300 bg-white p-6">
          {currentImageUrl ? (
            <Image
              src={currentImageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="h-full w-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : null}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase text-neutral-500">{product.brand}</p>
            <h1 className="text-3xl uppercase">{product.name}</h1>
            <p className="mt-1 text-2xl">{formatEuro(selectedPrice)}</p>
          </div>

          <p className="text-sm leading-6 text-neutral-700">{product.description}</p>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Storage</p>
            <div className="flex flex-wrap gap-2">
              {product.storageOptions.map((storage) => {
                const isSelected = storage.capacity === selectedStorageCapacity;
                return (
                  <button
                    key={storage.capacity}
                    type="button"
                    onClick={() => setSelectedStorageCapacity(storage.capacity)}
                    className={`border px-4 py-2 text-sm ${isSelected
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-neutral-300 bg-white"
                      }`}
                  >
                    {storage.capacity}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Color</p>
            <div className="flex flex-wrap gap-3">
              {product.colorOptions.map((color) => {
                const isSelected = color.name === selectedColorName;
                return (
                  <button
                    key={color.name}
                    type="button"
                    aria-label={`Select color ${color.name}`}
                    onClick={() => setSelectedColorName(color.name)}
                    className={`h-10 w-10 rounded-full border-2 ${isSelected ? "border-neutral-950" : "border-neutral-300"
                      }`}
                    style={{ backgroundColor: color.hexCode }}
                  />
                );
              })}
            </div>
            <p className="text-sm text-neutral-600">{selectedColor?.name ?? "Select a color"}</p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!hasCompleteSelection}
            className="btn btn-neutral w-full rounded-none"
          >
            Add to cart
          </button>
        </div>
      </div>

      <div className="mt-10 border border-neutral-300 bg-white p-6">
        <h2 className="mb-4 text-lg uppercase">Specifications</h2>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase text-neutral-500">Screen</dt>
            <dd>{product.specs.screen}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Resolution</dt>
            <dd>{product.specs.resolution}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Processor</dt>
            <dd>{product.specs.processor}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Main camera</dt>
            <dd>{product.specs.mainCamera}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Selfie camera</dt>
            <dd>{product.specs.selfieCamera}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Battery</dt>
            <dd>{product.specs.battery}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Operating system</dt>
            <dd>{product.specs.os}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Refresh rate</dt>
            <dd>{product.specs.screenRefreshRate}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg uppercase">Similar products</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {product.similarProducts.map((similarProduct) => (
            <Link
              key={similarProduct.id}
              href={`/product/${similarProduct.id}`}
              className="border border-neutral-300 bg-white p-4 hover:bg-neutral-50"
            >
              <div className="flex h-36 items-center justify-center">
                <Image
                  src={similarProduct.imageUrl}
                  alt={similarProduct.name}
                  width={180}
                  height={180}
                  className="h-full w-auto object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-xs uppercase text-neutral-500">{similarProduct.brand}</p>
              <p className="uppercase">{similarProduct.name}</p>
              <p className="mt-1 text-sm">{formatEuro(similarProduct.basePrice)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
