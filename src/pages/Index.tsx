
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, FileText, MessageSquare, Video, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Video Consultations",
      description: "Schedule and join video calls with healthcare professionals",
      icon: Video,
      path: "/consultations"
    },
    {
      title: "AI Health Assistant",
      description: "Chat with our AI assistant for quick health guidance",
      icon: MessageSquare,
      path: "/assistant"
    },
    {
      title: "Symptom Reporting",
      description: "Report your symptoms for AI-driven preliminary diagnosis",
      icon: FileText,
      path: "/symptoms"
    },
    {
      title: "Appointment Booking",
      description: "Schedule appointments with doctors and specialists",
      icon: Calendar,
      path: "/appointments"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="bg-gradient-to-r from-primary-foreground to-secondary rounded-lg p-8 text-primary shadow-lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Welcome to RemedyAI Telehealth</h1>
            <p className="text-lg mb-6">
              Your complete healthcare solution that combines the power of AI with professional medical services.
            </p>
            <Button onClick={() => navigate("/consultations")} size="lg" className="gap-2">
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Our Services</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(feature.path)}>
                <CardHeader className="pb-2">
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">AI-Powered Health Assistant</h2>
              <p className="mb-4">
                Our AI Health Assistant is available 24/7 to answer your health questions, provide guidance, 
                and help you understand your symptoms.
              </p>
              <Button onClick={() => navigate("/assistant")} variant="secondary">
                Try AI Assistant
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-primary/10 p-6 rounded-full">
                <Brain className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
