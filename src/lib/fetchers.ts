import { prisma } from "@/lib/prisma";
import { Product } from "@/components/Shop/types";
import { Decimal } from "@prisma/client/runtime/library";

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: {
      productCategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return products.map(product => ({
    ...product,
    price: Number(product.price)
  }));
}

export async function getGalleryImages() {
  const images = await prisma.galleryImage.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  });

  return images.map(image => ({
    id: image.id,
    title: image.title || null,
    imageUrl: image.imageUrl,
    description: image.description || null
  }));
}

export async function getTeamMembers() {
  const members = await prisma.teamMember.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
  });
  return members;
}

export async function getPromotions() {
  const promotions = await prisma.promotion.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  });

  return promotions.map(promotion => ({
    ...promotion,
    discount: Number(promotion.discount)
  }));
} 