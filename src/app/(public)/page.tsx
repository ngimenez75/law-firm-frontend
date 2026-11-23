import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuienesSomos } from "@/components/QuienesSomos";
import { AreasPractica } from "@/components/AreasPractica";
import { Newsletter } from "@/components/Newsletter";
import { Contacto } from "@/components/Contacto";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-slate-900 selection:bg-slate-200 selection:text-slate-900">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <QuienesSomos />
        <AreasPractica />
        <Newsletter />
        <Contacto />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
