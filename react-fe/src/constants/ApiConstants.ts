export const API_BASE_URL = "http://127.0.0.1:9080";

export const USER_API = {
  REGISTER: `${API_BASE_URL}/user/createUser`,
  LOGIN: `${API_BASE_URL}/users/login`,
  PROFILE: `${API_BASE_URL}/users/profile`,
  // Add more user endpoints here
};

// You can organize other domain endpoints similarly:
export const JOB_API = {
  CREATE: `${API_BASE_URL}/jobs/create`,
  LIST: `${API_BASE_URL}/jobs`,
  DELETE: (id: number) => `${API_BASE_URL}/jobs/${id}`,
};
