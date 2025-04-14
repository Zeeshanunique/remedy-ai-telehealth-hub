
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Send, User, Bot, Wand2 } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AIAssistantPage = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { 
      role: "system" as const, 
      content: "Hello! I'm your AI health assistant. I can answer questions about symptoms, medications, and general health concerns. How can I help you today?" 
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (input.toLowerCase().includes("headache")) {
        response = "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If you're experiencing severe, persistent, or unusual headaches, I'd recommend consulting with a healthcare professional.";
      } else if (input.toLowerCase().includes("cold") || input.toLowerCase().includes("flu")) {
        response = "Common cold and flu symptoms include fever, cough, sore throat, body aches, and fatigue. Rest, hydration, and over-the-counter medications can help manage symptoms. If you have high fever, difficulty breathing, or symptoms that worsen after 7-10 days, please consult with a doctor.";
      } else if (input.toLowerCase().includes("sleep")) {
        response = "Good sleep hygiene includes maintaining a regular sleep schedule, creating a restful environment, limiting screen time before bed, and avoiding caffeine or large meals close to bedtime. If you're experiencing persistent sleep problems, consider consulting with a healthcare provider.";
      } else {
        response = "Thank you for sharing that information. While I can provide general health information, I recommend consulting with a healthcare professional for personalized medical advice. Would you like me to help you schedule a consultation with one of our doctors?";
      }

      setMessages(prev => [...prev, { role: "system", content: response }]);
      scrollToBottom();
    }, 1000);
  };

  const suggestionPrompts = [
    "What causes headaches?",
    "How can I treat a common cold?",
    "Tips for better sleep",
    "When should I see a doctor about chest pain?"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Health Assistant</h1>
          <p className="text-muted-foreground mt-2">
            Ask health-related questions and get instant guidance
          </p>
        </div>

        <Card className="h-[calc(100vh-16rem)]">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-start gap-3 rounded-lg p-4",
                    message.role === "user" 
                      ? "ml-auto bg-primary text-primary-foreground max-w-[80%] md:max-w-[60%]" 
                      : "bg-muted max-w-[80%] md:max-w-[60%]"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center h-8 w-8 rounded-full shrink-0",
                    message.role === "user" ? "bg-primary-foreground/20" : "bg-primary/20"
                  )}>
                    {message.role === "user" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>
                  <div className="text-sm">{message.content}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {suggestionPrompts.map((prompt, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleSuggestionClick(prompt)}
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    {prompt}
                  </Button>
                ))}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your health question..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;
