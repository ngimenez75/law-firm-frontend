import React from "react";
import type { Metadata } from "next";
import { KpiCardsGrid } from "@/components/dashboard/KpiCardsGrid";
import { UrgentDeadlinesList } from "@/components/dashboard/UrgentDeadlinesList";
import { FueroDistributionCard } from "@/components/dashboard/FueroDistributionCard";
import { RecentCasesTable } from "@/components/dashboard/RecentCasesTable";

export const metadata: Metadata = {
  title: "Panel General | Giordano · Lopez · García Lepez",
  description:
    "Visión integral del estudio jurídico: plazos fatales, causas en trámite y distribución de cartera.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Grilla de 4 KPIs Accionables en Tonos Pastel */}
      <KpiCardsGrid />

      {/* 2. Grilla Asimétrica: 2/3 Agenda Prioritaria y 1/3 Cartera por Fuero */}
      <section
        aria-label="Agenda de vencimientos y cartera por fuero"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
      >
        {/* 2/3 (col-span-2 en lg): Agenda Prioritaria de Vencimientos y Audiencias */}
        <div className="lg:col-span-2">
          <UrgentDeadlinesList />
        </div>

        {/* 1/3 (col-span-1 en lg): Cartera Activa por Fuero con barras CSS */}
        <div className="lg:col-span-1">
          <FueroDistributionCard />
        </div>
      </section>

      {/* 3. Tabla de Causas con Actividad Reciente */}
      <RecentCasesTable />
    </div>
  );
}
