import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Search, 
  Shield, 
  Calendar as CalendarIcon, 
  Filter, 
  Download,
  Eye,
  User,
  Activity,
  AlertTriangle
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const mockAuditLogs = [
  {
    id: "A001",
    timestamp: "2024-01-15 14:30:15",
    user: "Dr. María González",
    userId: "U001",
    action: "LOGIN",
    resource: "Sistema",
    ip: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "SUCCESS",
    details: "Inicio de sesión exitoso"
  },
  {
    id: "A002",
    timestamp: "2024-01-15 14:25:42",
    user: "Enf. Carmen López",
    userId: "U045",
    action: "UPDATE",
    resource: "Historia Clínica",
    resourceId: "HC001",
    ip: "192.168.1.112",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "SUCCESS",
    details: "Actualización de signos vitales - Paciente Juan Pérez"
  },
  {
    id: "A003",
    timestamp: "2024-01-15 14:20:18",
    user: "Dr. Carlos Méndez",
    userId: "U023",
    action: "CREATE",
    resource: "Prescripción",
    resourceId: "P156",
    ip: "192.168.1.108",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "SUCCESS",
    details: "Nueva prescripción: Paracetamol 500mg - Paciente María Rodríguez"
  },
  {
    id: "A004",
    timestamp: "2024-01-15 14:15:33",
    user: "Farm. Andrea López",
    userId: "U067",
    action: "UPDATE",
    resource: "Inventario",
    resourceId: "INV245",
    ip: "192.168.1.120",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "SUCCESS",
    details: "Actualización de stock: Ibuprofeno 400mg - Stock: 150 unidades"
  },
  {
    id: "A005",
    timestamp: "2024-01-15 14:10:07",
    user: "Aux. Pedro Sánchez",
    userId: "U089",
    action: "ACCESS_DENIED",
    resource: "Historia Clínica",
    resourceId: "HC089",
    ip: "192.168.1.115",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "FAILURE",
    details: "Intento de acceso denegado - Permisos insuficientes"
  },
  {
    id: "A006",
    timestamp: "2024-01-15 14:05:51",
    user: "Dr. Ana Silva",
    userId: "U034",
    action: "DELETE",
    resource: "Cita Médica",
    resourceId: "CM445",
    ip: "192.168.1.103",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "SUCCESS",
    details: "Cancelación de cita médica - Paciente canceló cita"
  },
];

const actionTypes = [
  { value: "all", label: "Todas las acciones" },
  { value: "LOGIN", label: "Inicio de sesión" },
  { value: "LOGOUT", label: "Cierre de sesión" },
  { value: "CREATE", label: "Crear" },
  { value: "UPDATE", label: "Actualizar" },
  { value: "DELETE", label: "Eliminar" },
  { value: "ACCESS_DENIED", label: "Acceso denegado" },
];

const statusTypes = [
  { value: "all", label: "Todos los estados" },
  { value: "SUCCESS", label: "Exitoso" },
  { value: "FAILURE", label: "Fallido" },
  { value: "WARNING", label: "Advertencia" },
];

export default function Auditoria() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState<any>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS": return "bg-success";
      case "FAILURE": return "bg-destructive";
      case "WARNING": return "bg-warning";
      default: return "bg-muted";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "LOGIN":
      case "LOGOUT":
        return <User className="w-4 h-4" />;
      case "ACCESS_DENIED":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm);
    
    const matchesAction = selectedAction === "all" || log.action === selectedAction;
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;
    
    return matchesSearch && matchesAction && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Auditoría del Sistema</h1>
          <p className="text-muted-foreground">
            Registro completo de actividades y accesos al sistema
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar Logs
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAuditLogs.length}</div>
            <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accesos Exitosos</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAuditLogs.filter(log => log.status === "SUCCESS").length}
            </div>
            <p className="text-xs text-muted-foreground">95.2% del total</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accesos Fallidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAuditLogs.filter(log => log.status === "FAILURE").length}
            </div>
            <p className="text-xs text-muted-foreground">4.8% del total</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Únicos</CardTitle>
            <User className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(mockAuditLogs.map(log => log.userId)).size}
            </div>
            <p className="text-xs text-muted-foreground">En actividad hoy</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar en logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de acción" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((action) => (
                  <SelectItem key={action.value} value={action.value}>
                    {action.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {statusTypes.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Fecha
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedAction("all");
                setSelectedStatus("all");
                setDateRange(undefined);
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registro de Auditoría</CardTitle>
              <CardDescription>
                {filteredLogs.length} eventos encontrados
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getActionIcon(log.action)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{log.user}</span>
                        <Badge variant="outline">{log.action}</Badge>
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>🕒 {log.timestamp}</span>
                        <span>🌐 {log.ip}</span>
                        <span>📄 {log.resource}</span>
                        {log.resourceId && <span>🆔 {log.resourceId}</span>}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}