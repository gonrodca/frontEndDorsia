// src/main.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { useAuthStore } from './store/authStore';

// ✅ Verifica si hay token válido al cargar la app
useAuthStore.getState().checkAuth();

createRoot(document.getElementById('root')!).render(<App />);