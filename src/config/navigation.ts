import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Briefcase,
  CalendarClock,
  ShieldAlert,
  Users,
  UserCog,
} from "lucide-react";
import type { UserRole, BadgeVariant } from "@/types";

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
  badge?: string;
  badgeVariant?: BadgeVariant;
  disabled?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const NAVIGATION_CONFIG: NavigationSection[] = [
  {
    title: "Gestión Principal",
    items: [
      {
        id: "dashboard",
        name: "Panel General",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["ROLE_ADMIN", "ROLE_LAWYER", "ROLE_PARALEGAL"],
      },
      {
        id: "casos",
        name: "Expedientes y Causas",
        href: "/dashboard/casos",
        icon: Briefcase,
        roles: ["ROLE_ADMIN", "ROLE_LAWYER", "ROLE_PARALEGAL", "ROLE_CLIENT"],
        badge: "24",
      },
      {
        id: "plazos",
        name: "Agenda y Plazos",
        href: "/dashboard/plazos",
        icon: CalendarClock,
        roles: ["ROLE_ADMIN", "ROLE_LAWYER", "ROLE_PARALEGAL"],
        badge: "3 Fatales",
        badgeVariant: "rose",
      },
      {
        id: "siniestros",
        name: "Siniestros & Acuerdos",
        href: "/dashboard/siniestros",
        icon: ShieldAlert,
        roles: ["ROLE_ADMIN", "ROLE_LAWYER", "ROLE_PARALEGAL"],
        badge: "Próx.",
        disabled: false,
      },
      {
        id: "clientes",
        name: "Directorio Clientes",
        href: "/dashboard/clientes",
        icon: Users,
        roles: ["ROLE_ADMIN", "ROLE_LAWYER", "ROLE_PARALEGAL"],
      },
    ],
  },
  {
    title: "Administración",
    items: [
      {
        id: "equipo",
        name: "Equipo y Roles",
        href: "/dashboard/equipo",
        icon: UserCog,
        roles: ["ROLE_ADMIN"],
      },
    ],
  },
];

/**
 * Filtra los ítems de navegación según el rol del usuario autenticado.
 * Aplica el principio Open/Closed para añadir fácilmente nuevas secciones o ítems con RBAC.
 */
export function getFilteredNavigation(role: UserRole): NavigationSection[] {
  return NAVIGATION_CONFIG.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.roles.includes(role)),
  })).filter((section) => section.items.length > 0);
}

/**
 * Ítems prioritarios para la barra de navegación móvil en juzgados/tribunales
 */
export const MOBILE_NAV_ITEMS = [
  {
    id: "inicio",
    label: "Inicio",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "casos",
    label: "Causas",
    href: "/dashboard/casos",
    icon: Briefcase,
    badgeCount: "24",
  },
  {
    id: "plazos",
    label: "Plazos",
    href: "/dashboard/plazos",
    icon: CalendarClock,
    hasUrgentAlert: true,
  },
];
