import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Standings = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.football-data.org/v4/competitions/PD/standings",
          {
            headers: {
              "X-Auth-Token": "fd490b04139846d595bd99f2de5753af", // Replace with your actual token
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="standing-page">
        <Navbar/>
    </div>
  );
};

export default Standings;
