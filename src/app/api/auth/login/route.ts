import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log("Tentativa de login:", email); // Log para debug

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("Usuário encontrado:", user ? "sim" : "não"); // Log para debug

    if (!user || !user.active) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const passwordMatch = await compare(password, user.password);
    console.log("Senha correta:", passwordMatch ? "sim" : "não"); // Log para debug

    if (!passwordMatch) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    const token = sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Definindo o cookie com opções mais permissivas para desenvolvimento
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    });

    console.log("Login bem-sucedido"); // Log para debug
    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}
