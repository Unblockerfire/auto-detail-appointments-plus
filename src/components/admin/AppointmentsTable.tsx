
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface AppointmentsTableProps {
  appointments: Appointment[];
  workers: string[];
  onStatusUpdate: (id: number, status: string) => void;
  onWorkerAssign: (id: number, worker: string) => void;
}

const AppointmentsTable = ({ 
  appointments, 
  workers, 
  onStatusUpdate, 
  onWorkerAssign 
}: AppointmentsTableProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage customer appointments and assignments</CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No appointments yet. Appointments will appear here when customers submit quote requests.</p>
          </div>
        ) : (
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
                      <p className="text-xs text-gray-500">{appointment.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{appointment.service}</p>
                      <p className="text-xs text-gray-500 capitalize">Dirt: {appointment.dirtiness}</p>
                      {appointment.addOns.length > 0 && (
                        <p className="text-xs text-blue-600">+ {appointment.addOns.length} add-ons</p>
                      )}
                    </div>
                  </TableCell>
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
                      {appointment.useCustomerWater && (
                        <p className="text-xs text-green-600">Using customer water (-$10)</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={appointment.status} 
                      onValueChange={(value) => onStatusUpdate(appointment.id, value)}
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
                      onValueChange={(value) => onWorkerAssign(appointment.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Assign..." />
                      </SelectTrigger>
                      <SelectContent>
                        {workers.length === 0 ? (
                          <SelectItem value="" disabled>No workers added</SelectItem>
                        ) : (
                          workers.map((worker) => (
                            <SelectItem key={worker} value={worker}>{worker}</SelectItem>
                          ))
                        )}
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
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsTable;
