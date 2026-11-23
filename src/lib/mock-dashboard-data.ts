import type {
  KpiCardItem,
  UrgentDeadlineItem,
  FueroDistributionItem,
  RecentCaseItem,
  AuthUser,
} from "@/types";

/**
 * Usuario predeterminado utilizado como fallback seguro cuando
 * el backend Spring Boot no está disponible en entornos locales.
 */
export const MOCK_DEFAULT_USER: AuthUser = {
  id: "usr_admin_001",
  email: "sgiordano@estudiolegal.ar",
  firstName: "Sofía",
  lastName: "Giordano",
  fullName: "Dra. Sofía Giordano",
  role: "ROLE_ADMIN",
};

/**
 * 4 Tarjetas KPI principales en tonos pastel desaturados
 */
export const MOCK_KPIS: KpiCardItem[] = [
  {
    id: "kpi_fatales_hoy",
    title: "Plazos Fatales / Hoy",
    value: 3,
    subtitle: "2 vencen a las 10:00 hs (Cargo)",
    variant: "rose",
  },
  {
    id: "kpi_vencimientos_semana",
    title: "Vencimientos Semana",
    value: 8,
    subtitle: "4 audiencias · 4 traslados",
    variant: "amber",
  },
  {
    id: "kpi_causas_tramite",
    title: "Causas en Trámite",
    value: 24,
    subtitle: "3 pendientes de sorteo SAC",
    variant: "mist",
  },
  {
    id: "kpi_concluidos_semestre",
    title: "Concluidos (Semestre)",
    value: 11,
    subtitle: "7 acuerdos · 4 sentencias",
    variant: "sage",
  },
];

/**
 * Agenda Prioritaria de Vencimientos y Audiencias
 */
export const MOCK_URGENT_DEADLINES: UrgentDeadlineItem[] = [
  {
    id: "dl_01",
    expediente: "EXP-3102/2025",
    caratula: "Presentación de Alegatos — Consorcio Edificio Sol c/ Ruarte",
    fuero: "Civil y Comercial",
    responsable: "Dr. Martínez",
    badgeText: "Plazo Fatal · Hoy 10:00 hs",
    badgeVariant: "rose",
    esFatal: true,
  },
  {
    id: "dl_02",
    expediente: "EXP-1045/2025",
    caratula: "Contestación de Traslado Pericia — Pérez c/ Aseguradora S.A.",
    fuero: "Civil y Comercial",
    responsable: "Dra. Giordano",
    badgeText: "Vence Hoy",
    badgeVariant: "rose",
    esFatal: true,
  },
  {
    id: "dl_03",
    expediente: "EXP-1830/2026",
    caratula: "Audiencia Preliminar de Conciliación — Metalúrgica SRL c/ Sindicato",
    fuero: "Laboral",
    responsable: "Dr. López",
    badgeText: "En 48 hs (Jueves)",
    badgeVariant: "amber",
    esFatal: false,
  },
  {
    id: "dl_04",
    expediente: "EXP-2389/2025",
    caratula: "Denuncia de Bienes y Títulos — Giménez, María s/ Sucesión",
    fuero: "Familia y Sucesiones",
    responsable: "Dra. García Lepez",
    badgeText: "En Plazo (+4 días)",
    badgeVariant: "sage",
    esFatal: false,
  },
];

/**
 * Distribución de Cartera por Fuero (para barras de progreso CSS puras)
 */
export const MOCK_FUERO_DISTRIBUTION: FueroDistributionItem[] = [
  {
    id: "fuero_civ",
    fuero: "Civil y Comercial (Daños / Seguros)",
    cantidad: 10,
    porcentaje: 42,
    colorVariant: "mist",
  },
  {
    id: "fuero_lab",
    fuero: "Laboral y ART",
    cantidad: 6,
    porcentaje: 25,
    colorVariant: "lavender",
  },
  {
    id: "fuero_fam",
    fuero: "Familia y Sucesiones",
    cantidad: 5,
    porcentaje: 21,
    colorVariant: "sage",
  },
  {
    id: "fuero_adm",
    fuero: "Contencioso Admin. / Federal",
    cantidad: 3,
    porcentaje: 12,
    colorVariant: "amber",
  },
];

/**
 * Causas con Actividad Reciente
 */
export const MOCK_RECENT_CASES: RecentCaseItem[] = [
  {
    id: "cas_004",
    codigo: "CAS-004",
    expediente: "Pendiente sorteo SAC",
    caratula: "Consorcio Edificio Sol c/ Ruarte",
    cliente: "Consorcio Sol (CLI-0014)",
    fuero: "Civil y Comercial",
    responsable: "Dr. Martínez",
    estado: "En Trámite",
    estadoVariant: "mist",
    ultimoMovimiento: "Mandamiento de intimación diligenciado",
    fechaActualizacion: "Hoy 09:15 hs",
  },
  {
    id: "cas_006",
    codigo: "CAS-006",
    expediente: "EXP-1520/2026",
    caratula: "Fernández c/ Banco Provincia",
    cliente: "Esteban Fernández (CLI-0021)",
    fuero: "Cont. Administrativo",
    responsable: "Dra. Giordano",
    estado: "Medida Cautelar",
    estadoVariant: "mist",
    ultimoMovimiento: "Medida cautelar vigente · Apelación en curso",
    fechaActualizacion: "Ayer 17:40 hs",
  },
  {
    id: "cas_005",
    codigo: "CAS-005",
    expediente: "EXP-0890/2024",
    caratula: "Rodríguez, Ana s/ Divorcio Vincular",
    cliente: "Ana Rodríguez (CLI-0008)",
    fuero: "Familia y Sucesiones",
    responsable: "Dra. García Lepez",
    estado: "Homologado",
    estadoVariant: "sage",
    ultimoMovimiento: "Convenio regulador homologado · Regulación honorarios",
    fechaActualizacion: "Hace 2 días",
  },
];

/**
 * Catálogos de apoyo para formularios y modales (Party/Role 3FN)
 */
export const MOCK_CLIENTS_LIST = [
  { id: "cli_0014", name: "Consorcio Edificio Sol", code: "CLI-0014", doc: "CUIT 30-71458921-9" },
  { id: "cli_0021", name: "Esteban Fernández", code: "CLI-0021", doc: "DNI 28.941.520" },
  { id: "cli_0008", name: "Ana Rodríguez", code: "CLI-0008", doc: "DNI 34.112.908" },
  { id: "cli_0033", name: "Metalúrgica Córdoba SRL", code: "CLI-0033", doc: "CUIT 30-68941258-4" },
  { id: "cli_0045", name: "Martín Pérez", code: "CLI-0045", doc: "DNI 32.551.442" },
];

export const MOCK_LAWYERS_LIST = [
  { id: "law_01", name: "Dra. Sofía Giordano", role: "Socia Titular — Civil / Daños" },
  { id: "law_02", name: "Dr. Marcelo López", role: "Socio — Laboral / ART" },
  { id: "law_03", name: "Dra. Valeria García Lepez", role: "Socia — Familia / Sucesiones" },
  { id: "law_04", name: "Dr. Ignacio Martínez", role: "Asociado Senior — Litigios" },
];

export const MOCK_FUEROS_OPTIONS = [
  "Civil y Comercial",
  "Laboral y ART",
  "Familia y Sucesiones",
  "Contencioso Administrativo",
  "Penal Económico",
];
