
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCards from "@/components/admin/StatsCards";
import AppointmentsTable from "@/components/admin/AppointmentsTable";
import WorkerStats from "@/components/admin/WorkerStats";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
      service: "Full Detail",
      date: "2024-01-15",
      time: "9:30 AM",
      location: "Mobile",
      address: "123 Main St, City, ST",
      status: "Pending",
      assignedTo: "",
      total: 140
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(555) 987-6543",
      service: "Express Wash",
      date: "2024-01-16",
      time: "4:30 PM",
      location: "Drop-off",
      address: "",
      status: "Confirmed",
      assignedTo: "Mike",
      total: 30
    }
  ]);

  const [workers] = useState(["Mike", "Sarah", "Carlos", "Alex"]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "carsonlivezey2011@icloud.com" && password === "Korakora2011!") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const updateAppointmentStatus = (id: number, status: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ));
  };

  const assignWorker = (id: number, worker: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, assignedTo: worker } : apt
    ));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Foam Kings Management</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <AdminHeader onLogout={() => setIsLoggedIn(false)} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <StatsCards appointments={appointments} workers={workers} />
        <AppointmentsTable 
          appointments={appointments}
          workers={workers}
          onStatusUpdate={updateAppointmentStatus}
          onWorkerAssign={assignWorker}
        />
        <WorkerStats appointments={appointments} workers={workers} />
      </div>
    </div>
  );
};

export default Admin;
