import "server-only";

import { ProductDetail, ProductListItem } from "@/types/product";

const API_BASE_URL =
  process.env.MOBILE_API_BASE_URL ?? "https://prueba-tecnica-api-tienda-moviles.onrender.com";
const API_KEY = process.env.MOBILE_API_KEY ?? "87909682e6cd74208f41a6ef39fe4191";

type ProductsParams = {
  search?: string;
  limit?: number;
};

function dedupeProductsById(products: ProductListItem[]): ProductListItem[] {
  const uniqueProductsMap = new Map<string, ProductListItem>();
  for (const product of products) {
    if (!uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product);
    }
  }
  return Array.from(uniqueProductsMap.values());
}

async function fetchApi<T>(path: string, searchParams?: URLSearchParams): Promise<T> {
  const url = new URL(path, API_BASE_URL);
  if (searchParams) {
    url.search = searchParams.toString();
  }

  const response = await fetch(url.toString(), {
    headers: {
      "x-api-key": API_KEY,
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getProducts(params: ProductsParams): Promise<ProductListItem[]> {
  const searchParams = new URLSearchParams();
  if (params.search) {
    searchParams.set("search", params.search);
  }
  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  const products = await fetchApi<ProductListItem[]>("/products", searchParams);
  return dedupeProductsById(products);
}

export async function getProductById(id: string): Promise<ProductDetail> {
  return fetchApi<ProductDetail>(`/products/${id}`);
}
