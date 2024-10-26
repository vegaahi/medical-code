import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPackage = ({ onAdd }) => {
  const [packageName, setPackageName] = useState("");
  const [packageType, setPackageType] = useState("Subscription"); // Default to "Subscription"
  const [packageAmount, setPackageAmount] = useState("");
  const [transactionFee, setTransactionFee] = useState("");
  const [totalPackageAmount, setTotalPackageAmount] = useState(0); // Initialize with 0
  const [validityDays, setValidityDays] = useState("");
  const [error, setError] = useState("");

  // Effect to update total package amount whenever packageAmount or transactionFee changes
  useEffect(() => {
    const amount = parseFloat(packageAmount) || 0;
    const fee = parseFloat(transactionFee) || 0;
    setTotalPackageAmount(amount + fee); // Update total package amount
  }, [packageAmount, transactionFee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPackage = {
      packageName,
      packageType,
      packageAmount: parseFloat(packageAmount),
      transactionFee: parseFloat(transactionFee),
      totalPackageAmount: parseFloat(totalPackageAmount), // Use the correct variable name
      validityDays: parseInt(validityDays),
      createdAt: new Date().toLocaleString(),
    };

    try {
      const response = await axios.post("http://localhost:8080/api/packages", newPackage);
      onAdd(response.data); // Pass the added package to the parent component
      // Reset form fields
      setPackageName("");
      setPackageType("Subscription"); // Reset to default value
      setPackageAmount("");
      setTransactionFee("");
      setTotalPackageAmount(0); // Reset total package amount
      setValidityDays("");
      setError(""); // Clear error
    } catch (err) {
      setError("Error adding package. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Package</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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
            <option value="NA" disabled>NA</option> {/* Second option is disabled */}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Package Amount</label>
          <input
            type="number"
            className="form-control"
            value={packageAmount}
            onChange={(e) => setPackageAmount(e.target.value)}
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
            value={validityDays}
            onChange={(e) => setValidityDays(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Package</button>
      </form>
    </div>
  );
};

export default AddPackage;
