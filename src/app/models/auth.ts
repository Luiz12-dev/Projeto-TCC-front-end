export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: 'CLIENT' | 'OWNER';
}

export interface AuthResponse {
  token: string;
  type: 'Bearer';
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'OWNER';
}
