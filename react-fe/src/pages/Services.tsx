import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import ServiceForm from "../components/ServiceForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Pencil, Trash2 } from "lucide-react";
import { Service } from "../models/Service";
import { fetchServices } from "../api/serviceApi";

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Function to fetch services
  const loadServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (err) {
      setError("Failed to load services");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on initial mount
  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleEdit = (service: Service) => {
    alert(`Edit logic can be implemented for "${service.name}"`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Automobile Services</h2>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Service
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <Button disabled>Loading services...</Button>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center py-4">{error}</div>
      ) : (
        <Table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <TableHeader className="bg-blue-600 text-white">
            <TableRow>
              <TableHead className="text-white px-4 py-3">Service Name</TableHead>
              <TableHead className="text-white px-4 py-3">Description</TableHead>
              <TableHead className="text-white px-4 py-3">Price (₹)</TableHead>
              <TableHead className="text-white px-4 py-3 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {services.map((service, index) => (
              <TableRow
                key={service.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-200 text-black transition-colors duration-200`}
              >
                <TableCell className="px-4 py-3 text-gray-800 font-medium">
                  {service.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-800">
                  {service.description}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-800 font-semibold">
                  ₹ {service.price}
                </TableCell>
                <TableCell className="px-4 py-3 space-x-2 text-center">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                    <Pencil size={16} />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Modal Form */}
      {showAddDialog && (
        <ServiceForm
          onClose={() => setShowAddDialog(false)}
          onServiceAdded={loadServices} // 🔁 Refresh after save
        />
      )}
    </div>
  );
};

export default Services;
