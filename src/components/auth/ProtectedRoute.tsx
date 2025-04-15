import { useAuth } from "@clerk/clerk-react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useAuth();
  
  // Show loading or spinner while auth state is being determined
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Redirect to sign-in if user is not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  
  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;