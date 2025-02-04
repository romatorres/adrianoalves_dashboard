import { prisma } from "@/lib/prisma";

export default async function DashboardHome() {
  const [products, services, team, gallery, promotions] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.service.count({ where: { active: true } }),
    prisma.teamMember.count({ where: { active: true } }),
    prisma.galleryImage.count(),
    prisma.promotion.count({
      where: {
        active: true,
        endDate: {
          gte: new Date(),
        },
      },
    }),
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Produtos</h2>
          <p className="text-3xl font-bold text-amber-600 mt-2">{products}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Serviços</h2>
          <p className="text-3xl font-bold text-amber-600 mt-2">{services}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Equipe</h2>
          <p className="text-3xl font-bold text-amber-600 mt-2">{team}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">
            Fotos na Galeria
          </h2>
          <p className="text-3xl font-bold text-amber-600 mt-2">{gallery}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">
            Promoções Ativas
          </h2>
          <p className="text-3xl font-bold text-amber-600 mt-2">{promotions}</p>
        </div>
      </div>
    </div>
  );
}
