
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Appointment {
  assignedTo: string;
  status: string;
  total: number;
}

interface WorkerStatsProps {
  appointments: Appointment[];
  workers: string[];
}

const WorkerStats = ({ appointments, workers }: WorkerStatsProps) => {
  const getWorkerStats = () => {
    const stats = workers.map(worker => {
      const jobs = appointments.filter(apt => apt.assignedTo === worker && apt.status === "Completed");
      const totalEarnings = jobs.reduce((sum, job) => sum + job.total, 0);
      return { worker, jobs: jobs.length, earnings: totalEarnings };
    });
    return stats;
  };

  return (
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
  );
};

export default WorkerStats;
