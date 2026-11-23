import React from "react";
import Link from "next/link";
import { MOCK_FUERO_DISTRIBUTION } from "@/lib/mock-dashboard-data";

const COLOR_BAR_MAP: Record<string, string> = {
  mist: "bg-pastel-mist-dot",
  lavender: "bg-pastel-lavender-dot",
  sage: "bg-pastel-sage-dot",
  amber: "bg-pastel-amber-dot",
};

export function FueroDistributionCard() {
  return (
    <div className="bg-cream-50 border border-cream-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-5 h-full">
      <div>
        <h3 className="text-sm font-bold text-navy-900">Cartera Activa por Fuero</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Distribución sobre 24 expedientes activos
        </p>

        <div className="space-y-4 mt-5">
          {MOCK_FUERO_DISTRIBUTION.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-700">{item.fuero}</span>
                <span className="font-mono font-semibold text-navy-900">
                  {item.cantidad} ({item.porcentaje}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-cream-200 rounded-full overflow-hidden">
                <div
                  className={`${COLOR_BAR_MAP[item.colorVariant] || "bg-navy-800"} h-full rounded-full transition-all duration-300`}
                  style={{ width: `${item.porcentaje}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tarjeta Resumen de Siniestros / Brokers */}
      <Link
        href="/dashboard/siniestros"
        className="block p-4 rounded-xl bg-cream-100 border border-cream-200 hover:border-cream-300 transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Gestión Extrajudicial
          </span>
          <span className="text-xs font-mono font-semibold text-navy-800">
            5 abiertos
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Reclamos de aseguradoras e incidentes en etapa de convenio previo a sorteo.
        </p>
      </Link>
    </div>
  );
}
