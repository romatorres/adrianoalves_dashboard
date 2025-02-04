"use client";

import { Product } from "../types";
import { useState } from "react";
import Image from "next/image";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => Promise<void>;
}

export function ProductList({
  products = [],
  onEdit,
  onDelete,
}: ProductListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Erro ao excluir produto");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum produto encontrado
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="relative h-48 w-full mb-4">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
          <div className="mt-2 space-y-1">
            <div className="text-sm font-medium text-amber-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </div>
            <div className="text-sm text-gray-500">
              Estoque: {product.stock} unidades
            </div>
            {product.productCategory && (
              <div className="text-sm text-gray-500">
                Categoria: {product.productCategory.name}
              </div>
            )}
          </div>
          <div className="mt-2">
            <span
              className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                product.active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.active ? "Ativo" : "Inativo"}
            </span>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="text-amber-600 hover:text-amber-900"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              disabled={deletingId === product.id}
              className="text-red-600 hover:text-red-900 disabled:opacity-50"
            >
              {deletingId === product.id ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
