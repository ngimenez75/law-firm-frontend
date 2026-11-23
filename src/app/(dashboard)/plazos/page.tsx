"use client";

import React, { useState } from "react";
import {
  CalendarClock,
  AlertCircle,
  Clock,
  CheckCircle2,
  Calendar,
  Filter,
  ExternalLink,
} from "lucide-react";
import { MOCK_URGENT_DEADLINES } from "@/lib/mock-dashboard-data";
import { PastelBadge } from "@/components/ui/PastelBadge";

export default function PlazosPage() {
  const [filterType, setFilterType] = useState<"todos" | "fatales" | "audiencias">("todos");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const handleToggleCompleted = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredDeadlines = MOCK_URGENT_DEADLINES.filter((item) => {
    if (filterType === "fatales") return item.esFatal;
    if (filterType === "audiencias") return item.caratula.toLowerCase().includes("audiencia");
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#F9EBEB] border border-[#EBCACA] text-[#7F2929]">
            <CalendarClock className="w-5 h-5 text-[#C85A5A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-navy-900">
                Agenda de Plazos & Audiencias
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#F9EBEB] text-[#7F2929] border border-[#EBCACA]">
                3 Fatales Hoy
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Vencimientos judiciales con cómputo de cargo a las 10:00 hs (Tribunales de Córdoba)
            </p>
          </div>
        </div>

        {/* Resumen rápido */}
        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-cream-50 border border-cream-300">
            <span className="text-slate-500">Hoy:</span>{" "}
            <strong className="text-[#7F2929]">3 vencimientos</strong>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-cream-50 border border-cream-300">
            <span className="text-slate-500">Semana:</span>{" "}
            <strong className="text-[#78521A]">8 compromisos</strong>
          </div>
        </div>
      </div>

      {/* Filtros de plazo */}
      <div className="bg-cream-50 rounded-xl border border-cream-300 p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
            Filtrar:
          </span>
          <button
            type="button"
            onClick={() => setFilterType("todos")}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
              filterType === "todos"
                ? "bg-navy-900 text-cream-50"
                : "bg-cream-200/70 hover:bg-cream-300 text-slate-700"
            }`}
          >
            Todos ({MOCK_URGENT_DEADLINES.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType("fatales")}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
              filterType === "fatales"
                ? "bg-[#7F2929] text-white"
                : "bg-[#F9EBEB] text-[#7F2929] border border-[#EBCACA]"
            }`}
          >
            Plazos Fatales (2)
          </button>
          <button
            type="button"
            onClick={() => setFilterType("audiencias")}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
              filterType === "audiencias"
                ? "bg-[#78521A] text-white"
                : "bg-[#FAF1E2] text-[#78521A] border border-[#EBD5B3]"
            }`}
          >
            Audiencias (1)
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Horario de gracia: hasta 10:00 hs del día hábil posterior
        </div>
      </div>

      {/* Lista de Vencimientos */}
      <div className="space-y-3">
        {filteredDeadlines.map((item) => {
          const isDone = completedIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-150 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDone
                  ? "bg-cream-100/60 border-cream-200 opacity-60 line-through"
                  : "bg-cream-50 border-cream-300 hover:border-cream-300/90 shadow-xs"
              }`}
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-950 bg-cream-200/70 px-2 py-0.5 rounded border border-cream-300">
                    {item.expediente}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-600 font-medium">
                    {item.fuero}
                  </span>
                  <PastelBadge
                    variant={item.badgeVariant}
                    size="sm"
                    showDot={item.esFatal}
                  >
                    {item.badgeText}
                  </PastelBadge>
                </div>

                <h3 className="text-base font-semibold text-navy-900 leading-snug">
                  {item.caratula}
                </h3>

                <p className="text-xs text-slate-500">
                  Responsable procesal:{" "}
                  <strong className="text-slate-700 font-medium">{item.responsable}</strong>
                </p>
              </div>

              {/* Botones */}
              <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-cream-200/60 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleCompleted(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors inline-flex items-center gap-1.5 ${
                    isDone
                      ? "bg-cream-200 text-slate-700 border-cream-300"
                      : "bg-cream-200/80 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border-cream-300 hover:border-emerald-300"
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      isDone ? "text-emerald-600" : "text-slate-400"
                    }`}
                  />
                  <span>{isDone ? "Presentado" : "Marcar Presentado"}</span>
                </button>

                <button
                  type="button"
                  className="p-2 text-slate-600 hover:text-navy-950 bg-cream-200/80 hover:bg-cream-300 rounded-lg border border-cream-300 transition-colors"
                  title="Abrir expediente en SAC"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
