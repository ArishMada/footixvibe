import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Standings = () => {
  const [PL, setPL] = useState({});
  
  const apiUrl = 'http://localhost:5000/api/data';
  const uri = 'https://api.football-data.org/v4/competitions';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}?uri=${uri}`);
        const data = await response.json();

        const newPL = {};
        for (var i = 0; i < data['competitions']['length']; i++){
          let dataArr = [];
          dataArr.push(data['competitions'][i]['name'])
          dataArr.push(data['competitions'][i]['emblem'])
          dataArr.push(data['competitions'][i]['currentSeason']['startDate'])
          dataArr.push(data['competitions'][i]['currentSeason']['endDate'])
          newPL[i] = dataArr
        }
        setPL(newPL);
        console.log(newPL)
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, []);

return (
  <div>
    <Navbar/>
  </div>
)
}

export default Standings