export interface LoginResponse {
  token: string;
  type: 'Bearer';
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  role: 'CLIENT' | 'OWNER';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  role: 'CLIENT' | 'OWNER';
}
