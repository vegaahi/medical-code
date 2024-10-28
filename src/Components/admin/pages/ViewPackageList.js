import React, { useEffect, useState } from "react";
import api from "../../../api";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ViewPackageList = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/packagelist/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (pkg) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the package: ${pkg.packageName}?`
    );
    if (confirmDelete) {
      try {
        await api.delete(`/packagelist/delete/${pkg.packageId}`);
        setPackages(packages.filter((p) => p.packageId !== pkg.packageId));
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  const handleEdit = (pkg) => {
    navigate(`/admin/editpackage/${pkg.packageId}`);
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
                  <td>₹{pkg.amount}</td>
                  <td>₹{pkg.transactionFee}</td>
                  <td>₹{pkg.totalPackageAmount}</td>
                  <td>{pkg.validity}</td>
                  <td>{pkg.createdAt}</td>
                  <td style={{ display: "flex" }}>
                    <motion.button
                      className="btn btn-sm me-2"
                      style={{ backgroundColor: "red", color: "white" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(pkg)}
                    >
                      <FaTrash />
                    </motion.button>
                    <motion.button
                      className="btn btn-sm"
                      style={{ backgroundColor: "orange", color: "white" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(pkg)}
                    >
                      <FaEdit />
                    </motion.button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No packages available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPackageList;
