import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CustomerProfile from "./CustomerProfile";
import Tickets from "./Tickets";
import HeartBeat from "../HeartBeat";

const Customer = () => {
  const [customerData, setCustomerData] = useState({
    id: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    dob: "",
    customerType: "",
    currentCountry: "",
    currentState: "",
    currentCity: "",
    currentAddressLine: "",
    permanentCountry: "",
    permanentState: "",
    permanentCity: "",
    permanentAddressLine: "",
    alternatePhoneNumber: "",
    currentYear: "",
    universityName: "",
    qualification: "",
    registrationNumber: "",
    stateRegistred: "",
    university: "",
    collage: "",
    currentJob: "",
    registrationCouncil: "",
    countryRegistredWith: "",
    institutionAttendedForHomeopathy: "",
  });
  return (
    <div>
      <HeartBeat />
      <Routes>
        <Route
          path="/profile"
          element={
            <CustomerProfile
              customerData={customerData}
              setCustomerData={setCustomerData}
            />
          }
        />
        <Route
          path="/tickets"
          element={
            <Tickets
              customerData={customerData}
              setCustomerData={setCustomerData}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Customer;
