import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Pencil, Trash2 } from "lucide-react";
import { getJobs } from "../api/jobsApi";
import JobCardForm from "../components/JobsForm";
import { JobCard } from "../models/JobCard";
const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobCard[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs:", error);
        setJobs([]); // empty fallback
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };

  const handleEdit = (job: JobCard) => {
    alert(`Edit logic can be implemented for "${job.customer.name}"`);
  };

  const handleSave = (newJob: JobCard) => {
    const newId = Math.max(...jobs.map((j) => j.id), 0) + 1;
    const fullJob: JobCard = {...newJob };
    setJobs([...jobs, fullJob]);
  };

  if (loading) {
    return <div className="text-center p-8">Loading jobs...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Automobile Jobs</h2>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Job
        </Button>
      </div>

      <Table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <TableHeader className="bg-blue-600 text-white">
          <TableRow>
            <TableHead className="text-white px-4 py-3">Customer Name</TableHead>
            <TableHead className="text-white px-4 py-3">Car Model</TableHead>
            <TableHead className="text-white px-4 py-3">Date</TableHead>
            <TableHead className="text-white px-4 py-3">Expected Date</TableHead>
            <TableHead className="text-white px-4 py-3">Status</TableHead>
            <TableHead className="text-white px-4 py-3 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job, index) => (
            <TableRow
              key={job.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } hover:bg-gray-200 text-black transition-colors duration-200`}
            >
              <TableCell className="px-4 py-3 text-gray-800 font-medium">
                {job.customer.name}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-800">{job.vehicle.model}</TableCell>
              <TableCell className="px-4 py-3 text-gray-800">
                {new Date(job.deliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-800">{job.deliveryDate}</TableCell>
              <TableCell className="px-4 py-3 text-gray-800">{job.jobStatus}</TableCell>
              <TableCell className="px-4 py-3 space-x-2 text-center">
                <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                  <Pencil size={16} />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(job.id)}>
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showAddDialog && (
        <JobCardForm onClose={() => setShowAddDialog(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default JobsPage;
