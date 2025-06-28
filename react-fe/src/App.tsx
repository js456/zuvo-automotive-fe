import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Services from "./pages/Services";
import JobsPage from "./pages/Jobs";
import Jobcard from "./pages/Jobcard"; // ✅ Import Jobcard component
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/services"
        element={
          <Layout>
            <Services />
          </Layout>
        }
      />
      <Route
        path="/jobs"
        element={
          <Layout>
            <JobsPage />
          </Layout>
        }
      />
      <Route
        path="/jobcard"
        element={
          <Layout>
            <Jobcard />
          </Layout>
        }
      />
    </Routes>
  );
}
