import React, { useEffect, useState, useMemo } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ViewContent.css";

function ViewContent() {
  const { chapterNumber } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const BASE_URL =
    process.env.REACT_APP_BASE_URL || "http://localhost:8080/uploads";

  useEffect(() => {
    console.log("Fetching chapter data..."); // Debugging
    api
      .get(`/admins/chapter/${chapterNumber}`)
      .then((response) => {
        if (JSON.stringify(response.data) !== JSON.stringify(chapter)) {
          setChapter(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [chapterNumber, chapter]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-danger">Error: {error.message}</div>
    );
  if (!chapter || !chapter.subChapters)
    return <div className="text-center">No subchapters available.</div>;

  const groupedSubchapters = chapter.subChapters.reduce((acc, subchapter) => {
    if (!acc[subchapter.subchapterNumber]) {
      acc[subchapter.subchapterNumber] = [];
    }
    acc[subchapter.subchapterNumber].push(subchapter);
    return acc;
  }, {});

  const subchapterGroups = Object.values(groupedSubchapters);
  const totalPages = subchapterGroups.length;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">{`Chapter: ${chapter.chapterNumber}`}</h3>
          <h1 className="text-center">{`${chapter.title}`}</h1>
          <p>{chapter.content}</p>
        </div>
      </div>

      {/* Pagination Controls */}
      <nav aria-label="Page navigation example" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li className="page-item" key={index + 1}>
              <button
                className={`page-link ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Display current subchapter group */}
      <div className="row mt-4">
        <div className="col-12 scrollable">
          <ul className="list-group">
            {subchapterGroups[currentPage - 1]?.map((subchapter, index) => {
              const imageUrl = `${BASE_URL}/${subchapter.content}`;

              return (
                <li key={index} className="list-group-item">
                  {subchapter.contentType === "TEXT" ? (
                    <>
                      <h4>
                        Subchapter: {subchapter.subchapterNumber} - Title:{" "}
                        {subchapter.subchapterTitle}
                      </h4>
                      <p
                        dangerouslySetInnerHTML={{ __html: subchapter.content }}
                      ></p>
                    </>
                  ) : (
                    <>
                      <h4>Image Title: {subchapter.subchapterTitle}</h4>
                      <img
                        src={`${BASE_URL}/${subchapter.content}`}
                        alt={subchapter.subchapterTitle}
                        className="img-fluid"
                        style={{
                          maxHeight: "400px",
                          borderRadius: "10px",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none"; // ✅ Hides the image if it fails to load
                        }}
                      />
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewContent;
