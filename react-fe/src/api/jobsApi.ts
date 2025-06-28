import axios from "axios";
import { JOB_API, USER_API } from "../constants/ApiConstants";
import { JobCard } from "../models/JobCard";

const fallbackJobs: JobCard[] = [
  {
    id: 101,
    customer: {
      name: "Arjun Verma",
      email: "arjun.verma@example.com",
      phone: "+91-9876543210",
    },
    vehicle: {
      id: 1,
      make: "Honda",
      model: "City ZX",
      year: "2022",
      licensePlate: "MH12AB1234",
    },
    deliveryDate: "2025-07-01T00:00:00.000Z",
    serviceid: [1, 3, 5],
    service: [
      { id: 1, name: "Oil Change", description: "Includes engine oil and filter replacement", price: 500 },
      { id: 3, name: "Car Wash", description: "Interior and exterior cleaning", price: 200 },
      { id: 5, name: "Wheel Alignment", description: "Align all four wheels", price: 800 },
    ],
    comments: "Customer requested to check brake pads as well.",
    jobStatus: "Pending"
  },
  {
    id: 102,
    customer: {
      name: "Sneha Kapoor",
      email: "sneha.kapoor@example.com",
      phone: "+91-9123456789",
    },
    vehicle: {
      id: 2,
      make: "Toyota",
      model: "Corolla Altis",
      year: "2021",
      licensePlate: "DL05CD6789",
    },
    deliveryDate: "2025-07-05T00:00:00.000Z",
    serviceid: [2, 4],
    service: [
      { id: 2, name: "Brake Inspection", description: "Complete brake system check", price: 300 },
      { id: 4, name: "Engine Tune-up", description: "Engine performance tuning and diagnostics", price: 1200 },
    ],
    comments: "Check engine light was blinking intermittently.",
    jobStatus: "Pending"
  },
];


export const createJobCard = async (jobCard: JobCard): Promise<void> => {
  console.log("📤 Sending job card .:", jobCard);

  try {
    const response = await axios.post(JOB_API.CREATE, jobCard);
    console.log("✅ Registration successful:", response.data);
  } catch (error) {
    console.error("❌ Registration failed:", error);
    throw error; // rethrow so the UI can handle it
  }
};

export const getJobs = async (): Promise<JobCard[]> => {
  console.log("📤 Getting job card .:");

  try {
    const response = await axios.get<JobCard[]>(JOB_API.LIST);
    console.log("✅ Jobs fetched:", response.data);

    // Return API data if valid and not null or empty
    if (response.data && response.data.length > 0) {
      return response.data;
    } else {
      console.warn("⚠️ API returned null or empty, falling back to static data.");
      return fallbackJobs;
    }
  } catch (error) {
    console.error("❌ Failed to fetch jobs, returning fallback data:", error);
    return fallbackJobs; // fallback on error
  }
};