export type UserRole =
  | 'ROLE_ADMIN'
  | 'ROLE_LAWYER'
  | 'ROLE_PARALEGAL'
  | 'ROLE_CLIENT';

export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  status?: number;
  timestamp?: string;
  detail?: string;
  errors?: Record<string, string>;
}
