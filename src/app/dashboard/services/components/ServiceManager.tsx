"use client";

import { useState } from "react";
import { ServiceForm } from "./ServiceForm";
import { ServiceList } from "./ServiceList";
import { Service, ServiceFormData } from "../types";
import { createService, deleteService, updateService } from "../actions";

interface ServiceManagerProps {
  initialServices: Service[];
}

export function ServiceManager({ initialServices }: ServiceManagerProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    try {
      if (selectedService) {
        // Atualizar serviço existente
        const updatedService = await updateService(selectedService.id, data);
        setServices(
          services.map((s) =>
            s.id === selectedService.id ? updatedService : s
          )
        );
      } else {
        // Criar novo serviço
        const newService = await createService(data);
        setServices([...services, newService]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Erro ao salvar serviço");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      setServices(services.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedService(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Serviços</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
        >
          Adicionar Serviço
        </button>
      </div>

      {showForm ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedService ? "Editar Serviço" : "Novo Serviço"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          <ServiceForm
            service={selectedService || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      ) : null}

      <ServiceList
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
