import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 mt-10">
        <div className="text-center mb-8">
          <img
            src="/logo192.png"
            alt="Company Logo"
            className="h-14 w-auto mx-auto mb-2 rounded"
          />
          <h1 className="text-2xl font-bold text-gray-800">My Garage Pro</h1>
          <p className="text-sm text-gray-500">Smart Garage Management System</p>
        </div>

        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
