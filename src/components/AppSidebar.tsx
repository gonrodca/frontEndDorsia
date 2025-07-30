import { useState } from "react";
import { 
  Activity, 
  Users, 
  FileText, 
  Stethoscope, 
  TestTube, 
  Pill, 
  BedDouble, 
  Building2, 
  Shield, 
  Settings,
  LayoutDashboard,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Usuarios",
    icon: Users,
    submenu: [
      { title: "Administradores", url: "/usuarios/administradores" },
      { title: "Doctores", url: "/usuarios/doctores" },
      { title: "Enfermeros", url: "/usuarios/enfermeros" },
      { title: "Cuidadores", url: "/usuarios/cuidadores" },
      { title: "Pacientes", url: "/usuarios/pacientes" },
      { title: "Farmacéuticos", url: "/usuarios/farmaceuticos" },
    ]
  },
  {
    title: "Historia Clínica",
    url: "/historia-clinica",
    icon: FileText,
  },
  {
    title: "Triage",
    url: "/triage",
    icon: Stethoscope,
  },
  {
    title: "Paraclínicos",
    url: "/paraclinicos",
    icon: TestTube,
  },
  {
    title: "Farmacia",
    url: "/farmacia",
    icon: Pill,
  },
  {
    title: "Camas y Locaciones",
    url: "/camas-locaciones",
    icon: BedDouble,
  },
  {
    title: "Instituciones",
    url: "/instituciones",
    icon: Building2,
  },
  {
    title: "Auditoría",
    url: "/auditoria",
    icon: Shield,
  },
  {
    title: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Usuarios: true
  });
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (submenu: any[]) => 
    submenu?.some(item => currentPath === item.url);

  const getNavClasses = (isActive: boolean) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-primary font-medium border-r-2 border-sidebar-primary" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary";

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-sidebar-foreground">dorsiaUY</h1>
                <p className="text-xs text-sidebar-foreground/70">Sistema Hospitalario</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <Collapsible 
                      open={openGroups[item.title]} 
                      onOpenChange={() => toggleGroup(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className={`w-full justify-between ${getNavClasses(isGroupActive(item.submenu))}`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            {!isCollapsed && <span>{item.title}</span>}
                          </div>
                          {!isCollapsed && (
                            openGroups[item.title] ? 
                              <ChevronDown className="w-4 h-4" /> : 
                              <ChevronRight className="w-4 h-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!isCollapsed && (
                        <CollapsibleContent className="space-y-1">
                          {item.submenu.map((subItem) => (
                            <SidebarMenuItem key={subItem.url} className="ml-6">
                              <SidebarMenuButton asChild>
                                <NavLink 
                                  to={subItem.url} 
                                  className={getNavClasses(isActive(subItem.url))}
                                >
                                  <span className="text-sm">{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url!} 
                        className={getNavClasses(isActive(item.url!))}
                      >
                        <item.icon className="w-5 h-5" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}