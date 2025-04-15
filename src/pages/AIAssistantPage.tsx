import { useState, FormEvent, useEffect, useRef } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { generateAIResponse } from "@/lib/gemini-ai";
import { useUser } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define type for message roles
type MessageRole = "system" | "user";

// Define message interface
interface Message {
  role: MessageRole;
  content: string;
}

// Mock health records data - in a real app, this would come from an API
const mockHealthRecords = {
  allergies: ["Penicillin", "Pollen"],
  conditions: ["Seasonal allergies", "Occasional migraines"],
  medications: ["Loratadine 10mg (as needed)", "Sumatriptan (for migraines)"],
  vitalSigns: {
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
    temperature: "98.6°F"
  },
  lastCheckup: "January 15, 2025"
};

const AIAssistantPage = () => {
  const { toast } = useToast();
  const { user, isLoaded } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    // Create new user message
    const newUserMessage: Message = {
      role: "user",
      content: query
    };

    // Add the user message to the chat
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      // Prepare health records context if enabled
      const healthContext = includeRecords 
        ? `User health records:
          - Allergies: ${mockHealthRecords.allergies.join(", ")}
          - Conditions: ${mockHealthRecords.conditions.join(", ")}
          - Medications: ${mockHealthRecords.medications.join(", ")}
          - Vital Signs: BP ${mockHealthRecords.vitalSigns.bloodPressure}, HR ${mockHealthRecords.vitalSigns.heartRate}
          - Last checkup: ${mockHealthRecords.lastCheckup}`
        : undefined;

      // Get response from Gemini AI
      const aiResponseText = await generateAIResponse(query, healthContext);
      
      // Create AI response message
      const aiResponse: Message = {
        role: "system",
        content: aiResponseText
      };

      // Update messages with AI response
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get response from AI assistant. Please try again.",
      });
    } finally {
      setLoading(false);
      setQuery("");
    }
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
                    <Avatar className={`flex-shrink-0 w-8 h-8 flex items-center justify-center ${message.role === "user" ? "bg-primary" : "bg-muted"}`}>
                      {message.role === "user" 
                        ? <User className="h-4 w-4" /> 
                        : <Bot className="h-4 w-4" />
                      }
                    </Avatar>
                    <div 
                      className={`p-3 rounded-lg ${
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.role === "user" ? (
                        message.content
                      ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h1:text-lg prose-h2:text-base prose-h3:text-sm prose-p:my-1.5 prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:my-2 prose-ul:list-disc prose-ol:my-2 prose-li:my-0.5">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <Avatar className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-muted">
                      <Bot className="h-4 w-4" />
                    </Avatar>
                    <div className="p-3 rounded-lg bg-muted">
                      <span className="inline-block animate-pulse">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
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
