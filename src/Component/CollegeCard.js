
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Typography, Box, CardActionArea } from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import axios from "axios";
import { useLocation } from "react-router-dom";

async function getCollegesByField(fieldObj) {
  try {
    console.log("Fetching colleges for field object:", fieldObj);
    const response = await axios.post(
      "https://server2-latest.onrender.com/User/getColleges",
      { fieldData: fieldObj }
    );
    console.log(response)
    //console.log(response.data)
    return response.data || [];
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return [];
  }
}

const CollegeCard = () => {
  const location = useLocation();
  const fieldObj = location.state?.fieldData || {}; // Ensure it's always an object
  const fieldName = fieldObj?.field || "All Fields";

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (fieldObj) {
          const data = await getCollegesByField(fieldObj);
          console.log("-------------" ,data)
          setColleges(data);
          console.log("Colleges from response ///////// ",colleges)
        } else {
          setColleges([]);
        }
      } catch (err) {
        setError("Failed to load college data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fieldObj]);

  const getRatingFromRank = (rank) => Math.max(1, 6 - Math.ceil(rank / 5));
  const getGradeFromRank = (rank) => (rank <= 5 ? "A+" : rank <= 10 ? "A" : rank <= 20 ? "B+" : rank <= 30 ? "B" : "C");

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 4, bgcolor: "white", mt: 20 }}>
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Colleges for {typeof fieldName === "string" ? fieldName : "All Fields"}
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center" sx={{ mt: 4 }}>
        {colleges.map((college, index) => {
          const rating = getRatingFromRank(college.Rank || 30);
          const grade = getGradeFromRank(college.Rank || 30);

          return (
            <Card
              key={index}
              sx={{
                width: 320,
                boxShadow: 5,
                borderRadius: 3,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 8,
                },
                background: "white",
              }}
            >
              <CardActionArea>
                <CardHeader title={college.collegeName} subheader={college.collegeLocation} sx={{ textAlign: "center" }} />
                <CardContent sx={{ textAlign: "center" }}>
                  <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} sx={{ color: i < rating ? "#FFD700" : "#E0E0E0" }} />
                    ))}
                  </Box>
                  <Typography mt={2} fontWeight="bold" fontSize={18} color="primary">
                    Rank: {college.Rank || "N/A"} {grade ? `(Grade: ${grade})` : ""}
                  </Typography>
                  <Typography mt={1} color="text.secondary" fontSize={16}>
                    Fees: ₹{(college.collegeFees || 0).toLocaleString()}
                  </Typography>
                  {college.officialWebsite && (
                    <Typography mt={1} color="primary" fontSize={14}>
                      <a href={college.officialWebsite} target="_blank" rel="noopener noreferrer">
                        Official Website
                      </a>
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default CollegeCard;