"use client";

import { Promotion } from "../types";
import { useState } from "react";
import Image from "next/image";

interface PromotionListProps {
  promotions: Promotion[];
  onEdit: (promotion: Promotion) => void;
  onDelete: (id: string) => Promise<void>;
}

export function PromotionList({
  promotions = [],
  onEdit,
  onDelete,
}: PromotionListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta promoção?")) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } catch (error) {
        console.error("Error deleting promotion:", error);
        alert("Erro ao excluir promoção");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (!promotions || promotions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhuma promoção encontrada
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {promotions.map((promotion) => (
        <div
          key={promotion.id}
          className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          {promotion.imageUrl && (
            <div className="relative h-40 w-full mb-4">
              <Image
                src={promotion.imageUrl}
                alt={promotion.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <h3 className="text-lg font-medium text-gray-900">
            {promotion.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{promotion.description}</p>
          <div className="mt-2">
            <span className="text-sm font-medium text-amber-600">
              {promotion.discount
                ? `${promotion.discount}% OFF`
                : "Promoção Especial"}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <div>
              Início: {new Date(promotion.startDate).toLocaleDateString()}
            </div>
            <div>Fim: {new Date(promotion.endDate).toLocaleDateString()}</div>
          </div>
          <div className="mt-2">
            <span
              className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                promotion.active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {promotion.active ? "Ativa" : "Inativa"}
            </span>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(promotion)}
              className="text-amber-600 hover:text-amber-900"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(promotion.id)}
              disabled={deletingId === promotion.id}
              className="text-red-600 hover:text-red-900 disabled:opacity-50"
            >
              {deletingId === promotion.id ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
