import { GalleryImage, GalleryImageFormData } from "./types";

export class GalleryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GalleryError';
  }
}

export async function createGalleryImage(data: GalleryImageFormData): Promise<GalleryImage> {
  try {
    const response = await fetch(`/api/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new GalleryError(result.error || 'Failed to create gallery image');
    }

    return result;
  } catch (error) {
    console.error('Error creating gallery image:', error);
    throw error instanceof GalleryError ? error : new GalleryError('Failed to create gallery image');
  }
}

export async function updateGalleryImage(
  id: string,
  data: Partial<GalleryImageFormData>
): Promise<GalleryImage> {
  try {
     const response = await fetch(`/api/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        active: Boolean(data.active),
      }),
    });

    
    // Verificar se há conteúdo na resposta
    const text = await response.text();


    // Tentar parsear o JSON apenas se houver conteúdo
    const result = text ? JSON.parse(text) : null;

    if (!response.ok || !result?.success) {
      throw new GalleryError(result?.error || 'Erro ao atualizar imagem');
    }

    return result.data;
  } catch (error) {
    console.error('Erro ao atualizar imagem:', error);
    throw error instanceof GalleryError 
      ? error 
      : new GalleryError('Erro ao atualizar imagem');
  }
}

export async function deleteGalleryImage(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new GalleryError(result.error || 'Failed to delete gallery image');
    }
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error instanceof GalleryError ? error : new GalleryError('Failed to delete gallery image');
  }
}

export async function getGalleryImage(id: string): Promise<GalleryImage> {
  try {
    const response = await fetch(`/api/gallery/${id}`);
    
    const result = await response.json();

    if (!response.ok) {
      throw new GalleryError(result.error || 'Failed to fetch gallery image');
    }

    return result;
  } catch (error) {
    console.error('Error fetching gallery image:', error);
    throw error instanceof GalleryError ? error : new GalleryError('Failed to fetch gallery image');
  }
} 