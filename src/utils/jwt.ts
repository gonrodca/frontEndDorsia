// src/utils/jwt.ts

// Define la estructura del payload del JWT
export interface JwtPayload {
  sub: string; // email del usuario
  iat: number; // issued at (timestamp)
  exp: number; // expiration (timestamp)
  idUsuario: string;
  nombreApellido: string;
  fechaNacimiento: string;
  numeroContacto: string;
  edad: number;
}

// Función para decodificar el token
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

// Función para verificar si el token está expirado
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
  return now > payload.exp;
};