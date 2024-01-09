import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Table from "./Table";

const Standings = () => {
  const [PL, setPL] = useState([]);

  const apiUrl = 'http://localhost:5000/api/data';
  const uri = 'https://api.football-data.org/v4/competitions/PL/matches';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}?uri=${uri}`);
        const data = await response.json();
        
        const newPL = [];
        for (var i = 0; i < data['matches']['length']; i++){
          let dataArr = [];
          const dateOptions = { year: "numeric", month: "long", day: "numeric"};
          const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
          const formattedDate = new Date(data['matches'][i]['utcDate']).toLocaleDateString(undefined, dateOptions);
          const formattedTime = new Date(data['matches'][i]['utcDate']).toLocaleTimeString(undefined, timeOptions);
          dataArr.push(formattedDate)
          dataArr.push(formattedTime)
          dataArr.push(data['matches'][i]['homeTeam']['name'])
          dataArr.push(data['matches'][i]['awayTeam']['name'])
          dataArr.push(data['matches'][i]['competition']['name'])
          dataArr.push(data['matches'][i]['score']['fullTime']['home'] + "-" + data['matches'][i]['score']['fullTime']['away'])
          if (data['matches'][i]['score']['winner'] === "AWAY_TEAM"){
            dataArr.push(data['matches'][i]['awayTeam']['name'])
          } else {
            dataArr.push(data['matches'][i]['homeTeam']['name'])
          }
          newPL[i] = dataArr
        }
        setPL(newPL);
        console.log(newPL)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="standing-page">
      <Navbar />
      <Table data={PL}/>
    </div>
  );
};

export default Standings;
