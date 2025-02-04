import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@example.com",
      password,
      role: "admin",
      active: true,
    },
  });

  console.log({ admin });

  // Criar categorias de produtos
  await prisma.productCategory.createMany({
    data: [
      {
        name: "Cuidados Capilares",
        description: "Produtos para cuidados com os cabelos"
      },
      {
        name: "Barba",
        description: "Produtos para cuidados com a barba"
      }
    ]
  });

  // Criar produtos
  await prisma.product.createMany({
    data: [
      {
        name: "Shampoo Revitalizante",
        description: "Shampoo para cabelos danificados",
        price: 45.90,
        imageUrl: "/images/shampoo.jpg",
        stock: 10,
        categoryId: (await prisma.productCategory.findFirst({
          where: { name: "Cuidados Capilares" }
        }))?.id
      },
      {
        name: "Óleo para Barba",
        description: "Óleo hidratante para barba",
        price: 32.50,
        imageUrl: "/images/beard-oil.jpg",
        stock: 15,
        categoryId: (await prisma.productCategory.findFirst({
          where: { name: "Barba" }
        }))?.id
      }
    ]
  });

  // Criar imagens da galeria
  await prisma.galleryImage.createMany({
    data: [
      {
        title: "Corte Clássico",
        imageUrl: "/images/gallery1.jpg",
        description: "Corte de cabelo clássico"
      },
      {
        title: "Barba Estilo Vintage",
        imageUrl: "/images/gallery2.jpg",
        description: "Estilo de barba vintage"
      }
    ]
  });

  // Adicionar imagens à galeria
  await prisma.galleryImage.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Corte Moderno",
        description: "Tendências em cortes masculinos",
        imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
        active: true,
        featured: true,
      },
      {
        title: "Barba Estilizada",
        description: "Especialidade em barbas",
        imageUrl: "https://images.unsplash.com/photo-1521322714240-ee1d383eab62",
        active: true,
        featured: false,
      },
      // Adicione mais imagens conforme necessário
    ],
  });

  // Criar promoções
  await prisma.promotion.createMany({
    data: [
      {
        title: "Promoção de Verão",
        description: "Descontos especiais para o verão",
        imageUrl: "/images/summer-sale.jpg",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        discount: 0.2
      }
    ]
  });

  // Criar membros da equipe
  await prisma.teamMember.createMany({
    data: [
      {
        name: "João Silva",
        role: "Barbeiro",
        bio: "Especialista em cortes clássicos",
        imageUrl: "/images/joao.jpg"
      },
      {
        name: "Maria Souza",
        role: "Esteticista",
        bio: "Especialista em cuidados com a barba",
        imageUrl: "/images/maria.jpg"
      }
    ]
  });

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
