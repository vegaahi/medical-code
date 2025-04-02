import axios from "axios";

const api = axios.create({
  baseURL: "http://62.72.29.190:8080", // Your API base URL
  // baseURL: "http://localhost:8080",
  withCredentials: true, // Ensure cookies are sent with each request
  headers: {
    "Content-Type": "application/json", // Ensure Content-Type matches the backend
  },
});

let isRefreshing = false; // Tracks if a token refresh is in progress
let refreshSubscribers = []; // Queue to hold failed requests during token refresh

// Add the callback to the subscribers array
function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

// Notify all subscribers with the new token
function notifyRefreshSubscribers() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = []; // Clear the queue after notifying
}

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Attach the Authorization token from the cookie automatically.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await api.post(
            "/api/auth/refresh-token",
            {},
            { withCredentials: true }
          );

          if (response.status === 200) {
            console.log("Token refreshed successfully");
            isRefreshing = false;
            notifyRefreshSubscribers();

            originalRequest._retry = true;
            return api(originalRequest);
          } else {
            throw new Error("Unexpected response during token refresh");
          }
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
          isRefreshing = false;
          refreshSubscribers = [];
          console.error("Refresh token expired. Logging out user.");
          // window.location.href = "/";
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber(() => {
          originalRequest._retry = true;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
