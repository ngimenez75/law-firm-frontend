import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso Profesional | Giordano · Lopez · García Lepez",
  description: "Portal privado para letrados y personal del estudio jurídico.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#071228] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f244d]/30 via-[#071228] to-[#040813] text-stone-100 flex flex-col justify-between selection:bg-[#B5985E]/30 selection:text-white relative overflow-hidden">
      {/* Luz ambiental sutil dorada en la esquina superior */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gradient-to-b from-[#B5985E]/10 to-transparent blur-3xl pointer-events-none"
      />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Pie de seguridad institucional */}
      <footer className="w-full py-6 px-4 text-center text-xs text-slate-400/80 border-t border-slate-800/60 relative z-10">
        <p className="tracking-wide">
          © {new Date().getFullYear()} Giordano · Lopez · García Lepez. Todos los derechos reservados.
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Acceso estrictamente reservado a letrados y personal autorizado · Conexión cifrada de extremo a extremo
        </p>
      </footer>
    </div>
  );
}
