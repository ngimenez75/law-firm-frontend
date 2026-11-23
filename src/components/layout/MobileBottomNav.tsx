"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, CalendarClock, PlusCircle } from "lucide-react";

interface MobileBottomNavProps {
  onOpenNewCase: () => void;
}

export function MobileBottomNav({ onOpenNewCase }: MobileBottomNavProps) {
  const pathname = usePathname();

  const isHomeActive = pathname === "/dashboard";
  const isCasosActive = pathname.startsWith("/dashboard/casos");
  const isPlazosActive = pathname.startsWith("/dashboard/plazos");

  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="lg:hidden fixed bottom-0 inset-x-0 bg-navy-950/95 backdrop-blur-md border-t border-navy-800 z-40 px-3 py-2 flex items-center justify-around safe-area-bottom shadow-2xl"
    >
      {/* 1. Inicio */}
      <Link
        href="/dashboard"
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] transition-colors ${
          isHomeActive
            ? "text-[#B5985E] font-medium"
            : "text-cream-200/70 hover:text-cream-100"
        }`}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Inicio</span>
      </Link>

      {/* 2. Causas (con badge 24) */}
      <Link
        href="/dashboard/casos"
        className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] transition-colors ${
          isCasosActive
            ? "text-[#B5985E] font-medium"
            : "text-cream-200/70 hover:text-cream-100"
        }`}
      >
        <div className="relative">
          <Briefcase className="w-4 h-4" />
          <span className="absolute -top-1.5 -right-3 px-1 py-0.2 text-[9px] font-bold rounded-full bg-navy-800 text-cream-100 border border-navy-700">
            24
          </span>
        </div>
        <span>Causas</span>
      </Link>

      {/* 3. Plazos (con alerta fatal dot rosa) */}
      <Link
        href="/dashboard/plazos"
        className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] transition-colors ${
          isPlazosActive
            ? "text-[#B5985E] font-medium"
            : "text-cream-200/70 hover:text-cream-100"
        }`}
      >
        <div className="relative">
          <CalendarClock className="w-4 h-4" />
          <span
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C85A5A] ring-2 ring-navy-950 animate-pulse"
            title="3 plazos fatales hoy"
          />
        </div>
        <span>Plazos</span>
      </Link>

      {/* 4. Botón Alta Causa (Acción directa para tribunales) */}
      <button
        type="button"
        onClick={onOpenNewCase}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] text-[#B5985E] hover:text-[#d3b578] transition-colors focus:outline-none"
      >
        <PlusCircle className="w-4 h-4 stroke-[2.2]" />
        <span className="font-medium">+ Causa</span>
      </button>
    </nav>
  );
}
