import Link from "next/link";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

const NOTICIAS = [
  {
    category: "Derecho Laboral",
    date: "8 de Octubre, 2026",
    title: "Nueva jurisprudencia sobre cálculo de intereses en indemnizaciones por despido",
    summary:
      "La Cámara Nacional del Trabajo emitió un plenario clave actualizando los criterios de aplicación de tasas activas y mecanismos de indexación frente a la inflación.",
    readTime: "4 min de lectura",
  },
  {
    category: "Siniestros Viales",
    date: "28 de Septiembre, 2026",
    title: "Qué documentación exigir inmediatamente en el lugar del accidente de tránsito",
    summary:
      "Una guía práctica paso a paso para evitar el rechazo de cobertura por parte de las aseguradoras y garantizar la validez probatoria de la denuncia de siniestro.",
    readTime: "3 min de lectura",
  },
  {
    category: "Derecho Civil y Familia",
    date: "15 de Septiembre, 2026",
    title: "Digitalización de trámites sucesorios: reducción de plazos en el fuero civil",
    summary:
      "El nuevo sistema de oficios electrónicos y testimonios digitales permite agilizar hasta un 40% la declaratoria de herederos y la inscripción de bienes registrales.",
    readTime: "5 min de lectura",
  },
];

export function Newsletter() {
  return (
    <section id="newsletter" className="py-20 sm:py-28 bg-[var(--background)] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-gold" />
              Doctrina y Actualidad
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
              Novedades Jurídicas
            </h2>
            <p className="text-base text-slate-600">
              Análisis editorial sobre reformas legislativas, fallos relevantes y guías prácticas para el ciudadano común.
            </p>
          </div>

          <div>
            <Link
              href="#newsletter"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 hover:border-slate-400 bg-white text-slate-800 text-sm font-medium transition-colors shadow-xs"
            >
              <span>Ver más noticias</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </Link>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NOTICIAS.map((noticia) => (
            <article
              key={noticia.title}
              className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all duration-200 shadow-xs group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="px-2.5 py-1 rounded-full bg-white border border-stone-200 font-medium text-slate-700">
                    {noticia.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {noticia.date}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-navy group-hover:text-slate-800 transition-colors leading-snug">
                  {noticia.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {noticia.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-400">{noticia.readTime}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-800 group-hover:text-slate-950">
                  <span>Leer nota completa</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
