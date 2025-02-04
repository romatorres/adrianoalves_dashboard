"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "../ImageModal/ImageModal";

interface GalleryImage {
  id: string;
  title: string | null;
  imageUrl: string;
  description: string | null;
}

interface GalleryProps {
  images: GalleryImage[];
  isVisible?: boolean;
}

export function Gallery({ images = [], isVisible = true }: GalleryProps) {
  if (!isVisible) return null;

  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <section id="galeria" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-20 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl font-primary font-normal text-black_secondary mb-3">
            Galeria
          </h2>
          <div className="relative w-[96px] h-[22px] md:w-[120px] md:h-[28px]">
            <Image
              src="/img/bigode.svg"
              alt="Bigode abaixo do titulo Serviços"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {!images || images.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma imagem disponível</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group overflow-hidden rounded-lg shadow-lg relative cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                {!loadedImages.has(image.id) && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                )}
                <div className="relative w-full h-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.title || ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
                      loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
                    }`}
                    priority={index < 3}
                    onLoad={() => handleImageLoad(image.id)}
                  />
                  {(image.title || image.description) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {image.title && (
                        <h3 className="font-semibold">{image.title}</h3>
                      )}
                      {image.description && (
                        <p className="text-sm mt-1">{image.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedImageIndex !== null && (
          <ImageModal
            images={images}
            currentImageIndex={selectedImageIndex}
            onClose={handleCloseModal}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
          />
        )}
      </div>
    </section>
  );
}
