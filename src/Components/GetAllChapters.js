import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/GetAllChapters.css'; // Import custom CSS

function GetAllChapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/chapter/") // Replace with your actual API endpoint to fetch all chapters
      .then((response) => {
        setChapters(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

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

  if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Chapters</h1>
      <div className="ag-format-container">
        <div className="ag-courses_box" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          {chapters.map((chapter) => (
            <div className="ag-courses_item" key={chapter.id}>
              <a
                className="ag-courses-item_link"
                onClick={() => navigate(`/admin/viewContent/${chapter.chapterNumber}`)}
              >
                <div className="ag-courses-item_bg"></div> {/* Background circle */}
                <div className="ag-courses-item_title">{`Chapter ${chapter.chapterNumber}`}</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">{chapter.title}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetAllChapters;
