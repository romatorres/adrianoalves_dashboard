"use client";

import { Service } from "../types";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Ui/Button";

interface ServiceListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => Promise<void>;
}

export function ServiceList({
  services = [],
  onEdit,
  onDelete,
}: ServiceListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Erro ao excluir serviço");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (!services || services.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum serviço encontrado
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <div
          key={service.id}
          className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          {service.imageUrl && (
            <div className="relative h-40 w-full mb-4">
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <h3 className="text-lg font-medium text-background">
            {service.name}
          </h3>
          <p className="mt-1 text-sm text-gray-02">{service.description}</p>
          <div className="mt-2 space-y-1">
            <div className="text-lg font-medium text-price">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(service.price)}
            </div>
            <div className="text-sm text-gray-02">
              Duração: {service.duration} minutos
            </div>
          </div>
          <div className="mt-2">
            <span
              className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                service.active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {service.active ? "Ativo" : "Inativo"}
            </span>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={() => onEdit(service)} variant="secondary_card">
              Editar
            </Button>
            <Button
              onClick={() => handleDelete(service.id)}
              disabled={deletingId === service.id}
              className="disabled:opacity-50"
              variant="danger_card"
            >
              {deletingId === service.id ? "Excluindo..." : "Excluir"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
