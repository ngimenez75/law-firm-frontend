import React from "react";
import Link from "next/link";
import { MOCK_KPIS } from "@/lib/mock-dashboard-data";
import type { BadgeVariant } from "@/types";

const KPI_THEMES: Record<
  BadgeVariant,
  {
    bg: string;
    border: string;
    text: string;
    dot: string;
    href: string;
  }
> = {
  rose: {
    bg: "bg-pastel-rose-bg/70",
    border: "border-pastel-rose-border",
    text: "text-pastel-rose-text",
    dot: "bg-pastel-rose-dot",
    href: "/dashboard/plazos",
  },
  amber: {
    bg: "bg-pastel-amber-bg/70",
    border: "border-pastel-amber-border",
    text: "text-pastel-amber-text",
    dot: "bg-pastel-amber-dot",
    href: "/dashboard/plazos",
  },
  mist: {
    bg: "bg-pastel-mist-bg/70",
    border: "border-pastel-mist-border",
    text: "text-pastel-mist-text",
    dot: "bg-pastel-mist-dot",
    href: "/dashboard/casos",
  },
  sage: {
    bg: "bg-pastel-sage-bg/70",
    border: "border-pastel-sage-border",
    text: "text-pastel-sage-text",
    dot: "bg-pastel-sage-dot",
    href: "/dashboard/casos",
  },
  lavender: {
    bg: "bg-pastel-lavender-bg/70",
    border: "border-pastel-lavender-border",
    text: "text-pastel-lavender-text",
    dot: "bg-pastel-lavender-dot",
    href: "/dashboard/casos",
  },
};

export function KpiCardsGrid() {
  return (
    <section aria-labelledby="kpis-title">
      <h2 id="kpis-title" className="sr-only">
        Métricas clave de gestión jurídica
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_KPIS.map((kpi) => {
          const theme = KPI_THEMES[kpi.variant] || KPI_THEMES.mist;

          return (
            <Link
              key={kpi.id}
              href={theme.href}
              className={`${theme.bg} border ${theme.border} rounded-2xl p-5 flex flex-col justify-between hover:shadow-sm hover:brightness-[0.98] transition-all duration-150`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${theme.text}`}
                >
                  {kpi.title}
                </span>
                <span className={`h-2.5 w-2.5 rounded-full ${theme.dot}`} />
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-2">
                <p className="text-3xl font-bold text-navy-900 tracking-tight">
                  {kpi.value}
                </p>
                <span
                  className={`text-xs font-medium ${theme.text} text-right line-clamp-1`}
                >
                  {kpi.subtitle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
