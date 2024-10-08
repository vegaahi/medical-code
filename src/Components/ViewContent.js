import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api";
import { useParams } from "react-router-dom";
import "../css/ViewContent.css";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="content">
      <h1>{`chapter: ${chapter.chapterNumber} | ${chapter.title}`}</h1>
      <p>{chapter.content}</p>

      <ul>
        {chapter.subChapters.map((subchapter, index) => (
          <li key={index}>
            {subchapter.contentType === "TEXT" ? (
              <>
                <h4>
                  subchapter : {subchapter.subchapterNumber} - Title :{" "}
                  {subchapter.subchapterTitle}
                </h4>
                <p>{subchapter.content}</p>
              </>
            ) : (
              <>
                <h4>Image Title : {subchapter.subchapterTitle}</h4>
                <img
                  src={`/assets/${subchapter.content}`}
                  alt={subchapter.subchapterTitle}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewContent;
