import Image from "next/image";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    imageUrl: string | null;
  };
}

export function ServiceCard({ service }: ServiceCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(service.price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {service.imageUrl && (
        <div className="relative h-48">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-600">
            {formattedPrice}
          </span>
          <span className="text-sm text-gray-500">
            Duração: {service.duration}min
          </span>
        </div>
      </div>
    </div>
  );
}
