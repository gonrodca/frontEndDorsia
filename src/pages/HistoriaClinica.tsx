import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, Calendar, User, Stethoscope } from "lucide-react";

const mockPatients = [
  {
    id: "P001",
    name: "María González Rodríguez",
    age: 45,
    gender: "Femenino",
    document: "12.345.678-9",
    lastVisit: "2024-01-15",
    doctor: "Dr. Carlos Méndez",
    status: "Activo",
    diagnosis: "Hipertensión arterial",
  },
  {
    id: "P002",
    name: "Juan Carlos López",
    age: 62,
    gender: "Masculino",
    document: "87.654.321-0",
    lastVisit: "2024-01-14",
    doctor: "Dr. Ana Silva",
    status: "En tratamiento",
    diagnosis: "Diabetes tipo 2",
  },
  {
    id: "P003",
    name: "Carmen Sofía Martínez",
    age: 28,
    gender: "Femenino",
    document: "11.222.333-4",
    lastVisit: "2024-01-13",
    doctor: "Dr. Luis Fernández",
    status: "Recuperación",
    diagnosis: "Fractura de radio",
  },
];

const mockConsultations = [
  {
    id: "C001",
    date: "2024-01-15",
    time: "10:30",
    doctor: "Dr. Carlos Méndez",
    type: "Consulta de control",
    symptoms: "Dolor de cabeza recurrente, mareos",
    diagnosis: "Hipertensión arterial controlada",
    treatment: "Continuar con Enalapril 10mg/día",
    notes: "Paciente responde bien al tratamiento. Control en 3 meses.",
  },
  {
    id: "C002",
    date: "2023-12-15",
    time: "14:15",
    doctor: "Dr. María Rodríguez",
    type: "Primera consulta",
    symptoms: "Dolor de cabeza, visión borrosa",
    diagnosis: "Hipertensión arterial de novo",
    treatment: "Inicio de Enalapril 5mg/día",
    notes: "Se inicia tratamiento antihipertensivo. Control en 1 mes.",
  },
];

export default function HistoriaClinica() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const filteredPatients = mockPatients.filter(
    patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.document.includes(searchTerm) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-success";
      case "En tratamiento": return "bg-primary";
      case "Recuperación": return "bg-warning";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historia Clínica</h1>
          <p className="text-muted-foreground">
            Gestión de historias clínicas electrónicas
          </p>
        </div>
        <Button variant="medical" className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Historia
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Patient List */}
        <div className="md:col-span-5">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Pacientes
              </CardTitle>
              <CardDescription>
                Buscar y seleccionar paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, documento o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-2 max-h-96 overflow-auto">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                      selectedPatient?.id === patient.id ? "bg-accent border-primary" : ""
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {patient.document} • {patient.age} años
                        </p>
                      </div>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Details */}
        <div className="md:col-span-7">
          {selectedPatient ? (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {selectedPatient.name}
                </CardTitle>
                <CardDescription>
                  Historia clínica completa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Resumen</TabsTrigger>
                    <TabsTrigger value="consultations">Consultas</TabsTrigger>
                    <TabsTrigger value="exams">Exámenes</TabsTrigger>
                    <TabsTrigger value="medications">Medicamentos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-medium">Información Personal</h4>
                        <div className="text-sm space-y-1">
                          <p><strong>ID:</strong> {selectedPatient.id}</p>
                          <p><strong>Documento:</strong> {selectedPatient.document}</p>
                          <p><strong>Edad:</strong> {selectedPatient.age} años</p>
                          <p><strong>Género:</strong> {selectedPatient.gender}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Información Médica</h4>
                        <div className="text-sm space-y-1">
                          <p><strong>Médico tratante:</strong> {selectedPatient.doctor}</p>
                          <p><strong>Última visita:</strong> {selectedPatient.lastVisit}</p>
                          <p><strong>Diagnóstico actual:</strong> {selectedPatient.diagnosis}</p>
                          <p><strong>Estado:</strong> 
                            <Badge className={`ml-2 ${getStatusColor(selectedPatient.status)}`}>
                              {selectedPatient.status}
                            </Badge>
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="consultations" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Historial de Consultas</h4>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Nueva Consulta
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {mockConsultations.map((consultation) => (
                        <Card key={consultation.id} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="font-medium">{consultation.date}</span>
                              <span className="text-muted-foreground">{consultation.time}</span>
                            </div>
                            <Badge variant="outline">{consultation.type}</Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p><strong>Médico:</strong> {consultation.doctor}</p>
                            <p><strong>Síntomas:</strong> {consultation.symptoms}</p>
                            <p><strong>Diagnóstico:</strong> {consultation.diagnosis}</p>
                            <p><strong>Tratamiento:</strong> {consultation.treatment}</p>
                            <p><strong>Observaciones:</strong> {consultation.notes}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="exams" className="space-y-4">
                    <div className="text-center py-8">
                      <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No hay exámenes registrados</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        Solicitar Examen
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="medications" className="space-y-4">
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No hay medicamentos registrados</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        Prescribir Medicamento
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-soft">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Selecciona un paciente</h3>
                  <p className="text-muted-foreground">
                    Elige un paciente de la lista para ver su historia clínica
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}