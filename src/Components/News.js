import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Backtothetop from "./Backtothetop";
import CompetitionDropdown from "./CompetitionDropdown";
import NewList from "./NewList";
import { handleAuthStateChange, handleWindowUnload } from "./firebase";

const News = () => {
  const [competitions, setCompetitions] = useState([]);
  const [chosenCompetition, setChosenCompetition] = useState(null);

  const apiUrl = "http://localhost:5000/api/data";
  const footballDataApiUrl = "https://api.football-data.org/v4";

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
        }));

        setCompetitions(newCompetitions);
      } catch (error) {
        console.error("Error fetching competitions data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDropdownChange = (event) => {
    const selectedCode = event.target.value;
    const selectedCompetition = competitions.find(
      (competition) => competition.code === selectedCode
    );
    setChosenCompetition(selectedCompetition);
  };

  return (
    <>
      <div>
        <Navbar />
        <CompetitionDropdown
          competitions={competitions}
          chosenCompetition={chosenCompetition}
          onDropdownChange={handleDropdownChange}
        />
        <div className="news-page-container">
          {chosenCompetition ? (
            <NewList searchQuery={chosenCompetition.name} shuffleNumber={60}/>
          ) : (
            <NewList searchQuery={"soccer OR premier%league OR laliga OR champions%league OR UEFA"} shuffleNumber={60}/>
          )}
        </div>
      </div>
      <Backtothetop />
    </>
  );
};

export default News;
