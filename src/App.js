import React, { useState } from "react";
import "./App.css";
import backgroundImage from "./Images/career.jpg"; // Your background image
import { Route, Routes } from "react-router-dom"; // Importing Route components for routing
import Login from "./Component/Login"; // Login component
import Register from "./Component/Register"; // Register component
import StartTest from "./Component/StartTest"; // StartTest component

function App() {
  const [showLogin, setShowLogin] = useState(false); // State for login modal visibility
  const [showRegister, setShowRegister] = useState(false); // State for register modal visibility
  const [showStartTest, setShowStartTest] = useState(false); // State for StartTest modal visibility

  // Function to handle closing all modals and popups
  const handleCloseModal = () => {
    setShowLogin(false); // Close login modal
    setShowRegister(false); // Close register modal
    setShowStartTest(false); // Close StartTest popup
  };

  // Handle showing the login modal
  const handleLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true); // Open login modal
  };

  // Handle showing the register modal
  const handleRegisterClick = () => {
    setShowLogin(false); // Close the login modal if it's open
    setShowRegister(true); // Open register modal
  };

  // Handle showing the StartTest popup
  const handleStartTestClick = () => {
    setShowStartTest(true); // Show the StartTest modal
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="auth-buttons">
        <button className="auth-button" onClick={handleLoginClick}>
          Login
        </button>
        <button className="auth-button" onClick={handleRegisterClick}>
          Register
        </button>
      </div>

      <div className="App-content">
        <h1>
          <b>Let’s Kick Start Your Dream</b> <br />
          <b>Career</b>
        </h1>
        <div className="LetsStarted">
          <button
            className="start-button"
            onClick={handleStartTestClick} // Trigger the StartTest popup on "Let's get started"
          >
            Let’s Get Started
          </button>
        </div>
      </div>

      {/* Conditionally render the Login and Register modals */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <Login />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <Register handleLoginClicks={handleLoginClick} />
          </div>
        </div>
      )}

      {/* Conditionally render the StartTest popup */}
      {showStartTest && <StartTest onClose={handleCloseModal} />}

      {/* Routes (optional if you still want route support) */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/starttest" element={<StartTest />} />
      </Routes>
    </div>
  );
}

export default App;
