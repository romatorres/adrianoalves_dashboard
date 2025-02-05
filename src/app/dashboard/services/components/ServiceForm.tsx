"use client";

import { useState } from "react";
import { Service, ServiceFormData } from "../types";
import Input from "@/components/Ui/Input";
import Textarea from "@/components/Ui/Textarea";
import Button from "@/components/Ui/Button";

interface ServiceFormProps {
  service?: Service;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ServiceForm({
  service,
  onSubmit,
  isLoading,
}: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: service?.name || "",
    description: service?.description || "",
    price: service?.price || 0,
    duration: service?.duration || 30,
    imageUrl: service?.imageUrl || "",
    active: service?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      price: Number(formData.price),
      duration: Number(formData.duration),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-02"
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
          className="mt-1 block w-full rounded-md"
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
            htmlFor="duration"
            className="block text-sm font-medium text-gray-02"
          >
            Duração (minutos)
          </label>
          <Input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
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
          value={formData.imageUrl || ""}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
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
        <label
          htmlFor="active"
          className="ml-2 block text-sm font-medium text-gray-02"
        >
          Ativo
        </label>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center"
        >
          {isLoading ? "Salvando..." : service ? "Atualizar" : "Criar Serviço"}
        </Button>
      </div>
    </form>
  );
}
