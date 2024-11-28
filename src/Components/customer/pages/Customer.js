import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerProfile from "./CustomerProfile";
import HeartBeat from "../HeartBeat";

const Customer = () => {
  return (
    <div>
      <HeartBeat />
      <Routes>
        <Route path="/profile" element={<CustomerProfile />} />
      </Routes>
    </div>
  );
};

export default Customer;
