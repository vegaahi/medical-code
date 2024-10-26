import React from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewPackageList = ({ packages = [], onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleDelete = (pkg) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the package: ${pkg.packageName}?`);
    if (confirmDelete) {
      onDelete(pkg);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2>Package Lists</h2>
        <button
          className="btn btn-success my-3 my-md-0"
          onClick={() => navigate("/admin/addpackage")}
        >
          <FaPlus /> Add Package
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Package Name</th>
              <th>Package Type</th>
              <th>Package Amount (without transaction fee)</th>
              <th>Transaction Fee</th>
              <th>Total Package Fee</th>
              <th>Validity (Days)</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.length > 0 ? (
              packages.map((pkg, index) => (
                <tr key={index}>
                  <td>{pkg.packageName}</td>
                  <td>{pkg.packageType}</td>
                  <td>${pkg.packageAmount}</td>
                  <td>${pkg.transactionFee}</td>
                  <td>${pkg.totalPackageFee}</td>
                  <td>{pkg.validityDays}</td>
                  <td>{pkg.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(pkg)}
                    >
                      <FaTrash /> Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        onEdit(pkg);
                        navigate("/admin/editpackage");
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No packages available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPackageList;
