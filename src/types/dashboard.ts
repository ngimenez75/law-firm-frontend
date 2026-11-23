import type { UserRole } from "./auth";

export type { UserRole };

export type BadgeVariant = "rose" | "amber" | "sage" | "mist" | "lavender";

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  role: UserRole;
}

export interface KpiCardItem {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  variant: BadgeVariant;
  changeLabel?: string;
}

export interface UrgentDeadlineItem {
  id: string;
  expediente: string;
  caratula: string;
  fuero: string;
  responsable: string;
  badgeText: string;
  badgeVariant: BadgeVariant;
  diasRestantes?: number;
  esFatal?: boolean;
}

export interface FueroDistributionItem {
  id: string;
  fuero: string;
  cantidad: number;
  porcentaje: number;
  colorVariant: BadgeVariant;
}

export interface RecentCaseItem {
  id: string;
  codigo: string;
  expediente: string;
  caratula: string;
  cliente: string;
  fuero: string;
  responsable: string;
  estado: string;
  estadoVariant: BadgeVariant;
  ultimoMovimiento: string;
  fechaActualizacion?: string;
}
