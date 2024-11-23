import React, { createContext, useEffect, useState } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .get("/api/auth/validate")
        .then((response) => {
          setUser(response.data); // Set user if validation is successful
        })
        .catch(() => {
          setUser(null); // If validation fails, set user to null
        })
        .finally(() => {
          setLoading(false); // Set loading to false after validation
        });
    } else {
      setLoading(false); // If no token or user is not logged in, stop loading
    }
  }, [isLoggedIn]); // Dependency on isLoggedIn and token

  const updateUser = async () => {
    try {
      const response = await api.get("/api/auth/validate");
      setUser(response.data); // Set the user after validation
    } catch (error) {
      setUser(null); // Reset user state if the validation fails
    }
  };

  const login = async () => {
    // Set isLoggedIn to true after successful login
    setIsLoggedIn(true);
  };

  const logoutUser = async () => {
    setIsLoggedIn(false);
    setUser(null); // Reset user state locally
  };

  // Provide loading state to ensure the app doesn't render before authentication state is determined
  if (loading) {
    return <div>Loading...</div>; // Display loading state while waiting for authentication status
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, updateUser, logoutUser, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
