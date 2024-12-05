import React from "react";

const StartTest = ({ onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {/* Close button */}
        <button onClick={onClose} style={styles.closeButton}>
          ✖
        </button>
        {/* Modal content */}
        <div style={styles.content}>
          <h2>Start Test</h2>
          <p>Are you ready to begin the test?</p>
          <button onClick={() => alert("Test Started!")} style={styles.button}>
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "95%",
    height: "90%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#999",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default StartTest;
