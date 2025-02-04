import { prisma } from "@/lib/prisma";
import { UserManager } from "./components/UserManager";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Cast do resultado para o tipo User[]
  const initialUsers = users.map((user) => ({
    ...user,
    role: user.role.toUpperCase() as "ADMIN" | "USER",
  }));

  return <UserManager initialUsers={initialUsers} />;
}
