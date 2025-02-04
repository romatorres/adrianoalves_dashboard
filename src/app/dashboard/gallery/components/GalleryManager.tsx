"use client";

import { useState } from "react";
import { GalleryForm } from "./GalleryForm";
import { GalleryList } from "./GalleryList";
import { GalleryImage, GalleryImageFormData } from "../types";
import {
  createGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
} from "../actions";

interface GalleryManagerProps {
  initialImages: GalleryImage[];
}

export function GalleryManager({ initialImages }: GalleryManagerProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: GalleryImageFormData) => {
    setIsLoading(true);
    try {
      if (selectedImage) {
        // Atualizar imagem existente
        const updatedImage = await updateGalleryImage(selectedImage.id, data);
        setImages(
          images.map((img) =>
            img.id === selectedImage.id ? updatedImage : img
          )
        );
      } else {
        // Criar nova imagem
        const newImage = await createGalleryImage(data);
        setImages([...images, newImage]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving gallery image:", error);
      alert("Erro ao salvar imagem");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryImage(id);
      setImages(images.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedImage(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Galeria</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
        >
          Adicionar Imagem
        </button>
      </div>

      {showForm ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedImage ? "Editar Imagem" : "Nova Imagem"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          <GalleryForm
            image={selectedImage || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      ) : null}

      <GalleryList
        images={images}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
