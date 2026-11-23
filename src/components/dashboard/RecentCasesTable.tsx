"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FolderGit2, Search, ArrowRight, ExternalLink } from "lucide-react";
import { MOCK_RECENT_CASES } from "@/lib/mock-dashboard-data";
import { PastelBadge } from "@/components/ui/PastelBadge";

export function RecentCasesTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = MOCK_RECENT_CASES.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.caratula.toLowerCase().includes(term) ||
      c.cliente.toLowerCase().includes(term) ||
      c.expediente.toLowerCase().includes(term) ||
      c.codigo.toLowerCase().includes(term) ||
      c.responsable.toLowerCase().includes(term)
    );
  });

  return (
    <section
      aria-labelledby="recent-cases-heading"
      className="bg-cream-50 rounded-xl border border-cream-300 p-5 sm:p-6 shadow-xs"
    >
      {/* Cabecera de la sección con buscador */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-cream-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-navy-900 text-cream-50">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <h3
              id="recent-cases-heading"
              className="font-serif text-lg font-semibold text-navy-950"
            >
              Causas con Actividad Reciente
            </h3>
            <p className="text-xs text-slate-500">
              Expedientes actualizados en SAC con resoluciones o decretos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Buscador local */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar por carátula, SAC..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-cream-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
            />
          </div>

          <Link
            href="/dashboard/casos"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-navy-900 bg-cream-200/80 hover:bg-cream-300 rounded-lg border border-cream-300 transition-colors shrink-0"
          >
            <span>Ver todas las causas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Contenedor responsivo con scroll horizontal suave */}
      <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6 scrollbar-thin">
        <table className="w-full text-left text-xs border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-cream-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px] bg-cream-100/60">
              <th scope="col" className="py-3 px-3 rounded-l-lg">
                Identificador / SAC
              </th>
              <th scope="col" className="py-3 px-3">
                Carátula & Fuero
              </th>
              <th scope="col" className="py-3 px-3">
                Cliente Vinculado
              </th>
              <th scope="col" className="py-3 px-3">
                Responsable
              </th>
              <th scope="col" className="py-3 px-3">
                Estado
              </th>
              <th scope="col" className="py-3 px-3">
                Último Movimiento
              </th>
              <th scope="col" className="py-3 px-3 text-right rounded-r-lg">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200/80">
            {filteredCases.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No se encontraron expedientes que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              filteredCases.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-cream-100/70 transition-colors group"
                >
                  {/* Código / Expediente SAC */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs font-bold text-navy-950 block">
                        {item.codigo}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 block">
                        {item.expediente}
                      </span>
                    </div>
                  </td>

                  {/* Carátula & Fuero */}
                  <td className="py-3.5 px-3 max-w-[260px]">
                    <div className="space-y-0.5">
                      <Link
                        href={`/dashboard/casos?id=${item.id}`}
                        className="font-semibold text-slate-900 hover:text-navy-800 line-clamp-1 group-hover:underline"
                      >
                        {item.caratula}
                      </Link>
                      <span className="text-[11px] text-slate-500 block truncate">
                        {item.fuero}
                      </span>
                    </div>
                  </td>

                  {/* Cliente */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="font-medium text-slate-700 block">
                      {item.cliente}
                    </span>
                  </td>

                  {/* Responsable */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="text-slate-700">{item.responsable}</span>
                  </td>

                  {/* Estado */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <PastelBadge variant={item.estadoVariant} size="sm">
                      {item.estado}
                    </PastelBadge>
                  </td>

                  {/* Último Movimiento */}
                  <td className="py-3.5 px-3 max-w-[220px]">
                    <div className="space-y-0.5">
                      <p className="text-slate-700 truncate" title={item.ultimoMovimiento}>
                        {item.ultimoMovimiento}
                      </p>
                      {item.fechaActualizacion && (
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {item.fechaActualizacion}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Acción */}
                  <td className="py-3.5 px-3 text-right whitespace-nowrap">
                    <Link
                      href={`/dashboard/casos?id=${item.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-navy-900 hover:text-navy-950 bg-cream-200/70 hover:bg-cream-300 rounded border border-cream-300 transition-colors"
                    >
                      <span>Ver Ficha</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pie de tabla en mobile con enlace a todas */}
      <div className="mt-4 pt-3 border-t border-cream-200 sm:hidden">
        <Link
          href="/dashboard/casos"
          className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-navy-900 bg-cream-200/80 rounded-lg border border-cream-300"
        >
          <span>Ver todas las causas del estudio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
