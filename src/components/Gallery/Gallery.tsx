"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";

interface GalleryImage {
  id: string;
  title: string | null;
  imageUrl: string;
  description: string | null;
}

interface GalleryProps {
  images: GalleryImage[];
}

export function Gallery({ images = [] }: GalleryProps) {
  if (!images || images.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nossa Galeria</h2>
          <p className="text-center text-gray-500">Nenhuma imagem disponível</p>
        </div>
      </section>
    );
  }

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nossa Galeria</h2>
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="mb-4 group overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative">
                <Image
                  src={image.imageUrl}
                  alt={image.title || ""}
                  width={800}
                  height={600}
                  className="w-full transition-transform duration-300 group-hover:scale-110"
                  priority={index === 0}
                  style={{ display: "block" }}
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
        </Masonry>
      </div>
    </section>
  );
}
