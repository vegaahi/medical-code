import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/GetAllChapters.css"; // Import custom CSS
import api from "../api";

function GetAllChapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await api.get(`/admins/chapter/`); // Fetch all chapters
        setChapters(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  const handleDelete = async (chapterNumber) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      try {
        const response = await api.delete(`/admins/chapter/${chapterNumber}`); // Delete chapter by chapter number
        console.log("Delete response:", response.data);
        setChapters((prevChapters) =>
          prevChapters.filter(
            (chapter) => chapter.chapterNumber !== chapterNumber
          )
        );
        alert("Chapter deleted successfully.");
      } catch (error) {
        console.error("Error deleting chapter:", error);
        alert("Failed to delete the chapter. Please try again.");
      }
    } else {
      alert("Deletion canceled.");
    }
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <div className="alert alert-danger">Error: {error.message}</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Chapters</h1>
      <div className="ag-format-container">
        <div
          className="ag-courses_box"
          style={{ maxHeight: "400px", overflowY: "scroll" }}
        >
          {chapters.map((chapter) => (
            <div className="ag-courses_item" key={chapter.chapterNumber}>
              <a
                className="ag-courses-item_link"
                onClick={() =>
                  navigate(`/admin/viewContent/${chapter.chapterNumber}`)
                }
              >
                <div className="ag-courses-item_bg"></div>{" "}
                {/* Background circle */}
                <div className="ag-courses-item_title">{`Chapter ${chapter.chapterNumber}`}</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">{chapter.title}</span>
                </div>
              </a>
              <div className="d-flex justify-content-around mt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/admin/updatechapter/${chapter.chapterNumber}`)} // Navigate to update page
                >
                  <i className="fas fa-edit"></i> Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(chapter.chapterNumber)} // Use chapter.chapterNumber for deletion
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetAllChapters;
