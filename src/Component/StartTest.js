import React, { useState } from "react";

const StartTest = () => {
  // State to track if the test has started
  const [testStarted, setTestStarted] = useState(false);

  // Handle the button click to start the test
  const handleStartTest = () => {
    setTestStarted(true);
    alert("Test has started! Good luck!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Start Your Test</h2>
      <p style={{ fontSize: "16px" }}>
        Click the button below to start your test. Once started, you can begin answering questions.
      </p>

      {/* Display the button to start the test */}
      {!testStarted ? (
        <button
          onClick={handleStartTest}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Start Test
        </button>
      ) : (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>The test has started. Good luck!</p>
          {/* You can add further instructions or next steps here */}
        </div>
      )}
    </div>
  );
};

export default StartTest;
