"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage("Por favor completá todos los campos.");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await login({ email: trimmedEmail, password });

      // Verificación de destino según rol autorizado
      if (user.role === "ROLE_ADMIN" || user.role === "ROLE_LAWYER") {
        router.push("/dashboard");
      } else {
        // En caso de que un rol no autorizado (ej: ROLE_CLIENT) intente acceder al panel
        setErrorMessage(
          "Tu usuario no posee permisos de letrado o administrador para acceder a este panel."
        );
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401 || err.status === 403) {
          setErrorMessage("Credenciales incorrectas. Verificá tu correo y contraseña.");
        } else {
          setErrorMessage(err.message || "Ocurrió un error al procesar el inicio de sesión.");
        }
      } else {
        setErrorMessage("No pudimos conectar con el servidor. Comprobá tu conexión a internet.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Botón de retorno al portal público */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors group focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Volver al portal institucional</span>
        </Link>
      </div>

      {/* Tarjeta de Autenticación Mate */}
      <div className="bg-[#0b1730]/95 border border-slate-700/60 rounded-2xl p-6 sm:p-9 shadow-2xl backdrop-blur-md">
        {/* Cabecera del formulario */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Link href="/" tabIndex={-1}>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors inline-block">
                <Image
                  src="/images/logo-header.png"
                  alt="Giordano · Lopez · García Lepez"
                  width={280}
                  height={70}
                  priority
                  className="h-9 w-auto object-contain brightness-0 invert opacity-95"
                />
              </div>
            </Link>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
            Acceso Profesional
          </h1>
          <p className="text-xs sm:text-sm text-slate-300/85">
            Ingresá con tus credenciales seguras para gestionar expedientes y siniestros.
          </p>
        </div>

        {/* Banner de error */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-3.5 rounded-lg bg-red-950/40 border border-red-800/60 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="leading-snug">{errorMessage}</p>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-200 uppercase tracking-wider mb-2"
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abogado@estudiolegal.ar"
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-200 uppercase tracking-wider"
              >
                Contraseña
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={isSubmitting}
                className="w-full pl-10 pr-11 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#B5985E] focus:ring-1 focus:ring-[#B5985E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Botón de Ingreso */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg bg-[#B5985E] hover:bg-[#a6894f] text-[#071228] font-semibold text-sm transition-all duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B5985E] focus:ring-offset-2 focus:ring-offset-[#071228] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#071228]" />
                  <span>Validando credenciales...</span>
                </>
              ) : (
                <span>Ingresar al Sistema</span>
              )}
            </button>
          </div>
        </form>

        {/* Insignia de auditoría y seguridad */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-300/80">
          <ShieldCheck className="w-4 h-4 text-[#B5985E]" />
          <span>Sesión encriptada y monitoreada</span>
        </div>
      </div>
    </div>
  );
}
