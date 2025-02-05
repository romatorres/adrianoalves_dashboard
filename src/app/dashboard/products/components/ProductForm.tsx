"use client";

import { useState } from "react";
import { Product, ProductFormData } from "../types";
import { Category } from "../../categories/types";
import Input from "@/components/Ui/Input";
import Textarea from "@/components/Ui/Textarea";
import Button from "@/components/Ui/Button";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSubmit: (data: ProductFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ProductForm({
  product,
  categories,
  onSubmit,
  isLoading,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    imageUrl: product?.imageUrl || "",
    stock: product?.stock || 0,
    categoryId: product?.categoryId || null,
    active: product?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-01"
        >
          Nome
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-02"
        >
          Descrição
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
          className="mt-1 block w-full"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-02"
          >
            Preço (R$)
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-02"
          >
            Estoque
          </label>
          <Input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-02"
        >
          URL da Imagem
        </label>
        <Input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-02"
        >
          Categoria
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId || ""}
          onChange={handleChange}
          className="mt-1 block px-3 py-2 w-full rounded-md bg-gray-04 text-background border-gray-300 focus:border-gray-03 focus:ring-gray-02"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="active"
          name="active"
          checked={formData.active}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
        />
        <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
          Ativo
        </label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : product ? "Atualizar" : "Criar Produto"}
        </Button>
      </div>
    </form>
  );
}
