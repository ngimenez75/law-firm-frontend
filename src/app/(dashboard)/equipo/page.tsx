"use client";

import React from "react";
import { UserCog, Shield, UserPlus, Mail, Award, CheckCircle2 } from "lucide-react";
import { MOCK_LAWYERS_LIST } from "@/lib/mock-dashboard-data";

const TEAM_MEMBERS = [
  {
    id: "mem_01",
    name: "Dra. Sofía Giordano",
    email: "sgiordano@estudiolegal.ar",
    role: "Socia Administradora",
    roleCode: "ROLE_ADMIN",
    matricula: "MP 1-38491 (Cba)",
    especialidad: "Daños y Perjuicios · Seguros",
  },
  {
    id: "mem_02",
    name: "Dr. Marcelo López",
    email: "mlopez@estudiolegal.ar",
    role: "Socio Titular",
    roleCode: "ROLE_LAWYER",
    matricula: "MP 1-32104 (Cba)",
    especialidad: "Derecho Laboral · ART · Indemnizaciones",
  },
  {
    id: "mem_03",
    name: "Dra. Valeria García Lepez",
    email: "vgarcia@estudiolegal.ar",
    role: "Socia Titular",
    roleCode: "ROLE_LAWYER",
    matricula: "MP 1-40219 (Cba)",
    especialidad: "Familia · Sucesiones y Partición",
  },
  {
    id: "mem_04",
    name: "Dr. Ignacio Martínez",
    email: "imartinez@estudiolegal.ar",
    role: "Abogado Asociado Senior",
    roleCode: "ROLE_LAWYER",
    matricula: "MP 1-45812 (Cba)",
    especialidad: "Litigios Civiles y Comerciales",
  },
];

export default function EquipoPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-navy-900 text-cream-50">
            <UserCog className="w-5 h-5 text-[#B5985E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-navy-950">
                Equipo y Permisos
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-navy-900 text-cream-100 flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#B5985E]" />
                Área de Administración
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Control de roles procesales (RBAC), matrículas profesionales y asignaciones
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-cream-50 bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 text-[#B5985E]" />
          <span>Sumar Miembro</span>
        </button>
      </div>

      {/* Tarjetas de Miembros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="bg-cream-50 rounded-xl border border-cream-300 p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-navy-900 text-[#B5985E] font-serif font-bold text-base flex items-center justify-center shrink-0 border border-cream-300">
                  {member.name.split(" ")[1]?.[0] || "L"}
                  {member.name.split(" ")[2]?.[0] || ""}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-navy-950">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#B5985E] font-medium">{member.role}</p>
                </div>
              </div>

              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cream-200 text-slate-700">
                {member.roleCode}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 bg-cream-100/60 p-3 rounded-lg border border-cream-200">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">{member.matricula}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>
              <p className="text-slate-500 pt-1 border-t border-cream-200">
                Especialidad: <span className="text-slate-700">{member.especialidad}</span>
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Credenciales Activas</span>
              </div>
              <button
                type="button"
                className="font-medium text-navy-900 hover:text-[#B5985E] transition-colors"
              >
                Editar Permisos →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
