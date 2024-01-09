import React from "react";

const Table = (data) => {
  console.log(data);

  return (
    <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Competition</th>
              <th>Score</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, match]) => (
              <React.Fragment key={key}>
                {Object.values(match).map((value, index) => (
                  <tr key={index}>
                    {Object.values(value).map((element, idx) => (
                      <td key={idx}>{element}</td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
  );
};

export default Table;
