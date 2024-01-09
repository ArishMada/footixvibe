import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Standings = () => {
  const [PL, setPL] = useState({});
  
  const apiUrl = 'http://localhost:5000/api/data';
  const uri = 'https://api.football-data.org/v4/competitions/PL/standings';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}?uri=${uri}`);
        const data = await response.json();
        
        const newPL = {};
        for (var i = 0; i < data['standings'][0]['table']['length']; i++){
          let dataDict = {};
          dataDict['Draw'] = (data['standings'][0]['table'][i]['draw'])
          dataDict['Goal Difference'] = (data['standings'][0]['table'][i]['goalDifference'])
          dataDict['Goals Against'] = (data['standings'][0]['table'][i]['goalsAgainst'])
          dataDict['Goals For'] = (data['standings'][0]['table'][i]['goalsFor'])
          dataDict['Lost'] = (data['standings'][0]['table'][i]['lost'])
          dataDict['Played Games'] = (data['standings'][0]['table'][i]['playedGames'])
          dataDict['Points'] = (data['standings'][0]['table'][i]['points'])
          dataDict['Position'] = (data['standings'][0]['table'][i]['position'])
          dataDict['Team'] = (data['standings'][0]['table'][i]['team']['name'])
          newPL[i] = dataDict
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
