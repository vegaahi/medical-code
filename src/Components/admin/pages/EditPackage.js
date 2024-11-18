import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Importing FontAwesome icon

const EditPackage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch the package data by packageId
    api
      .get(`/admins/packagelist/get/${packageId}`)
      .then((response) => {
        setPackageData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching package data.");
        setLoading(false);
      });
  }, [packageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admins/packagelist/put/${packageId}`, packageData);
      setSuccess("Package updated successfully.");
      setError("");
    } catch (err) {
      setError("Error updating package. Please try again.");
      setSuccess("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      <h2>Edit Package</h2>
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}
      {success && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {success}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess("")}
          ></button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Package Name</label>
          <input
            type="text"
            className="form-control"
            name="packageName"
            value={packageData.packageName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Package Type</label>
          <select
            className="form-select"
            name="packageType"
            value={packageData.packageType}
            onChange={handleChange}
          >
            <option value="Subscription">Subscription</option>
            <option value="NA" disabled>
              NA
            </option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Package Amount</label>
          <input
            type="number"
            className="form-control"
            name="packageAmount"
            value={packageData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Transaction Fee</label>
          <input
            type="number"
            className="form-control"
            name="transactionFee"
            value={packageData.transactionFee}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Package Amount</label>
          <input
            type="number"
            className="form-control"
            value={
              (packageData.totalPackageAmount = (
                parseFloat(packageData.amount) +
                parseFloat(packageData.transactionFee)
              ).toFixed(2))
            }
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Validity (Days)</label>
          <input
            type="number"
            className="form-control"
            name="validityDays"
            value={packageData.validity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Package
        </button>
      </form>
    </div>
  );
};

export default EditPackage;
