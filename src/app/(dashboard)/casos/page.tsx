"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { MOCK_RECENT_CASES, MOCK_FUEROS_OPTIONS } from "@/lib/mock-dashboard-data";
import { PastelBadge } from "@/components/ui/PastelBadge";

export default function CasosPage() {
  const [selectedFuero, setSelectedFuero] = useState<string>("TODOS");
  const [selectedEstado, setSelectedEstado] = useState<string>("TODOS");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = MOCK_RECENT_CASES.filter((c) => {
    const matchFuero =
      selectedFuero === "TODOS" ||
      c.fuero.toLowerCase().includes(selectedFuero.toLowerCase());
    const matchEstado =
      selectedEstado === "TODOS" ||
      c.estado.toLowerCase().includes(selectedEstado.toLowerCase());
    const matchSearch =
      c.caratula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.expediente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.responsable.toLowerCase().includes(searchQuery.toLowerCase());

    return matchFuero && matchEstado && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cabecera de Página */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-navy-900 text-cream-50">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-navy-900">
                Expedientes y Causas
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-navy-900 text-cream-100">
                24 activas
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Gestión unificada de litigios, sorteos SAC y radicaciones judiciales
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">
            Córdoba Capital · Tribunales I y II
          </span>
        </div>
      </div>

      {/* Barra de Filtros Visuales & Búsqueda */}
      <div className="bg-cream-50 rounded-xl border border-cream-300 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Fila 1: Buscador y Contador */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por carátula, SAC, cliente o letrado..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>
              Mostrando <strong>{filteredCases.length}</strong> de{" "}
              <strong>24</strong> expedientes
            </span>
          </div>
        </div>

        {/* Fila 2: Chips de Filtro por Fuero */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Fuero:
          </span>
          <button
            type="button"
            onClick={() => setSelectedFuero("TODOS")}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors shrink-0 ${
              selectedFuero === "TODOS"
                ? "bg-navy-900 text-cream-50"
                : "bg-cream-200/70 hover:bg-cream-300 text-slate-700"
            }`}
          >
            Todos (24)
          </button>
          {MOCK_FUEROS_OPTIONS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFuero(f)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors shrink-0 ${
                selectedFuero === f
                  ? "bg-navy-900 text-cream-50"
                  : "bg-cream-200/70 hover:bg-cream-300 text-slate-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Fila 3: Chips de Filtro por Estado Procesal */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Estado:
          </span>
          {["TODOS", "En Trámite", "Medida Cautelar", "Homologado"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedEstado(st)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors shrink-0 ${
                selectedEstado === st
                  ? "bg-navy-900 text-cream-50"
                  : "bg-cream-200/70 hover:bg-cream-300 text-slate-700"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Resultados de Causas */}
      <div className="bg-cream-50 rounded-xl border border-cream-300 p-5 shadow-xs">
        <div className="overflow-x-auto -mx-5 px-5 scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-cream-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px] bg-cream-100/60">
                <th scope="col" className="py-3 px-3 rounded-l-lg">
                  Nro. SAC / Identificador
                </th>
                <th scope="col" className="py-3 px-3">
                  Carátula & Fuero
                </th>
                <th scope="col" className="py-3 px-3">
                  Cliente Vinculado
                </th>
                <th scope="col" className="py-3 px-3">
                  Letrado Asignado
                </th>
                <th scope="col" className="py-3 px-3">
                  Estado
                </th>
                <th scope="col" className="py-3 px-3">
                  Última Actuación
                </th>
                <th scope="col" className="py-3 px-3 text-right rounded-r-lg">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200/80">
              {filteredCases.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-cream-100/70 transition-colors group"
                >
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="font-mono text-xs font-bold text-navy-950 block">
                      {item.codigo}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500 block">
                      {item.expediente}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 max-w-[260px]">
                    <span className="font-semibold text-slate-900 block truncate group-hover:text-navy-900">
                      {item.caratula}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {item.fuero}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap font-medium text-slate-700">
                    {item.cliente}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap text-slate-700">
                    {item.responsable}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <PastelBadge variant={item.estadoVariant} size="sm">
                      {item.estado}
                    </PastelBadge>
                  </td>
                  <td className="py-3.5 px-3 max-w-[200px]">
                    <p className="text-slate-700 truncate">{item.ultimoMovimiento}</p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.fechaActualizacion}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-navy-900 bg-cream-200/70 hover:bg-cream-300 rounded border border-cream-300 transition-colors"
                    >
                      <span>Expediente</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
