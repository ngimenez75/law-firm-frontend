"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Briefcase, CalendarClock, AlertCircle } from "lucide-react";
import {
  MOCK_CLIENTS_LIST,
  MOCK_LAWYERS_LIST,
  MOCK_FUEROS_OPTIONS,
  MOCK_RECENT_CASES,
} from "@/lib/mock-dashboard-data";

interface QuickActionModalsProps {
  isNewCaseOpen: boolean;
  isNewDeadlineOpen: boolean;
  onCloseNewCase: () => void;
  onCloseNewDeadline: () => void;
}

export function QuickActionModals({
  isNewCaseOpen,
  isNewDeadlineOpen,
  onCloseNewCase,
  onCloseNewDeadline,
}: QuickActionModalsProps) {
  // Estado para formulario de Nueva Causa
  const [sacNumber, setSacNumber] = useState("");
  const [fuero, setFuero] = useState(MOCK_FUEROS_OPTIONS[0]);
  const [caratula, setCaratula] = useState("");
  const [clientId, setClientId] = useState(MOCK_CLIENTS_LIST[0].id);
  const [lawyerId, setLawyerId] = useState(MOCK_LAWYERS_LIST[0].id);
  const [caseSuccess, setCaseSuccess] = useState(false);

  // Estado para formulario de Nuevo Plazo
  const [selectedCaseId, setSelectedCaseId] = useState(MOCK_RECENT_CASES[0].id);
  const [deadlineType, setDeadlineType] = useState<"fatal" | "ordinario" | "audiencia">("fatal");
  const [deadlineDate, setDeadlineDate] = useState("2026-11-18");
  const [deadlineTime, setDeadlineTime] = useState("10:00");
  const [deadlineDescription, setDeadlineDescription] = useState("");
  const [deadlineSuccess, setDeadlineSuccess] = useState(false);

  // Submit Nueva Causa
  const handleSubmitNewCase = (e: React.FormEvent) => {
    e.preventDefault();
    setCaseSuccess(true);
    setTimeout(() => {
      setCaseSuccess(false);
      setSacNumber("");
      setCaratula("");
      onCloseNewCase();
    }, 1400);
  };

  // Submit Nuevo Plazo
  const handleSubmitNewDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    setDeadlineSuccess(true);
    setTimeout(() => {
      setDeadlineSuccess(false);
      setDeadlineDescription("");
      onCloseNewDeadline();
    }, 1400);
  };

  return (
    <>
      {/* 1. Modal Dar de Alta Nueva Causa */}
      {isNewCaseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseNewCase}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-case-title"
            className="relative w-full max-w-lg bg-cream-50 rounded-2xl shadow-2xl border border-cream-300 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Cabecera */}
            <div className="px-6 py-4 border-b border-cream-200 bg-cream-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-navy-900 text-cream-50">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="modal-case-title"
                    className="font-serif text-lg font-semibold text-navy-950"
                  >
                    Dar de Alta Nueva Causa
                  </h3>
                  <p className="text-xs text-slate-500">
                    Registro de expediente judicial (Modelo 3FN)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseNewCase}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-cream-200/50 transition-colors"
                aria-label="Cerrar ventana"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido / Formulario */}
            {caseSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-serif text-lg font-medium text-navy-900">
                  Causa Registrada Exitosamente
                </h4>
                <p className="text-xs text-slate-600">
                  El expediente ha sido indexado y asignado al letrado correspondiente.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitNewCase} className="p-6 space-y-4">
                {/* Nro SAC opcional */}
                <div>
                  <label
                    htmlFor="sac-number"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Nro. Expediente SAC <span className="text-slate-400 font-normal">(Opcional si está en sorteo)</span>
                  </label>
                  <input
                    id="sac-number"
                    type="text"
                    value={sacNumber}
                    onChange={(e) => setSacNumber(e.target.value)}
                    placeholder="Ej: EXP-3481/2026 o SAC 1084291"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E] font-mono"
                  />
                </div>

                {/* Fuero Judicial */}
                <div>
                  <label
                    htmlFor="fuero-select"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Fuero Judicial *
                  </label>
                  <select
                    id="fuero-select"
                    required
                    value={fuero}
                    onChange={(e) => setFuero(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
                  >
                    {MOCK_FUEROS_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Carátula */}
                <div>
                  <label
                    htmlFor="caratula-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Carátula Procesal *
                  </label>
                  <input
                    id="caratula-input"
                    type="text"
                    required
                    value={caratula}
                    onChange={(e) => setCaratula(e.target.value)}
                    placeholder="Ej: Consorcio Edificio Sol c/ Ruarte — Ordinario"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
                  />
                </div>

                {/* Cliente Vinculado (client_profiles) */}
                <div>
                  <label
                    htmlFor="client-select"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Cliente Vinculado *
                  </label>
                  <select
                    id="client-select"
                    required
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
                  >
                    {MOCK_CLIENTS_LIST.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.doc})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Abogado Responsable (lawyer_profiles) */}
                <div>
                  <label
                    htmlFor="lawyer-select"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Abogado Responsable *
                  </label>
                  <select
                    id="lawyer-select"
                    required
                    value={lawyerId}
                    onChange={(e) => setLawyerId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
                  >
                    {MOCK_LAWYERS_LIST.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name} — {l.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Botones de acción */}
                <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-cream-200">
                  <button
                    type="button"
                    onClick={onCloseNewCase}
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-cream-100 hover:bg-cream-200 border border-cream-300 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-cream-50 bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors shadow-xs"
                  >
                    Crear Causa
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. Modal Agendar Vencimiento / Audiencia */}
      {isNewDeadlineOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseNewDeadline}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-deadline-title"
            className="relative w-full max-w-lg bg-cream-50 rounded-2xl shadow-2xl border border-cream-300 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Cabecera */}
            <div className="px-6 py-4 border-b border-cream-200 bg-cream-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#FAF1E2] border border-[#EBD5B3] text-[#78521A]">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="modal-deadline-title"
                    className="font-serif text-lg font-semibold text-navy-950"
                  >
                    Agendar Vencimiento / Audiencia
                  </h3>
                  <p className="text-xs text-slate-500">
                    Control de plazos fatales y traslados perentorios
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseNewDeadline}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-cream-200/50 transition-colors"
                aria-label="Cerrar ventana"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido / Formulario */}
            {deadlineSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-serif text-lg font-medium text-navy-900">
                  Plazo Procesal Agendado
                </h4>
                <p className="text-xs text-slate-600">
                  Se programaron las alertas automáticas para el letrado a cargo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitNewDeadline} className="p-6 space-y-4">
                {/* Selector de Expediente Vinculado */}
                <div>
                  <label
                    htmlFor="deadline-case"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Expediente / Causa Vinculada *
                  </label>
                  <select
                    id="deadline-case"
                    required
                    value={selectedCaseId}
                    onChange={(e) => setSelectedCaseId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
                  >
                    {MOCK_RECENT_CASES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.expediente} — {c.caratula}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector de Criticidad / Tipo */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Tipo de Plazo & Criticidad *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeadlineType("fatal")}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        deadlineType === "fatal"
                          ? "bg-[#F9EBEB] border-[#EBCACA] text-[#7F2929] ring-1 ring-[#C85A5A]"
                          : "bg-white border-cream-300 text-slate-600 hover:bg-cream-100"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#C85A5A]" />
                        <span className="text-xs font-bold">Plazo Fatal</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Cargo 10:00 hs</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeadlineType("ordinario")}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        deadlineType === "ordinario"
                          ? "bg-[#EBF0F5] border-[#C9D8E6] text-[#274868] ring-1 ring-[#527CA6]"
                          : "bg-white border-cream-300 text-slate-600 hover:bg-cream-100"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#527CA6]" />
                        <span className="text-xs font-bold">Ordinario</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Días hábiles</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeadlineType("audiencia")}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        deadlineType === "audiencia"
                          ? "bg-[#FAF1E2] border-[#EBD5B3] text-[#78521A] ring-1 ring-[#D49B4B]"
                          : "bg-white border-cream-300 text-slate-600 hover:bg-cream-100"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#D49B4B]" />
                        <span className="text-xs font-bold">Audiencia</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Presencial / Virtual</p>
                    </button>
                  </div>
                </div>

                {/* Fecha y Hora Límite */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="deadline-date"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Fecha Límite *
                    </label>
                    <input
                      id="deadline-date"
                      type="date"
                      required
                      value={deadlineDate}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="deadline-time"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Hora de Cargo *
                    </label>
                    <input
                      id="deadline-time"
                      type="time"
                      required
                      value={deadlineTime}
                      onChange={(e) => setDeadlineTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
                    />
                  </div>
                </div>

                {/* Detalle procesal */}
                <div>
                  <label
                    htmlFor="deadline-desc"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Detalle u Objeto del Trámite *
                  </label>
                  <input
                    id="deadline-desc"
                    type="text"
                    required
                    value={deadlineDescription}
                    onChange={(e) => setDeadlineDescription(e.target.value)}
                    placeholder="Ej: Presentación de expresión de agravios en Cámara"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
                  />
                </div>

                {deadlineType === "fatal" && (
                  <div className="p-3 rounded-lg bg-[#F9EBEB] border border-[#EBCACA] flex items-start gap-2 text-xs text-[#7F2929]">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C85A5A]" />
                    <p>
                      Atención: El vencimiento incluye cómputo de 2 horas de gracia (hasta las 10:00 hs del día hábil posterior).
                    </p>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-cream-200">
                  <button
                    type="button"
                    onClick={onCloseNewDeadline}
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-cream-100 hover:bg-cream-200 border border-cream-300 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-cream-50 bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors shadow-xs"
                  >
                    Agendar Plazo
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
