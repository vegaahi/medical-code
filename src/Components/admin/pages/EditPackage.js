import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPackage = ({  onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the package data by ID
    axios
      .get(`http://localhost:8080/api/packages/${id}`)
      .then((response) => {
        setPackageData(response.data);  
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching package data.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/packages/${id}`, packageData);
      onUpdate(response.data); // Pass the updated package to the parent component
      navigate('/packages'); // Redirect to the packages list page
      setError("");
    } catch (err) {
      setError("Error updating package. Please try again.");
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
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Package</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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
            <option value="NA" disabled>NA</option> {/* Second option is disabled */}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Package Amount</label>
          <input
            type="number"
            className="form-control"
            name="packageAmount"
            value={packageData.packageAmount}
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
            value={(parseFloat(packageData.packageAmount) + parseFloat(packageData.transactionFee)).toFixed(2)}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Validity (Days)</label>
          <input
            type="number"
            className="form-control"
            name="validityDays"
            value={packageData.validityDays}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Package</button>
      </form>
    </div>
  );
};

export default EditPackage;
