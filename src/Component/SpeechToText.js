import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SpeechToText = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const location = useLocation();
  const formResponses = location.state?.formResponses || [];

  useEffect(() => {
    setTextToCopy(transcript);
  }, [transcript]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setIsRecording(true);
  };

  const restartListening = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    setTimer(0);
    setTextToCopy("");
    startListening();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      SpeechRecognition.stopListening();
      setIsRecording(false);

      const combinedResponse = {
        form_responses: formResponses.map((response) => ({
          question: response.question,
          answer: response.answer,
        })),
        interview_transcription:
          transcript || "No interview transcript available",
      };

      console.log(
        "Sending Combined Response:",
        JSON.stringify(combinedResponse, null, 2)
      );

      const apiUrl =
        "https://server2-latest.onrender.com/User/modelResponse";
      const response = await axios.post(apiUrl, combinedResponse, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data);

      // Handle the new response structure
      if (response.data) {
        try {
          // If response.data is already in the correct format, use it directly
          const careerData = {
            careerFields: response.data.careerFields || [],
            improvementSuggestions: response.data.improvementSuggestions || "",
          };

          console.log("Career Data:", careerData);
          localStorage.setItem("careerFieldsData", JSON.stringify(careerData));
          window.open("/careerDetails", "_blank");
        } catch (error) {
          console.error("Error processing career data:", error);
          // Log the problematic data for debugging
          console.log("Problematic data:", response.data);
        }
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.timer}>Recording Timer: {timer} seconds</div>
        <div>{textToCopy || "Click 'Start' to begin recording."}</div>
        <div style={styles.buttonContainer}>
          <button
            onClick={startListening}
            style={{
              padding: "12px 20px",
              margin: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Start
          </button>

          <button
            onClick={restartListening}
            style={{
              padding: "12px 20px",
              margin: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#28a745", // Green color
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#218838")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#28a745")
            }
          >
            Restart
          </button>

          <button
            onClick={handleSubmit}
            style={{
              padding: "12px 20px",
              margin: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#dc3545", // Red color
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#c82333")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#dc3545")
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainContent: {
    maxWidth: "50rem",
    width: "100%",
    minHeight: "300px",
    height: "auto",
    padding: "18px 18px 120px 18px",
    position: "relative",
    boxShadow: "0 12px 48px 0px rgb(109 117 141 / 20%)",
    background: "rgb(255 255 255)",
    border: "0.5px solid rgb(231 233 245)",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "rgb(17, 166, 131)",
    animation: "blink 1s infinite ease-in-out",
    "@keyframes blink": {
      "0%": { opacity: 1 },
      "50%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "rgb(17 166 131)",
    color: "rgb(255 255 255)",
    borderRadius: "6px",
    padding: "16px 32px",
    border: "none",
    fontSize: "18px",
    letterSpacing: "1px",
    cursor: "pointer",
  },
};

export default SpeechToText;
