import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ViewContent.css"; // Make sure this file contains the above CSS

function ViewContent() {
  const { chapterNumber } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/chapter/${chapterNumber}`) // Replace with your actual API endpoint
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

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">{`Chapter: ${chapter.chapterNumber}`}</h3>
          <h1 className="text-center">{` ${chapter.title}`}</h1>
          <p>{chapter.content}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 scrollable">
          {" "}
          {/* Apply the scrollable class here */}
          <ul className="list-group">
            {chapter.subChapters.map((subchapter, index) => (
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
