import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CompetitionDropdown from "./CompetitionDropdown";
import "./Standing.css"

const Standings = () => {
  const [standing, setStanding] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [chosenCompetition, setChosenCompetition] = useState(null);

  const apiUrl = "http://localhost:5000/api/data";
  const footballDataApiUrl = "https://api.football-data.org/v4";
  const matchesEndpoint = "/standings";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?uri=${footballDataApiUrl}/competitions`
        );
        const data = await response.json();

        console.log(data);

        const filteredCompetitions = data.competitions.filter(
          (competition) => competition.type === "LEAGUE"
        );

        const newCompetitions = filteredCompetitions.map((competition) => ({
          name: competition.name,
          emblem: competition.emblem,
          code: competition.code,
          country: competition.area.name
        }));

        setCompetitions(newCompetitions);
      } catch (error) {
        console.error("Error fetching competitions data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (chosenCompetition) {
        try {
          const response = await fetch(
            `${apiUrl}?uri=${footballDataApiUrl}/competitions/${chosenCompetition.code}${matchesEndpoint}`
          );
          const data = await response.json();
          console.log(data.standings[0].table);

          const newStanding = data.standings[0].table.map((team) => ({
            position: team.position,
            name: team.team.name,
            plDay: team.playedGames,
            won: team.won,
            draw: team.draw,
            lost: team.lost,
            goalsFor: team.goalsFor,
            goalsAgainst: team.goalsAgainst,
            goalDifference: team.goalDifference,
            points: team.points,
            crest: team.team.crest
          }));

          console.log(newStanding);
          setStanding(newStanding);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [chosenCompetition]);

  const handleDropdownChange = (event) => {
    const selectedCode = event.target.value;
    const selectedCompetition = competitions.find(
      (competition) => competition.code === selectedCode
    );
    setChosenCompetition(selectedCompetition);
  };

  return (
    <div>
      <Navbar />
      <CompetitionDropdown
        competitions={competitions}
        chosenCompetition={chosenCompetition}
        onDropdownChange={handleDropdownChange}
      />
      <div className="competition-title">
            <img src={chosenCompetition.emblem} alt="Competition Emblem" />
            <h2>{chosenCompetition.name}</h2>
          </div>
      <div>
        {chosenCompetition && (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Draw</th>
                <th>Lost</th>
                <th>Goals For</th>
                <th>Goals Against</th>
                <th>Goal Difference</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
            {standing.map((team) => (
                <tr key={team.name}>
                  <td>{team.position}</td>
                  <td>
                    <img src={team.crest} alt=""></img>
                    {team.name}
                    </td>
                  <td>{team.plDay}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Standings;
