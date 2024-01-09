import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Standings = () => {
  const [data, setData] = useState(null);

  const apiUrl = 'http://localhost:5000/api/data';
  const uri = 'https://api.football-data.org/v4/competitions/PL/matches';

  // fetch(`${apiUrl}?uri=${uri}`)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     setData(data);
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error.message);
  //   });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}?uri=${uri}`);
        const data = await response.json();

        setData(data);
        console.log(data);
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
