
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, Home, MessageCircle, FileText, User, Video, Menu } from "lucide-react";
import { Brain } from "lucide-react"; // Explicitly import Brain icon
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Home", icon: Home, path: "/" },
    { title: "Consultations", icon: Video, path: "/consultations" },
    { title: "AI Health Assistant", icon: Brain, path: "/assistant" },
    { title: "Medical Records", icon: FileText, path: "/records" },
    { title: "Report Symptoms", icon: MessageCircle, path: "/symptoms" },
    { title: "Appointments", icon: Calendar, path: "/appointments" },
    { title: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-background/80">
        <Sidebar className="border-r border-border/40 shadow-lg">
          <SidebarContent>
            <div className="p-6 border-b">
              <h2 className="font-bold text-xl text-primary flex items-center">
                <span className="text-2xl mr-2">💊</span> 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">RemedyAI</span>
              </h2>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-medium">Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={() => navigate(item.path)}
                        className={cn(
                          "w-full flex items-center gap-3 cursor-pointer transition-colors duration-200",
                          window.location.pathname === item.path 
                            ? "bg-primary/10 text-primary border-l-2 border-primary" 
                            : "hover:bg-accent/50"
                        )}
                      >
                        <item.icon className={cn(
                          "h-5 w-5 transition-colors",
                          window.location.pathname === item.path ? "text-primary" : ""
                        )} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="mt-auto p-4 border-t border-border/40">
              <div className="text-xs text-muted-foreground">
                RemedyAI © 2025
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/40 shadow-sm bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <h1 className="text-lg font-semibold lg:ml-0">RemedyAI Telehealth</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="size-4" />
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
