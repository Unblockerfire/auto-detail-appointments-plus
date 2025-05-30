
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, DollarSign } from "lucide-react";

interface Appointment {
  id: number;
  status: string;
  total: number;
}

interface StatsCardsProps {
  appointments: Appointment[];
  workers: string[];
}

const StatsCards = ({ appointments, workers }: StatsCardsProps) => {
  return (
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
  );
};

export default StatsCards;
