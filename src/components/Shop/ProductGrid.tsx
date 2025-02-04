import Image from "next/image";
import { ProductCard } from "./ProductCard";

// Tipos movidos para um arquivo separado
interface ProductCategory {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productCategory?: ProductCategory | null;
}

interface ProductGridProps {
  products: Product[];
  isVisible?: boolean;
}

export function ProductGrid({
  products = [],
  isVisible = true,
}: ProductGridProps) {
  if (!isVisible) return null;

  return !products || products.length === 0 ? (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-500">
          Nenhum produto disponível
        </div>
      </div>
    </section>
  ) : (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-20 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl font-primary font-normal text-background mb-3">
            Shops
          </h2>
          <div className="relative w-[96px] h-[22px] md:w-[120px] md:h-[28px]">
            <Image
              src="/img/bigode.svg"
              alt="Bigode abaixo do titulo Loja"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
