import React from "react";
import "./styles/spinner.css"; // import the CSS

const Spinner = ({ size = 40, color = "#3498db", overlay = false }) => {
  return (
    <div className={overlay ? "spinner-overlay" : ""}>
      <div
        className="spinner"
        style={{
          width: size + "px",
          height: size + "px",
          borderTopColor: color,
        }}
      ></div>
    </div>
  );
};

export default Spinner;
