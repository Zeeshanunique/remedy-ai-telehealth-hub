import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Video, 
  MessageSquare, 
  Calendar, 
  Shield, 
  HeartPulse, 
  ArrowRight, 
  Menu, 
  X 
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: "/heart-monitor.svg",
      title: "Video Consultations",
      description: "Connect with licensed healthcare providers through secure, HD video calls from any device."
    },
    {
      icon: "/stethoscope.svg",
      title: "AI Health Assistant",
      description: "Get instant answers to health questions with our advanced AI assistant powered by Gemini 1.5."
    },
    {
      icon: "/favicon.ico",
      title: "Symptom Analysis",
      description: "Receive preliminary analysis of your symptoms with AI-powered assessment tools."
    },
    {
      icon: "/medical-dashboard.svg",
      title: "Easy Scheduling",
      description: "Book, reschedule, or cancel appointments with just a few clicks anytime."
    },
    {
      icon: "/heart-monitor.svg",
      title: "Health Tracking",
      description: "Monitor your vital signs, medications, and health metrics in one secure place."
    },
    {
      icon: "/stethoscope.svg",
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security and encryption."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              RemedyAI
            </span>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <Button variant="ghost" onClick={() => navigate('/sign-in')}>
              Log in
            </Button>
            <Button onClick={() => navigate('/sign-up')}>
              Sign up
            </Button>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border/40 pb-4 px-4">
            <nav className="flex flex-col space-y-4 mt-2">
              <a 
                href="#features" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" onClick={() => navigate('/sign-in')}>
                  Log in
                </Button>
                <Button onClick={() => navigate('/sign-up')}>
                  Sign up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 container px-4 md:px-8">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Healthcare Powered by <span className="text-primary">AI</span>, Delivered with <span className="text-primary">Care</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12">
              Connect with healthcare providers, analyze symptoms, and manage your health journey - all in one secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/sign-up')} className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/sign-in')}>
                Log in to your account
              </Button>
            </div>
            
            <div className="mt-12 md:mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-[20%] bottom-0"></div>
              
              {/* Enhanced medical SVG */}
              <div className="rounded-xl shadow-xl border border-border/40 mx-auto overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="RemedyAI Telehealth Hub" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Telehealth Features</h2>
              <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                RemedyAI combines cutting-edge technology with medical expertise to deliver a complete healthcare experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card border border-border/40 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <img src={feature.icon} alt={feature.title} className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="container px-4 md:px-8">
            <div className="max-w-[800px] mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands who are managing their health more effectively with RemedyAI.
              </p>
              <Button size="lg" onClick={() => navigate('/sign-up')} className="gap-2">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-card/50">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HeartPulse className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">RemedyAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming healthcare with AI-powered telehealth solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">For Providers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-8 pt-8 text-sm text-muted-foreground text-center">
            <p>&copy; {new Date().getFullYear()} RemedyAI Telehealth Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;