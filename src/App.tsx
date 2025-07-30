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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/historia-clinica" element={<Layout><HistoriaClinica /></Layout>} />
          <Route path="/triage" element={<Layout><Triage /></Layout>} />
          <Route path="/auditoria" element={<Layout><Auditoria /></Layout>} />
          
          {/* Users Routes */}
          <Route path="/usuarios/:role?" element={<Layout><Usuarios /></Layout>} />
          <Route path="/usuarios/administradores" element={<Layout><Usuarios /></Layout>} />
          <Route path="/usuarios/doctores" element={<Layout><Usuarios /></Layout>} />
          <Route path="/usuarios/enfermeros" element={<Layout><Usuarios /></Layout>} />
          <Route path="/usuarios/cuidadores" element={<Layout><Usuarios /></Layout>} />
          <Route path="/usuarios/pacientes" element={<Layout><Usuarios /></Layout>} />
          <Route path="/usuarios/farmaceuticos" element={<Layout><Usuarios /></Layout>} />
          
          {/* Placeholder routes - will be implemented later */}
          <Route path="/paraclinicos" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Paraclínicos</h1><p>Módulo en desarrollo</p></div></Layout>} />
          <Route path="/farmacia" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Farmacia</h1><p>Módulo en desarrollo</p></div></Layout>} />
          <Route path="/camas-locaciones" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Camas y Locaciones</h1><p>Módulo en desarrollo</p></div></Layout>} />
          <Route path="/instituciones" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Instituciones</h1><p>Módulo en desarrollo</p></div></Layout>} />
          <Route path="/configuracion" element={<Layout><div className="p-6"><h1 className="text-2xl font-bold">Configuración</h1><p>Módulo en desarrollo</p></div></Layout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
