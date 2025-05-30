import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Car, Plus, Trash2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCards from "@/components/admin/StatsCards";
import AppointmentsTable from "@/components/admin/AppointmentsTable";
import WorkerStats from "@/components/admin/WorkerStats";

interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  location: string;
  address: string;
  status: string;
  assignedTo: string;
  total: number;
  dirtiness: string;
  useCustomerWater: boolean;
  addOns: string[];
  wantsLittleTree: boolean;
  notes: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Real appointments that will be populated from quote submissions
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Worker management
  const [workers, setWorkers] = useState<string[]>([]);
  const [newWorkerName, setNewWorkerName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "carsonlivezey2011@icloud.com" && password === "Korakora2011!") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const addWorker = () => {
    if (newWorkerName.trim() && !workers.includes(newWorkerName.trim())) {
      setWorkers([...workers, newWorkerName.trim()]);
      setNewWorkerName("");
    }
  };

  const removeWorker = (workerName: string) => {
    setWorkers(workers.filter(w => w !== workerName));
    // Also remove from any assigned appointments
    setAppointments(prev => prev.map(apt => 
      apt.assignedTo === workerName ? { ...apt, assignedTo: "" } : apt
    ));
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

  // Function to add new appointments from quote submissions
  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'status' | 'assignedTo'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now(),
      status: "Pending",
      assignedTo: ""
    };
    setAppointments(prev => [...prev, newAppointment]);
    console.log("New appointment added:", newAppointment);
  };

  // Store the addAppointment function globally so the Quote page can access it
  if (typeof window !== 'undefined') {
    (window as any).addAppointment = addAppointment;
  }

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
      <AdminHeader onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <StatsCards appointments={appointments} workers={workers} />
        
        {/* Worker Management Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Worker Management</CardTitle>
            <CardDescription>Add and manage your workers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Enter worker name"
                value={newWorkerName}
                onChange={(e) => setNewWorkerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addWorker()}
              />
              <Button onClick={addWorker} disabled={!newWorkerName.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Worker
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {workers.map((worker) => (
                <div key={worker} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg">
                  <span>{worker}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeWorker(worker)}
                    className="h-6 w-6 p-0 hover:bg-red-100"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {workers.length === 0 && (
                <p className="text-gray-500 text-sm">No workers added yet. Add your first worker above.</p>
              )}
            </div>
          </CardContent>
        </Card>

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
