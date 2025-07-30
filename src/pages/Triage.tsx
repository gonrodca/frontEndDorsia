import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Activity, Heart, Thermometer, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const priorityLevels = [
  { value: "1", label: "Crítico", color: "bg-destructive", description: "Riesgo de vida inmediato" },
  { value: "2", label: "Urgente", color: "bg-warning", description: "Atención en <30 min" },
  { value: "3", label: "Menos urgente", color: "bg-primary", description: "Atención en <1 hora" },
  { value: "4", label: "No urgente", color: "bg-success", description: "Atención en <2 horas" },
];

const mockTriageQueue = [
  {
    id: "T001",
    patient: "María González",
    age: 45,
    symptoms: "Dolor torácico intenso",
    priority: "1",
    arrivalTime: "14:30",
    waitTime: "15 min",
    vitals: { hr: 95, bp: "140/90", temp: 37.2, spo2: 98 }
  },
  {
    id: "T002",
    patient: "Juan López",
    age: 62,
    symptoms: "Dificultad respiratoria",
    priority: "2",
    arrivalTime: "14:45",
    waitTime: "10 min",
    vitals: { hr: 88, bp: "130/80", temp: 36.8, spo2: 94 }
  },
  {
    id: "T003",
    patient: "Ana Martínez",
    age: 28,
    symptoms: "Dolor abdominal",
    priority: "3",
    arrivalTime: "15:00",
    waitTime: "5 min",
    vitals: { hr: 78, bp: "120/75", temp: 36.5, spo2: 99 }
  },
];

export default function Triage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    document: "",
    symptoms: "",
    priority: "",
    heartRate: "",
    bloodPressure: "",
    temperature: "",
    oxygenSaturation: "",
    observations: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Paciente registrado en triage",
      description: `${formData.patientName} ha sido clasificado con prioridad ${
        priorityLevels.find(p => p.value === formData.priority)?.label || ""
      }`,
    });

    // Reset form
    setFormData({
      patientName: "",
      age: "",
      document: "",
      symptoms: "",
      priority: "",
      heartRate: "",
      bloodPressure: "",
      temperature: "",
      oxygenSaturation: "",
      observations: "",
    });
  };

  const getPriorityColor = (priority: string) => {
    return priorityLevels.find(p => p.value === priority)?.color || "bg-muted";
  };

  const getPriorityLabel = (priority: string) => {
    return priorityLevels.find(p => p.value === priority)?.label || "Sin clasificar";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Triage Médico</h1>
        <p className="text-muted-foreground">
          Clasificación y priorización de pacientes en emergencias
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Triage Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Nuevo Registro de Triage
              </CardTitle>
              <CardDescription>
                Complete la evaluación inicial del paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="font-medium">Información del Paciente</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Nombre Completo</Label>
                      <Input
                        id="patientName"
                        value={formData.patientName}
                        onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Edad</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document">Documento</Label>
                      <Input
                        id="document"
                        value={formData.document}
                        onChange={(e) => setFormData(prev => ({ ...prev, document: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Síntomas Principales</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describa los síntomas principales del paciente..."
                    value={formData.symptoms}
                    onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                    required
                  />
                </div>

                {/* Vital Signs */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Signos Vitales
                  </h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="heartRate">Frecuencia Cardíaca</Label>
                      <Input
                        id="heartRate"
                        type="number"
                        placeholder="lpm"
                        value={formData.heartRate}
                        onChange={(e) => setFormData(prev => ({ ...prev, heartRate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodPressure">Presión Arterial</Label>
                      <Input
                        id="bloodPressure"
                        placeholder="mmHg"
                        value={formData.bloodPressure}
                        onChange={(e) => setFormData(prev => ({ ...prev, bloodPressure: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperatura</Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        placeholder="°C"
                        value={formData.temperature}
                        onChange={(e) => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oxygenSaturation">Saturación O₂</Label>
                      <Input
                        id="oxygenSaturation"
                        type="number"
                        placeholder="%"
                        value={formData.oxygenSaturation}
                        onChange={(e) => setFormData(prev => ({ ...prev, oxygenSaturation: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Priority Level */}
                <div className="space-y-2">
                  <Label htmlFor="priority">Nivel de Prioridad</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                            <span>{level.label} - {level.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Observations */}
                <div className="space-y-2">
                  <Label htmlFor="observations">Observaciones</Label>
                  <Textarea
                    id="observations"
                    placeholder="Observaciones adicionales..."
                    value={formData.observations}
                    onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                  />
                </div>

                <Button type="submit" variant="medical" className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Registrar en Triage
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Triage Queue */}
        <div>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Cola de Espera
              </CardTitle>
              <CardDescription>
                Pacientes en espera de atención
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTriageQueue.map((patient) => (
                <div key={patient.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{patient.patient}</p>
                      <p className="text-xs text-muted-foreground">{patient.age} años</p>
                    </div>
                    <Badge className={getPriorityColor(patient.priority)}>
                      {getPriorityLabel(patient.priority)}
                    </Badge>
                  </div>
                  <p className="text-xs">{patient.symptoms}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Llegada: {patient.arrivalTime}</span>
                    <span>Espera: {patient.waitTime}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {patient.vitals.hr} lpm
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3" />
                      {patient.vitals.temp}°C
                    </div>
                    <div className="text-xs">PA: {patient.vitals.bp}</div>
                    <div className="text-xs">SpO₂: {patient.vitals.spo2}%</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}