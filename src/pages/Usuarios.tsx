import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Users, 
  UserCheck, 
  Stethoscope, 
  Shield, 
  Heart, 
  Pill,
  Edit,
  Trash2
} from "lucide-react";
import type { UserRole } from "@/store/authStore";

const mockUsers = {
  admin: [
    { id: "A001", name: "Dr. María González", email: "maria.gonzalez@dorsiauy.com", department: "Administración", status: "Activo" },
    { id: "A002", name: "Lic. Carlos Rodríguez", email: "carlos.rodriguez@dorsiauy.com", department: "Recursos Humanos", status: "Activo" },
  ],
  doctor: [
    { id: "D001", name: "Dr. Luis Méndez", email: "luis.mendez@dorsiauy.com", department: "Cardiología", status: "Activo", specialty: "Cardiólogo" },
    { id: "D002", name: "Dra. Ana Silva", email: "ana.silva@dorsiauy.com", department: "Neurología", status: "Activo", specialty: "Neuróloga" },
    { id: "D003", name: "Dr. Juan Fernández", email: "juan.fernandez@dorsiauy.com", department: "Pediatría", status: "Inactivo", specialty: "Pediatra" },
  ],
  nurse: [
    { id: "N001", name: "Enf. Carmen López", email: "carmen.lopez@dorsiauy.com", department: "UCI", status: "Activo", shift: "Mañana" },
    { id: "N002", name: "Enf. Roberto Martín", email: "roberto.martin@dorsiauy.com", department: "Emergencias", status: "Activo", shift: "Noche" },
    { id: "N003", name: "Enf. Paula García", email: "paula.garcia@dorsiauy.com", department: "Medicina General", status: "Activo", shift: "Tarde" },
  ],
  caregiver: [
    { id: "C001", name: "Aux. María Fernández", email: "maria.fernandez@dorsiauy.com", department: "Geriatría", status: "Activo" },
    { id: "C002", name: "Aux. Pedro Sánchez", email: "pedro.sanchez@dorsiauy.com", department: "Pediatría", status: "Activo" },
  ],
  patient: [
    { id: "P001", name: "Juan Carlos Pérez", email: "juan.perez@gmail.com", document: "12.345.678-9", status: "Activo", lastVisit: "2024-01-15" },
    { id: "P002", name: "María Rodríguez", email: "maria.rodriguez@gmail.com", document: "87.654.321-0", status: "Activo", lastVisit: "2024-01-14" },
    { id: "P003", name: "Carlos Martínez", email: "carlos.martinez@gmail.com", document: "11.222.333-4", status: "Inactivo", lastVisit: "2023-12-10" },
  ],
  pharmacist: [
    { id: "F001", name: "Farm. Andrea López", email: "andrea.lopez@dorsiauy.com", department: "Farmacia Central", status: "Activo" },
    { id: "F002", name: "Farm. Miguel Torres", email: "miguel.torres@dorsiauy.com", department: "Farmacia Ambulatoria", status: "Activo" },
  ],
};

const roleConfig = {
  admin: { label: "Administradores", icon: Shield, color: "bg-destructive" },
  doctor: { label: "Doctores", icon: Stethoscope, color: "bg-primary" },
  nurse: { label: "Enfermeros", icon: Heart, color: "bg-success" },
  caregiver: { label: "Cuidadores", icon: UserCheck, color: "bg-warning" },
  patient: { label: "Pacientes", icon: Users, color: "bg-secondary" },
  pharmacist: { label: "Farmacéuticos", icon: Pill, color: "bg-accent" },
};

export default function Usuarios() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [searchTerm, setSearchTerm] = useState("");

  const currentUsers = mockUsers[selectedRole] || [];
  const filteredUsers = currentUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "Activo" ? "bg-success" : "bg-muted";
  };

  const getRoleStats = () => {
    return Object.entries(roleConfig).map(([role, config]) => ({
      role: role as UserRole,
      ...config,
      count: mockUsers[role as UserRole]?.length || 0,
      active: mockUsers[role as UserRole]?.filter(u => u.status === "Activo").length || 0,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administración de personal y pacientes del sistema
          </p>
        </div>
        <Button variant="medical" className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {getRoleStats().map((stat) => (
          <Card key={stat.role} className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <p className="text-xs text-muted-foreground">
                {stat.active} activos
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users Management */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Lista de Usuarios
              </CardTitle>
              <CardDescription>
                Gestión completa de usuarios del sistema
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-6">
              {Object.entries(roleConfig).map(([role, config]) => (
                <TabsTrigger key={role} value={role} className="flex items-center gap-2">
                  <config.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{config.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(roleConfig).map(([role, config]) => (
              <TabsContent key={role} value={role} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <config.icon className="w-5 h-5" />
                    {config.label}
                  </h3>
                  <Badge variant="outline">
                    {filteredUsers.length} usuarios
                  </Badge>
                </div>
                
                <div className="border rounded-lg">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                    <div className="col-span-3">Nombre</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Departamento</div>
                    <div className="col-span-2">Estado</div>
                    <div className="col-span-2">Acciones</div>
                  </div>
                  
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-12 gap-4 p-4 border-t items-center hover:bg-muted/50">
                      <div className="col-span-3">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <p className="text-sm">{user.email}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm">{(user as any).department || (user as any).document}</p>
                        {role === "doctor" && (
                          <p className="text-xs text-muted-foreground">{(user as any).specialty}</p>
                        )}
                        {role === "nurse" && (
                          <p className="text-xs text-muted-foreground">Turno: {(user as any).shift}</p>
                        )}
                        {role === "patient" && (
                          <p className="text-xs text-muted-foreground">Última visita: {(user as any).lastVisit}</p>
                        )}
                      </div>
                      <div className="col-span-2">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}