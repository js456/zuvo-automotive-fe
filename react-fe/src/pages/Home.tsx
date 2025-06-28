import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Welcome to Zuvo Garage Pro
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Development is in progress
      </p>
      <img
        src="https://via.placeholder.com/400x250?text=Under+Development"
        alt="Development in progress"
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
