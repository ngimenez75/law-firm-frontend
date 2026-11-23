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
              <h1 className="font-serif text-lg sm:text-xl font-semibold text-navy-950 tracking-tight truncate">
                {title}
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 capitalize truncate hidden sm:block">
                {formattedDate} · <span className="text-slate-400">{subtitle}</span>
              </p>
            </div>
          </div>

          {/* Lado Central/Derecho: Buscador Global */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar expediente, SAC, cliente..."
                className="w-full pl-9 pr-14 py-2 bg-cream-100/80 border border-cream-300 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-cream-50 focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E] transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-cream-200/70 border border-cream-300 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Acciones Rápidas */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Botón Secundario: + Agendar Plazo */}
            <button
              type="button"
              onClick={onOpenNewDeadline}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-navy-900 bg-cream-200/80 hover:bg-cream-300/80 border border-cream-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#B5985E]/40"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-navy-800 shrink-0" />
              <span className="hidden sm:inline">Agendar Plazo</span>
              <span className="sm:hidden">Plazo</span>
            </button>

            {/* Botón Primario: + Nueva Causa */}
            <button
              type="button"
              onClick={onOpenNewCase}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-cream-50 bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-navy-900/50"
            >
              <Plus className="w-3.5 h-3.5 text-[#B5985E] shrink-0" />
              <span className="hidden sm:inline">Nueva Causa</span>
              <span className="sm:hidden">Causa</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
