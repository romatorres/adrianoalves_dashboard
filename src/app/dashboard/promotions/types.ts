export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  startDate: Date;
  endDate: Date;
  discount: number | null;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PromotionFormData = Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'>;

export interface PromotionResponse {
  success: boolean;
  data?: Promotion;
  error?: string;
}

export interface PromotionListResponse {
  success: boolean;
  data?: Promotion[];
  error?: string;
} 