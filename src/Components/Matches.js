import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  const apiUrl = "http://localhost:5000/api/data";
  const footballDataApiUrl = "https://api.football-data.org/v4";
  const matchesEndpoint = "/matches?competitions=PL,DED&dateFrom=2018-10-01";

  useEffect(() => {
    const fetchMatches = async () => {
        try {
          const response = await fetch(
            `${apiUrl}?uri=${footballDataApiUrl}${matchesEndpoint}`
          );
          const data = await response.json();
          console.log(data)
          // Assuming matches data structure and how you want to set it in state
          setMatches(data.matches);
        } catch (error) {
          console.error("Error fetching matches data:", error);
        }
      };
    fetchMatches();
  }, []);


  return (
    <div>
      <Navbar />
      <div>
          <h2>Matches</h2>
          {/* Display your matches data here */}
        </div>
    </div>
  );
};

export default Matches;
