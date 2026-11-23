"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Plus, CalendarPlus } from "lucide-react";

interface DashboardTopbarProps {
  onToggleMobileSidebar: () => void;
  onOpenNewCase: () => void;
  onOpenNewDeadline: () => void;
}

function getPageTitle(pathname: string): { title: string; subtitle: string } {
  if (pathname === "/dashboard") {
    return {
      title: "Panel General",
      subtitle: "Visión integral de actividad procesal y vencimientos",
    };
  }
  if (pathname.startsWith("/dashboard/casos")) {
    return {
      title: "Expedientes y Causas",
      subtitle: "Registro unificado de litigios y trámites judiciales",
    };
  }
  if (pathname.startsWith("/dashboard/plazos")) {
    return {
      title: "Agenda y Plazos",
      subtitle: "Vencimientos perentorios, traslados y audiencias",
    };
  }
  if (pathname.startsWith("/dashboard/siniestros")) {
    return {
      title: "Siniestros & Acuerdos",
      subtitle: "Negociaciones extrajudiciales y reclamos ante compañías",
    };
  }
  if (pathname.startsWith("/dashboard/clientes")) {
    return {
      title: "Directorio de Clientes",
      subtitle: "Padrón de representados, empresas y particulares",
    };
  }
  if (pathname.startsWith("/dashboard/equipo")) {
    return {
      title: "Equipo y Roles",
      subtitle: "Administración de usuarios, letrados y permisos",
    };
  }
  return {
    title: "Sistema de Gestión",
    subtitle: "Estudio Jurídico Giordano · Lopez · García Lepez",
  };
}

function getFormattedDate(): string {
  try {
    const today = new Date();
    return new Intl.DateTimeFormat("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);
  } catch {
    return "15 de Noviembre de 2026";
  }
}

export function DashboardTopbar({
  onToggleMobileSidebar,
  onOpenNewCase,
  onOpenNewDeadline,
}: DashboardTopbarProps) {
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { title, subtitle } = getPageTitle(pathname);
  const formattedDate = getFormattedDate();

  // Atajo de teclado Cmd+K o Ctrl+K para enfocar el buscador
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-cream-50/90 backdrop-blur-md border-b border-cream-200">
      <div className="px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Lado Izquierdo: Botón Hamburguesa en Mobile + Título de Vista */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 -ml-2 text-slate-700 hover:text-navy-900 hover:bg-cream-200/60 rounded-lg transition-colors focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-navy-900 tracking-tight truncate">
                {title}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 capitalize truncate hidden sm:block">
                {formattedDate} · <span className="text-slate-400">{subtitle}</span>
              </p>
            </div>
          </div>

          {/* Lado Central/Derecho: Buscador Global */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar expediente, SAC, cliente..."
                className="w-full bg-cream-100 border border-cream-200 rounded-xl pl-9 pr-12 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy-800 transition"
              />
              <span className="absolute right-2.5 top-1.5 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-cream-200">
                ⌘K
              </span>
            </div>
          </div>

          {/* Lado Derecho: Acciones Rápidas */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Botón Secundario: + Agendar Plazo */}
            <button
              type="button"
              onClick={onOpenNewDeadline}
              className="bg-cream-100 hover:bg-cream-200 text-navy-900 border border-cream-300 text-xs font-semibold px-3.5 py-2 rounded-xl transition"
            >
              <span className="hidden sm:inline">+ Agendar Plazo</span>
              <span className="sm:hidden">+ Plazo</span>
            </button>

            {/* Botón Primario: + Nueva Causa */}
            <button
              type="button"
              onClick={onOpenNewCase}
              className="bg-navy-900 hover:bg-navy-800 text-cream-50 text-xs font-semibold px-3.5 py-2 rounded-xl transition shadow-xs"
            >
              <span className="hidden sm:inline">+ Nueva Causa</span>
              <span className="sm:hidden">+ Causa</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
