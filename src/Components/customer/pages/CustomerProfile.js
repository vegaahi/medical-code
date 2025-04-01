import React, { useState, useEffect, useContext } from "react";
import api from "../../../api";
import AuthContext from "../../../context/AuthContext";

// Assuming api.js is in the same directory level

const CustomerProfile = (props) => {
  const { customerData, setCustomerData } = props;
  const { user } = useContext(AuthContext);
  console.log(user.username);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        `/customers/get/customer/email/${user.username}`
      );
      if (response.status === 200) {
        setCustomerData((prev) => ({ ...prev, ...response.data }));
        setLoading(false);
      } else {
        setError("Failed to fetch customer data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length !== 3) {
      throw new Error("Invalid date array");
    }
    const [year, month, day] = dateArray;
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  return (
    <div className="container mt-5">
      <style>
        {`
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .card-body ul li:hover {
            color: #007bff;
            cursor: pointer;
          }
          .rounded-circle:hover {
            background-color: #007bff;
            color: white;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
        `}
      </style>
      <div className="row">
        {/* Left Side Profile Card */}
        <div className="col-md-4 mb-3">
          <div className="card shadow-m text-center">
            <div className="card-body">
              <div
                className="rounded-circle mx-auto mb-3"
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "50px",
                  lineHeight: "100px",
                  backgroundColor: "#f5f5f5",
                  color: "#555",
                }}
              >
                👤
              </div>
              <h5 className="mb-1">{customerData.fullName || "Full Name"}</h5>
              <p className="text-muted mb-2">
                {customerData.customerType || "Customer Type"}
              </p>
              <p>
                📍 {customerData.currentCity}, {customerData.currentCountry}
              </p>
            </div>
          </div>
          <div className="card shadow-m mt-3">
            <div className="card-body">
              <h6 className="mb-3">Contact Information</h6>
              <ul className="list-unstyled">
                {customerData.email && (
                  <li>
                    ✉️ <strong>Email:</strong> {customerData.email}
                  </li>
                )}
                {customerData.mobileNumber && (
                  <li>
                    📞 <strong>Phone:</strong> {customerData.mobileNumber}
                  </li>
                )}
                {customerData.alternatePhoneNumber && (
                  <li>
                    📞 <strong>Alternate Phone:</strong>{" "}
                    {customerData.alternatePhoneNumber}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side Profile Details */}
        <div className="col-md-8 pb-5">
          <div className="card shadow-m mb-3">
            <div className="card-body">
              <h5 className="card-title mb-3">Personal Information</h5>
              <div className="row">
                {customerData.fullName && (
                  <div className="col-md-6 mb-2">
                    <strong>Full Name:</strong> {customerData.fullName}
                  </div>
                )}
                {customerData.dob && (
                  <div className="col-md-6 mb-2">
                    <strong>Date of Birth:</strong>{" "}
                    {formatDate(customerData.dob)}
                  </div>
                )}
              </div>
              <div className="row">
                {customerData.currentCountry && (
                  <div className="col-md-6 mb-2">
                    <strong>Current Country:</strong>{" "}
                    {customerData.currentCountry}
                  </div>
                )}
                {customerData.permanentCountry && (
                  <div className="col-md-6 mb-2">
                    <strong>Permanent Country:</strong>{" "}
                    {customerData.permanentCountry}
                  </div>
                )}
              </div>
              <div className="row">
                {customerData.currentState && (
                  <div className="col-md-6 mb-2">
                    <strong>Current State:</strong> {customerData.currentState}
                  </div>
                )}
                {customerData.permanentState && (
                  <div className="col-md-6 mb-2">
                    <strong>Permanent State:</strong>{" "}
                    {customerData.permanentState}
                  </div>
                )}
              </div>
              <div className="row">
                {customerData.currentCity && (
                  <div className="col-md-6 mb-2">
                    <strong>Current City:</strong> {customerData.currentCity}
                  </div>
                )}
                {customerData.permanentCity && (
                  <div className="col-md-6 mb-2">
                    <strong>Permanent City:</strong>{" "}
                    {customerData.permanentCity}
                  </div>
                )}
              </div>
              <div className="row">
                {customerData.currentAddressLine && (
                  <div className="col-md-6 mb-2">
                    <strong>Current Address:</strong>{" "}
                    {customerData.currentAddressLine}
                  </div>
                )}
                {customerData.permanentAddressLine && (
                  <div className="col-md-6 mb-2">
                    <strong>Permanent Address:</strong>{" "}
                    {customerData.permanentAddressLine}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card shadow-m">
            <div className="card-body">
              <h5 className="card-title mb-3">Professional Information</h5>
              <div className="row">
                {customerData.currentJob && (
                  <div className="col-md-6 mb-2">
                    <strong>Current Job:</strong> {customerData.currentJob}
                  </div>
                )}
                {customerData.qualification && (
                  <div className="col-md-6 mb-2">
                    <strong>Qualification:</strong> {customerData.qualification}
                  </div>
                )}
              </div>
              <div className="row">
                {customerData.universityName && (
                  <div className="col-md-6 mb-2">
                    <strong>University Name:</strong>{" "}
                    {customerData.universityName}
                  </div>
                )}
                {customerData.collage && (
                  <div className="col-md-6 mb-2">
                    <strong>Collage:</strong> {customerData.collage}
                  </div>
                )}
              </div>
              <div className="row">
                {customerData.registrationCouncil && (
                  <div className="col-md-6 mb-2">
                    <strong>Registration Council:</strong>{" "}
                    {customerData.registrationCouncil}
                  </div>
                )}
                {customerData.stateRegistred && (
                  <div className="col-md-6 mb-2">
                    <strong>State Registered:</strong>{" "}
                    {customerData.stateRegistred}
                  </div>
                )}
              </div>
              <div className="row">
                {customerData.countryRegistredWith && (
                  <div className="col-md-6 mb-2">
                    <strong>Country Registered:</strong>{" "}
                    {customerData.countryRegistredWith}
                  </div>
                )}
                {customerData.institutionAttendedForHomeopathy && (
                  <div className="col-md-6 mb-2">
                    <strong>Institution Attended:</strong>{" "}
                    {customerData.institutionAttendedForHomeopathy}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
