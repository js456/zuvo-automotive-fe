import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { User } from "../../models/User";
import { registerUser } from "../../api/userApi";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    password_hash: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name: userName, email, phone: contactNumber, password_hash: password } = user;

    if (!userName || !email || !contactNumber || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await registerUser(user);
      alert("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleRegister}
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="User Name"
          className="w-full mb-3 p-2 border rounded"
          value={user.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Contact Number"
          className="w-full mb-3 p-2 border rounded"
          value={user.phone}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password_hash"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={user.password_hash}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-3"
        >
          Register
        </button>

        <Link
          to="/"
          className="block text-center text-sm text-blue-600 hover:underline"
        >
          ⬅ Back to Home
        </Link>
      </form>
    </div>
  );
}
