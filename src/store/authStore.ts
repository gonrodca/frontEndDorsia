import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'caregiver' | 'patient' | 'pharmacist';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Mock users for development
const mockUsers: Record<string, User> = {
  'admin@dorsiauy.com': {
    id: '1',
    email: 'admin@dorsiauy.com',
    name: 'Dr. María González',
    role: 'admin',
    department: 'Administración'
  },
  'doctor@dorsiauy.com': {
    id: '2',
    email: 'doctor@dorsiauy.com',
    name: 'Dr. Carlos Méndez',
    role: 'doctor',
    department: 'Cardiología'
  },
  'nurse@dorsiauy.com': {
    id: '3',
    email: 'nurse@dorsiauy.com',
    name: 'Enf. Ana Rodríguez',
    role: 'nurse',
    department: 'UCI'
  },
  'patient@dorsiauy.com': {
    id: '4',
    email: 'patient@dorsiauy.com',
    name: 'Juan Pérez',
    role: 'patient',
    department: 'Paciente'
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication - in production, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers[email];
        if (user && password === 'password123') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);