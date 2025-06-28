import axios from "axios";
import { User } from "../models/User";
import { USER_API } from "../constants/ApiConstants";

export const registerUser = async (user: User): Promise<void> => {
  console.log("📤 Sending registration request with payload:", user);

  try {
    const response = await axios.post(USER_API.REGISTER, user);
    console.log("✅ Registration successful:", response.data);
  } catch (error) {
    console.error("❌ Registration failed:", error);
    throw error; // rethrow so the UI can handle it
  }
};