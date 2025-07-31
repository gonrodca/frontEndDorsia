// src/services/authService.ts
import api from './api';
import { LoginRequest } from '../types/Auth';
import { ApiResponse, LoginResponse } from '../types/ApiResponse';

export const login = async (credentials: LoginRequest): Promise<string> => {
  try {
    const response = await api.post<ApiResponse<LoginResponse>>('/usuarios/getToken', credentials);

    if (response.data.status === 200 && response.data.data?.token) {
      return response.data.data.token;
    } else {
      throw new Error(response.data.message || 'Error de autenticación');
    }
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Credenciales inválidas';
    throw new Error(message);
  }
};