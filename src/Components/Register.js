import React, { useState } from "react";

import "../css/Register.css";
import api from "../api";
import Otp from "./Otp";
import axios from "axios";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [userType, setUserType] = useState("");
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const EyeIcon = showPassword ? AiOutlineEyeInvisible : AiOutlineEye;

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const statesAndUTs = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    dob: "",
    password: "",
    confirmPassword: "",
    crrentCountry: "",
    currentState: "",
    currentCity: "",
    currentAddressLine: "",
    permanentCountry: "",
    permanentState: "",
    permanentCity: "",
    permanentAddressLine: "",
    alternatePhoneNumber: "",
    customerType: "",
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

  const [sameAsCurrent, setSameAsCurrent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name.startsWith("currentAddress.") ||
      name.startsWith("permanentAddress.")
    ) {
      const [addressType, field] = name.split(".");
      setFormData({
        ...formData,
        [addressType]: {
          ...formData[addressType],
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSameAsCurrent = () => {
    setSameAsCurrent((prev) => !prev);

    // If sameAsCurrent is true, copy current address fields to permanent address fields
    if (!sameAsCurrent) {
      setFormData((prevData) => ({
        ...prevData,
        permanentCountry: prevData.currentCountry,
        permanentState: prevData.currentState,
        permanentCity: prevData.currentCity,
        permanentAddressLine: prevData.currentAddressLine,
      }));
    } else {
      // If sameAsCurrent is false, reset permanent address fields to empty strings
      setFormData((prevData) => ({
        ...prevData,
        permanentCountry: "",
        permanentState: "",
        permanentCity: "",
        permanentAddressLine: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form data:", formData);
    // Add form submission logic here
    const apiEndpoints = {
      BHMSStudent: "/api/Student/post",
      HomeopathicDoctor: "/api/homeopathic-doctors/post",
      PractitionerWithNonIndianDegrees: "/api/nri-doctors/post",
    };
    const getApiEndpoint = (userType) => {
      switch (userType) {
        case "BHMSStudent":
          setFormData({ ...formData, customerType: "STUDENT" });
          return apiEndpoints.BHMSStudent;
        case "HomeopathicDoctor":
          setFormData({ ...formData, customerType: "HOMEOPATHICDOCTORENTITY" });
          return apiEndpoints.HomeopathicDoctor;
        case "Practitioner with Non-Indian/International Degrees":
          setFormData({ ...formData, customerType: "NRIDOCTORENTITY" });
          return apiEndpoints.PractitionerWithNonIndianDegrees;
        default:
          return null;
      }
    };

    const apiEndpoint = getApiEndpoint(userType);

    if (apiEndpoint) {
      api
        .post(apiEndpoint, formData)
        .then((response) => {
          alert("Registration successful!");
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("There was an error registering!", error);
        });
    } else {
      console.error("Invalid user type selected");
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Register</h1>
        {/* Personal Information */}
        <div className="row mb-3 justify-content-center">
          <div className="col-md-5">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="col-md-5">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="col-md-5">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="col-md-5">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-5">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ backgroundColor: "#e0f7fa" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <EyeIcon />
              </button>
            </div>
          </div>

          <div className="col-md-5">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ backgroundColor: "#e0f7fa" }}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <EyeIcon />
              </button>
            </div>
          </div>
        </div>
        {/* Current and Permanent Address Section */}
        <div className="row justify-content-center">
          {/* Current Address */}
          <div className="col-md-5">
            <h3>Current Address</h3>
            <div className="mb-3">
              <label htmlFor="currentCountry" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="currentCountry"
                name="currentCountry"
                value={formData.currentCountry}
                onChange={handleChange}
                placeholder="Enter your current country"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="currentState" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="currentState"
                name="currentState"
                value={formData.currentState}
                onChange={handleChange}
                placeholder="Enter your current state"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="currentCity" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="currentCity"
                name="currentCity"
                value={formData.currentCity}
                onChange={handleChange}
                placeholder="Enter your current city"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="currentAddressLine" className="form-label">
                Address Line
              </label>
              <input
                type="text"
                className="form-control"
                id="currentAddressLine"
                name="currentAddressLine"
                value={formData.currentAddressLine}
                onChange={handleChange}
                placeholder="Enter your current address line"
                required
              />
            </div>
          </div>

          {/* Permanent Address */}
          <div className="col-md-5">
            <h3>Permanent Address</h3>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="sameAsCurrent"
                checked={sameAsCurrent}
                onChange={handleSameAsCurrent}
              />
              <label className="form-check-label" htmlFor="sameAsCurrent">
                Permanent address same as current address
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="permanentCountry" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="permanentCountry"
                name="permanentCountry"
                value={formData.permanentCountry}
                onChange={handleChange}
                placeholder="Enter your permanent country"
                disabled={sameAsCurrent}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="permanentState" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="permanentState"
                name="permanentState"
                value={formData.permanentState}
                onChange={handleChange}
                placeholder="Enter your permanent state"
                disabled={sameAsCurrent}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="permanentCity" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="permanentCity"
                name="permanentCity"
                value={formData.permanentCity}
                onChange={handleChange}
                placeholder="Enter your permanent city"
                disabled={sameAsCurrent}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="permanentAddressLine" className="form-label">
                Address Line
              </label>
              <input
                type="text"
                className="form-control"
                id="permanentAddressLine"
                name="permanentAddressLine"
                value={formData.permanentAddressLine}
                onChange={handleChange}
                placeholder="Enter your permanent address line"
                disabled={sameAsCurrent}
                required
              />
            </div>
          </div>
          <div className="form-group p-3">
            <label htmlFor="userType" className="form-label">
              Select User Type:
            </label>
            <select
              className="form-control mb-3"
              id="userType"
              value={userType}
              onChange={handleUserTypeChange}
              required
            >
              <option value="" disabled>
                Select User Type
              </option>
              <option value="BHMSStudent">BHMS Student</option>
              <option value="HomeopathicDoctor">Homeopathic Doctor</option>
              <option value="Practitioner with Non-Indian/International Degrees">
                Practitioner with Non-Indian/International Degrees
              </option>
            </select>
            {userType === "BHMSStudent" && (
              <div className="row mb-3 justify-content-center">
                <div className="col-md-5">
                  <label htmlFor=" Univeristyname" className="form-label">
                    Univeristy name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=" Univeristyname"
                    name=" univeristyName"
                    value={formData.univeristyName}
                    onChange={handleChange}
                    placeholder="Enter your university"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="Currentyear" className="form-label">
                    Current year
                  </label>
                  <select
                    className="form-control"
                    id="Currentyear"
                    name="currentYear"
                    value={formData.currentYear}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select year
                    </option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="Alternatmobile" className="form-label">
                    Alternate Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="Alternatmobile"
                    name="alternatePhoneNumber"
                    value={formData.alternatePhoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
              </div>
            )}
            {userType === "HomeopathicDoctor" && (
              <div className="row mb-3 justify-content-center">
                <div className="col-md-5">
                  <label htmlFor="Qualification" className="form-label">
                    Qualification
                  </label>
                  <select
                    className="form-control"
                    id="Qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select your qualification
                    </option>
                    <option value="BHMS">BHMS</option>
                    <option value="MD">MD</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor=" RegistrationNumber" className="form-label">
                    RegistrationNumber
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="RegistrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter your RegistrationNumber"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="StateRegistred" className="form-label">
                    StateRegistred
                  </label>
                  <select
                    className="form-control"
                    id="StateRegistred"
                    name="stateRegistred"
                    value={formData.stateRegistred}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your State/UT</option>
                    {statesAndUTs.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor=" University" className="form-label">
                    University
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="University"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="Enter your University"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor=" Collage" className="form-label">
                    Collage
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Collage"
                    name="collage"
                    value={formData.collage}
                    onChange={handleChange}
                    placeholder="Enter your Collage"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor=" Currentjob" className="form-label">
                    Current job
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Currentjob"
                    name="currentJob"
                    value={formData.currentJob}
                    onChange={handleChange}
                    placeholder="Enter your Current job"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="Alternatmobile" className="form-label">
                    Alternate Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="Alternatmobile"
                    name="alternatePhoneNumber"
                    value={formData.alternatePhoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
              </div>
            )}
            {userType ===
              "Practitioner with Non-Indian/International Degrees" && (
              <div className="row mb-3 justify-content-center">
                <div className="col-md-5">
                  <label htmlFor="Qualification" className="form-label">
                    Qualification
                  </label>
                  <select
                    className="form-control"
                    id="Qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select your qualification
                    </option>
                    <option value="BHMS">BHMS</option>
                    <option value="MD">MD</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor=" RegistrationNumber" className="form-label">
                    RegistrationNumber
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="RegistrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter your RegistrationNumber"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor=" RegistredCouncil" className="form-label">
                    RegistredCouncil
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="RegistredCouncil"
                    name="registrationCouncil"
                    value={formData.registrationCouncil}
                    onChange={handleChange}
                    placeholder="Enter your RegistredCouncil"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor=" CountryRegistred" className="form-label">
                    Country Registred with
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="CountryRegistred"
                    name="countryRegistredWith"
                    value={formData.countryRegistredWith}
                    onChange={handleChange}
                    placeholder="Enter your CountryRegistred"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label
                    htmlFor="InstitutionAttenedForHomeopathy"
                    className="form-label"
                  >
                    InstitutionAttenedForHomeopathy
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=" InstitutionAttenedForHomeopathy"
                    name="institutionAttendedForHomeopathy"
                    value={formData.institutionAttendedForHomeopathy}
                    onChange={handleChange}
                    placeholder="Enter your InstitutionAttenedForHomeopathy"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor=" Currentjob" className="form-label">
                    Current job
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Currentjob"
                    name="currentJob"
                    value={formData.currentJob}
                    onChange={handleChange}
                    placeholder="Enter your Current job"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="Alternatmobile" className="form-label">
                    Alternate Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="Alternatmobile"
                    name="Alternatmobile"
                    value={formData.Alternatmobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-register btn-warning">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
