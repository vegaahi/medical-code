import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../api";

const Logout = () => {
  const { logoutUser } = useContext(AuthContext); // Access the logoutUser function from context
  const navigate = useNavigate(); // To redirect the user after logout

  const handleLogout = async () => {
    try {
      // Call the backend to log out the user
      await api.post("/api/auth/logout");

      // Call the logoutUser function from context to update the user state
      logoutUser();

      // Redirect to the login page or home page
      navigate("/"); // You can change this to "/" to redirect to the home page
    } catch (error) {
      console.error("Logout failed", error);
      // Handle error (optional: display an error message)
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null; // No need to render anything
};

export default Logout;
