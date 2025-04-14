
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
import { useToast } from "@/components/ui/use-toast";

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

  const onSubmit = (data: SymptomFormValues) => {
    setSubmitting(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setSubmitting(false);
      
      // Generate a sample diagnosis based on the main symptom
      let diagnosisText = "";
      const symptom = data.mainSymptom.toLowerCase();
      
      if (symptom.includes("headache")) {
        diagnosisText = "Your symptoms suggest a tension headache, which is common and often related to stress or dehydration. Rest, proper hydration, and over-the-counter pain relievers may help. If the headache is severe or persistent, please consult a doctor.";
      } else if (symptom.includes("cough") || symptom.includes("cold")) {
        diagnosisText = "Your symptoms are consistent with an upper respiratory infection or common cold. Rest, hydration, and over-the-counter cold medications may help manage symptoms. If you develop fever over 101°F, severe symptoms, or symptoms lasting over 10 days, please consult a healthcare professional.";
      } else if (symptom.includes("stomach") || symptom.includes("nausea")) {
        diagnosisText = "Your symptoms suggest gastroenteritis or stomach flu. Rest your stomach, stay hydrated with small sips of clear fluids, and gradually reintroduce bland foods. If symptoms persist beyond 48 hours or include severe pain or dehydration, please seek medical attention.";
      } else {
        diagnosisText = "Based on the symptoms you've described, you may be experiencing a common condition that often resolves with rest and self-care. However, for a more accurate diagnosis, we recommend scheduling a consultation with one of our healthcare providers.";
      }
      
      setDiagnosis(diagnosisText);
      setShowPrediagnosis(true);
      
      toast({
        title: "Symptoms Submitted",
        description: "Your symptoms have been analyzed by our AI system.",
      });
    }, 1500);
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
                    <p className="text-sm">{diagnosis}</p>
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
