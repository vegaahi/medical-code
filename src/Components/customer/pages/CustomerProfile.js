import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    dob: '',
    customerType: '',
    currentCountry: '',
    currentState: '',
    currentCity: '',
    currentAddressLine: '',
    permanentCountry: '',
    permanentState: '',
    permanentCity: '',
    permanentAddressLine: '',
    alternatePhoneNumber: '',
    currentYear: '',
    universityName: '',
    qualification: '',
    registrationNumber: '',
    stateRegistred: '',
    university: '',
    collage: '',
    currentJob: '',
    registrationCouncil: '',
    countryRegistredWith: '',
    institutionAttendedForHomeopathy: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => {
        setFormData({
          fullName: response.data.name,
          email: response.data.email,
          mobileNumber: response.data.phone,
          dob: '1990-01-01',
          currentCountry: 'Country',
          currentState: 'State',
          currentCity: 'City',
          currentAddressLine: 'Address Line',
          permanentCountry: 'Permanent Country',
          permanentState: 'Permanent State',
          permanentCity: 'Permanent City',
          permanentAddressLine: 'Permanent Address Line',
          alternatePhoneNumber: 'Alternate Phone',
          customerType: 'Homeopathic Practitioner',
          currentJob: 'Job Title',
          qualification: 'Qualification',
          universityName: 'University Name',
          collage: 'Collage',
          registrationCouncil: 'Registration Council',
          stateRegistred: 'State Registered',
          countryRegistredWith: 'Country Registered',
          institutionAttendedForHomeopathy: 'Institution',
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
                  width: '100px',
                  height: '100px',
                  fontSize: '50px',
                  lineHeight: '100px',
                  backgroundColor: '#f5f5f5',
                  color: '#555',
                }}
              >
                👤
              </div>
              <h5 className="mb-1">{formData.fullName || 'Full Name'}</h5>
              <p className="text-muted mb-2">{formData.customerType || 'Customer Type'}</p>
              <p>
                📍 {formData.currentCity}, {formData.currentCountry}
              </p>
            </div>
          </div>
          <div className="card shadow-m mt-3">
            <div className="card-body">
              <h6 className="mb-3">Contact Information</h6>
              <ul className="list-unstyled">
                <li>
                  ✉️ <strong>Email:</strong> {formData.email}
                </li>
                <li>
                  📞 <strong>Phone:</strong> {formData.mobileNumber}
                </li>
                <li>
                  📞 <strong>Alternate Phone:</strong> {formData.alternatePhoneNumber}
                </li>
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
                <div className="col-md-6 mb-2">
                  <strong>Full Name:</strong> {formData.fullName}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Date of Birth:</strong> {formData.dob}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Current Country:</strong> {formData.currentCountry}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Permanent Country:</strong> {formData.permanentCountry}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Current State:</strong> {formData.currentState}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Permanent State:</strong> {formData.permanentState}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Current City:</strong> {formData.currentCity}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Permanent City:</strong> {formData.permanentCity}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Current Address:</strong> {formData.currentAddressLine}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Permanent Address:</strong> {formData.permanentAddressLine}
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-m">
            <div className="card-body">
              <h5 className="card-title mb-3">Professional Information</h5>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Current Job:</strong> {formData.currentJob}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Qualification:</strong> {formData.qualification}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>University Name:</strong> {formData.universityName}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Collage:</strong> {formData.collage}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Registration Council:</strong> {formData.registrationCouncil}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>State Registered:</strong> {formData.stateRegistred}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Country Registered:</strong> {formData.countryRegistredWith}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Institution Attended:</strong> {formData.institutionAttendedForHomeopathy}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
