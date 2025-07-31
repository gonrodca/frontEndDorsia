// src/types/ApiResponse.ts
import { User } from './User';

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  localDate: string; // Formato: "yyyy-MM-dd HH:mm:ss"
}

// Específico para login
export type LoginResponse = {
  token: string;
};