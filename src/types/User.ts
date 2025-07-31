// src/types/User.ts

export interface User {
  id: number;
  username: string;
  email: string;
  role: string; // Ej: "ADMIN", "DOCTOR", etc.
  fullName?: string;
}