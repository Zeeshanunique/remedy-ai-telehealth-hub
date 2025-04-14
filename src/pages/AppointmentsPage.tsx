
import DashboardLayout from "../components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Video, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const AppointmentsPage = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock appointment data
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      date: "Apr 28, 2024",
      time: "10:00 AM",
      type: "video"
    },
    {
      id: 2,
      doctor: "Dr. David Patel",
      specialty: "Dermatology",
      date: "May 05, 2024",
      time: "2:30 PM",
      type: "in-person"
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      date: "Mar 15, 2024",
      time: "9:15 AM",
      type: "phone"
    },
    {
      id: 4,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiology",
      date: "Feb 22, 2024",
      time: "11:45 AM",
      type: "video"
    }
  ];

  // Function to cancel appointment
  const handleCancelAppointment = (id: number) => {
    toast({
      title: "Appointment Canceled",
      description: "Your appointment has been successfully canceled.",
    });
  };

  // Function to join video call
  const handleJoinCall = (id: number) => {
    toast({
      title: "Joining Video Call",
      description: "Connecting to your video consultation...",
    });
  };

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-2">
            Schedule and manage your healthcare appointments
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <Button className="w-full">Book New Appointment</Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{appointment.doctor}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                            
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-sm">
                                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-primary/10 p-1.5 rounded-full">
                            {getAppointmentTypeIcon(appointment.type)}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          {appointment.type === "video" && (
                            <Button size="sm" className="gap-1" onClick={() => handleJoinCall(appointment.id)}>
                              <Video className="h-3.5 w-3.5" />
                              Join Call
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="gap-1" onClick={() => handleCancelAppointment(appointment.id)}>
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    No upcoming appointments
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Past Appointments</h2>
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm">
                              <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-1.5 rounded-full">
                          {getAppointmentTypeIcon(appointment.type)}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="gap-1">
                          <CalendarIcon className="h-3.5 w-3.5" />
                          Reschedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsPage;
