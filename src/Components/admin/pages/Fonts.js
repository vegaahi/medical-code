import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Fonts = () => {
  const [font, setFont] = useState("Arial"); // Default font
  
  // Load the font from localStorage on component mount
  useEffect(() => {
    const savedFont = localStorage.getItem("font");
    if (savedFont) {
      setFont(savedFont);
      document.body.style.fontFamily = savedFont; // Apply saved font
    }
  }, []);

  // Handle font change
  const handleFontChange = (e) => {
    const selectedFont = e.target.value;
    setFont(selectedFont);
    document.body.style.fontFamily = selectedFont; // Apply the new font
    localStorage.setItem("font", selectedFont); // Save to localStorage
  };

  return (
    <div className="container mt-5 p-4 bg-light shadow-lg rounded settings-container">
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown">Font Settings</h2>
      <div className="form-group">
        <label htmlFor="font-select" className="form-label font-weight-bold text-secondary">
          Choose a font:
        </label>
        <select
          id="font-select"
          className="form-select form-select-sm border-info "
          value={font}
          onChange={handleFontChange}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Impact">Impact</option>
          <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
          <option value="Palatino Linotype">Palatino Linotype</option>
          <option value="Segoe UI">Segoe UI</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Garamond">Garamond</option>
          <option value="Brush Script MT">Brush Script MT</option>
          <option value="Gill Sans">Gill Sans</option>
          <option value="Optima">Optima</option>
          <option value="Futura">Futura</option>
          <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
          <option value="Baskerville">Baskerville</option>
          <option value="Roboto">Roboto</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Lato">Lato</option>
          <option value="Raleway">Raleway</option>
          <option value="Noto Sans">Noto Sans</option>
          <option value="Quicksand">Quicksand</option>
          <option value="Playfair Display">Playfair Display</option>
          <option value="Merriweather">Merriweather</option>
          <option value="Poppins">Poppins</option>
          <option value="Rubik">Rubik</option>
          <option value="Source Sans Pro">Source Sans Pro</option>
          <option value="Inter">Inter</option>
          <option value="Nunito">Nunito</option>
          <option value="Pacifico">Pacifico</option>
          <option value="Lobster">Lobster</option>
          <option value="Great Vibes">Great Vibes</option>
          <option value="Dancing Script">Dancing Script</option>
          <option value="Josefin Sans">Josefin Sans</option>
          <option value="Alegreya Sans">Alegreya Sans</option>
        </select>
      </div>
    </div>
  );
};

export default Fonts;
