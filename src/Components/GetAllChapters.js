import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
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
        await api.delete(`/admins/chapter/${chapterNumber}`); // Delete chapter by chapter number
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
            <motion.div
              className="ag-courses_item"
              key={chapter.chapterNumber}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.a
                className="ag-courses-item_link"
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  navigate(`/admin/viewContent/${chapter.chapterNumber}`)
                }
              >
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">{chapter.title}</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">{`Chapter ${chapter.chapterNumber}`}</span>
                </div>
              </motion.a>

              {/* Buttons */}
              <div className="buttons-container">
                <motion.button
                  className="btn me-2 transparent-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    navigate(`/admin/updatechapter/${chapter.chapterNumber}`)
                  }
                >
                  <i className="fas fa-edit"></i>
                </motion.button>
                <motion.button
                  className="btn  ms-5 transparent-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(chapter.chapterNumber)}
                >
                  <i className="fas fa-trash-alt"></i>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetAllChapters;
