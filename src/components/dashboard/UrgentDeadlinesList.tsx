"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarClock,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { MOCK_URGENT_DEADLINES } from "@/lib/mock-dashboard-data";
import { PastelBadge } from "@/components/ui/PastelBadge";
import type { UrgentDeadlineItem } from "@/types";

export function UrgentDeadlinesList() {
  const [deadlines, setDeadlines] = useState<UrgentDeadlineItem[]>(MOCK_URGENT_DEADLINES);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const handleToggleCompleted = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="bg-cream-50 rounded-xl border border-cream-300 p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Cabecera de la sección */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-cream-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#F9EBEB] border border-[#EBCACA] text-[#7F2929]">
              <CalendarClock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-semibold text-navy-950">
                  Agenda Prioritaria de Vencimientos
                </h3>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-navy-900 text-cream-100">
                  {deadlines.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Plazos procesales fatales, traslados y audiencias inminentes
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/plazos"
            className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-[#B5985E] transition-colors self-start sm:self-auto group"
          >
            <span>Ver calendario completo</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Lista de ítems procesales */}
        <div className="space-y-3">
          {deadlines.map((item) => {
            const isCompleted = completedIds.has(item.id);

            return (
              <div
                key={item.id}
                className={`p-3.5 sm:p-4 rounded-lg border transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCompleted
                    ? "bg-cream-100/60 border-cream-200 opacity-60 line-through"
                    : "bg-white border-cream-200 hover:border-cream-300 shadow-2xs"
                }`}
              >
                {/* Información principal */}
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-navy-900 bg-cream-100 px-2 py-0.5 rounded border border-cream-200">
                      {item.expediente}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-600 font-medium truncate">
                      {item.fuero}
                    </span>
                    {isCompleted ? (
                      <PastelBadge variant="sage" size="sm" showDot>
                        Presentado en SAC
                      </PastelBadge>
                    ) : (
                      <PastelBadge
                        variant={item.badgeVariant}
                        size="sm"
                        showDot={item.esFatal}
                      >
                        {item.badgeText}
                      </PastelBadge>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {item.caratula}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Responsable:</span>
                    <span className="font-medium text-slate-700">{item.responsable}</span>
                  </div>
                </div>

                {/* Acciones por ítem */}
                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-200/60 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleCompleted(item.id)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1.5 ${
                      isCompleted
                        ? "bg-cream-100 text-slate-600 border-cream-300 hover:bg-cream-200"
                        : "bg-cream-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border-cream-300 hover:border-emerald-300"
                    }`}
                    title={isCompleted ? "Reabrir vencimiento" : "Marcar escrito como presentado"}
                  >
                    <CheckCircle
                      className={`w-3.5 h-3.5 ${
                        isCompleted ? "text-emerald-600" : "text-slate-400"
                      }`}
                    />
                    <span>{isCompleted ? "Completado" : "Marcar Presentado"}</span>
                  </button>

                  <Link
                    href={`/dashboard/casos?exp=${encodeURIComponent(item.expediente)}`}
                    className="p-1.5 text-xs font-medium text-slate-600 hover:text-navy-900 bg-cream-100 hover:bg-cream-200 border border-cream-300 rounded-lg transition-colors inline-flex items-center gap-1"
                    title="Ver ficha procesal del caso"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="sm:hidden">Ficha</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pie informativo */}
      <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between text-xs text-slate-500">
        <span>Próxima carga de cédulas SAC: 18:00 hs</span>
        <span className="font-mono text-[11px] text-slate-400">Notificaciones Oficiales PJ Córdoba</span>
      </div>
    </div>
  );
}
