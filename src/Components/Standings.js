import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Standings = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}?uri=${uri}`);
        const data = await response.json();
        
        const newPL = {};
        for (var i = 0; i < data['matches']['length']; i++){
          let dataArr = Array();
          const dateOptions = { year: "numeric", month: "long", day: "numeric"};
          const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
          const formattedDate = new Date(data['matches'][i]['utcDate']).toLocaleDateString(undefined, dateOptions);
          const formattedTime = new Date(data['matches'][i]['utcDate']).toLocaleTimeString(undefined, timeOptions);
          dataArr.push(formattedDate)
          dataArr.push(formattedTime)
          dataArr.push(data['matches'][i]['homeTeam']['name'])
          dataArr.push(data['matches'][i]['awayTeam']['name'])
          dataArr.push(data['matches'][i]['competition']['name'])
          dataArr.push(data['matches'][i]['score']['fullTime']['away'])
          dataArr.push(data['matches'][i]['score']['fullTime']['home'])
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
      <h2>Data from API:</h2>
  
      <div className="match-list">
        {/* <p>{data}</p> */}
        {/* {data.matches.map((match, index) => (
          <div key={index} className="match">
            <p>{`Match ${index + 1}:`}</p>
            <p>{`Date: ${match.season.startDate}`}</p>
            <p>{`Home Team: ${match.homeTeam.name}`}</p>
            <p>{`Away Team: ${match.awayTeam.name}`}</p>
            <p>{`Competition: ${match.competition.name}`}</p>
            <p>{`Score: ${match.score.fullTime.home} - ${match.score.fullTime.away}`}</p>
            <p>{`Winner: ${match.score.winner}`}</p>
            <hr />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Standings;
