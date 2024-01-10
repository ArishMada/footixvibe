import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Table from "./Table";
import CompetitionDropdown from "./CompetitionDropdown";

const Fixtures = () => {
  const [PL, setPL] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [chosenCompetition, setChosenCompetition] = useState(null);
  const [matches, setMatches] = useState([]);

  const apiUrl = "http://localhost:5000/api/data";
  const footballDataApiUrl = "https://api.football-data.org/v4";
  const matchesEndpoint = "/matches";

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
          startDate: competition.currentSeason.startDate,
          endDate: competition.currentSeason.endDate,
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

          const newPL = [];
          for (var i = 0; i < data["matches"]["length"]; i++) {
            if (data["matches"][i]["status"] !== "FINISHED") {
              let dataArr = [];
              const dateOptions = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const timeOptions = {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              };
              const formattedDate = new Date(
                data["matches"][i]["utcDate"]
              ).toLocaleDateString(undefined, dateOptions);
              const formattedTime = new Date(
                data["matches"][i]["utcDate"]
              ).toLocaleTimeString(undefined, timeOptions);
              dataArr.push(formattedDate);
              dataArr.push(formattedTime);
              dataArr.push(data["matches"][i]["homeTeam"]["name"]);
              dataArr.push(data["matches"][i]["awayTeam"]["name"]);
              dataArr.push(data["matches"][i]["competition"]["name"]);
              if (data["matches"][i]["status"] === "FINISHED") {
                dataArr.push(
                  data["matches"][i]["score"]["fullTime"]["home"] +
                    "-" +
                    data["matches"][i]["score"]["fullTime"]["away"]
                );
              } else {
                dataArr.push(data["matches"][i]["status"]);
              }

              if (data["matches"][i]["score"]["winner"] === "AWAY_TEAM") {
                dataArr.push(data["matches"][i]["awayTeam"]["name"]);
              } else if (
                data["matches"][i]["score"]["fullTime"]["home"] == "null"
              ) {
                dataArr.push("Undecided");
              } else {
                dataArr.push(data["matches"][i]["homeTeam"]["name"]);
              }

              newPL[i] = dataArr;
            }
          }
          setPL(newPL);
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
    setChosenCompetition(selectedCompetition);
  };

  return (
    <div className="standing-page">
      <Navbar />
      <CompetitionDropdown
        competitions={competitions}
        chosenCompetition={chosenCompetition}
        onDropdownChange={handleDropdownChange}
      />
      <Table data={PL} />
    </div>
  );
};

export default Fixtures;
