"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X, Shield, ChevronRight } from "lucide-react";
import { getFilteredNavigation } from "@/config/navigation";
import { useAuth } from "@/context/AuthContext";
import { PastelBadge } from "@/components/ui/PastelBadge";
import type { AuthUser, UserRole } from "@/types";

interface DashboardSidebarProps {
  user: AuthUser;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

function formatRoleName(role: UserRole): string {
  switch (role) {
    case "ROLE_ADMIN":
      return "Socia Administradora";
    case "ROLE_LAWYER":
      return "Abogado Litigante";
    case "ROLE_PARALEGAL":
      return "Procurador / Paralegal";
    case "ROLE_CLIENT":
      return "Cliente";
    default:
      return "Miembro del Estudio";
  }
}

function getUserInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function DashboardSidebar({
  user,
  isOpenMobile,
  onCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigationSections = getFilteredNavigation(user.role);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push("/login");
    } catch {
      // Redirigir aun en caso de fallo de red
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-navy-900 text-cream-100 select-none">
      {/* 1. Cabecera Institucional */}
      <div className="p-6 border-b border-navy-800">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="group block focus:outline-none"
          >
            <span className="block text-[10px] tracking-[0.22em] uppercase font-semibold text-[#B5985E] mb-1">
              Estudio Jurídico
            </span>
            <h1 className="font-serif text-lg font-semibold tracking-wide text-cream-50 leading-tight group-hover:text-[#B5985E] transition-colors">
              Giordano · Lopez
              <br />
              <span className="text-cream-200 font-normal">García Lepez</span>
            </h1>
          </Link>

          {/* Botón de cierre en Drawer móvil */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-2 -mr-2 text-cream-200/70 hover:text-cream-50 hover:bg-navy-800 rounded-lg transition-colors focus:outline-none"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-cream-200/60 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          <span>Córdoba · Tribunales I y II</span>
        </div>
      </div>

      {/* 2. Menú de Navegación por Secciones (RBAC) */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scrollbar-thin">
        {navigationSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-cream-200/50 mb-2">
              {section.title}
            </h3>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.id}
                    href={item.disabled ? "#" : item.href}
                    onClick={() => {
                      if (!item.disabled) onCloseMobile();
                    }}
                    className={`group relative flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                      item.disabled
                        ? "opacity-50 cursor-not-allowed text-cream-200/40"
                        : isActive
                        ? "bg-navy-800 text-cream-50 font-medium shadow-xs border-l-2 border-[#B5985E]"
                        : "text-cream-200/80 hover:text-cream-50 hover:bg-navy-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? "text-[#B5985E]"
                            : "text-cream-200/60 group-hover:text-cream-100"
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {item.badge && (
                        <PastelBadge
                          variant={item.badgeVariant || "mist"}
                          size="sm"
                          showDot={item.badgeVariant === "rose"}
                        >
                          {item.badge}
                        </PastelBadge>
                      )}
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-[#B5985E]/70 lg:hidden" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Pie del Sidebar: Usuario Autenticado & Cierre de Sesión */}
      <div className="p-4 border-t border-navy-800 bg-navy-950/40">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-navy-800/50 border border-navy-800 mb-3">
          <div className="w-9 h-9 rounded-full bg-navy-800 border border-[#B5985E]/40 flex items-center justify-center text-[#B5985E] font-semibold text-xs shrink-0">
            {getUserInitials(user.fullName || `${user.firstName || ""} ${user.lastName || ""}`)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-cream-50 truncate">
              {user.fullName || `${user.firstName || ""} ${user.lastName || ""}`}
            </p>
            <p className="text-[11px] text-cream-200/60 truncate">
              {formatRoleName(user.role)}
            </p>
          </div>
          {user.role === "ROLE_ADMIN" && (
            <span title="Administrador">
              <Shield className="w-3.5 h-3.5 text-[#B5985E] shrink-0" />
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-cream-200/70 hover:text-cream-50 hover:bg-navy-800/80 rounded-lg transition-colors border border-navy-800 disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Versión Desktop: Barra lateral fija */}
      <aside className="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:w-72 border-r border-navy-800 z-40 shrink-0">
        {sidebarContent}
      </aside>

      {/* Versión Mobile: Drawer deslizante con Backdrop */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop con desenfoque suave */}
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Panel deslizante */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
