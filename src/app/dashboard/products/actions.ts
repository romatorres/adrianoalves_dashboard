import { Product, ProductFormData } from "./types";

export class ProductError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductError';
  }
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  try {
    const response = await fetch(`/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new ProductError(result.error || 'Erro ao criar produto');
    }

    return result.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error instanceof ProductError ? error : new ProductError('Erro ao criar produto');
  }
}

export async function updateProduct(
  id: string,
  data: Partial<ProductFormData>
): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        price: data.price ? Number(data.price) : undefined,
        stock: data.stock ? Number(data.stock) : undefined,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new ProductError(result.error || 'Erro ao atualizar produto');
    }

    return result.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error instanceof ProductError ? error : new ProductError('Erro ao atualizar produto');
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new ProductError(result.error || 'Erro ao excluir produto');
    }
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw error instanceof ProductError ? error : new ProductError('Erro ao excluir produto');
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${id}`);
    
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new ProductError(result.error || 'Erro ao buscar produto');
    }

    return result.data;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    throw error instanceof ProductError ? error : new ProductError('Erro ao buscar produto');
  }
} 