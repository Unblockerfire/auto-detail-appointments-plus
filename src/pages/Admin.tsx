import { useState, useEffect } from "react";
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
  status: string;
  assignedTo: string;
}

interface Worker {
  id: number;
  name: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

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

  const addWorker = (name: string) => {
    const newWorker = { id: Date.now(), name };
    setWorkers(prev => [...prev, newWorker]);
  };

  const removeWorker = (id: number) => {
    setWorkers(prev => prev.filter(worker => worker.id !== id));
  };

  const updateAppointmentStatus = (id: number, status: string) => {
    const updated = appointments.map(appt =>
      appt.id === id ? { ...appt, status } : appt
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const assignWorker = (id: number, workerName: string) => {
    const updated = appointments.map(appt =>
      appt.id === id ? { ...appt, assignedTo: workerName } : appt
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const addAppointment = (data: Omit<Appointment, 'id' | 'status' | 'assignedTo'>) => {
    const newAppt: Appointment = {
      ...data,
      id: Date.now(),
      status: "Pending",
      assignedTo: ""
    };
    const updated = [...appointments, newAppt];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    console.log("New appointment added:", newAppt);
  };

  // Expose globally for the Quote page
  if (typeof window !== "undefined") {
    (window as any).addAppointment = addAppointment;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your admin credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <AdminHeader onLogout={handleLogout} />
      <div className="p-4 space-y-6">
        <StatsCards appointments={appointments} />
        <AppointmentsTable
          appointments={appointments}
          onUpdateStatus={updateAppointmentStatus}
          onAssignWorker={assignWorker}
          workers={workers}
        />
        <WorkerStats
          workers={workers}
          onAddWorker={addWorker}
          onRemoveWorker={removeWorker}
        />
      </div>
    </div>
  );
};

export default Admin;
