import apiClient from "./apiClient";
import { User } from "../models/User";
import { USER_API } from "../constants/ApiConstants";
import { LoginRequest } from "../models/LoginRequest";

export const registerUser = async (user: User): Promise<void> => {
  try {
    const response = await apiClient.post(USER_API.REGISTER.replace("/api", ""), user);
    console.log("✅ Registration successful:", response.data);
  } catch (error) {
    console.error("❌ Registration failed:", error);
    throw error;
  }
};

export const fetchUserProfile = async (): Promise<User> => {
  try {
    const response = await apiClient.get(USER_API.PROFILE); // API call
    console.log("✅ Fetched profile:", response.data);       // Log response
    const user =  response.data[0] as User;    
    console.log("user",user)
    return user                        // Cast and return
  } catch (error) {
    console.error("❌ Fetch profile failed:", error);        // Log error
    throw error;                                             // Propagate
  }
};


export const login = async (loginRequest: LoginRequest): Promise<void> => {
  try {
    const response = await apiClient.post(USER_API.LOGIN.replace("/api", ""), loginRequest);
    const token = response.data.token;
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("✅ Token saved to localStorage");
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};
