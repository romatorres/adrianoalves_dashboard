import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname === "/login";
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");

    // Ignora rotas de API de autenticação
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    // Se estiver autenticado e tentar acessar login, redireciona para dashboard
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Se não estiver autenticado e tentar acessar rota protegida
    if (!token && !isAuthPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Deixamos o middleware controlar a autorização
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/api/auth/:path*"
  ],
};
