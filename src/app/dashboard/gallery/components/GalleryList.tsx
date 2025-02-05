"use client";

import { GalleryImage } from "../types";
import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "@/components/ImageModal/ImageModal";
import Button from "@/components/Ui/Button";

interface GalleryListProps {
  images: GalleryImage[];
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: string) => Promise<void>;
}

export function GalleryList({
  images = [],
  onEdit,
  onDelete,
}: GalleryListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta imagem?")) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("Erro ao excluir imagem");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhuma imagem encontrada
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div
            className="relative aspect-[4/3] w-full mb-4 cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image.imageUrl}
              alt={image.title || ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-lg object-cover"
              priority={false}
              loading="lazy"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-900">{image.title}</h3>
          {image.description && (
            <p className="mt-1 text-sm text-gray-500">{image.description}</p>
          )}
          <div className="mt-2 space-y-1">
            {image.featured && (
              <span className="text-xs text-amber-500">⭐ Destaque</span>
            )}
          </div>
          <div className="mt-2">
            <span
              className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                image.active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {image.active ? "Ativa" : "Inativa"}
            </span>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={() => onEdit(image)} variant="secondary_card">
              Editar
            </Button>
            <Button
              onClick={() => handleDelete(image.id)}
              disabled={deletingId === image.id}
              className="disabled:opacity-50"
              variant="danger_card"
            >
              {deletingId === image.id ? "Excluindo..." : "Excluir"}
            </Button>
          </div>
        </div>
      ))}

      {selectedImageIndex !== null && (
        <ImageModal
          images={images}
          currentImageIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNext={() =>
            setSelectedImageIndex((prev) =>
              prev !== null && prev < images.length - 1 ? prev + 1 : prev
            )
          }
          onPrevious={() =>
            setSelectedImageIndex((prev) =>
              prev !== null && prev > 0 ? prev - 1 : prev
            )
          }
        />
      )}
    </div>
  );
}
