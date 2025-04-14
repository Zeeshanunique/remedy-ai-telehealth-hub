
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, FileText, MessageSquare, Video, ChevronRight } from "lucide-react";
import { Brain } from "lucide-react"; // Explicitly import Brain icon
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Video Consultations",
      description: "Schedule and join video calls with healthcare professionals",
      icon: Video,
      path: "/consultations",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      title: "AI Health Assistant",
      description: "Chat with our AI assistant for quick health guidance",
      icon: Brain,
      path: "/assistant",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
      title: "Symptom Reporting",
      description: "Report your symptoms for AI-driven preliminary diagnosis",
      icon: MessageSquare,
      path: "/symptoms",
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      title: "Appointment Booking",
      description: "Schedule appointments with doctors and specialists",
      icon: Calendar,
      path: "/appointments",
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 section-fade-in">
        <section className="bg-gradient-to-r from-primary/80 to-primary rounded-2xl p-8 text-white shadow-lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Welcome to RemedyAI Telehealth</h1>
            <p className="text-lg mb-6 text-white/80">
              Your complete healthcare solution that combines the power of AI with professional medical services.
            </p>
            <Button 
              onClick={() => navigate("/consultations")} 
              size="lg" 
              variant="secondary"
              className="gap-2 hover:translate-x-1 transition-transform shadow-md"
            >
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Our Services</h2>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card 
                key={feature.title} 
                className="dashboard-card cursor-pointer border-border/40 overflow-hidden" 
                onClick={() => navigate(feature.path)}
              >
                <CardHeader className="pb-2">
                  <div className={`${feature.color} p-2 rounded-lg w-fit mb-3`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-xl overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-secondary/80 to-secondary p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">AI-Powered Health Assistant</h2>
                <p className="mb-6 text-muted-foreground">
                  Our AI Health Assistant is available 24/7 to answer your health questions, provide guidance, 
                  and help you understand your symptoms.
                </p>
                <Button 
                  onClick={() => navigate("/assistant")} 
                  className="gap-2 hover:translate-x-1 transition-transform shadow-sm"
                >
                  Try AI Assistant <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-primary/10 p-8 rounded-full animate-pulse-soft">
                  <Brain className="h-20 w-20 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Card className="dashboard-card border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Medical Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access and manage your complete medical history securely in one place.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/records")}
              >
                View Records
              </Button>
            </CardContent>
          </Card>

          <Card className="dashboard-card border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View and manage your scheduled appointments with healthcare professionals.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/appointments")}
              >
                Manage Appointments
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
