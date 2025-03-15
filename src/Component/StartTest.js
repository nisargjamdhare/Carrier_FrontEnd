import React, { useState } from "react";
import TestForm from "./TestForm"; // Import the TestForm component

function StartTest() {
  const [isChecked, setIsChecked] = useState(false); // To control checkbox state
  const [isTestFormVisible, setIsTestFormVisible] = useState(false); // To show/hide TestForm
  const [isDemoInterview, setIsDemoInterview] = useState(false); // To control demo interview state

  // Handle the checkbox change event for Demo Interview
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setIsDemoInterview(e.target.checked); // Set isDemoInterview based on checkbox
  };

  // Handle the start button click event
  const handleStartButtonClick = () => {
    setIsTestFormVisible(true);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h6
        style={{
          fontFamily: '"Sour Gummy", sans-serif',
          fontOpticalSizing: "auto",
          fontWeight: "50", // Use a valid number or string (e.g., "bold" or "normal")
          fontStyle: "normal",
          fontSize: "50px",
          marginTop :"90px",
          marginBottom : "0px",
          fontVariationSettings: '"wdth" 100',
          textShadow: "2px 2px 5px rgba(222, 39, 39, 1)", // Correct syntax for text-shadow
          animation: "colorChange 6s infinite",
        }}
      >
        Tailored Careercraft Guidance For Tomorrow's Leaders
      </h6>

      {/* Checkbox Container */}
      {!isTestFormVisible && !isChecked && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              style={{
                appearance: "none",
                width: "20px",
                height: "20px",
                border: "2px solid #4CAF50",
                borderRadius: "5px",
                cursor: "pointer",
                position: "relative",
                marginRight: "10px",
              }}
            />
            <span style={{ position: "relative", fontSize: "16px" }}>
              Do you want to give a Demo Interview?
            </span>
          </label>
        </div>
      )}

      {/* Show Start Button if checkbox is checked */}
      {isChecked && !isTestFormVisible && (
        <button
          onClick={handleStartButtonClick}
          style={{
            width: "200px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Start QUIZ
        </button>
      )}

      {/* Show the TestForm with a fade-in animation */}
      {isTestFormVisible && (
        <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
          <TestForm isDemoInterview={isDemoInterview} />
        </div>
      )}

      {/* Keyframes for fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default StartTest;
