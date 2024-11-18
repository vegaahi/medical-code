import React, { useState, useEffect } from "react";
import api from "../../../api";

const UpdateChapter = () => {
  const [chapterNumber, setChapterNumber] = useState(""); // For input field
  const [currentChapterNumber, setCurrentChapterNumber] = useState(""); // For API calls
  const [title, setTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");

  // Fetch chapter data only when currentChapterNumber changes
  useEffect(() => {
    if (currentChapterNumber) {
      const fetchChapter = async () => {
        try {
          const response = await api.get(
            `/admins/chapter/${currentChapterNumber}`
          );
          const chapter = response.data;
          setTitle(chapter.title);
        } catch (error) {
          console.error("Error fetching chapter data:", error);
          setAlertMessage("Error fetching chapter data. Please try again.");
          setAlertType("danger");
          setAlertVisible(true);
        }
      };

      fetchChapter();
    }
  }, [currentChapterNumber]);

  // Handle form submission for updating the chapter
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedChapterData = {
      chapterNumber,
      title,
    };

    try {
      const response = await api.put(
        `/admins/chapter/${chapterNumber}`,
        updatedChapterData
      );
      console.log("Chapter updated successfully:", response.data);
      setAlertMessage("Chapter updated successfully!");
      setAlertType("success");
      setAlertVisible(true);
    } catch (error) {
      console.error("Error updating chapter:", error);
      setAlertMessage("Error updating chapter. Please try again.");
      setAlertType("danger");
      setAlertVisible(true);
    }
  };

  // Handle fetching chapter when user presses Enter or submits
  const handleFetchChapter = (e) => {
    e.preventDefault();
    setCurrentChapterNumber(chapterNumber); // Trigger API call
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className="container mt-5">
        <h3>Update Chapter</h3>
        {alertVisible && (
          <div
            className={`alert alert-${alertType} alert-dismissible fade show`}
            role="alert"
          >
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setAlertVisible(false)}
            ></button>
          </div>
        )}

        {/* Fetch Chapter Form */}
        <form onSubmit={handleFetchChapter}>
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
          <button type="submit" className="btn btn-secondary mt-3">
            Fetch Chapter
          </button>
        </form>

        {/* Update Chapter Form */}
        {currentChapterNumber && (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="form-group">
              <label htmlFor="title">Chapter Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter chapter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Update Chapter
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateChapter;
