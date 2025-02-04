"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";

interface ImageModalProps {
  images: Array<{
    id: string;
    imageUrl: string;
    title: string | null;
    description: string | null;
  }>;
  currentImageIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ImageModal({
  images,
  currentImageIndex,
  onClose,
  onNext,
  onPrevious,
}: ImageModalProps) {
  const currentImage = images[currentImageIndex];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [onNext, onPrevious, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [handleKeyDown]);

  if (!currentImage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          aria-label="Fechar"
        >
          <IoClose size={32} />
        </button>

        {/* Botão Anterior */}
        {currentImageIndex > 0 && (
          <button
            onClick={onPrevious}
            className="absolute left-4 text-white hover:text-gray-300 z-50"
            aria-label="Imagem anterior"
          >
            <IoArrowBack size={32} />
          </button>
        )}

        {/* Imagem */}
        <div className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4">
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.title || ""}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Botão Próximo */}
        {currentImageIndex < images.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 text-white hover:text-gray-300 z-50"
            aria-label="Próxima imagem"
          >
            <IoArrowForward size={32} />
          </button>
        )}

        {/* Legenda */}
        {(currentImage.title || currentImage.description) && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 p-4">
            {currentImage.title && (
              <h3 className="text-xl font-semibold mb-2">
                {currentImage.title}
              </h3>
            )}
            {currentImage.description && (
              <p className="text-sm">{currentImage.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
