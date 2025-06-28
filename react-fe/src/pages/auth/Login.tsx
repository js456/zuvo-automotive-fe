import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      navigate("/dashboard");
    } else {
      alert("Please fill both fields");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="text" placeholder="Username" className="w-full mb-3 p-2 border rounded" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-3">Log In</button>
        <Link to="/" className="block text-center text-sm text-blue-600 hover:underline">⬅ Back to Home</Link>
      </form>
    </div>
  );
}
