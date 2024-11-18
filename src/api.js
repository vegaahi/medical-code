import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Your API base URL
  withCredentials: true, // Ensure cookies are sent with each request
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

// Response Interceptor
api.interceptors.response.use(
  (response) => response, // Return the response if successful
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized, attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Make a request to refresh the token
          const { data } = await api.post(
            "/api/auth/refresh-token",
            {},
            { withCredentials: true } // Ensure cookies are sent
          );

          // If the response message is 'refreshed', notify subscribers and retry original request
          if (data === "refreshed") {
            console.log("Token refreshed successfully");
            isRefreshing = false;
            notifyRefreshSubscribers();

            // Retry the original request since the new token is automatically handled by the browser
            originalRequest._retry = true;
            return api(originalRequest);
          } else {
            // If no 'refreshed' message, treat it as a failure
            throw new Error("Failed to refresh token");
          }
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          // If the refresh token itself is invalid, log out the user
          console.error("Refresh token expired. Logging out user.");
          window.location.href = "/"; // Redirect to the starting or home page
          return Promise.reject(refreshError);
        }
      }

      // Add request to the queue to wait for token refresh
      return new Promise((resolve) => {
        addRefreshSubscriber(() => {
          originalRequest._retry = true;
          resolve(api(originalRequest)); // Retry original request after token refresh
        });
      });
    }

    // If the error is not 401 or retry failed, reject it
    return Promise.reject(error);
  }
);

export default api;
