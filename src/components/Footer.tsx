"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Shield,
  CheckCircle2,
} from "lucide-react";

export function Footer() {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingStatus, setTrackingStatus] = useState<string | null>(null);

  const handleTrackingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    // Simulación de búsqueda de expediente
    setTrackingStatus(
      `Expediente ${trackingCode.toUpperCase()}: En trámite de mediación prejudicial. Última actualización hoy a las 11:30 hs.`
    );
  };

  return (
    <footer className="bg-white border-t border-stone-200 text-slate-800">
      {/* Strip de Seguimiento */}
      <section
        id="seguimiento"
        className="bg-stone-100 border-b border-stone-200 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-slate-700 border border-stone-200 mb-3">
            <Search className="w-3.5 h-3.5 text-slate-600" />
            Portal de Clientes
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-2">
            Consultá el estado de tu trámite
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Ingresá tu número de seguimiento (ej: <span className="font-mono font-medium text-slate-800">SIN-0492</span>) para conocer las últimas novedades procesales de tu caso.
          </p>

          <form
            onSubmit={handleTrackingSearch}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="N° de seguimiento (ej: SIN-0492)"
                className="w-full px-4 py-3 text-sm rounded-lg bg-white border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-900 text-stone-50 hover:bg-slate-800 text-sm font-medium transition-colors shadow-xs shrink-0 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Consultar</span>
            </button>
          </form>

          {trackingStatus && (
            <div className="mt-4 p-4 rounded-lg bg-white border border-stone-200 text-slate-800 text-sm max-w-md mx-auto text-left flex items-start gap-3 shadow-xs animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900">Estado del expediente:</p>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{trackingStatus}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Columna 1: Identidad y Valores */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-header.png"
                alt="Giordano · Lopez · García Lepez - Estudio Jurídico"
                width={400}
                height={90}
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Práctica jurídica integral orientada a la resolución ágil y efectiva de controversias. Combinamos rigor dogmático tradicional con herramientas de gestión digital transparente.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>Colegio de Abogados de Córdoba (CAC)</p>
              <p>Tribunales Ordinarios de la Provincia de Córdoba</p>
            </div>
          </div>

          {/* Columna 2: Datos de Oficina */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-navy">
              Sede Central
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-700 shrink-0 mt-1" />
                <span>
                  Ayacucho 367, Piso 11 A<br />
                  Centro, X5000 Córdoba Capital
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-700 shrink-0" />
                <a
                  href="tel:+5493515550000"
                  className="hover:text-slate-900 transition-colors"
                >
                  +54 9 351 555 0000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-700 shrink-0" />
                <a
                  href="mailto:contacto@estudiolegal.ar"
                  className="hover:text-slate-900 transition-colors"
                >
                  contacto@estudiolegal.ar
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span>Lunes a Viernes de 9:00 a 18:00 hs</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Mapa interactivo / OpenStreetMap */}
          <div className="lg:col-span-3 space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-navy flex items-center justify-between">
              <span>Ubicación</span>
              <a
                href="https://www.openstreetmap.org/?mlat=-31.4185956&mlon=-64.191057949#map=16/-31.4185956/-64.191057949"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-normal text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>Ver mapa</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </h3>
            <div className="rounded-lg overflow-hidden border border-stone-200 bg-stone-100 h-36 relative">
              <iframe
                title="Mapa de ubicación en Córdoba Capital"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-64.1965%2C-31.4225%2C-64.1855%2C-31.4145&amp;layer=mapnik&amp;marker=-31.4185956%2C-64.191057949"
                className="w-full h-full filter saturate-50 contrast-90"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              A metros de La Cañada y a minutos del Palacio de Justicia I (Tribunales de Córdoba).
            </p>
          </div>

          {/* Columna 4: Data Fiscal AFIP / ARCA */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-navy">
              Cumplimiento
            </h3>
            {/* Tarjeta simulada de Data Fiscal ARCA/AFIP 960/D.F. */}
            <div className="bg-stone-50 border border-stone-300 rounded-lg p-3 text-center space-y-2 shadow-xs">
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                <Shield className="w-3 h-3 text-slate-700" />
                <span>Data Fiscal</span>
              </div>
              {/* QR Simulado */}
              <div className="w-20 h-20 mx-auto bg-white p-1 border border-stone-200 rounded flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-slate-900 fill-current"
                  aria-label="Código QR Data Fiscal"
                >
                  <rect x="0" y="0" width="30" height="30" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" />

                  <rect x="70" y="0" width="30" height="30" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" />

                  <rect x="0" y="70" width="30" height="30" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" />

                  <rect x="40" y="10" width="10" height="20" />
                  <rect x="55" y="15" width="10" height="10" />
                  <rect x="40" y="40" width="20" height="20" />
                  <rect x="10" y="45" width="15" height="10" />
                  <rect x="70" y="45" width="20" height="10" />
                  <rect x="40" y="70" width="10" height="20" />
                  <rect x="60" y="70" width="25" height="10" />
                  <rect x="75" y="85" width="15" height="10" />
                </svg>
              </div>
              <div className="text-[9px] text-slate-500 uppercase tracking-tight">
                Formulario 960/D.F.
                <br />
                República Argentina
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Giordano, Lopez & García Lepez. Todos los derechos reservados.
            Córdoba, Argentina.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/#quienes-somos"
              className="hover:text-slate-800 transition-colors"
            >
              Términos de Servicio
            </Link>
            <Link
              href="/#quienes-somos"
              className="hover:text-slate-800 transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/admin"
              className="text-[11px] text-stone-400 hover:text-slate-700 transition-colors underline-offset-2 hover:underline"
              title="Panel de administración y gestión interna de expedientes"
            >
              Acceso Interno
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
