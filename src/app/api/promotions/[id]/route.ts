import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Promotion } from "@/app/dashboard/promotions/types";

interface PromotionWithDecimal extends Omit<Promotion, 'discount'> {
  discount: Decimal | null;
}

function serializePromotion(promotion: PromotionWithDecimal): Promotion {
  return {
    ...promotion,
    discount: promotion.discount ? Number(promotion.discount) : null,
  };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const promotion = await prisma.promotion.findUnique({
      where: { id: params.id },
    });

    if (!promotion) {
      return NextResponse.json({
        success: false,
        error: "Promoção não encontrada"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: serializePromotion(promotion)
    });
  } catch (error) {
    console.error("Error fetching promotion:", error);
    return NextResponse.json(
      { error: "Error fetching promotion" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const promotion = await prisma.promotion.update({
      where: { id: params.id },
      data: {
        ...data,
        discount: data.discount ? Number(data.discount) : null,
      },
    });

    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Error updating promotion:", error);
    return NextResponse.json(
      { error: "Error updating promotion" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.promotion.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting promotion:", error);
    return NextResponse.json(
      { error: "Error deleting promotion" },
      { status: 500 }
    );
  }
}
