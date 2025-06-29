import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
const handleLogout = () => {
  logout(); 
  localStorage.removeItem("authToken");  // Remove token
  // You might want to update auth context state here as well if you use one
  navigate("/login");                     // Redirect to login page
};
  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-800 text-white p-4 flex items-center justify-between">
      <div className="text-2xl font-bold">
        <Link to="/">My Garage Pro</Link>
      </div>

      {isAuthenticated && (
        <>
          <div className="space-x-6 text-lg">
            <Link to="/services">Services</Link>
            <Link to="/jobs">Jobs</Link>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 hover:underline focus:outline-none"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <User size={20} />
              <span>My Profile</span>
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-10"
                role="menu"
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  View Profile
                </Link>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={() => {
                  handleLogout();
                  setDropdownOpen(false);
                }}
              >
                Logout
              </button>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
