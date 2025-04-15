import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, Home, MessageCircle, FileText, User, Video, Menu, LogOut, Settings } from "lucide-react";
import { Brain } from "lucide-react"; // Explicitly import Brain icon
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { user, isLoaded } = useUser();
  const { toast } = useToast();

  const menuItems = [
    { title: "Home", icon: Home, path: "/" },
    { title: "Consultations", icon: Video, path: "/consultations" },
    { title: "AI Health Assistant", icon: Brain, path: "/assistant" },
    { title: "Medical Records", icon: FileText, path: "/records" },
    { title: "Report Symptoms", icon: MessageCircle, path: "/symptoms" },
    { title: "Appointments", icon: Calendar, path: "/appointments" },
    { title: "Profile", icon: User, path: "/profile" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect will happen automatically through ProtectedRoute
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!isLoaded || !user) return "?";
    
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase() || "?";
  };

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
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 flex items-center justify-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.imageUrl} alt="User avatar" />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.fullName || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.primaryEmailAddress?.emailAddress || ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile?tab=settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
