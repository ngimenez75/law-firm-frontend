import Link from "next/link";
import { Car, Briefcase, HeartHandshake, Gavel, ArrowRight } from "lucide-react";

const AREAS = [
  {
    icon: Car,
    title: "Siniestros y Accidentes",
    badge: "Alta resolución extrajudicial",
    description:
      "Reclamos a compañías de seguros por accidentes viales, peatones, ciclistas y daños materiales o corporales. Negociación directa para cobrar sin demoras judiciales.",
    items: [
      "Peritaje de daños y lesiones",
      "Reclamo de terceros y franquicias",
      "Accidentes de tránsito graves",
    ],
  },
  {
    icon: Briefcase,
    title: "Derecho Laboral",
    badge: "Trabajadores y Empresas",
    description:
      "Defensa y asesoramiento ante despidos sin causa, diferencias salariales, trabajo no registrado ('en negro') y contingencias ante la Superintendencia de Riesgos del Trabajo (ART).",
    items: [
      "Cálculo de indemnizaciones",
      "Accidentes laborales y ART",
      "Audiencias SECLO y mediaciones",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Derecho de Familia",
    badge: "Acompañamiento empático",
    description:
      "Gestión de trámites sucesorios, acuerdos de divorcio, fijación o actualización de cuota de alimentos y regímenes de comunicación y cuidado compartido de hijos.",
    items: [
      "Sucesiones ab-intestato y testamentarias",
      "Divorcios y liquidación conyugal",
      "Alimentos y régimen parental",
    ],
  },
  {
    icon: Gavel,
    title: "Derecho Penal y Compliance",
    badge: "Atención urgente",
    description:
      "Asistencia letrada en indagatorias, excarcelaciones, constitución como querellante particular en delitos contra la propiedad y asesoramiento en penal económico.",
    items: [
      "Defensas y querellas penales",
      "Delitos económicos y estafas",
      "Excarcelaciones y recursos de casación",
    ],
  },
];

export function AreasPractica() {
  return (
    <section id="areas" className="py-20 sm:py-28 bg-[var(--background)] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Especialidades Jurídicas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Áreas de Práctica
          </h2>
          <p className="text-base text-slate-600">
            Enfoque técnico especializado en las ramas más críticas del derecho privado y público en los fueros de Córdoba Capital y Provincia de Córdoba.
          </p>
        </div>

        {/* Grilla de 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-gold/60 transition-all duration-200 shadow-xs hover:shadow-sm group"
              >
                <div className="space-y-4">
                  {/* Icono + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center group-hover:bg-slate-900 group-hover:text-stone-50 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-medium text-slate-500 block">
                      {area.badge}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-navy">
                      {area.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {area.description}
                  </p>

                  <ul className="pt-2 border-t border-stone-100 space-y-1.5 text-xs text-slate-600">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-stone-100">
                  <Link
                    href="/reclamo"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-slate-950 group/link"
                  >
                    <span>Iniciar reclamo en esta materia</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer de la sección */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600">
            ¿Tenés un caso de otra especialidad o necesitás asesoramiento a medida?{" "}
            <Link
              href="#contacto"
              className="font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-700"
            >
              Contactanos directamente
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
