"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
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
    <div className="bg-cream-50 border border-cream-200 rounded-2xl shadow-2xs overflow-hidden">
      {/* Cabecera de la sección */}
      <div className="px-6 py-4 border-b border-cream-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-navy-900">
            Causas con Actividad Reciente
          </h3>
          <p className="text-xs text-slate-500">
            Últimos decretos, proveídos y presentaciones cargadas
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-48 sm:w-60">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar causas..."
              className="w-full bg-cream-100 border border-cream-200 rounded-xl pl-8 pr-3 py-1 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy-800 transition"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>

          <Link
            href="/dashboard/casos"
            className="text-xs font-semibold text-navy-800 hover:underline whitespace-nowrap"
          >
            Explorar los 24 expedientes →
          </Link>
        </div>
      </div>

      {/* Tabla con scroll horizontal */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-cream-100 text-slate-500 text-[11px] uppercase tracking-wider border-b border-cream-200">
              <th className="py-3 px-6">Expediente / Código</th>
              <th className="py-3 px-4">Carátula y Cliente</th>
              <th className="py-3 px-4">Fuero</th>
              <th className="py-3 px-4">Responsable</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Última Actuación</th>
              <th className="py-3 px-6 text-right">Ficha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200 text-xs sm:text-sm">
            {filteredCases.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                  No se encontraron expedientes que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              filteredCases.map((item) => (
                <tr key={item.id} className="hover:bg-cream-100/60 transition">
                  {/* Código / Expediente SAC */}
                  <td className="py-3.5 px-6 whitespace-nowrap">
                    <span className="font-mono font-semibold text-navy-900 block">
                      {item.codigo}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {item.expediente}
                    </span>
                  </td>

                  {/* Carátula y Cliente */}
                  <td className="py-3.5 px-4 max-w-[260px]">
                    <p className="font-semibold text-navy-900 truncate">
                      {item.caratula}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      Cliente: {item.cliente}
                    </p>
                  </td>

                  {/* Fuero */}
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {item.fuero}
                  </td>

                  {/* Responsable */}
                  <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                    {item.responsable}
                  </td>

                  {/* Estado */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <PastelBadge variant={item.estadoVariant} size="sm">
                      {item.estado}
                    </PastelBadge>
                  </td>

                  {/* Último Movimiento */}
                  <td className="py-3.5 px-4 text-xs text-slate-600 max-w-[220px]">
                    <p className="truncate" title={item.ultimoMovimiento}>
                      {item.ultimoMovimiento}
                    </p>
                  </td>

                  {/* Acción */}
                  <td className="py-3.5 px-6 text-right whitespace-nowrap">
                    <Link
                      href={`/dashboard/casos?id=${item.id}`}
                      className="text-xs font-semibold text-navy-800 hover:bg-cream-200 px-2.5 py-1.5 rounded-lg transition inline-block"
                    >
                      Abrir
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
