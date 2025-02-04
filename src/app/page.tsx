import { ServiceCard } from "@/components/Services/ServiceCard";
import { ProductGrid } from "@/components/Shop/ProductGrid";
import TeamGrid from "@/components/Team/TeamGrid";
import { PromotionGrid } from "@/components/Promotions/PromotionGrid";
import { Hero } from "@/components/Hero/Hero";
import { Header } from "@/components/Header/Header";
import { Gallery } from "@/components/Gallery/Gallery";
import {
  getGalleryImages,
  getProducts,
  getTeamMembers,
  getPromotions,
  getServices,
} from "@/lib/fetchers";
import { Product } from "@/components/Shop/types";
import { About } from "@/components/About/About";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const sections = await prisma.sectionVisibility.findMany();
  const sectionsMap = sections.reduce((acc, section) => {
    acc[section.name] = section.active;
    return acc;
  }, {} as Record<string, boolean>);

  const [images, products, members, promotions, services] = await Promise.all([
    getGalleryImages(),
    getProducts(),
    getTeamMembers(),
    getPromotions(),
    getServices(),
  ]);

  const serializedProducts = (products || []).map((product: Product) => ({
    ...product,
    price: Number(product.price),
  }));

  const serializedServices = (services || []).map((service) => ({
    ...service,
    price: Number(service.price),
  }));

  return (
    <main>
      {/* <AdminButton /> */}
      <Header />
      <Hero />
      <PromotionGrid
        promotions={promotions}
        isVisible={sectionsMap.promotions}
      />
      <About />
      <ProductGrid
        products={serializedProducts}
        isVisible={sectionsMap.products}
      />
      <ServiceCard
        services={serializedServices}
        isVisible={sectionsMap.services}
      />
      <Gallery images={images} isVisible={sectionsMap.gallery} />
      <TeamGrid members={members} isVisible={sectionsMap.team} />
    </main>
  );
}
