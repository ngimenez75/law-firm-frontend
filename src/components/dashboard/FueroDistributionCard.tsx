import React from "react";
import Link from "next/link";
import { Scale, BriefcaseBusiness, ChevronRight } from "lucide-react";
import { MOCK_FUERO_DISTRIBUTION } from "@/lib/mock-dashboard-data";

const BAR_COLOR_MAP: Record<string, string> = {
  mist: "bg-[#527CA6]",
  lavender: "bg-[#7C65A8]",
  sage: "bg-[#53946B]",
  amber: "bg-[#D49B4B]",
};

const DOT_COLOR_MAP: Record<string, string> = {
  mist: "bg-[#527CA6]",
  lavender: "bg-[#7C65A8]",
  sage: "bg-[#53946B]",
  amber: "bg-[#D49B4B]",
};

export function FueroDistributionCard() {
  const totalCausas = MOCK_FUERO_DISTRIBUTION.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  return (
    <div className="bg-cream-50 rounded-xl border border-cream-300 p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-cream-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-navy-900 text-cream-50">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-navy-950">
                Cartera por Fuero
              </h3>
              <p className="text-xs text-slate-500">
                Distribución activa ({totalCausas} causas judiciales)
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/casos"
            className="text-xs font-semibold text-navy-900 hover:text-[#B5985E] transition-colors"
          >
            Filtros
          </Link>
        </div>

        {/* Barra de progreso global compuesta (CSS pura) */}
        <div className="mb-5">
          <div className="h-3 w-full rounded-full bg-cream-200/80 overflow-hidden flex">
            {MOCK_FUERO_DISTRIBUTION.map((item) => (
              <div
                key={item.id}
                style={{ width: `${item.porcentaje}%` }}
                className={`${BAR_COLOR_MAP[item.colorVariant]} transition-all duration-300`}
                title={`${item.fuero}: ${item.cantidad} (${item.porcentaje}%)`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
            <span>0%</span>
            <span>Total: 100% de la cartera</span>
          </div>
        </div>

        {/* Desglose individual de cada fuero */}
        <div className="space-y-3.5">
          {MOCK_FUERO_DISTRIBUTION.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      DOT_COLOR_MAP[item.colorVariant]
                    }`}
                  />
                  <span className="font-medium text-slate-700 truncate">
                    {item.fuero}
                  </span>
                </div>
                <div className="font-mono text-slate-800 font-semibold shrink-0 ml-2">
                  {item.cantidad}{" "}
                  <span className="text-slate-400 font-normal">
                    ({item.porcentaje}%)
                  </span>
                </div>
              </div>

              {/* Barra de progreso individual */}
              <div className="h-1.5 w-full bg-cream-200/70 rounded-full overflow-hidden">
                <div
                  style={{ width: `${item.porcentaje}%` }}
                  className={`h-full rounded-full ${BAR_COLOR_MAP[item.colorVariant]}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recuadro inferior: Gestión Extrajudicial */}
      <div className="mt-6 pt-4 border-t border-cream-200">
        <Link
          href="/dashboard/siniestros"
          className="group block p-3.5 rounded-lg bg-[#FAF1E2] border border-[#EBD5B3] hover:border-[#D49B4B] transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="w-4 h-4 text-[#78521A]" />
              <div>
                <p className="text-xs font-bold text-[#78521A]">
                  Gestión Extrajudicial: 5 casos abiertos
                </p>
                <p className="text-[11px] text-[#78521A]/80">
                  Negociaciones directas en trámite previo a mediación
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#78521A] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
