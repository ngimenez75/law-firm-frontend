"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

export function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "siniestros",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de envío
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "siniestros",
        mensaje: "",
      });
    }, 600);
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 bg-[var(--background)] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Columna Izquierda: Datos de Contacto Directo */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Atención Inmediata
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                Contactanos
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Contanos tu situación. Evaluamos la viabilidad jurídica de tu caso de forma confidencial y sin costo inicial de apertura de carpeta.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-slate-800 shrink-0">
                  <Phone className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    Línea Telefónica Directa
                  </h3>
                  <a
                    href="tel:+541155550000"
                    className="text-sm font-semibold text-slate-800 hover:text-slate-950 transition-colors"
                  >
                    +54 11 5555 0000
                  </a>
                  <p className="text-xs text-slate-500">Lunes a Viernes de 9 a 18 hs</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-slate-800 shrink-0">
                  <Mail className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    Correo Electrónico
                  </h3>
                  <a
                    href="mailto:contacto@estudiolegal.ar"
                    className="text-sm font-semibold text-slate-800 hover:text-slate-950 transition-colors"
                  >
                    contacto@estudiolegal.ar
                  </a>
                  <p className="text-xs text-slate-500">Respuesta en menos de 24 hs hábiles</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-slate-800 shrink-0">
                  <MapPin className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    Oficinas Centrales
                  </h3>
                  <p className="text-sm text-slate-800">
                    Av. Corrientes 1250, Piso 8, CABA
                  </p>
                  <p className="text-xs text-slate-500">Reuniones presenciales con cita previa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-slate-800 shrink-0">
                  <Clock className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    Guardia de Urgencias Penales
                  </h3>
                  <p className="text-sm text-slate-800">Atención 24/7 vía WhatsApp</p>
                  <p className="text-xs text-slate-500">Detenciones e indagatorias en CABA y PBA</p>
                </div>
              </div>
            </div>

            {/* Redes y presencia */}
            <div className="pt-4 border-t border-stone-200">
              <span className="text-xs text-slate-500 block mb-2 font-medium">
                Canales oficiales:
              </span>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 underline underline-offset-2"
                >
                  @estudiolegal
                </a>
                <span>·</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 underline underline-offset-2"
                >
                  /company/estudio-legal
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario Minimal */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 shadow-sm">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Envianos tu consulta
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Completá los campos y un abogado de la materia se pondrá en contacto con vos a la brevedad.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-3 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-stone-50 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-stone-100" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    ¡Consulta enviada con éxito!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Recibimos tus datos correctamente. Nuestro equipo revisará la documentación preliminar y te contactará en las próximas horas.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-slate-800 hover:text-slate-950 underline underline-offset-4"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="nombre"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                      >
                        Nombre y Apellido *
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        placeholder="Ej: Juan Pérez"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                      >
                        Correo Electrónico *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="juanperez@ejemplo.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="telefono"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                      >
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                        placeholder="+54 11 ..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="asunto"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                      >
                        Área de Consulta
                      </label>
                      <select
                        id="asunto"
                        value={formData.asunto}
                        onChange={(e) =>
                          setFormData({ ...formData, asunto: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                      >
                        <option value="siniestros">Siniestros y Accidentes de Tránsito</option>
                        <option value="laboral">Derecho Laboral y Despidos</option>
                        <option value="familia">Derecho de Familia y Sucesiones</option>
                        <option value="penal">Derecho Penal</option>
                        <option value="otro">Otras consultas jurídicas</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="mensaje"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                    >
                      Mensaje / Breve descripción del caso *
                    </label>
                    <textarea
                      id="mensaje"
                      rows={4}
                      required
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      placeholder="Contanos qué ocurrió, fechas aproximadas y si ya intervinieron aseguradoras o letrados..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-stone-50 border border-stone-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all resize-y"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Tus datos están protegidos bajo secreto profesional y confidencialidad letrada conforme Ley 23.187.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-lg bg-slate-900 hover:bg-slate-800 text-stone-50 font-medium text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Enviando consulta...</span>
                    ) : (
                      <>
                        <span>Enviar consulta</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
