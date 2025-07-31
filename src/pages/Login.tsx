import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import hospitalHero from "@/assets/hospital-hero.jpg";

export default function Login() {
  const { authenticate, isAuthenticated } = useAuthStore(); // ✅ Usamos authenticate
  const { toast } = useToast();
  const [user, setUser] = useState(""); // 👈 Cambiado de "email" a "user"
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authenticate(user, password); // ✅ Llamamos a authenticate
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema dorsiaUY",
      });
    } catch (error: any) {
      toast({
        title: "Error de autenticación",
        description: error.message || "Credenciales incorrectas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ... (el resto del JSX es igual)
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Hero Image */}
      <div className="hidden lg:block relative">
        <img 
          src={hospitalHero} 
          alt="Hospital dorsiaUY" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">dorsiaUY</h2>
          <p className="text-lg opacity-90">Sistema Hospitalario de Vanguardia</p>
          <p className="text-sm opacity-75 mt-2">Tecnología médica al servicio de la salud</p>
        </div>
      </div>
      
      {/* Login Form */}
      <div className="flex items-center justify-center bg-gradient-background p-4">
        <Card className="w-full max-w-md shadow-strong">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">dorsiaUY</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sistema Hospitalario Integral
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="user"
                  type="text"
                  placeholder="usuario@dorsiauy.com"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              variant="medical"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Credenciales de prueba:</p>
            <div className="text-xs space-y-1">
              <p><strong>Admin:</strong> admin@dorsiauy.com / password123</p>
              <p><strong>Doctor:</strong> doctor@dorsiauy.com / password123</p>
              <p><strong>Enfermero:</strong> nurse@dorsiauy.com / password123</p>
              <p><strong>Paciente:</strong> patient@dorsiauy.com / password123</p>
            </div>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}