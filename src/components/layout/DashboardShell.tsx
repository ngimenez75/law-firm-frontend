"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { QuickActionModals } from "@/components/layout/QuickActionModals";
import { MOCK_DEFAULT_USER } from "@/lib/mock-dashboard-data";
import type { AuthUser } from "@/types";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user: authContextUser } = useAuth();

  // Estados para drawer mobile y modales
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [isNewDeadlineOpen, setIsNewDeadlineOpen] = useState(false);

  // Fallback elegante a Dra. Sofía Giordano (ROLE_ADMIN) si el backend local está apagado
  const activeUser: AuthUser = authContextUser
    ? {
        id: authContextUser.id,
        email: authContextUser.email,
        fullName: authContextUser.fullName,
        role: authContextUser.role,
      }
    : MOCK_DEFAULT_USER;

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col lg:flex-row antialiased text-slate-800">
      {/* 1. Sidebar Fijo (Desktop) / Drawer (Mobile) */}
      <DashboardSidebar
        user={activeUser}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
      />

      {/* 2. Área Principal de Contenido */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        {/* Topbar Superior Fijo */}
        <DashboardTopbar
          onToggleMobileSidebar={() => setIsOpenMobile((prev) => !prev)}
          onOpenNewCase={() => setIsNewCaseOpen(true)}
          onOpenNewDeadline={() => setIsNewDeadlineOpen(true)}
        />

        {/* Contenido de la Página */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* 3. Barra de Navegación Inferior (Mobile < 1024px) */}
      <MobileBottomNav onOpenNewCase={() => setIsNewCaseOpen(true)} />

      {/* 4. Modales de Acciones Rápidas */}
      <QuickActionModals
        isNewCaseOpen={isNewCaseOpen}
        isNewDeadlineOpen={isNewDeadlineOpen}
        onCloseNewCase={() => setIsNewCaseOpen(false)}
        onCloseNewDeadline={() => setIsNewDeadlineOpen(false)}
      />
    </div>
  );
}
