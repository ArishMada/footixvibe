import React, { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "./firebase";
import { useNavigate } from "react-router-dom";

const Standings = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate("/footixVibe/login", { replace: true });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.football-data.org/v4/competitions/PD/standings",
          {
            headers: {
              "X-Auth-Token": "fd490b04139846d595bd99f2de5753af", // Replace with your actual token
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <button className="dropdown-item" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Standings;
