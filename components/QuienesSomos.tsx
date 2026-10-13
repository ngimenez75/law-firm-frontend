import Link from "next/link";
import { ArrowRight, Award, GraduationCap, Building2 } from "lucide-react";

const SOCIOS = [
  {
    name: "Dr. Martín E. Álvarez",
    role: "Socio Fundador · Litigios Complejos y Daños",
    education: "Abogado graduado con honores (UBA) · Magíster en Derecho Civil",
    description:
      "Especialista en responsabilidad civil automotriz, siniestros graves y negociaciones prejudiciales ante compañías aseguradoras con más de 15 años de ejercicio activo.",
  },
  {
    name: "Dra. Valentina Rossi",
    role: "Socia Fundadora · Derecho Laboral y Corporativo",
    education: "Abogada (UBA) · Posgrado en Derecho del Trabajo y Relaciones Laborales (UTDT)",
    description:
      "Dedicada a la defensa técnica de trabajadores y empresas en contingencias laborales, reclamos de despidos, accidentes de trabajo y convenios colectivos.",
  },
];

export function QuienesSomos() {
  return (
    <section id="quienes-somos" className="py-20 sm:py-28 bg-[var(--background)] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Columna Izquierda: Introducción */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Quiénes Somos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Una práctica jurídica moderna, sin burocracia ni tecnicismos oscuros.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Fundamos <strong className="text-slate-900 font-semibold">Estudio Legal</strong> con una premisa clara: devolverle al cliente el control y la tranquilidad sobre sus derechos. Eliminamos los expedientes guardados en cajones y las respuestas tardías, incorporando tecnología de gestión directa para que sepas en todo momento qué está pasando con tu reclamo.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nuestro equipo combina el rigor analítico de la escuela procesal clásica con la velocidad de un despacho digital adaptado a las demandas actuales.
            </p>

            <div className="pt-2">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 hover:border-slate-400 bg-white hover:bg-stone-50 text-slate-900 text-sm font-semibold transition-colors shadow-xs"
              >
                <span>Conocé al equipo completo</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Socios Fundadores */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SOCIOS.map((socio) => (
                <div
                  key={socio.name}
                  className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 hover:border-slate-300 transition-colors shadow-xs"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Dirección Legal
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-900">
                      {socio.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-700">
                      {socio.role}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-200/60 text-xs text-slate-600 space-y-2">
                    <p className="flex items-start gap-1.5 font-medium text-slate-800">
                      <GraduationCap className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      <span>{socio.education}</span>
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {socio.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner de Valores Institucionales */}
            <div className="p-6 rounded-xl bg-slate-900 text-stone-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-stone-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Compromiso Ético
                  </span>
                </div>
                <p className="text-sm font-medium text-stone-100">
                  Transparencia arancelaria: pacto de cuotalitis y cobro condicionado al éxito del caso.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2 text-xs text-stone-400">
                <Building2 className="w-4 h-4" />
                <span>Matrículas CPACF / CASI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
