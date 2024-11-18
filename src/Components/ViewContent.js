import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ViewContent.css"; // Ensure this file contains the necessary styles

function ViewContent() {
  const { chapterNumber } = useParams();
  // const navigate = useNavigate(); // For navigation
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  useEffect(() => {
    api
      .get(`/admins/chapter/${chapterNumber}`) // Fetch chapter details
      .then((response) => {
        setChapter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [chapterNumber]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-danger">Error: {error.message}</div>
    );
  if (!chapter || !chapter.subChapters) {
    return <div className="text-center">No subchapters available.</div>;
  }

  // Group subchapters by subchapter number
  const groupedSubchapters = chapter.subChapters.reduce((acc, subchapter) => {
    if (!acc[subchapter.subchapterNumber]) {
      acc[subchapter.subchapterNumber] = [];
    }
    acc[subchapter.subchapterNumber].push(subchapter);
    return acc;
  }, {});
  const subchapterGroups = Object.values(groupedSubchapters);

  // Calculate total pages
  const totalPages = subchapterGroups.length;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const handleUpdateSubchapter = () => {
  //   const currentSubchapter = subchapterGroups[currentPage - 1][0];
  //   navigate(`/admin/updateSubchapter/${chapterNumber}/${currentSubchapter.subchapterNumber}`, {
  //     state: { subchapter: currentSubchapter },
  //   });
  // };

  // const handleDeleteSubchapter = async () => {
  //   const currentSubchapter = subchapterGroups[currentPage - 1][0];
  //   if (window.confirm("Are you sure you want to delete this subchapter?")) {
  //     try {
  //       await api.delete(`/subchapter/TEXT/${chapterNumber}/${currentSubchapter.subchapterNumber}`);
  //       setChapter((prevChapter) => ({
  //         ...prevChapter,
  //         subChapters: prevChapter.subChapters.filter(
  //           (sub) => sub.subchapterNumber !== currentSubchapter.subchapterNumber
  //         ),
  //       }));
  //       alert("Subchapter deleted successfully.");
  //     } catch (error) {
  //       console.error("Error deleting subchapter:", error);
  //       alert("Failed to delete the subchapter. Please try again.");
  //     }
  //   }
  // };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">{`Chapter: ${chapter.chapterNumber}`}</h3>
          <h1 className="text-center">{`${chapter.title}`}</h1>
          <p>{chapter.content}</p>
        </div>
      </div>
      {/* Pagination Controls and Update/Delete buttons for the current subchapter group */}
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

      {/* <div className="d-flex justify-content-around mt-2">
        <button className="btn btn-primary" onClick={handleUpdateSubchapter}>
          <i className="fas fa-edit"></i> Update
        </button>
        <button className="btn btn-danger" onClick={handleDeleteSubchapter}>
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div> */}

      {/* Display current subchapter group */}
      <div className="row mt-4">
        <div className="col-12 scrollable">
          <ul className="list-group">
            {subchapterGroups[currentPage - 1]?.map((subchapter, index) => (
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
                      src={`/assets/${subchapter.content}`}
                      alt={subchapter.subchapterTitle}
                      className="img-fluid"
                      style={{ maxHeight: "400px" }}
                    />
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewContent;
