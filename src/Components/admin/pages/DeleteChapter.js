import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router
// import axios from "axios"; // Import axios
import api from "../../../api";

const DeleteChapter = () => {
  const [chapterNumber, setChapterNumber] = useState(""); // State to hold the chapter number input
  // const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle chapter deletion
  const handleDelete = async () => {
    if (!chapterNumber) {
      alert("Please enter a chapter number.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this chapter?")) {
      try {
        // Send DELETE request using axios
        const response = await api.delete(`/admins/chapter/${chapterNumber}`);

        // If response is successful
        console.log("Chapter deleted successfully");
        alert("Chapter deleted successfully");
        setChapterNumber("");
      } catch (error) {
        console.error("Error deleting chapter:", error);
        alert("Error deleting chapter. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className="container mt-5">
        <h3>Delete Chapter</h3>

        {/* Chapter Number Field */}
        <div className="form-group">
          <label htmlFor="chapterNumber">Chapter Number</label>
          <input
            type="number"
            className="form-control"
            id="chapterNumber"
            placeholder="Enter chapter number"
            value={chapterNumber}
            onChange={(e) => setChapterNumber(e.target.value)}
            required
          />
        </div>
        {/* Delete Button */}
        <button className="btn btn-danger mt-4" onClick={handleDelete}>
          Delete Chapter
        </button>
      </div>
    </div>
  );
};

export default DeleteChapter;
