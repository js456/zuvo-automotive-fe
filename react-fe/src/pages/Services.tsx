import React, { useState } from "react";
import { Button } from "../components/ui/button";
import ServiceForm from "../components/ServiceForm";
import { Input } from "../components/ui/input";
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

const initialServices: Service[] = [
  {
    id: 1,
    name: "Oil Change",
    description: "Basic engine oil and filter replacement",
    price: 1499,
  },
  {
    id: 2,
    name: "Brake Service",
    description: "Full brake inspection and pad replacement",
    price: 2999,
  },
  {
    id: 3,
    name: "Car Wash",
    description: "Exterior and interior cleaning",
    price: 599,
  },
];

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showAddDialog, setShowAddDialog] = useState(false); // ✅ Correct position

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

      {/* Modal Form */}
      {showAddDialog && <ServiceForm onClose={() => setShowAddDialog(false)} />}
    </div>
  );
};

export default Services;
