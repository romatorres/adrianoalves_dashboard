"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 text-red-600 hover:text-red-700"
    >
      Sair
    </button>
  );
}
