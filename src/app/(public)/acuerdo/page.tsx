import { Suspense } from "react";
import type { Metadata } from "next";
import { AcuerdoSignerContent } from "@/components/acuerdo/AcuerdoSigner";

export const metadata: Metadata = {
  title: "Firma Digital de Acuerdo | Giordano · Lopez · García Lepez",
  description:
    "Paso final de consentimiento para dar inicio formal a la gestión legal y reclamo prejudicial.",
  openGraph: {
    title: "Firma Digital de Acuerdo | Giordano · Lopez · García Lepez",
    description: "Firma electrónica protegida bajo Ley 25.506.",
    url: "https://estudiolegal.ar/acuerdo",
    type: "website",
  },
};

export default function AcuerdoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf7ee] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-700">Cargando instrumento legal...</p>
          </div>
        </div>
      }
    >
      <AcuerdoSignerContent />
    </Suspense>
  );
}
