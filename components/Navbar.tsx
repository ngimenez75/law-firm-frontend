"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Quiénes Somos", href: "/#quienes-somos" },
  { label: "Áreas de Práctica", href: "/#areas" },
  { label: "Novedades", href: "/#newsletter" },
  { label: "Contacto", href: "/#contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs"
          : "bg-[#fbf7ee]/90 backdrop-blur-sm border-b border-stone-200/60"
      }`}
    >
      {/* Contenedor a ancho completo (w-full) para que el logo quede pegado a la izquierda */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[4rem] sm:min-h-[5rem] lg:min-h-[6rem] py-2">
          {/* Logo Horizontal Oficial (Versión 1) */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-lg py-1"
          >
            <Image
              src="/images/logo-header.png"
              alt="Giordano · Lopez · García Lepez - Estudio Jurídico"
              width={600}
              height={150}
              priority
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.01]"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/reclamo"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-slate-900 text-stone-50 hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span>Iniciar Reclamo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-stone-100 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-stone-100">
            <Link
              href="/reclamo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-medium rounded-lg bg-slate-900 text-stone-50 hover:bg-slate-800 transition-colors"
            >
              <span>Iniciar Reclamo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
