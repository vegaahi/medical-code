import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewPackageList from './ViewPackageList';
import AddPackage from './AddPackage';

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages", error);
      }
    };
    fetchPackages();
  }, []);

  const handleDelete = async (pkg) => {
    try {
      await axios.delete(`http://localhost:8080/api/packages/${pkg.packageName}`);
      setPackages((prev) => prev.filter((p) => p.packageName !== pkg.packageName));
    } catch (error) {
      console.error("Error deleting package", error);
    }
  };

  const handleAdd = (newPackage) => {
    setPackages((prev) => [...prev, newPackage]);
    setIsAdding(false); // Close the add package form after adding
  };

  const handleEdit = (pkg) => {
    // Ideally, you'd navigate to an edit page with the package details
    alert(`Editing Package:\n
      Name: ${pkg.packageName}\n
      Type: ${pkg.packageType}\n
      Amount: ${pkg.packageAmount}\n
      Transaction Fee: ${pkg.transactionFee}\n
      Total Fee: ${pkg.totalPackageFee}\n
      Validity: ${pkg.validityDays} days\n
      Created At: ${pkg.createdAt}`);
  };

  return (
    <div>
      {isAdding ? (
        <AddPackage onAdd={handleAdd} />
      ) : (
        <ViewPackageList
          packages={packages}
          onDelete={handleDelete}
          onAdd={() => setIsAdding(true)} // Show add package form
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default PackageManagement;
