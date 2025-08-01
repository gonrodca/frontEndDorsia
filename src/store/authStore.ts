// src/store/authStore.ts
import { create } from 'zustand';
import { login as apiLogin } from '@/services/authService'; // Importamos el servicio

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  idUsuario: string;
  nombreApellido: string;
  fechaNacimiento: string;
  numeroContacto: string;
  edad: number;
}

const decodeToken = (token: string): JwtPayload | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return now > payload.exp;
};

interface AuthState {
  user: JwtPayload | null;
  token: string | null;
  isAuthenticated: boolean;

  // ✅ 1. Solo guarda el token y el usuario (interno)
  login: (token: string) => void;

  // ✅ 2. Hace la autenticación con el backend
  authenticate: (user: string, password: string) => Promise<void>;

  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: (token) => {
    const payload = decodeToken(token);
    if (!payload) {
      throw new Error('Token inválido');
    }

    localStorage.setItem('authToken', token);
    set({
      token,
      user: payload,
      isAuthenticated: true,
    });
  },

  

  // ✅ Nueva función: authenticate
  authenticate: async (user, password) => {
    const token = await apiLogin({ user, password }); // Llama al servicio
    set({
      token,
      user: decodeToken(token),
      isAuthenticated: true,
    });
    localStorage.setItem('authToken', token);
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    if (isTokenExpired(token)) {
      localStorage.removeItem('authToken');
      set({ token: null, user: null, isAuthenticated: false });
      return false;
    }

    const payload = decodeToken(token);
    if (payload) {
      set({
        token,
        user: payload,
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  },
}));