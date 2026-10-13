"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  User,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  FileText,
  CheckCircle2,
} from "lucide-react";

export function ReclamoWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Estado del formulario
  const [formData, setFormData] = useState({
    // Paso 1: Identificación
    rol: "damnificado" as "damnificado" | "productor",
    matriculaProductor: "",
    // Paso 2: Datos del siniestro
    fechaSiniestro: "",
    ubicacion: "",
    tipoSiniestro: "accidente_transito",
    descripcion: "",
    // Paso 3: Datos de contacto
    nombreCompleto: "",
    dni: "",
    telefono: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (formData.rol === "productor" && !formData.matriculaProductor.trim()) {
        newErrors.matriculaProductor = "Ingresá tu matrícula o código de productor SSN.";
      }
    } else if (currentStep === 2) {
      if (!formData.fechaSiniestro) {
        newErrors.fechaSiniestro = "Seleccioná la fecha aproximada del hecho.";
      }
      if (!formData.ubicacion.trim()) {
        newErrors.ubicacion = "Indicá la localidad o dirección donde ocurrió.";
      }
      if (!formData.descripcion.trim()) {
        newErrors.descripcion = "Escribí una breve descripción de lo ocurrido.";
      }
    } else if (currentStep === 3) {
      if (!formData.nombreCompleto.trim()) {
        newErrors.nombreCompleto = "Completá tu nombre y apellido.";
      }
      if (!formData.dni.trim()) {
        newErrors.dni = "Ingresá tu DNI o CUIT.";
      }
      if (!formData.telefono.trim()) {
        newErrors.telefono = "Ingresá un teléfono de contacto.";
      }
      if (!formData.email.trim() || !formData.email.includes("@")) {
        newErrors.email = "Ingresá un correo electrónico válido.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep((prev) => (prev + 1) as 1 | 2 | 3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Guardar temporalmente en sessionStorage para que /acuerdo lo lea
      if (typeof window !== "undefined") {
        sessionStorage.setItem("estudiolegal_reclamo", JSON.stringify(formData));
      }
      // Navegar a la pantalla final de acuerdo
      router.push(
        `/acuerdo?nombre=${encodeURIComponent(formData.nombreCompleto)}&dni=${encodeURIComponent(
          formData.dni
        )}&tipo=${encodeURIComponent(formData.tipoSiniestro)}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Simplificado del Wizard */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between pb-8">
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
          <ShieldCheck className="w-4 h-4 text-slate-700" />
          <span className="hidden sm:inline">Gestión Digital Segura</span>
        </div>
      </header>

      {/* Tarjeta Principal del Wizard */}
      <main className="max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-10">
          {/* Indicador Visual de Pasos (1 / 2 / 3) */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {/* Línea conectora */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 -z-0" />
              <div
                className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-900 transition-all duration-300 -z-0"
                style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "calc(100% - 3rem)" }}
              />

              {/* Paso 1 */}
              <div className="flex flex-col items-center gap-1.5 z-10 bg-white px-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= 1
                      ? "bg-slate-900 text-white"
                      : "bg-stone-100 text-slate-400 border border-stone-300"
                  }`}
                >
                  {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
                </div>
                <span className="text-[11px] font-medium text-slate-700 hidden sm:block">
                  Identificación
                </span>
              </div>

              {/* Paso 2 */}
              <div className="flex flex-col items-center gap-1.5 z-10 bg-white px-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= 2
                      ? "bg-slate-900 text-white"
                      : "bg-stone-100 text-slate-400 border border-stone-300"
                  }`}
                >
                  {step > 2 ? <CheckCircle2 className="w-4 h-4" /> : "2"}
                </div>
                <span className="text-[11px] font-medium text-slate-700 hidden sm:block">
                  Siniestro
                </span>
              </div>

              {/* Paso 3 */}
              <div className="flex flex-col items-center gap-1.5 z-10 bg-white px-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step === 3
                      ? "bg-slate-900 text-white"
                      : "bg-stone-100 text-slate-400 border border-stone-300"
                  }`}
                >
                  3
                </div>
                <span className="text-[11px] font-medium text-slate-700 hidden sm:block">
                  Contacto
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* PASO 1: IDENTIFICACIÓN */}
          {/* ======================================================== */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Paso 1 de 3
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  ¿Quién inicia el reclamo?
                </h1>
                <p className="text-sm text-slate-600 mt-1.5">
                  Seleccioná tu rol para adecuar los requerimientos legales de la gestión.
                </p>
              </div>

              {/* Dos Cards Grandes Clickeables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, rol: "damnificado" })}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 focus:outline-none focus:ring-2 focus:ring-slate-900 ${
                    formData.rol === "damnificado"
                      ? "border-slate-900 bg-stone-50 ring-1 ring-slate-900"
                      : "border-stone-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-stone-100 text-slate-900 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Soy el Damnificado</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Fui víctima directa de un accidente, despido laboral o perjuicio patrimonial.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        formData.rol === "damnificado"
                          ? "border-slate-900 bg-slate-900"
                          : "border-stone-300"
                      }`}
                    >
                      {formData.rol === "damnificado" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span>Seleccionar opción</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, rol: "productor" })}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 focus:outline-none focus:ring-2 focus:ring-slate-900 ${
                    formData.rol === "productor"
                      ? "border-slate-900 bg-stone-50 ring-1 ring-slate-900"
                      : "border-stone-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-stone-100 text-slate-900 flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Soy Productor de Seguros</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Gestiono la derivación profesional de un siniestro en favor de mi asegurado.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        formData.rol === "productor"
                          ? "border-slate-900 bg-slate-900"
                          : "border-stone-300"
                      }`}
                    >
                      {formData.rol === "productor" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span>Seleccionar opción</span>
                  </div>
                </button>
              </div>

              {/* Input Condicional para Productor */}
              {formData.rol === "productor" && (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 animate-in fade-in duration-200">
                  <label
                    htmlFor="matricula"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Código de Productor o Matrícula SSN *
                  </label>
                  <input
                    id="matricula"
                    type="text"
                    value={formData.matriculaProductor}
                    onChange={(e) =>
                      setFormData({ ...formData, matriculaProductor: e.target.value })
                    }
                    placeholder="Ej: 84920 o CUIT organizador"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-stone-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  {errors.matriculaProductor && (
                    <p className="text-xs text-red-600">{errors.matriculaProductor}</p>
                  )}
                  <p className="text-[11px] text-slate-500">
                    Permite asociar la liquidación de honorarios compartidos conforme convenio de colaboración.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* PASO 2: DATOS DEL SINIESTRO */}
          {/* ======================================================== */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Paso 2 de 3
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Datos del Siniestro o Hecho
                </h1>
                <p className="text-sm text-slate-600 mt-1.5">
                  Completá la información del evento para que nuestros peritos evalúen el caso.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="fechaSiniestro"
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-600" />
                    <span>Fecha del Accidente o Hecho *</span>
                  </label>
                  <input
                    id="fechaSiniestro"
                    type="date"
                    value={formData.fechaSiniestro}
                    onChange={(e) =>
                      setFormData({ ...formData, fechaSiniestro: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  {errors.fechaSiniestro && (
                    <p className="text-xs text-red-600">{errors.fechaSiniestro}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="tipoSiniestro"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Tipo de Materia / Fuero
                  </label>
                  <select
                    id="tipoSiniestro"
                    value={formData.tipoSiniestro}
                    onChange={(e) =>
                      setFormData({ ...formData, tipoSiniestro: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="accidente_transito">Accidente de Tránsito / Daños</option>
                    <option value="laboral">Despido / Conflicto Laboral</option>
                    <option value="art">Accidente de Trabajo (ART)</option>
                    <option value="familia">Familia / Sucesiones</option>
                    <option value="otro">Otro reclamo patrimonial</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="ubicacion"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  <span>Ubicación o Jurisdicción *</span>
                </label>
                <input
                  id="ubicacion"
                  type="text"
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                  placeholder="Ej: Av. del Libertador y Av. Callao, Recoleta, CABA"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                {errors.ubicacion && (
                  <p className="text-xs text-red-600">{errors.ubicacion}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="descripcion"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-600" />
                  <span>Descripción Breve de lo Ocurrido *</span>
                </label>
                <textarea
                  id="descripcion"
                  rows={4}
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  placeholder="Explicá sucintamente qué ocurrió, vehículos o empresas involucradas, y si existieron lesiones..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-y"
                />
                {errors.descripcion && (
                  <p className="text-xs text-red-600">{errors.descripcion}</p>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* PASO 3: DATOS DE CONTACTO */}
          {/* ======================================================== */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Paso 3 de 3
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Datos de la Persona Representada
                </h1>
                <p className="text-sm text-slate-600 mt-1.5">
                  Esta información se utilizará para confeccionar el instrumento de representación legal.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="nombreCompleto"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Nombre y Apellido Completo *
                  </label>
                  <input
                    id="nombreCompleto"
                    type="text"
                    value={formData.nombreCompleto}
                    onChange={(e) =>
                      setFormData({ ...formData, nombreCompleto: e.target.value })
                    }
                    placeholder="Ej: Juan Carlos Pérez"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  {errors.nombreCompleto && (
                    <p className="text-xs text-red-600">{errors.nombreCompleto}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="dni"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                    >
                      DNI o CUIT *
                    </label>
                    <input
                      id="dni"
                      type="text"
                      value={formData.dni}
                      onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                      placeholder="Ej: 35.849.201"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    {errors.dni && <p className="text-xs text-red-600">{errors.dni}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="telefono"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                    >
                      Teléfono Móvil (WhatsApp) *
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({ ...formData, telefono: e.target.value })
                      }
                      placeholder="+54 9 11 ..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    {errors.telefono && (
                      <p className="text-xs text-red-600">{errors.telefono}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="juanperez@ejemplo.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Botones de Navegación del Wizard */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-slate-800 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Atrás</span>
              </button>
            ) : (
              <Link
                href="/"
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Cancelar y volver
              </Link>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-stone-50 text-sm font-medium transition-colors shadow-xs ml-auto"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-stone-50 text-sm font-semibold transition-colors shadow-xs ml-auto"
              >
                <span>Generar Acuerdo de Representación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer del Wizard */}
      <footer className="max-w-2xl mx-auto w-full text-center pt-8 text-xs text-slate-500">
        <p>
          Protección de datos personales conforme Ley 25.326. Toda la información suministrada se encuentra bajo amparo del secreto profesional letrado.
        </p>
      </footer>
    </div>
  );
}
