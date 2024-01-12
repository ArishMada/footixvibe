import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CompetitionDropdown from "./CompetitionDropdown";
import "./Standing.css";
import { handleWindowUnload } from "./firebase";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [chosenCompetition, setChosenCompetition] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);

  const apiUrl = "http://localhost:5000/api/data";
  const footballDataApiUrl = "https://api.football-data.org/v4";
  const standingsEndpoint = "/standings";

  window.addEventListener("beforeunload", handleWindowUnload)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?uri=${footballDataApiUrl}/competitions`
        );
        const data = await response.json();

        const newCompetitions = data.competitions.map((competition) => ({
          name: competition.name,
          emblem: competition.emblem,
          code: competition.code,
          matchDay: competition.currentSeason.currentMatchday,
          type: competition.type,
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
            `${apiUrl}?uri=${footballDataApiUrl}/competitions/${chosenCompetition.code}${standingsEndpoint}`
          );
          const data = await response.json();

          let newStandings;

          if (chosenCompetition.type === "CUP") {
            // Check if standings are grouped by stage (group)
            if (data.standings && data.standings.length > 0) {
              const availableGroups = data.standings.map(
                (standing) => standing.group
              );
              setGroups(availableGroups);
            }

            // For Cups
            if (selectedGroup) {
              newStandings =
                data.standings
                  .find((standing) => standing.group === selectedGroup)
                  ?.table.map((team) => ({
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
                    crest: team.team.crest,
                    group: team.group,
                  })) || [];
            }
          } else if (chosenCompetition.type === "LEAGUE") {
            // For league competitions
            if (data.standings && data.standings.length > 0) {
              newStandings = data.standings[0].table.map((team) => ({
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
                crest: team.team.crest,
              }));
            }
          }

          setStandings(newStandings || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [chosenCompetition, selectedGroup]);

  const handleDropdownChange = (event) => {
    const selectedCode = event.target.value;
    const selectedCompetition = competitions.find(
      (competition) => competition.code === selectedCode
    );
    setChosenCompetition(selectedCompetition);
    setGroups([]);
    setSelectedGroup(null);
  };

  const handleGroupChange = (event) => {
    const selectedGroup = event.target.value;
    setSelectedGroup(selectedGroup);
  };

  return (
    <div>
      <Navbar />
      <CompetitionDropdown
        competitions={competitions}
        chosenCompetition={chosenCompetition}
        onDropdownChange={handleDropdownChange}
      />
      {chosenCompetition && (
        <div className="competition-title">
          <img src={chosenCompetition.emblem} alt="Competition Emblem" />
          <h2>{chosenCompetition.name}</h2>
          <p>Match day: {chosenCompetition.matchDay}</p>
          {chosenCompetition.type === "CUP" && (
            <div>
              <label htmlFor="groupDropdown">Select Group: </label>
              <select
                id="groupDropdown"
                value={selectedGroup || ""}
                onChange={handleGroupChange}
              >
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      <div className="standing-table">
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
              {standings.map((team) => (
                <tr key={team.name}>
                  <td>{team.position}</td>
                  <td>
                    <img src={team.crest} alt="" />
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
