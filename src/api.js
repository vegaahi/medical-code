import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Your API base URL
  withCredentials: true, // Ensure cookies are sent with each request
});

// Intercept requests and attach the Authorization token from cookies
api.interceptors.request.use(
  (config) => {
    console.log("Request config:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
