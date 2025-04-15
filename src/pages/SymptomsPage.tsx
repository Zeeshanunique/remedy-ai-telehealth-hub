import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ClipboardList, ThermometerIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { generateAIResponse } from "@/lib/gemini-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const symptomsSchema = z.object({
  mainSymptom: z.string().min(2, "Please describe your main symptom"),
  duration: z.string().min(1, "Please enter the duration"),
  temperature: z.string().optional(),
  additionalSymptoms: z.string().optional(),
  medications: z.string().optional(),
});

type SymptomFormValues = z.infer<typeof symptomsSchema>;

const SymptomsPage = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [showPrediagnosis, setShowPrediagnosis] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SymptomFormValues>({
    resolver: zodResolver(symptomsSchema),
    defaultValues: {
      mainSymptom: "",
      duration: "",
      temperature: "",
      additionalSymptoms: "",
      medications: "",
    },
  });

  const onSubmit = async (data: SymptomFormValues) => {
    setSubmitting(true);
    setError(null);
    
    try {
      // Format the user's symptom data into a comprehensive prompt
      const prompt = `
        Please provide a preliminary analysis of the following symptoms:
        
        Main Symptom: ${data.mainSymptom}
        Duration: ${data.duration}
        ${data.temperature ? `Body Temperature: ${data.temperature}` : ''}
        ${data.additionalSymptoms ? `Additional Symptoms: ${data.additionalSymptoms}` : ''}
        ${data.medications ? `Current Medications: ${data.medications}` : ''}
        
        Please provide:
        1. A possible explanation of what might be causing these symptoms
        2. General recommendations for managing these symptoms
        3. Clear indicators of when the patient should seek immediate medical attention
        
        Format your response in clear sections with appropriate markdown formatting.
        Note: Make it very clear that this is NOT a medical diagnosis and the patient should consult a healthcare professional.
      `;
      
      // Call the Gemini AI model
      const aiResponse = await generateAIResponse(prompt);
      
      setDiagnosis(aiResponse);
      setShowPrediagnosis(true);
      
      toast({
        title: "Symptoms Analyzed",
        description: "Your symptoms have been analyzed by our AI system.",
      });
    } catch (err) {
      console.error("Error analyzing symptoms:", err);
      setError("We encountered an error analyzing your symptoms. Please try again later.");
      toast({
        title: "Analysis Failed",
        description: "There was a problem analyzing your symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Report Symptoms</h1>
          <p className="text-muted-foreground mt-2">
            Describe your symptoms for AI-powered preliminary analysis
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="mainSymptom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Symptom</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Headache, Cough, Fever" {...field} />
                        </FormControl>
                        <FormDescription>
                          Describe your most troubling symptom
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2 days, 1 week" {...field} />
                        </FormControl>
                        <FormDescription>
                          How long have you been experiencing these symptoms?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Temperature (if known)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <ThermometerIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="e.g., 98.6°F, 37°C" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="additionalSymptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Symptoms</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe any other symptoms you're experiencing" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="medications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Medications (if any)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List any medications you're currently taking"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Analyzing Symptoms..." : "Submit Symptoms"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {showPrediagnosis ? (
            <Card className="md:col-span-1">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Preliminary Analysis</h2>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h1:text-lg prose-h2:text-base prose-h3:text-sm prose-p:my-1.5 prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:my-2 prose-ul:list-disc prose-ol:my-2 prose-li:my-0.5">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                      >
                        {diagnosis}
                      </ReactMarkdown>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> This is an AI-generated preliminary analysis and not a medical diagnosis. 
                      Please consult with a healthcare professional for proper evaluation.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => window.location.href = "/consultations"}
                    >
                      Book a Doctor Consultation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="md:col-span-1 flex items-center justify-center">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-full mx-auto w-20 h-20 flex items-center justify-center">
                    <ClipboardList className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Symptom Analysis</h3>
                  <p className="text-muted-foreground">
                    Fill out the form to receive an AI-powered preliminary analysis of your symptoms.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SymptomsPage;
