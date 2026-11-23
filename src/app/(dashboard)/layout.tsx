import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const metadata: Metadata = {
  title: "Panel de Gestión | Giordano · Lopez · García Lepez",
  description:
    "Sistema de gestión judicial para letrados y procuradores. Control de plazos perentorios y seguimiento de expedientes.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
