import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PromotionCardProps {
  promotion: {
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    startDate: Date;
    endDate: Date;
    discount: number | null;
  };
}

export function PromotionCard({ promotion }: PromotionCardProps) {
  const isActive = new Date() <= new Date(promotion.endDate);
  const timeLeft = isActive
    ? formatDistanceToNow(new Date(promotion.endDate), {
        locale: ptBR,
        addSuffix: true,
      })
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {promotion.imageUrl && (
        <div className="relative h-48">
          <Image
            src={promotion.imageUrl}
            alt={promotion.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{promotion.title}</h3>
        <p className="text-gray-600 mb-4">{promotion.description}</p>
        {promotion.discount && (
          <p className="text-2xl font-bold text-green-600 mb-2">
            {promotion.discount}% OFF
          </p>
        )}
        {isActive && timeLeft && (
          <p className="text-sm text-gray-500">Termina {timeLeft}</p>
        )}
      </div>
    </div>
  );
}
