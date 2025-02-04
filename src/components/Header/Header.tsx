"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AdminButton } from "../Admin/AdminButton";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Controla o background no scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lista de links do menu
  const menuItems = [
    { href: "#home", label: "HOME" },
    { href: "#services", label: "SERVIÇOS" },
    { href: "#about", label: "SOBRE" },
    { href: "#gallery", label: "GALERIA" },
    { href: "#contact", label: "CONTATO" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-28 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-64 h-16">
          <Image
            src="/img/logo.png"
            alt="Logo Barbearia"
            fill
            className="object-contain"
          />
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-secondary hover:text-primary font-secondary font-semibold transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <AdminButton />
        </nav>

        {/* Botão Menu Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Menu Mobile */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 w-[80%] transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Background com blur */}
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm -z-10" />

          {/* Conteúdo do menu sem blur */}
          <nav className="relative flex flex-col items-center pt-28 space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-primary transition-colors text-lg font-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Overlay para fechar o menu ao clicar fora */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
