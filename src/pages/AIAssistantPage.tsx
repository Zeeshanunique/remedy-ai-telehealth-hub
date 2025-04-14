
import { useState, FormEvent } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

// Define type for message roles
type MessageRole = "system" | "user";

// Define message interface
interface Message {
  role: MessageRole;
  content: string;
}

const AIAssistantPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [includeRecords, setIncludeRecords] = useState(true);
  
  // Use the proper Message type for the messages state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "Hello! I'm your AI health assistant. How can I help you today?"
    }
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    // Create new user message using the Message type
    const newUserMessage: Message = {
      role: "user",
      content: query
    };

    // Add the user message to the chat
    setMessages([...messages, newUserMessage]);
    setLoading(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      // Create AI response using the Message type
      const aiResponse: Message = {
        role: "system",
        content: generateResponse(query, includeRecords)
      };

      // Update messages with AI response
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);

    setQuery("");
  };

  // Sample response generator function
  const generateResponse = (userQuery: string, includeHealthRecords: boolean): string => {
    const query = userQuery.toLowerCase();
    
    if (query.includes("headache") || query.includes("head pain")) {
      return `Based on your symptoms, you might be experiencing a tension headache. ${
        includeHealthRecords ? "I see from your records that you've reported similar symptoms before." : ""
      } I recommend rest, staying hydrated, and taking an over-the-counter pain reliever if needed. If symptoms persist for more than 3 days, please consult with your doctor.`;
    }
    
    if (query.includes("cold") || query.includes("flu") || query.includes("fever")) {
      return `It sounds like you might have a common cold or flu. ${
        includeHealthRecords ? "Your records show you had a flu vaccination last year." : ""
      } I recommend plenty of rest, staying hydrated, and over-the-counter medications to manage symptoms. If you develop a high fever or symptoms worsen, please consult your healthcare provider.`;
    }
    
    return `I understand you're asking about "${userQuery}". ${
      includeHealthRecords ? "I've checked your health records for context. " : ""
    }While I can provide general information, I recommend consulting with a healthcare professional for personalized medical advice. Would you like me to help you schedule an appointment?`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">AI Health Assistant</h1>
        
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="includeRecords" 
            checked={includeRecords} 
            onCheckedChange={(checked) => setIncludeRecords(checked as boolean)} 
          />
          <label htmlFor="includeRecords" className="text-sm">
            Include my health records in responses
          </label>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className={message.role === "user" ? "bg-primary" : "bg-muted"}>
                      {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </Avatar>
                    <div 
                      className={`p-3 rounded-lg ${
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <Avatar className="bg-muted">
                      <Bot className="h-5 w-5" />
                    </Avatar>
                    <div className="p-3 rounded-lg bg-muted">
                      <span className="inline-block animate-pulse">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me about your health concerns..."
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;
