
import DashboardLayout from "../components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FilePlus2, FileUp, Calendar, Heart, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MedicalRecordsPage = () => {
  // Mock medical records data
  const records = [
    {
      id: 1,
      title: "Annual Physical Examination",
      doctor: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      type: "Examination",
      summary: "Routine annual physical examination with blood work and vitals check. All results within normal ranges."
    },
    {
      id: 2,
      title: "COVID-19 Vaccination",
      doctor: "Dr. Michael Chen",
      date: "January 10, 2024",
      type: "Vaccination",
      summary: "COVID-19 booster shot administered. No adverse reactions reported."
    },
    {
      id: 3,
      title: "Allergy Consultation",
      doctor: "Dr. Emily Rodriguez",
      date: "November 5, 2023",
      type: "Consultation",
      summary: "Consultation for seasonal allergies. Prescribed antihistamine medication and recommended lifestyle adjustments."
    }
  ];

  // Mock health metrics data
  const healthMetrics = {
    bloodPressure: [
      { date: "Apr 10", value: "120/80" },
      { date: "Apr 15", value: "118/78" },
      { date: "Apr 20", value: "122/82" },
      { date: "Apr 25", value: "119/79" }
    ],
    heartRate: [
      { date: "Apr 10", value: "72" },
      { date: "Apr 15", value: "68" },
      { date: "Apr 20", value: "74" },
      { date: "Apr 25", value: "70" }
    ],
    bloodSugar: [
      { date: "Apr 10", value: "92" },
      { date: "Apr 15", value: "94" },
      { date: "Apr 20", value: "90" },
      { date: "Apr 25", value: "91" }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Medical Records</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your medical history and health data
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button className="gap-2">
            <FilePlus2 className="h-4 w-4" />
            Add Record
          </Button>
          <Button variant="outline" className="gap-2">
            <FileUp className="h-4 w-4" />
            Upload Document
          </Button>
        </div>

        <Tabs defaultValue="records">
          <TabsList>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="records" className="space-y-6 pt-4">
            {records.map((record) => (
              <Card key={record.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{record.title}</CardTitle>
                      <CardDescription>{record.doctor} • {record.date}</CardDescription>
                    </div>
                    <div className="bg-primary/10 px-2 py-1 rounded-full text-xs font-medium text-primary">
                      {record.type}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{record.summary}</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="metrics" className="pt-4">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Blood Pressure</CardTitle>
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {healthMetrics.bloodPressure.map((reading, index) => (
                      <div key={index} className="flex justify-between items-center py-1 border-b last:border-0">
                        <span className="text-sm text-muted-foreground">{reading.date}</span>
                        <span className="font-medium">{reading.value} mmHg</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Heart Rate</CardTitle>
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {healthMetrics.heartRate.map((reading, index) => (
                      <div key={index} className="flex justify-between items-center py-1 border-b last:border-0">
                        <span className="text-sm text-muted-foreground">{reading.date}</span>
                        <span className="font-medium">{reading.value} bpm</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Blood Sugar</CardTitle>
                    <div className="bg-primary/10 p-1 rounded">
                      <span className="text-xs font-medium text-primary">mg/dL</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {healthMetrics.bloodSugar.map((reading, index) => (
                      <div key={index} className="flex justify-between items-center py-1 border-b last:border-0">
                        <span className="text-sm text-muted-foreground">{reading.date}</span>
                        <span className="font-medium">{reading.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecordsPage;
