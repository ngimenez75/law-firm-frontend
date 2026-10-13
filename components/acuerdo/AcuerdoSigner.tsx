"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  FileSignature,
  FileText,
  Lock,
  ArrowRight,
} from "lucide-react";

export function AcuerdoSignerContent() {
  const searchParams = useSearchParams();

  // Valores derivados directamente de query params
  const paramNombre = searchParams.get("nombre");
  const paramDni = searchParams.get("dni");
  const paramTipo = searchParams.get("tipo");

  const [sessionClient, setSessionClient] = useState<{
    nombre?: string;
    dni?: string;
    tipo?: string;
  }>({});

  const [accepted, setAccepted] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const trackingCode = "SIN-0492";

  useEffect(() => {
    // Si ya vino por URL, no hace falta leer sessionStorage
    if (paramNombre || paramDni) return;

    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("estudiolegal_reclamo");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          window.requestAnimationFrame(() => {
            setSessionClient({
              nombre: parsed.nombreCompleto,
              dni: parsed.dni,
              tipo: parsed.tipoSiniestro,
            });
          });
        } catch {
          // fallback silencioso
        }
      }
    }
  }, [paramNombre, paramDni]);

  const cliente = {
    nombre: paramNombre || sessionClient.nombre || "Juan Carlos Pérez",
    dni: paramDni || sessionClient.dni || "35.849.201",
    tipo: paramTipo || sessionClient.tipo || "Accidente de Tránsito / Daños",
  };

  const handleSign = () => {
    if (!accepted) return;
    setIsSigning(true);

    setTimeout(() => {
      setIsSigning(false);
      setShowSuccessModal(true);
    }, 700);
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(trackingCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const todayFormatted = new Date().toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between pb-8">
        <Link
          href="/"
          className="flex items-center group focus:outline-none"
        >
          <Image
            src="/images/logo-header.png"
            alt="Giordano · Lopez · García Lepez - Estudio Jurídico"
            width={300}
            height={60}
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-xs">
          <Lock className="w-3.5 h-3.5 text-slate-700" />
          <span className="hidden sm:inline">Firma Digital Válida · Ley 25.506</span>
        </div>
      </header>

      {/* Main Split-Screen Layout */}
      <main className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ======================================================== */}
          {/* COLUMNA IZQUIERDA: VISUALIZADOR DE DOCUMENTO FORMAL */}
          {/* ======================================================== */}
          <section className="lg:col-span-7 bg-[#FDFBF7] rounded-xl border border-stone-300 shadow-sm p-6 sm:p-10 font-serif text-slate-800 leading-relaxed space-y-6 relative overflow-hidden">
            {/* Sello de agua sutil */}
            <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
              <Scale className="w-32 h-32 text-slate-900" />
            </div>

            {/* Cabezal de instrumento jurídico */}
            <div className="text-center border-b border-stone-300 pb-5 space-y-1">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Poder Especial y Convenio de Honorarios a Resultado
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                AUTORIZACIÓN DE GESTIÓN Y REPRESENTACIÓN LEGAL
              </h2>
              <p className="font-sans text-xs text-slate-600">
                Ciudad Autónoma de Buenos Aires, {todayFormatted}
              </p>
            </div>

            {/* Texto Formal del Acuerdo */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-800">
              <p>
                Por la presente, quien suscribe,{" "}
                <span className="font-sans font-bold text-slate-950 bg-stone-200/70 px-1 py-0.5 rounded">
                  {cliente.nombre}
                </span>
                , titular del Documento Nacional de Identidad N°{" "}
                <span className="font-sans font-mono font-bold text-slate-950 bg-stone-200/70 px-1 py-0.5 rounded">
                  {cliente.dni}
                </span>
                , confiere autorización expresa a los profesionales letrados de{" "}
                <strong>ESTUDIO LEGAL</strong> para que en su nombre y representación inicien, prosigan y
                sustancien todas las gestiones extrajudiciales, prejudiciales y judiciales conducentes al
                resarcimiento integral por el siniestro caratulado provisoriamente como{" "}
                <em>&quot;{cliente.tipo}&quot;</em>.
              </p>

              <div className="space-y-3 font-sans text-xs text-slate-700 bg-white/70 p-4 rounded-lg border border-stone-200">
                <p>
                  <strong>PRIMERA (Alcance):</strong> Los letrados quedan facultados para presentar
                  denuncias de siniestro, solicitar informes periciales mecánicos y médicos, asistir a
                  audiencias de mediación obligatoria y entablar demandas civiles o laborales.
                </p>
                <p>
                  <strong>SEGUNDA (Pacto de Cuotalitis):</strong> Los honorarios profesionales quedan
                  estrictamente subordinados al cobro efectivo de la indemnización acordada o fijada en
                  sentencia. En ningún caso se requerirán anticipos por gestiones iniciales.
                </p>
                <p>
                  <strong>TERCERA (Confidencialidad):</strong> Toda la documentación aportada queda
                  protegida bajo el régimen del secreto profesional letrado (Ley 23.187).
                </p>
              </div>

              <p className="text-xs text-slate-600 italic">
                En prueba de plena conformidad con las cláusulas precedentes, se suscribe de manera
                electrónica mediante validación de identidad digital.
              </p>
            </div>

            {/* Espacio de Firma y Validación */}
            <div className="pt-6 border-t border-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans text-xs">
              <div className="space-y-1">
                <p className="text-slate-500 text-[11px] uppercase tracking-wider">
                  Firma Electrónica del Solicitante:
                </p>
                <p className="font-semibold text-slate-900 border-b border-slate-400 pb-1 min-w-[200px]">
                  {cliente.nombre}
                </p>
                <p className="text-[10px] text-slate-500 font-mono">DNI: {cliente.dni}</p>
              </div>

              <div className="bg-stone-100 border border-stone-200 rounded p-2.5 text-center shrink-0">
                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">
                  Constancia Digital
                </p>
                <p className="text-[9px] text-slate-500 font-mono">ID: REF-{trackingCode}</p>
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* COLUMNA DERECHA: PANEL DE ACCIÓN Y FIRMA */}
          {/* ======================================================== */}
          <section className="lg:col-span-5 bg-white rounded-xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Paso Final
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Paso final para iniciar tu gestión
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Revisá el instrumento formal a la izquierda. Al firmar digitalmente, nuestros letrados
                quedan habilitados para dar de alta tu expediente e intimar a las aseguradoras.
              </p>
            </div>

            {/* Resumen del Caso */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-semibold border-b border-stone-200 pb-2">
                <FileText className="w-4 h-4 text-slate-700" />
                <span>Resumen de la Carátula</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Titular:</span>
                <span className="font-medium text-slate-900">{cliente.nombre}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>DNI / CUIT:</span>
                <span className="font-medium font-mono text-slate-900">{cliente.dni}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Materia:</span>
                <span className="font-medium text-slate-900">{cliente.tipo}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Costo inicial:</span>
                <span className="font-bold text-slate-900">$ 0 (A resultado)</span>
              </div>
            </div>

            {/* Checkbox de Consentimiento */}
            <div className="pt-2">
              <label
                htmlFor="consentimiento"
                className="flex items-start gap-3 p-3.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100/70 transition-colors cursor-pointer select-none"
              >
                <input
                  id="consentimiento"
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="w-5 h-5 rounded border-stone-300 text-slate-900 focus:ring-slate-900 mt-0.5 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-slate-700 leading-snug font-medium">
                  He leído y acepto los términos de representación legal y el pacto de honorarios condicionado al éxito del caso.
                </span>
              </label>
            </div>

            {/* Botón Masivo de Firma */}
            <button
              type="button"
              disabled={!accepted || isSigning}
              onClick={handleSign}
              className={`w-full py-4 px-6 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm ${
                accepted && !isSigning
                  ? "bg-slate-900 hover:bg-slate-800 text-stone-50 cursor-pointer"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
              }`}
            >
              {isSigning ? (
                <span>Validando firma digital...</span>
              ) : (
                <>
                  <FileSignature className="w-5 h-5" />
                  <span>Firmar Digitalmente y Enviar</span>
                </>
              )}
            </button>

            {/* Garantía de Seguridad */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>Proceso validado bajo Ley de Firma Digital 25.506</span>
            </div>
          </section>
        </div>
      </main>

      {/* Modal de Éxito Centrado */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            {/* Checkmark Verde Animado */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Gestión Iniciada
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                ¡Reclamo ingresado con éxito!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tu acuerdo fue firmado y archivado electrónicamente. Nuestro equipo asignó un letrado especialista que ya comenzó la revisión preliminar de los antecedentes.
              </p>
            </div>

            {/* Badge de Código de Seguimiento */}
            <div className="p-4 rounded-xl bg-stone-100 border border-stone-300 space-y-2">
              <p className="text-xs font-semibold text-slate-700">Tu código de seguimiento es:</p>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-bold tracking-wider text-slate-900">
                  {trackingCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 text-slate-700 transition-colors"
                  title="Copiar código"
                >
                  {copiedCode ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Guardá este código. Podés consultarlo las 24 hs en el portal de la web.
              </p>
            </div>

            {/* Botón Volver al Inicio */}
            <div className="pt-2">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-slate-900 hover:bg-slate-800 text-stone-50 text-sm font-semibold transition-colors shadow-xs"
              >
                <span>Volver al Inicio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center pt-8 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Estudio Legal · Buenos Aires, Argentina.</p>
      </footer>
    </div>
  );
}
