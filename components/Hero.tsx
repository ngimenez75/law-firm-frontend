import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-32 overflow-hidden bg-[var(--background)] min-h-[620px] flex items-center">
      {/* Fotografía del estudio a la derecha con fundido suave hacia la izquierda (tal como la maqueta) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] pointer-events-none select-none overflow-hidden animate-photo-feeder">
        <Image
          src="/images/estudio-oficina.jpg"
          alt="Despacho de Giordano, Lopez & García Lepez"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center sm:object-[center_right]"
        />
        {/* Máscara de fundido: en mobile funde vertical/horizontal, en desktop de izquierda a transparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/90 lg:via-[var(--background)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent lg:hidden" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="w-full lg:w-1/2 space-y-6 animate-hero-feeder">
          {/* Logo Principal (Versión 2: Vertical / Centrada de la maqueta) */}
          <div className="pt-2">
            <Image
              src="/images/logo-hero.png"
              alt="Giordano · Lopez · García Lepez - Estudio Jurídico"
              width={600}
              height={235}
              priority
              className="h-auto w-full max-w-[420px] sm:max-w-[450px] lg:max-w-[600px] lg:w-[600px] object-contain"
            />
          </div>

          {/* H1 Serif Editorial */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
            Tu respaldo legal,{" "}
            <span className="italic font-serif text-gold block sm:inline">
              ágil y transparente.
            </span>
          </h1>

          {/* Bajada Editorial */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Representamos a damnificados, trabajadores y empresas en litigios civiles, laborales y reclamos de siniestros. Conectate con nuestros letrados y seguí la evolución de tu expediente de punta a punta desde tu celular.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
            <Link
              href="/reclamo"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-slate-900 text-stone-50 hover:bg-slate-800 text-base font-medium shadow-xs transition-colors group"
            >
              <span>Iniciar Reclamo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#seguimiento"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white/90 backdrop-blur-xs border border-stone-300 text-slate-800 hover:bg-white text-base font-medium transition-colors shadow-xs"
            >
              <Search className="w-4 h-4 text-slate-600" />
              <span>Consultar Seguimiento</span>
            </Link>
          </div>

          {/* NOTA DE MEJORA FUTURA (Comentado según solicitud para no perder el código):
              El widget interactivo de 'Expediente Digital #EXP-2026-0492' con avance porcentual
              e hitos periciales se conserva en el repositorio como feature para el portal interno de clientes. */}
        </div>
      </div>
    </section>
  );
}
