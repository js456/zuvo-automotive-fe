import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-800 text-white p-4 relative flex items-center">
      {/* Left-aligned logo */}
      <div className="text-2xl font-bold absolute left-4">
        <Link to="/">My Garage Pro</Link>
      </div>

      {/* Centered navigation links */}
      <div className="mx-auto space-x-6 text-lg">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/jobs">Jobs</Link> {/* ✅ Fixed path */}
         <Link to="/job card">Job card</Link>
      </div>
    </nav>
  );
};

export default Navbar;
