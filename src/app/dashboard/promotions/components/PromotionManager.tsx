"use client";

import { useState } from "react";
import { PromotionForm } from "./PromotionForm";
import { PromotionList } from "./PromotionList";
import { Promotion, PromotionFormData } from "../types";
import { createPromotion, deletePromotion, updatePromotion } from "../actions";

interface PromotionManagerProps {
  initialPromotions: Promotion[];
}

export function PromotionManager({ initialPromotions }: PromotionManagerProps) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: PromotionFormData) => {
    setIsLoading(true);
    try {
      if (selectedPromotion) {
        // Atualizar promoção existente
        const updatedPromotion = await updatePromotion(
          selectedPromotion.id,
          data
        );
        setPromotions(
          promotions.map((p) =>
            p.id === selectedPromotion.id ? updatedPromotion : p
          )
        );
      } else {
        // Criar nova promoção
        const newPromotion = await createPromotion(data);
        setPromotions([...promotions, newPromotion]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving promotion:", error);
      alert("Erro ao salvar promoção");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePromotion(id);
      setPromotions(promotions.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting promotion:", error);
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedPromotion(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Gerenciar Promoções
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
        >
          Adicionar Promoção
        </button>
      </div>

      {showForm ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedPromotion ? "Editar Promoção" : "Nova Promoção"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          <PromotionForm
            promotion={selectedPromotion || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      ) : null}

      <PromotionList
        promotions={promotions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
