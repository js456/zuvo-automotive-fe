import React, { useState } from "react";
import { JobCard } from "../models/JobCard";
import { Customer } from "../models/customer";
import { Vehicle } from "../models/vehicle";
import { Service } from "../models/Service";

interface Props {
  onClose: () => void;
  onSave: (data: JobCard) => void;
}

const JobCardForm: React.FC<Props> = ({ onClose, onSave: onSubmit }) => {
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
const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [manualServices, setManualServices] = useState([{ name: "", price: "" }]);
  const [comments, setComments] = useState("");
  const [jobStatus, setJobStatus] = useState("");

  const availableServices: Service[] = [

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
    setManualServices([...manualServices, { name: "", price: "" }]);
  };

  const totalEstimate =
    selectedServices.reduce((total, id) => {
      const svc = availableServices.find((s) => s.id === id);
      return svc ? total + svc.price : total;
    }, 0) +
    manualServices.reduce((total, svc) => {
      const price = parseFloat(svc.price);
      return total + (isNaN(price) ? 0 : price);
    }, 0);

  const handleSubmit = () => {
    const jobCard: JobCard = {
      id: 0,
      customer,
      vehicle,
      deliveryDate,
      serviceid: selectedServices,
      service: [], // you can include full service objects if needed
      comments,
      jobStatus
    };
    onSubmit(jobCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create Job Card</h2>
          <button onClick={onClose} className="text-red-500 text-xl font-bold">×</button>
        </div>

        {/* Customer + Vehicle + Delivery Date */}
        <div className="grid grid-cols-2 gap-4 border p-4 mb-4 rounded">
          <div>
            <h3 className="font-semibold mb-2">Customer Details</h3>
            <input
              type="text"
              className="w-full mb-2 border px-2 py-1 rounded"
              placeholder="Name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />
            <input
              type="text"
              className="w-full mb-2 border px-2 py-1 rounded"
              placeholder="Phone"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />
            <input
              type="email"
              className="w-full border px-2 py-1 rounded"
              placeholder="Email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            />
            <div className="mt-4 flex items-center space-x-4 max-w-md">
              <label className="font-semibold whitespace-nowrap" htmlFor="deliveryDate">
                Delivery Date
              </label>
              <input
                type="date"
                id="deliveryDate"
                className="border px-2 py-1 rounded flex-grow"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Vehicle Details</h3>
            <input
              type="text"
              className="w-full mb-2 border px-2 py-1 rounded"
              placeholder="Make"
              value={vehicle.make}
              onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
            />
            <input
              type="text"
              className="w-full mb-2 border px-2 py-1 rounded"
              placeholder="Model"
              value={vehicle.model}
              onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
            />
            <input
              type="text"
              className="w-full mb-2 border px-2 py-1 rounded"
              placeholder="Year"
              value={vehicle.year}
              onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
            />
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              placeholder="License Plate"
              value={vehicle.licensePlate}
              onChange={(e) => setVehicle({ ...vehicle, licensePlate: e.target.value })}
            />
          </div>
        </div>

        {/* Services */}
        <div className="mb-4 border rounded p-4">
          <h3 className="text-lg font-semibold mb-3">Available Services</h3>
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

        {/* Manual Services */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Manual Services</h3>
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
                      onChange={(e) => handleManualServiceChange(i, "name", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full border-none outline-none"
                      value={svc.price}
                      onChange={(e) => handleManualServiceChange(i, "price", e.target.value)}
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
            + Add Manual Service
          </button>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <textarea
            rows={3}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter comments..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        {/* Total + Submit */}
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Total Estimate: ₹{totalEstimate}</div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCardForm;
