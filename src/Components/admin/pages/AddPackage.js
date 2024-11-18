import React, { useState, useEffect } from "react";
import api from "../../../api";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AddPackage = ({ onAdd }) => {
  const [packageName, setPackageName] = useState("");
  const [packageType, setPackageType] = useState("Subscription"); // Default to "Subscription"
  const [amount, setAmount] = useState(0);
  const [transactionFee, setTransactionFee] = useState("");
  const [totalPackageAmount, setTotalPackageAmount] = useState(0); // Initialize with 0
  const [validity, setValidity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Add success state
  const [loading, setLoading] = useState(false); // Add loading state

  // Effect to update total package amount whenever amount or transactionFee changes
  useEffect(() => {
    const parsedAmount = parseFloat(amount) || 0;
    const fee = parseFloat(transactionFee) || 0;
    setTotalPackageAmount(parsedAmount + fee); // Update total package amount
  }, [amount, transactionFee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    const newPackage = {
      packageName,
      packageType,
      amount: parseFloat(totalPackageAmount),
      transactionFee: parseFloat(transactionFee),
      totalPackageAmount: parseFloat(totalPackageAmount), // Use the correct variable name
      validity: parseInt(validity),
      // createdAt: new Date().toLocaleString(),
    };

    try {
      await api.post("/admins/packagelist/post", newPackage, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // onAdd(response.data); // Pass the added package to the parent component
      // Reset form fields
      setPackageName("");
      setPackageType("Subscription"); // Reset to default value
      setTotalPackageAmount("");
      setTransactionFee("");
      setTotalPackageAmount(0); // Reset total package amount
      setValidity("");
      setError(""); // Clear error
      setSuccess("Package added successfully!"); // Set success message
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display specific error message from response
      } else {
        setError("Error adding package. Please try again.");
      }
      setSuccess(""); // Clear success message
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Package</h2>
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
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
            aria-label="Close"
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
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Package Type</label>
          <select
            className="form-select"
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
          >
            <option value="Subscription">Subscription</option>
            <option value="NA" disabled>
              NA
            </option>{" "}
            {/* Second option is disabled */}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Package Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Transaction Fee</label>
          <input
            type="number"
            className="form-control"
            value={transactionFee}
            onChange={(e) => setTransactionFee(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Package Amount</label>
          <input
            type="number"
            className="form-control"
            value={totalPackageAmount} // Display calculated total package amount
            readOnly // Make this field read-only
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Validity (Days)</label>
          <input
            type="number"
            className="form-control"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Package"}
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
