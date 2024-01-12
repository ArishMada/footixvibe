import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Fixture.css";
import CompetitionDropdown from "./CompetitionDropdown";
import Backtothetop from "./Backtothetop";
import { handleAuthStateChange, handleWindowUnload } from "./firebase";

const Fixtures = () => {
  const [PL, setPL] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [chosenCompetition, setChosenCompetition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const apiUrl = "http://localhost:5000/api/data";
  const footballDataApiUrl = "https://api.football-data.org/v4";
  const matchesEndpoint = "/matches";

  window.addEventListener("beforeunload", handleWindowUnload);
  handleAuthStateChange();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?uri=${footballDataApiUrl}/competitions`
        );
        const data = await response.json();

        console.log(data);

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
            `${apiUrl}?uri=${footballDataApiUrl}/competitions/${chosenCompetition.code}${matchesEndpoint}`
          );
          const data = await response.json();

          const groupedMatches = {};

          const dateOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          for (let i = 0; i < data["matches"].length; i++) {
            if (data["matches"][i]["status"] !== "FINISHED") {
              const date = new Date(
                data["matches"][i]["utcDate"]
              ).toLocaleDateString(undefined, dateOptions);

              if (!groupedMatches[date]) {
                groupedMatches[date] = [];
              }

              const timeOptions = {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              };

              const formattedDate = new Date(date).toLocaleDateString(
                undefined,
                dateOptions
              );

              const formattedTime = new Date(
                data["matches"][i]["utcDate"]
              ).toLocaleTimeString(undefined, timeOptions);

              groupedMatches[date].push({
                date: formattedDate,
                time: formattedTime,
                homeTeam: data["matches"][i]["homeTeam"]["name"],
                awayTeam: data["matches"][i]["awayTeam"]["name"],
                matchDay: data["matches"][i]["matchday"],
                matchStage: data["matches"][i]["stage"],
                competition: data["matches"][i]["competition"]["name"],
                status: data["matches"][i]["status"],
                homeCrest: data["matches"][i]["homeTeam"]["crest"],
                awayCrest: data["matches"][i]["awayTeam"]["crest"],
                group: data["matches"][i]["group"],
              });

              console.log(data["matches"][i]["stage"]);
            }
          }

          setPL(groupedMatches);
          console.log(data);
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

    setSearchQuery("");
    setChosenCompetition(selectedCompetition);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMatches = Object.fromEntries(
    Object.entries(PL)
      .filter(([date, matches]) =>
        matches.some(
          (match) =>
            (match.homeTeam &&
              match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (match.awayTeam &&
              match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      )
      .map(([date, matches]) => [
        date,
        searchQuery
          ? matches.filter(
              (match) =>
                (match.homeTeam &&
                  match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (match.awayTeam &&
                  match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()))
            )
          : matches.map((match) => ({
              ...match,
            })),
      ])
  );
  

  return (
    <>
      <div className="standing-page">
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
            <input
              type="text"
              placeholder="Search by team..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-team"
            />
          </div>
        )}

        <div className="matches-container">
          {Object.keys(filteredMatches).map((date, index) => (
            <div className="matches-day" key={index}>
              <h3>{date}</h3>
              <div className="matches-day-container">
                {filteredMatches[date].map((match, matchIndex) => (
                  <div className="match-card" key={matchIndex}>
                    <div className="team-container">
                      <div className="team top">
                        <img
                          src={match.homeCrest}
                          alt={match.homeTeam}
                          className="crest"
                        />
                        <div className="team-name">
                          {match.homeTeam ? `${match.homeTeam}` : "TBD"}
                        </div>
                      </div>
                      <div className="score-container">
                        <span className="empty-score">-</span>
                      </div>
                      <div className="team bottom">
                        <img
                          src={match.awayCrest}
                          alt={match.awayTeam}
                          className="crest"
                        />
                        <div className="team-name">
                          {match.awayTeam ? `${match.awayTeam}` : "TBD"}
                        </div>
                      </div>
                    </div>
                    <div className="info-container">
                      <div className="match-date">
                        {chosenCompetition.type === "CUP"
                          ? `Stage - ${
                            match.matchStage.charAt(0).toUpperCase() +
                            match.matchStage
                              .slice(1)
                              .toLowerCase()
                              .replace(/_/g, " ")
                          }`
                          : `Matchday - ${match.matchDay}`}
                      </div>
                      <div className="match-date">
                        {chosenCompetition.type === "CUP" && match.group
                          ? `Group - ${
                              match.group.charAt(0).toUpperCase() +
                              match.group
                                .slice(1, 6)
                                .toLowerCase()
                                .replace(/_/g, " ") +
                              match.group.charAt(6).toUpperCase()
                            }`
                          : ""}
                      </div>
                      <div className="match-time">{match.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Backtothetop />
    </>
  );
};

export default Fixtures;
