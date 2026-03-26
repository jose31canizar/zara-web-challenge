import { CardProductGrid } from "@/components/CardProductGrid";
import { FormSearchInput } from "@/components/FormSearchInput";
import { getProducts } from "@/lib/api";

type HomePageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const { search } = await searchParams;
  const products = await getProducts({
    search,
    limit: 20,
  });

  return (
    <section className="pb-10">
      <div className="px-4 pt-8 sm:px-8">
        <FormSearchInput />
        <p className="py-4 text-sm uppercase text-neutral-600">{products.length} results</p>
      </div>
      <div className="grid grid-cols-2 border-t border-l border-neutral-300 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <CardProductGrid key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
