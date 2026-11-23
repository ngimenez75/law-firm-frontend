import React from "react";
import Link from "next/link";
import { AlertCircle, Clock, FolderGit2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { MOCK_KPIS } from "@/lib/mock-dashboard-data";
import { PastelBadge } from "@/components/ui/PastelBadge";
import type { BadgeVariant } from "@/types";

const KPI_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    borderTopColor: string;
    href: string;
  }
> = {
  kpi_fatales_hoy: {
    icon: AlertCircle,
    accentColor: "text-[#7F2929]",
    borderTopColor: "border-t-[#C85A5A]",
    href: "/dashboard/plazos",
  },
  kpi_vencimientos_semana: {
    icon: Clock,
    accentColor: "text-[#78521A]",
    borderTopColor: "border-t-[#D49B4B]",
    href: "/dashboard/plazos",
  },
  kpi_causas_tramite: {
    icon: FolderGit2,
    accentColor: "text-[#274868]",
    borderTopColor: "border-t-[#527CA6]",
    href: "/dashboard/casos",
  },
  kpi_concluidos_semestre: {
    icon: CheckCircle2,
    accentColor: "text-[#265438]",
    borderTopColor: "border-t-[#53946B]",
    href: "/dashboard/casos",
  },
};

export function KpiCardsGrid() {
  return (
    <section aria-labelledby="kpis-title">
      <h2 id="kpis-title" className="sr-only">
        Métricas clave de gestión jurídica
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {MOCK_KPIS.map((kpi) => {
          const config = KPI_CONFIG[kpi.id] || {
            icon: Clock,
            accentColor: "text-slate-800",
            borderTopColor: "border-t-[#B5985E]",
            href: "/dashboard",
          };
          const Icon = config.icon;

          return (
            <Link
              key={kpi.id}
              href={config.href}
              className={`group relative bg-cream-50 rounded-xl p-5 border border-cream-300/80 border-t-3 ${config.borderTopColor} shadow-xs hover:shadow-md hover:border-cream-300 transition-all duration-150 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {kpi.title}
                  </span>
                  <div className="flex items-center gap-1">
                    <PastelBadge
                      variant={kpi.variant}
                      size="sm"
                      showDot={kpi.variant === "rose"}
                    >
                      {kpi.variant === "rose" ? "Urgente" : "Activo"}
                    </PastelBadge>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <span
                    className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight text-navy-950`}
                  >
                    {kpi.value}
                  </span>
                  <Icon className={`w-5 h-5 ${config.accentColor} opacity-75`} />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-cream-200/80">
                <p className="text-xs text-slate-600 line-clamp-1">
                  {kpi.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
