import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import { useNavigate } from "react-router-dom"; // Import useNavigate for page redirection

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for handling errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(true); // State to control login popup visibility
  const navigate = useNavigate(); // Create a navigate function for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/User/login", {
        email,
        password,
      });

      // Check if the response status is 200 (indicating success)
      if (response.status === 200) {
        // Handle success: show alert and open modal
        alert("Login successful!");

        // Open the modal after successful login
        setIsModalOpen(true);
        setIsLoginPopupOpen(false); // Close the login popup/modal
      }
    } catch (err) {
      // Handle error (e.g., invalid credentials)
      setError(err.response?.data?.message || "Login failed! Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    // You can add additional actions here after closing the modal, if needed
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false); // Close the login popup
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      {isLoginPopupOpen && (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            {error && (
              <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
            )}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
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
              Login
            </button>
          </form>
        </>
      )}

      {/* Modal (Popup) */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h3>Welcome to Start Test!</h3>
            <p>You have logged in successfully.</p>
            <button
              onClick={handleCloseModal}
              style={{
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
