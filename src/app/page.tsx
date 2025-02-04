import { Gallery } from "@/components/Gallery/Gallery";
import { ProductGrid } from "@/components/Shop/ProductGrid";
import TeamGrid from "@/components/Team/TeamGrid";
import { PromotionGrid } from "@/components/Promotions/PromotionGrid";
import { Hero } from "@/components/Hero/Hero";
import { Header } from "@/components/Header/Header";
import {
  getGalleryImages,
  getProducts,
  getTeamMembers,
  getPromotions,
} from "@/lib/fetchers";
import { Product } from "@/components/Shop/types";
import { About } from "@/components/About/About";

export default async function Home() {
  const [images, products, members, promotions] = await Promise.all([
    getGalleryImages(),
    getProducts(),
    getTeamMembers(),
    getPromotions(),
  ]);

  const serializedProducts = (products || []).map((product: Product) => ({
    ...product,
    price: Number(product.price),
  }));

  return (
    <main>
      {/* <AdminButton /> */}
      <Header />
      <Hero />
      <PromotionGrid promotions={promotions} />
      <About />
      <Gallery images={images} />
      <ProductGrid products={serializedProducts} />
      <TeamGrid members={members} />
    </main>
  );
}
