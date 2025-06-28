// src/components/ServiceForm.tsx

interface Props {
  onClose: () => void;
}

export default function ServiceForm({ onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Add Service</h3>

        <form className="space-y-4">
          <input type="text" placeholder="Service Name" className="w-full p-2 border rounded" />
          <textarea placeholder="Description" className="w-full p-2 border rounded" />
          <input type="number" placeholder="Price" className="w-full p-2 border rounded" />

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
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
