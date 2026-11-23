import { apiClient } from "@/lib/api";
import type { LoginRequest, UserResponse } from "@/types/auth";

export const authService = {
  /**
   * Envía credenciales a POST /api/v1/auth/login.
   * El backend inyecta la cookie HttpOnly 'lawfirm_token' en la cabecera Set-Cookie.
   */
  async login(credentials: LoginRequest): Promise<UserResponse> {
    return apiClient<UserResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Recupera el perfil del usuario autenticado contra GET /api/v1/auth/me.
   * Valida la sesión activa a través de la cookie HttpOnly.
   */
  async getCurrentUser(): Promise<UserResponse> {
    return apiClient<UserResponse>("/api/v1/auth/me", {
      method: "GET",
    });
  },

  /**
   * Cierra la sesión activa contra POST /api/v1/auth/logout.
   * El backend sobreescribe la cookie 'lawfirm_token' con maxAge=0.
   */
  async logout(): Promise<void> {
    await apiClient<void>("/api/v1/auth/logout", {
      method: "POST",
    });
  },
};
