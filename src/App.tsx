// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HistoriaClinica from "./pages/HistoriaClinica";
import Triage from "./pages/Triage";
import Usuarios from "./pages/Usuarios";
import Auditoria from "./pages/Auditoria";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute"; // ✅ Importamos

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirección inicial */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/historia-clinica"
            element={
              <ProtectedRoute>
                <Layout>
                  <HistoriaClinica />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/triage"
            element={
              <ProtectedRoute>
                <Layout>
                  <Triage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auditoria"
            element={
              <ProtectedRoute>
                <Layout>
                  <Auditoria />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* Usuarios */}
          <Route
            path="/usuarios/:role?"
            element={
              <ProtectedRoute>
                <Layout>
                  <Usuarios />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Repite para subrutas si es necesario, o usa el mismo componente */}
          
          {/* Módulos en desarrollo */}
          <Route
            path="/paraclinicos"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Paraclínicos</h1>
                    <p>Módulo en desarrollo</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmacia"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Farmacia</h1>
                    <p>Módulo en desarrollo</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/camas-locaciones"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Camas y Locaciones</h1>
                    <p>Módulo en desarrollo</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/instituciones"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Instituciones</h1>
                    <p>Módulo en desarrollo</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracion"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Configuración</h1>
                    <p>Módulo en desarrollo</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;