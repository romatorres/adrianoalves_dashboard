"use client";

import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";
import { Product, ProductFormData, Category } from "../types";
import { createProduct, deleteProduct, updateProduct } from "../actions";
import Link from "next/link";
import Button from "@/components/Ui/Button";

interface ProductManagerProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductManager({
  initialProducts,
  categories,
}: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      if (selectedProduct) {
        const updatedProduct = await updateProduct(selectedProduct.id, data);
        setProducts(
          products.map((p) =>
            p.id === selectedProduct.id ? updatedProduct : p
          )
        );
      } else {
        const newProduct = await createProduct(data);
        setProducts([...products, newProduct]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Erro ao salvar produto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-background">
          Gerenciar Produtos
        </h1>
        <div className="flex gap-4">
          <Link href="/dashboard/categories">
            <Button variant="secondary">Gerenciar Categorias</Button>
          </Link>
          <Button onClick={() => setShowForm(true)}>Adicionar Produto</Button>
        </div>
      </div>

      {showForm ? (
        <div id="product-form" className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedProduct ? "Editar Produto" : "Novo Produto"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-background hover:text-gray-01"
            >
              ✕
            </button>
          </div>
          <ProductForm
            product={selectedProduct || undefined}
            categories={categories}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      ) : null}

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
