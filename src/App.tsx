
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Page imports
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConsultationsPage from "./pages/ConsultationsPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import SymptomsPage from "./pages/SymptomsPage";
import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  // Create queryClient inside the component to fix React Hooks issue
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <div className="min-h-screen bg-background antialiased">
          <Toaster />
          <Sonner position="top-center" closeButton />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/consultations" element={<ConsultationsPage />} />
              <Route path="/assistant" element={<AIAssistantPage />} />
              <Route path="/symptoms" element={<SymptomsPage />} />
              <Route path="/records" element={<MedicalRecordsPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
