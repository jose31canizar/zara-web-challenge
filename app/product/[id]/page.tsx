import { SectionProductDetailClient } from "@/components/SectionProductDetailClient";
import { getProductById } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    return {
      title: `${product.brand} ${product.name}`,
    };
  } catch {
    return {
      title: "Product not found",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  let product = null;

  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return <SectionProductDetailClient product={product} />;
}
