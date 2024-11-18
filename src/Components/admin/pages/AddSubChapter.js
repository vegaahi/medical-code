import React, { useState } from "react";
// import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../../api";

const AddSubChapter = () => {
  const [chapterNumber, setChapterNumber] = useState("");
  const [subchapterNumber, setsubchapterNumber] = useState("");
  const [subchapterTitle, setSubchapterTitle] = useState("");
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);

  // Quill toolbar options
  const toolbarOptions = [
    [{ font: [] }], // Font family dropdown
    [{ size: ["small", false, "large", "huge"] }], // Font size
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
    ["bold", "italic", "underline", "strike"], // Bold, italic, underline, strikethrough
    [{ color: [] }, { background: [] }], // Text and background color
    [{ align: [] }], // Align text (left, center, right, justify)
    ["blockquote", "code-block"], // Blockquote and code block
    [{ list: "ordered" }, { list: "bullet" }], // Ordered and unordered lists
    [{ script: "sub" }, { script: "super" }], // Subscript and superscript
    ["link", "image", "video"], // Links, images, and videos
    ["clean"], // Remove formatting
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  // Properly handle the Quill content change
  const handleChange = (value) => {
    setContent(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const subChapterData = {
      chapterNumber,
      subchapterNumber,
      subchapterTitle,
      content,
      contentType: "TEXT", // Set contentType directly here
    };

    try {
      // Example of sending subchapter data to an API using axios
      const response = await api.post(
        `/admins/subchapter/text?chapterNumber=${chapterNumber}`,
        subChapterData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Subchapter added successfully:", response.data);

      // Set success alert
      setAlert({ type: "success", message: "Subchapter added successfully!" });
      setShowAlert(true);

      // Reset form fields after successful submission
      setChapterNumber("");
      setsubchapterNumber("");
      setSubchapterTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding subchapter:", error);

      // Set error alert
      setAlert({
        type: "danger",
        message: "Error adding subchapter. Please try again.",
      });
      setShowAlert(true);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add Subchapter</h3>
      {showAlert && alert.message && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="subchapterNumber">Subchapter Number</label>
          <input
            type="number"
            className="form-control"
            id="subchapterNumber"
            placeholder="Enter subchapter number"
            value={subchapterNumber}
            onChange={(e) => setsubchapterNumber(e.target.value)}
            required
          />
        </div>

        {/* Subchapter Title Field */}
        <div className="form-group mt-3">
          <label htmlFor="subchapterTitle">Subchapter Title</label>
          <input
            type="text"
            className="form-control"
            id="subchapterTitle"
            placeholder="Enter subchapter title"
            value={subchapterTitle}
            onChange={(e) => setSubchapterTitle(e.target.value)}
            required
          />
        </div>

        {/* Content Field */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={modules}
        />
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-4">
          Add Subchapter
        </button>
      </form>
    </div>
  );
};

export default AddSubChapter;
