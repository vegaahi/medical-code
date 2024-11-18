import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Assuming you are using React Router
import api from "../../../api";

const DeleteSubChapter = () => {
  const [chapterNumber, setChapterNumber] = useState(""); // State to hold the chapter number
  const [subChapterNumber, setSubChapterNumber] = useState(""); // State to hold the subchapter number
  // const navigate = useNavigate(); // Hook for programmatic navigation
  
  

 
  // Handle subchapter deletion
  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!subChapterNumber) {
      alert("Please enter a subchapter number.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this subchapter?")) {
      try {
        const response = await api.delete(`/admins/subchapter/TEXT/${chapterNumber}/${subChapterNumber}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status!==200) {
          throw new Error("Failed to delete subchapter");
        }

        console.log("Subchapter deleted successfully");
        alert("Subchapter deleted successfully");
        setChapterNumber("");
        setSubChapterNumber("");
      } catch (error) {
        console.error("Error deleting subchapter:", error);
        alert("Error deleting subchapter. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h3>Delete Subchapter</h3>
      <form onSubmit={handleDelete}>
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

       
        {/* Subchapter Number Field */}
        <div className="form-group mt-3">
          <label htmlFor="subChapterNumber">Subchapter Number</label>
          <input
            type="number"
            className="form-control"
            id="subChapterNumber"
            placeholder="Enter subchapter number"
            value={subChapterNumber}
            onChange={(e) => setSubChapterNumber(e.target.value)}
            required
          />
        </div>

       

        {/* Delete Button */}
        <button type="submit" className="btn btn-danger mt-4">
          Delete Subchapter
        </button>
      </form>
    </div>
  );
};

export default DeleteSubChapter;
