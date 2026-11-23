"use client";

import React, { useState } from "react";
import { Users, Search, UserPlus, Phone, Mail, Building, FileText } from "lucide-react";
import { MOCK_CLIENTS_LIST } from "@/lib/mock-dashboard-data";

export default function ClientesPage() {
  const [search, setSearch] = useState("");

  const filteredClients = MOCK_CLIENTS_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.doc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-navy-900 text-cream-50">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-navy-950">
                Directorio de Clientes
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-navy-900 text-cream-100">
                {MOCK_CLIENTS_LIST.length} Activos
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Padrón unificado de representados, empresas y particulares (Party Model 3FN)
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-cream-50 bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 text-[#B5985E]" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* Buscador */}
      <div className="bg-cream-50 rounded-xl border border-cream-300 p-4 shadow-xs">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, código de cliente o CUIT/DNI..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-cream-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E]"
          />
        </div>
      </div>

      {/* Listado de Tarjetas de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-cream-50 rounded-xl border border-cream-300 p-5 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-navy-900 bg-cream-200/80 px-2 py-0.5 rounded">
                  {client.code}
                </span>
                <span className="text-xs text-slate-500 font-mono">{client.doc}</span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-navy-950 mb-1">
                {client.name}
              </h3>
              <p className="text-xs text-slate-500">Representado con poder judicial otorgado</p>
            </div>

            <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Expedientes activos: 1</span>
              <button
                type="button"
                className="text-xs font-semibold text-navy-900 hover:text-[#B5985E] transition-colors"
              >
                Ver Legajo →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
