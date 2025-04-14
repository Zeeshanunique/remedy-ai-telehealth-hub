
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
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <div className="p-4 border-b">
              <h2 className="font-bold text-xl text-primary flex items-center">
                <span className="text-2xl mr-2">💊</span> RemedyAI
              </h2>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={() => navigate(item.path)}
                        className={cn(
                          "w-full flex items-center gap-3 cursor-pointer",
                          window.location.pathname === item.path && "bg-accent"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-8">
          <div className="mb-6 flex items-center justify-between">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <h1 className="text-2xl font-bold lg:ml-0">RemedyAI Telehealth</h1>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
