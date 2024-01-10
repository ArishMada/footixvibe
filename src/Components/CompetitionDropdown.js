import React from "react";
import "./CompetitionDropdown.css";

const CompetitionDropdown = ({
  competitions,
  chosenCompetition,
  onDropdownChange,
}) => {
  const filteredCompetitions = competitions.filter(
    (competition) =>
      !chosenCompetition || competition.code !== chosenCompetition.code
  );

  return (
    <div className="dropdown">
      <select
        id="competitionDropdown"
        onChange={onDropdownChange}
        value={chosenCompetition ? chosenCompetition.code : ""}
      >
        {chosenCompetition && (
          <option value={chosenCompetition.code} disabled>
            {chosenCompetition.name}
          </option>
        )}
        {filteredCompetitions.map((competition, index) => (
          <option key={index} value={competition.code}>
            {competition.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompetitionDropdown;
