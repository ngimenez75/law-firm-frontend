"use client";

import React from "react";
import { ShieldAlert, Car, Building2, CheckCircle2, Clock, Plus, ExternalLink } from "lucide-react";
import { PastelBadge } from "@/components/ui/PastelBadge";

const MOCK_SINIESTROS = [
  {
    id: "sin_001",
    nroReclamo: "SIN-2026-089",
    compania: "San Cristóbal Seguros",
    damnificado: "Esteban Fernández",
    tipo: "Accidente de Tránsito (Colisión Trasera)",
    fecha: "28/10/2026",
    estado: "Negociación de Oferta",
    variant: "amber" as const,
    montoReclamado: "$ 4.850.000",
    letrado: "Dra. Giordano",
  },
  {
    id: "sin_002",
    nroReclamo: "SIN-2026-074",
    compania: "La Segunda Cooperativa",
    damnificado: "Martín Pérez",
    tipo: "Destrucción Total y Lesiones Leves",
    fecha: "12/10/2026",
    estado: "Pericia Mecánica Aprobada",
    variant: "sage" as const,
    montoReclamado: "$ 9.200.000",
    letrado: "Dr. Martínez",
  },
  {
    id: "sin_003",
    nroReclamo: "SIN-2026-061",
    compania: "Federación Patronal",
    damnificado: "Consorcio Edificio Sol",
    tipo: "Responsabilidad Civil Edilicia",
    fecha: "04/09/2026",
    estado: "Acuerdo Homologado",
    variant: "sage" as const,
    montoReclamado: "$ 3.400.000",
    letrado: "Dr. López",
  },
];

export default function SiniestrosPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-navy-900 text-cream-50">
            <ShieldAlert className="w-5 h-5 text-[#B5985E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-navy-950">
                Siniestros & Acuerdos Extrajudiciales
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#FAF1E2] text-[#78521A] border border-[#EBD5B3]">
                5 En Curso
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Trámites directos ante aseguradoras, ART y convenios transaccionales
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-cream-50 bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#B5985E]" />
          <span>Nuevo Reclamo de Siniestro</span>
        </button>
      </div>

      {/* Grilla de Estadísticas de Siniestros */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-cream-50 rounded-xl p-4 border border-cream-300 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Reclamos Extrajudiciales
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-1">5</p>
          <p className="text-xs text-slate-500 mt-2">Negociación prejudicial</p>
        </div>
        <div className="bg-cream-50 rounded-xl p-4 border border-cream-300 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Acuerdos en Cierre
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#78521A] mt-1">2</p>
          <p className="text-xs text-slate-500 mt-2">En redacción de convenio</p>
        </div>
        <div className="bg-cream-50 rounded-xl p-4 border border-cream-300 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Cobros Homologados (Mes)
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#265438] mt-1">
            $ 17.450.000
          </p>
          <p className="text-xs text-slate-500 mt-2">Fondos liquidados a clientes</p>
        </div>
      </div>

      {/* Listado de Siniestros */}
      <div className="bg-cream-50 rounded-xl border border-cream-300 p-5 shadow-xs">
        <h3 className="font-serif text-lg font-semibold text-navy-950 mb-4">
          Bandeja de Reclamos en Trámite
        </h3>

        <div className="divide-y divide-cream-200">
          {MOCK_SINIESTROS.map((sin) => (
            <div
              key={sin.id}
              className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-950 bg-cream-200/80 px-2 py-0.5 rounded">
                    {sin.nroReclamo}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-slate-800">
                    {sin.compania}
                  </span>
                  <PastelBadge variant={sin.variant} size="sm">
                    {sin.estado}
                  </PastelBadge>
                </div>

                <p className="text-sm font-semibold text-slate-900">{sin.tipo}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Cliente: <strong className="text-slate-700">{sin.damnificado}</strong></span>
                  <span>·</span>
                  <span>Monto estimado: <strong className="text-navy-950 font-mono">{sin.montoReclamado}</strong></span>
                  <span>·</span>
                  <span>Letrado: <strong className="text-slate-700">{sin.letrado}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-medium text-navy-900 bg-cream-200/80 hover:bg-cream-300 rounded-lg border border-cream-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Seguimiento</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
