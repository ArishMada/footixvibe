import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Standings = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);


  const logout = () => {
    auth.signOut()
      .then(() => {
        console.log("User successfully logged out");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
 
  useEffect(() => {
    if (loading) return;
    if (!user) {
        return navigate("/footixVibe/login");
    }
  }, [user, loading]);

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
    <div className="standing-page">
        <Navbar handleLogout={logout}/>
    </div>
  );
};

export default Standings;
