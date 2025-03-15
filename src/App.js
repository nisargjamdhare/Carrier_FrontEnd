import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import backgroundImage from "./Images/career.jpg";
import StartTest from "./Component/StartTest";
import HomePage from "./Component/HomePage";
import TestForm from "./Component/TestForm";
import SpeechToText from "./Component/SpeechToText";
import CareerFields from "./Component/CarrerOutput";
import CollegeCard from "./Component/CollegeCard";
import axios from "axios";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const healthcheck = async () => {
      try {
        const apiUrl = "https://carrier-api-backend-new.onrender.com/";
        const response = await axios.post(apiUrl);
        console.log(response.data);
      } catch (error) {
        console.error("Healthcheck failed:", error);
      }
    };

    healthcheck();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear user session
    navigate("/"); // Redirect to homepage
    window.location.reload(); // Force a full page reload
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const storedName = localStorage.getItem("userName");
  const getBackgroundStyle = () => {
    if (["/starttest", "/collegeDisplay", "/careerDetails"].includes(location.pathname)) {
      return { backgroundImage: "none" };
    }
    return {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <div className="App" style={getBackgroundStyle()}>
      {/* User Profile Icon with Dropdown - Hidden on HomePage, Login, and Register */}
      {!["/","/login", "/register"].includes(location.pathname) && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "5px 10px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          <span style={{ fontWeight: "bold" }}>{storedName || ""}</span>
          <IconButton onClick={handleMenuOpen} style={{ color: "white" }}>
            <AccountCircleIcon />
          </IconButton>
        </div>
      )}
      
      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon style={{ marginRight: "8px" }} /> Logout
        </MenuItem>
      </Menu>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePage type="login" />} />
        <Route path="/register" element={<HomePage type="register" />} />
        <Route path="/starttest" element={<StartTest />} />
        <Route path="/testform" element={<TestForm isDemoInterview={true} />} />
        <Route path="/speechtotext" element={<SpeechToText />} />
        <Route path="/careerDetails" element={<CareerFields />} />
        <Route path="/collegeDisplay" element={<CollegeCard />} />
      </Routes>
    </div>
  );
}

export default App;
