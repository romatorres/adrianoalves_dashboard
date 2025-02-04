import { useState } from "react";

interface SchedulingFormProps {
  barbers: {
    id: string;
    name: string;
    available: boolean;
  }[];
  services: {
    id: string;
    name: string;
    duration: number;
    price: number;
  }[];
}

export function SchedulingForm({ barbers, services }: SchedulingFormProps) {
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar agendamento
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold text-gray-800">Agende seu horário</h2>

      <div>
        <label className="block text-gray-700">Selecione o Barbeiro</label>
        <select
          value={selectedBarber}
          onChange={(e) => setSelectedBarber(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option value="">Selecione...</option>
          {barbers.map((barber) => (
            <option key={barber.id} value={barber.id}>
              {barber.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700">Selecione o Serviço</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option value="">Selecione...</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - R$ {service.price}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700"
      >
        Agendar
      </button>
    </form>
  );
}
