import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CareerFields = () => {
  const [careerData, setCareerData] = useState({
    careerFields: [],
    improvementSuggestions: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("careerFieldsData");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);

        if (Array.isArray(parsedData.careerFields) && typeof parsedData.improvementSuggestions === "string") {
          setCareerData({
            careerFields: parsedData.careerFields,
            improvementSuggestions: parsedData.improvementSuggestions,
          });
        } else {
          console.error("Invalid data structure: Missing required properties.");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.warn("No career data found in localStorage.");
      
      // Add some sample data for testing
      const sampleData = {
        careerFields: [
          { field: "Web Development", reason: "High demand for skilled developers in the digital economy." },
          { field: "Data Science", reason: "Growing field with applications across industries." },
          { field: "UX/UI Design", reason: "Essential for creating user-friendly digital experiences." }
        ],
        improvementSuggestions: "Consider exploring specialized certifications in your field of interest."
      };
      
      setCareerData(sampleData);
      localStorage.setItem("careerFieldsData", JSON.stringify(sampleData));
    }
  }, []);

  function redirect(field) {
    console.log("Redirecting to College UI for:", field);
    // Pass the entire field object
    navigate("/collegeDisplay", { state: { fieldData: field } });
  }
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Some trending Career Options</h2>

      {careerData.careerFields.length > 0 ? (
        <ul style={styles.list}>
          {careerData.careerFields.map((field, index) => (
            <li key={index} style={styles.item}>
              <h3
                style={styles.field}
                onClick={() => redirect(field)} // Pass the entire field object
              >
                {field.field} {/* Display just the field name */}
              </h3>
              <p style={styles.reason}>{field.reason}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.empty}>No career fields available.</p>
      )}

      {careerData.improvementSuggestions && (
        <div style={styles.suggestions}>
          <h3 style={styles.suggestionTitle}>Improvement Suggestions</h3>
          <p style={styles.suggestionText}>{careerData.improvementSuggestions}</p>
        </div>
      )}
    </div>
  );
};

export default CareerFields;

const styles = {
  container: {
    marginTop: "0px",
    padding: "30px",
    maxWidth: "80%",
    margin: "0 auto",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease-in-out",
  },
  title: {
    fontFamily: '"Sour Gummy", sans-serif',
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffcc00",
    textShadow: "3px 3px 8px rgba(55, 53, 53, 0.8)",
  },
  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  item: {
    background: "#fff",
    padding: "8px",
    borderRadius: "20px",
    borderLeft: "6px solid #007bff",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
  },
  field: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#0056b3",
    marginBottom: "8px",
  },
  reason: {
    fontSize: "1rem",
    color: "#444",
  },
  empty: {
    fontSize: "1.1rem",
    color: "#888",
    textAlign: "center",
    fontStyle: "italic",
  },
  suggestions: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "2px 4px 10px rgba(250, 250, 250, 0.1)",
  },
  suggestionTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#d72638",
    marginBottom: "8px",
  },
  suggestionText: {
    fontSize: "1rem",
    color: "#555",
  },
};
