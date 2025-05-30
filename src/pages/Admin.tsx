
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Calendar, Users, DollarSign } from "lucide-react";

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

  const getWorkerStats = () => {
    const stats = workers.map(worker => {
      const jobs = appointments.filter(apt => apt.assignedTo === worker && apt.status === "Completed");
      const totalEarnings = jobs.reduce((sum, job) => sum + job.total, 0);
      return { worker, jobs: jobs.length, earnings: totalEarnings };
    });
    return stats;
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Foam Kings Admin</h1>
                <p className="text-sm text-blue-600">Management Dashboard</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Appointments</p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Pending Jobs</p>
                  <p className="text-2xl font-bold">
                    {appointments.filter(apt => apt.status === "Pending").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    ${appointments.reduce((sum, apt) => sum + apt.total, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Active Workers</p>
                  <p className="text-2xl font-bold">{workers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Manage customer appointments and assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.name}</p>
                        <p className="text-sm text-gray-600">{appointment.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>
                      {appointment.date} at {appointment.time}
                    </TableCell>
                    <TableCell>
                      <div>
                        <Badge variant={appointment.location === "Mobile" ? "default" : "secondary"}>
                          {appointment.location}
                        </Badge>
                        {appointment.address && (
                          <p className="text-xs text-gray-600 mt-1">{appointment.address}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={appointment.status} 
                        onValueChange={(value) => updateAppointmentStatus(appointment.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={appointment.assignedTo} 
                        onValueChange={(value) => assignWorker(appointment.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Assign..." />
                        </SelectTrigger>
                        <SelectContent>
                          {workers.map((worker) => (
                            <SelectItem key={worker} value={worker}>{worker}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="font-medium">${appointment.total}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Worker Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Worker Performance</CardTitle>
            <CardDescription>Track jobs completed and earnings by worker</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker</TableHead>
                  <TableHead>Jobs Completed</TableHead>
                  <TableHead>Total Earnings</TableHead>
                  <TableHead>Average per Job</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getWorkerStats().map((stat) => (
                  <TableRow key={stat.worker}>
                    <TableCell className="font-medium">{stat.worker}</TableCell>
                    <TableCell>{stat.jobs}</TableCell>
                    <TableCell>${stat.earnings}</TableCell>
                    <TableCell>
                      ${stat.jobs > 0 ? (stat.earnings / stat.jobs).toFixed(0) : 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
