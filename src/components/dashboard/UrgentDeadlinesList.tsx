"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    <div className="bg-cream-50 border border-cream-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Cabecera de la sección */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-cream-200">
          <div>
            <h3 className="text-sm font-bold text-navy-900">
              Agenda Prioritaria de Vencimientos y Audiencias
            </h3>
            <p className="text-xs text-slate-500">
              Ordenado por criticidad procesal y fecha límite
            </p>
          </div>

          <Link
            href="/dashboard/plazos"
            className="text-xs font-semibold text-navy-800 hover:underline"
          >
            Ver calendario completo →
          </Link>
        </div>

        {/* Lista de ítems procesales */}
        <div className="divide-y divide-cream-200 mt-2">
          {deadlines.map((item) => {
            const isCompleted = completedIds.has(item.id);

            return (
              <div
                key={item.id}
                className={`py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCompleted ? "opacity-60 line-through" : ""
                }`}
              >
                {/* Información principal */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
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
                    <span className="font-mono text-xs text-slate-500">
                      {item.expediente}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-navy-900">
                    {item.caratula}
                  </p>

                  <p className="text-xs text-slate-500">
                    Fuero {item.fuero} · Responsable:{" "}
                    <span className="text-slate-700 font-medium">
                      {item.responsable}
                    </span>
                  </p>
                </div>

                {/* Acciones por ítem */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleCompleted(item.id)}
                    className="text-xs bg-cream-100 hover:bg-cream-200 text-navy-900 border border-cream-300 font-medium px-3 py-1.5 rounded-xl transition"
                  >
                    {isCompleted ? "Presentado ✓" : "Marcar Presentado"}
                  </button>

                  <Link
                    href={`/dashboard/casos?exp=${encodeURIComponent(item.expediente)}`}
                    className="text-xs bg-cream-100 hover:bg-cream-200 text-navy-900 border border-cream-300 font-medium px-3 py-1.5 rounded-xl transition"
                  >
                    Ver Ficha
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
