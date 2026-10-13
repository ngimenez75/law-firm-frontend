"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "5491155550000";
  const defaultMessage = encodeURIComponent(
    "Hola, me comunico desde la web de Estudio Legal para hacer una consulta sobre mi caso."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Atención rápida por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Contactar al Estudio Legal por WhatsApp"
      >
        {/* Anillo de pulso sutil */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:opacity-0" />

        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        <span className="hidden sm:inline font-semibold text-sm tracking-wide">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
