"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductModal } from "@/components/Products/ProductModal";
import { CategoryModal } from "@/components/Products/CategoryModal";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: string;
  productCategory: {
    id: string;
    name: string;
  };
  category?: string;
  active: boolean;
}

interface ProductsClientProps {
  initialProducts: Product[];
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState(initialProducts);

  // Função para atualizar a lista de produtos
  async function refreshProducts() {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Erro ao atualizar lista:", error);
    }
  }

  // Função para fechar o modal de produto
  function handleCloseProductModal() {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
    refreshProducts();
  }

  // Função para fechar o modal de categoria
  function handleCloseCategoryModal() {
    setIsCategoryModalOpen(false);
    refreshProducts();
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await refreshProducts();
        } else {
          alert("Erro ao excluir produto");
        }
      } catch {
        alert("Erro ao excluir produto");
      }
    }
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  }

  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsProductModalOpen(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
          >
            Novo Produto
          </button>
          <Link
            href="/dashboard/categories"
            className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700"
          >
            Categorias
          </Link>
        </div>
      </div>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
        product={selectedProduct || undefined}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-amber-600">
                  {formattedPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500">
                  Estoque: {product.stock}
                </span>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-amber-600 hover:text-amber-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
