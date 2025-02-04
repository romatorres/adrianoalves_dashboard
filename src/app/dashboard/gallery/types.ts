export interface GalleryImage {
  id: string;
  title: string | null;
  imageUrl: string;
  description: string | null;
  featured?: boolean;
  active?: boolean;
}

export interface GalleryImageFormData {
  title?: string;
  imageUrl: string;
  description?: string;
}

export interface GalleryResponse {
  success: boolean;
  data?: GalleryImage;
  error?: string;
}

export interface GalleryListResponse {
  success: boolean;
  data?: GalleryImage[];
  error?: string;
}
