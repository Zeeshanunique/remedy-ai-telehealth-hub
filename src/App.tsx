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
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";

// Import Clerk Authentication
import { ClerkProvider } from '@clerk/clerk-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

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

  // Get publishable key from environment variable
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
    import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Make sure the key is available
  if (!publishableKey) {
    throw new Error("Missing Clerk publishable key");
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={300}>
          <div className="min-h-screen bg-background antialiased">
            <Toaster />
            <Sonner position="top-center" closeButton />
            <BrowserRouter>
              <Routes>
                {/* Auth routes */}
                <Route path="/sign-in/*" element={<SignInPage />} />
                <Route path="/sign-up/*" element={<SignUpPage />} />
                
                {/* Protected routes */}
                <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                <Route path="/consultations" element={<ProtectedRoute><ConsultationsPage /></ProtectedRoute>} />
                <Route path="/assistant" element={<ProtectedRoute><AIAssistantPage /></ProtectedRoute>} />
                <Route path="/symptoms" element={<ProtectedRoute><SymptomsPage /></ProtectedRoute>} />
                <Route path="/records" element={<ProtectedRoute><MedicalRecordsPage /></ProtectedRoute>} />
                <Route path="/appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
