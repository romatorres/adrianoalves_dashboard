import { Promotion, PromotionFormData } from "./types";

export async function createPromotion(data: PromotionFormData) {
  try {
    const response = await fetch(`/api/promotions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create promotion');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating promotion:', error);
    throw error;
  }
}

export async function updatePromotion(id: string, data: Partial<PromotionFormData>) {
  try {
    const response = await fetch(`/api/promotions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update promotion');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating promotion:', error);
    throw error;
  }
}

export async function deletePromotion(id: string) {
  try {
    const response = await fetch(`/api/promotions/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete promotion');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting promotion:', error);
    throw error;
  }
}

export async function getPromotion(id: string) {
  try {
    const response = await fetch(`/api/promotions/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch promotion');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching promotion:', error);
    throw error;
  }
} 