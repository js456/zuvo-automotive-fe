import React, { useState } from "react";
import { Service } from "../models/Service";
import { Vehicle } from "../models/vehicle";
import { Customer } from "../models/customer";
import { JobCard } from "../models/JobCard";
import { createJobCard } from "../api/jobsApi";
import { useNavigate } from "react-router-dom";

export default function JobCardPage() {
  const navigate = useNavigate();
  // Customer state
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
  });

  const [vehicle, setVehicle] = useState<Vehicle>({
    id: 0,
    make: "",
    model: "",
    year: "",
    licensePlate: "",
  });

  const [deliveryDate, setDeliveryDate] = useState<string>("");
const [jobStatus, setJobStatus] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [manualServices, setManualServices] = useState<{ name: string; price: string }[]>([
    { name: "", price: "" },
  ]);
  const [comments, setComments] = useState("");

  const availableServices: Service[] = [
    { id: 1, name: "Oil Change", description: "", price: 500 },
    { id: 2, name: "Brake Inspection", description: "", price: 300 },
    { id: 3, name: "Car Wash", description: "", price: 200 },
    { id: 4, name: "Engine Tune-up", description: "", price: 1200 },
    { id: 5, name: "Wheel Alignment", description: "", price: 800 },
  ];

  const toggleService = (service: Service) => {
    if (selectedServices.includes(service.id)) {
      setSelectedServices((prev) => prev.filter((id) => id !== service.id));
    } else {
      setSelectedServices((prev) => [...prev, service.id]);
    }
  };

  const handleManualServiceChange = (
    index: number,
    field: "name" | "price",
    value: string
  ) => {
    const updated = [...manualServices];
    updated[index][field] = value;
    setManualServices(updated);
  };

  const addManualService = () => {
    setManualServices((prev) => [...prev, { name: "", price: "" }]);
  };

  const totalEstimate =
    selectedServices.reduce((total, id) => {
      const svc = availableServices.find((s) => s.id === id);
      return svc ? total + svc.price : total;
    }, 0) +
    manualServices.reduce((total, svc) => {
      const priceNum = parseFloat(svc.price);
      return total + (isNaN(priceNum) ? 0 : priceNum);
    }, 0);

  const handleSubmit = async () => {
    if (!deliveryDate) {
      alert("Please select a delivery date");
      return;
    }

    const selectedServiceObjects = availableServices.filter((s) =>
      selectedServices.includes(s.id)
    );

    const jobCard: JobCard = {
      id: 0,
      customer,
      vehicle,
      deliveryDate,
      serviceid: selectedServices,
      service: selectedServiceObjects,
      comments,
      jobStatus: jobStatus
    };

    console.log("Submitting:", jobCard);

    try {
      await createJobCard(jobCard);
      alert("Job Card Creation successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border rounded">
      <h1 className="text-3xl font-bold text-center mb-4">Job Card</h1>

      <div className="grid grid-cols-2 gap-4 border p-4 mb-4 rounded">
        <div>
          <h2 className="font-semibold mb-2">Customer Details</h2>
          <input type="text" placeholder="Name" value={customer.name}
            className="w-full mb-2 border px-2 py-1 rounded"
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <input type="text" placeholder="Phone" value={customer.phone}
            className="w-full mb-2 border px-2 py-1 rounded"
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          <input type="email" placeholder="Email" value={customer.email}
            className="w-full border px-2 py-1 rounded"
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />

          <div className="mt-4 flex items-center space-x-4 max-w-md">
            <label htmlFor="deliveryDate" className="font-semibold">Delivery Date</label>
            <input
              type="date"
              id="deliveryDate"
              className="border px-2 py-1 rounded flex-grow"
              value = {deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Vehicle Details</h2>
          <input type="text" placeholder="Make" value={vehicle.make}
            className="w-full mb-2 border px-2 py-1 rounded"
            onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })} />
          <input type="text" placeholder="Model" value={vehicle.model}
            className="w-full mb-2 border px-2 py-1 rounded"
            onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })} />
          <input type="text" placeholder="Year" value={vehicle.year}
            className="w-full mb-2 border px-2 py-1 rounded"
            onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })} />
          <input type="text" placeholder="License Plate" value={vehicle.licensePlate}
            className="w-full border px-2 py-1 rounded"
            onChange={(e) => setVehicle({ ...vehicle, licensePlate: e.target.value })} />
        </div>
      </div>

      <div className="mb-4 border rounded p-4">
        <h2 className="text-lg font-semibold mb-3">Available Services</h2>
        <div className="grid grid-cols-6 gap-2">
          {availableServices.map((service) => (
            <div
              key={service.id}
              className={`border p-2 text-center cursor-pointer rounded text-sm ${
                selectedServices.includes(service.id)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => toggleService(service)}
            >
              {service.name} - ₹{service.price}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Manual Services</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Service Name</th>
              <th className="border px-4 py-2 text-left">Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {manualServices.map((svc, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    className="w-full border-none outline-none"
                    value={svc.name}
                    onChange={(e) =>
                      handleManualServiceChange(i, "name", e.target.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    className="w-full border-none outline-none"
                    value={svc.price}
                    onChange={(e) =>
                      handleManualServiceChange(i, "price", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addManualService}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Manual Service
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        <textarea
          rows={3}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter your comments here..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <div className="text-right font-bold text-lg mb-4">
        Total Estimate: ₹{totalEstimate}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white w-full px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}
