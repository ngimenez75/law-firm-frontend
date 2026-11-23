export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Cliente HTTP base para llamadas hacia el backend Spring Boot a través del proxy de Next.js.
 * Utiliza credentials: 'same-origin' para transferir cookies HttpOnly (lawfirm_token).
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, ...restOptions } = options;

  let url = endpoint;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "same-origin",
    ...restOptions,
  });

  if (!response.ok) {
    let errorMessage = `Error del servidor (${response.status})`;
    let errorData: unknown = null;

    try {
      errorData = await response.json();
      if (typeof errorData === "object" && errorData !== null) {
        const record = errorData as Record<string, unknown>;
        if (typeof record.message === "string") {
          errorMessage = record.message;
        } else if (typeof record.error === "string") {
          errorMessage = record.error;
        } else if (typeof record.detail === "string") {
          errorMessage = record.detail;
        }
      }
    } catch {
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch {
        // Fallback al mensaje predeterminado
      }
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }

  // Tratamiento para respuestas sin cuerpo (204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
