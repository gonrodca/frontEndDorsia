import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BedDouble, Activity, AlertTriangle, Pill, FileText } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const stats = [
  {
    title: "Pacientes Activos",
    value: "324",
    description: "↗️ +12% desde ayer",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Camas Ocupadas",
    value: "87%",
    description: "245 de 282 camas",
    icon: BedDouble,
    color: "text-warning",
  },
  {
    title: "Emergencias Hoy",
    value: "23",
    description: "↗️ +3 desde ayer",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "Personal en Turno",
    value: "156",
    description: "78 médicos, 78 enfermeros",
    icon: Activity,
    color: "text-success",
  },
  {
    title: "Medicamentos Críticos",
    value: "8",
    description: "Requieren reposición",
    icon: Pill,
    color: "text-warning",
  },
  {
    title: "Historias Clínicas",
    value: "2,847",
    description: "↗️ +45 esta semana",
    icon: FileText,
    color: "text-primary",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "Ingreso",
    patient: "María González",
    doctor: "Dr. Rodríguez",
    time: "Hace 15 min",
    department: "Emergencias",
  },
  {
    id: 2,
    type: "Alta",
    patient: "Carlos Méndez",
    doctor: "Dr. Silva",
    time: "Hace 32 min",
    department: "Cardiología",
  },
  {
    id: 3,
    type: "Cirugía",
    patient: "Ana López",
    doctor: "Dr. Fernández",
    time: "Hace 1 hora",
    department: "Quirófano 3",
  },
  {
    id: 4,
    type: "Consulta",
    patient: "Juan Pérez",
    doctor: "Dr. Martín",
    time: "Hace 2 horas",
    department: "Medicina General",
  },
];

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido de vuelta, <span className="font-medium">{user?.name}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimos movimientos en el hospital
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between space-x-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.type} - {activity.patient}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.doctor} • {activity.department}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Alertas del Sistema</CardTitle>
            <CardDescription>
              Notificaciones importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Medicamento agotado</p>
                  <p className="text-sm text-muted-foreground">
                    Paracetamol 500mg - Farmacia Central
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Camas en UCI al límite</p>
                  <p className="text-sm text-muted-foreground">
                    Solo 2 camas disponibles en UCI
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Mantenimiento programado</p>
                  <p className="text-sm text-muted-foreground">
                    Sistema de rayos X - 22:00 hrs
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}