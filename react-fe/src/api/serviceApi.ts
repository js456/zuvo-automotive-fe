import apiClient from "./apiClient";
import { User } from "../models/User";
import { SERVICE_API, USER_API } from "../constants/ApiConstants";
import { LoginRequest } from "../models/LoginRequest";
import { Service } from "../models/Service";

export const addService = async (service: Partial<Service>): Promise<void> => {
  try {
    service.tenantId = 101;
    const response = await apiClient.post(SERVICE_API.CREATE, service);
    console.log("✅ Service Added successfully:", response.data);
  } catch (error) {
    console.error("❌ Adding service has failed:", error);
    throw error;
  }
};

export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await apiClient.get(SERVICE_API.LIST);
    console.log("✅ Fetched services:", response.data);
    return response.data as Service[]; // ✅ return only the data
  } catch (error) {
    console.error("❌ Fetch services failed:", error);
    throw error;
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
