import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productCategory?: {
    id: string;
    name: string;
  } | null;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products = [] }: ProductGridProps) {
  const categories = [
    ...new Set(
      (products || []).map((product) => product.productCategory?.name)
    ),
  ];

  if (!products || products.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">
            Nenhum produto disponível
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nossa Loja</h2>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((product) => product.productCategory?.name === category)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
