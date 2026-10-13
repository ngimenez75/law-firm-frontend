import type { Metadata } from "next";
import { ReclamoWizard } from "@/components/reclamo/ReclamoWizard";

export const metadata: Metadata = {
  title: "Iniciar Reclamo Online | Estudio Legal",
  description:
    "Completá el formulario digital para iniciar la gestión prejudicial o judicial de tu siniestro o reclamo legal en tiempo real.",
  openGraph: {
    title: "Iniciar Reclamo Online | Estudio Legal",
    description: "Gestión digital y seguimiento de expedientes en tiempo real.",
    url: "https://estudiolegal.ar/reclamo",
    type: "website",
  },
};

export default function ReclamoPage() {
  return <ReclamoWizard />;
}
