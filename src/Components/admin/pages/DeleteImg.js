import React, { useState } from "react";
import axios from "axios";
import api from "../../../api";

// import { useParams } from "react-router-dom";

const DeleteImg = () => {
  // const { subChapterId } = useParams(); // Assuming you're passing the subChapterId via URL params
  const [chapterNumber, setChapterNumber] = useState("");
  const [subchapterNumber, setSubchapterNumber] = useState("");
  const [imageNumber, setImageNumber] = useState("");

  const handleDelete = async () => {
    if (!chapterNumber || !subchapterNumber || !imageNumber) {
      alert("Please enter chapter number, subchapter number, and image number.");
      return;
    }

    if (window.confirm("Are you sure you want to delete the image for this subchapter?")) {
      try {
        const response = await api.delete(`/subchapter/image/${chapterNumber}/${subchapterNumber}/${imageNumber}`);
        if (response.status === 200) {
          alert("Image deleted successfully!");
          // Clear the input fields after successful deletion
          setChapterNumber(""); 
          setSubchapterNumber("");
          setImageNumber("");
        } else {
          alert("Error deleting image.");
        }
      } catch (error) {
        console.error("Error during image deletion:", error);
        alert("Error deleting image. Please try again.");
      }
    }
  };

  return (
    <div className="addimg container mt-5">
      <h3>Delete Image for Subchapter</h3>
      <form onSubmit={(e) => e.preventDefault()}>
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
        <div className="form-group mt-3">
          <label htmlFor="subchapterNumber">Subchapter Number</label>
          <input
            type="number"
            className="form-control"
            id="subchapterNumber"
            placeholder="Enter subchapter number"
            value={subchapterNumber}
            onChange={(e) => setSubchapterNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="imageNumber">Image Number</label>
          <input
            type="number"
            className="form-control"
            id="imageNumber"
            placeholder="Enter image number"
            value={imageNumber}
            onChange={(e) => setImageNumber(e.target.value)}
            required
          />
        </div>
        <button onClick={handleDelete} className="btn btn-danger mt-3">
          Delete Image
        </button>
      </form>
    </div>
  );
};

export default DeleteImg;
