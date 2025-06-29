import React, { useState } from "react";
import { Service } from "../models/Service";
import { addService } from "../api/serviceApi";

interface Props {
  onClose: () => void;
  onServiceAdded: () => void; // 👈 Add this line
}

export default function ServiceForm({ onClose, onServiceAdded }: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    durationMinutes: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newService: Omit<Service, "id" | "tenantId" | "createdAt"> = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        durationMinutes: parseInt(form.durationMinutes)
      };

      await addService(newService as Service);
      console.log("✅ Service added");

      onServiceAdded(); // ✅ Trigger parent refresh
      onClose();         // ✅ Close modal
    } catch (err) {
      setError("Failed to add service");
      console.error("Add service error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Add Service</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Service Name"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="durationMinutes"
            value={form.durationMinutes}
            onChange={handleChange}
            placeholder="Duration (minutes)"
            className="w-full p-2 border rounded"
            required
          />

          {error && <div className="text-red-500">{error}</div>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
