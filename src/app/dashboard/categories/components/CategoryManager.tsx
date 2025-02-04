"use client";

import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { CategoryList } from "./CategoryList";
import { Category, CategoryFormData } from "../types";
import { createCategory, deleteCategory, updateCategory } from "../actions";

interface CategoryManagerProps {
  initialCategories: Category[];
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      if (selectedCategory) {
        const updatedCategory = await updateCategory(selectedCategory.id, data);
        setCategories(
          categories.map((c) =>
            c.id === selectedCategory.id ? updatedCategory : c
          )
        );
      } else {
        const newCategory = await createCategory(data);
        setCategories([...categories, newCategory]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Erro ao salvar categoria");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedCategory(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Gerenciar Categorias
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
        >
          Adicionar Categoria
        </button>
      </div>

      {showForm ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedCategory ? "Editar Categoria" : "Nova Categoria"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          <CategoryForm
            category={selectedCategory || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      ) : null}

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
