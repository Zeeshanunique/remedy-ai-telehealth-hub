
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Calendar, Clock, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ConsultationsPage = () => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  interface Doctor {
    id: number;
    name: string;
    specialization: string;
    rating: number;
    available: boolean;
    image: string;
    nextAvailable: string;
  }

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "General Medicine",
      rating: 4.9,
      available: true,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      nextAvailable: "Today, 2:00 PM"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Cardiology",
      rating: 4.8,
      available: false,
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      nextAvailable: "Tomorrow, 10:00 AM"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatrics",
      rating: 4.7,
      available: true,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      nextAvailable: "Today, 4:30 PM"
    },
    {
      id: 4,
      name: "Dr. David Patel",
      specialization: "Dermatology",
      rating: 4.9,
      available: false,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      nextAvailable: "Friday, 11:15 AM"
    }
  ];

  const handleBookConsultation = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
  };

  const confirmBooking = () => {
    setOpenDialog(false);
    toast({
      title: "Consultation Booked",
      description: `Your video consultation with ${selectedDoctor?.name} has been scheduled for ${selectedDoctor?.nextAvailable}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Video Consultations</h1>
          <p className="text-muted-foreground mt-2">
            Schedule a video consultation with qualified healthcare professionals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <div className="aspect-video w-full">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialization}</CardDescription>
                  </div>
                  <div className="bg-primary/10 px-2 py-1 rounded-full text-xs font-medium text-primary">
                    {doctor.rating} ★
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Next available: {doctor.nextAvailable}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={doctor.available ? "default" : "outline"}
                  onClick={() => handleBookConsultation(doctor)}
                >
                  <Video className="h-4 w-4 mr-2" />
                  {doctor.available ? "Book Now" : "Schedule"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Consultation</DialogTitle>
              <DialogDescription>
                Confirm your video consultation with {selectedDoctor?.name}
              </DialogDescription>
            </DialogHeader>
            
            {selectedDoctor && (
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={selectedDoctor.image} 
                    alt={selectedDoctor.name} 
                    className="rounded-full h-12 w-12"
                  />
                  <div>
                    <h3 className="font-medium">{selectedDoctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.specialization}</p>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">Appointment Date & Time</span>
                  </div>
                  <p className="text-sm">{selectedDoctor.nextAvailable}</p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">Consultation Type</span>
                  </div>
                  <p className="text-sm">Video Call (30 minutes)</p>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={confirmBooking}>Confirm Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ConsultationsPage;
