export const API_BASE_URL = "http://127.0.0.1:9050/api";

export const USER_API = {
  REGISTER: `/auth/register`,
  LOGIN: `/auth/login`,
  PROFILE: `/user`,
};

export const JOB_API = {
  CREATE: `/jobs/create`,
  LIST: `/jobs`,
  DELETE: (id: number) => `/jobs/${id}`,
};

export const SERVICE_API = {
  CREATE: `/services`,
  LIST: `/services`,
  DELETE: (id: number) => `/jobs/${id}`,
};
