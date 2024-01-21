import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LogoutIcon from "@mui/icons-material/Logout";
import StadiumIcon from "@mui/icons-material/Stadium";
import { auth, logout } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  console.log(location);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      return navigate("/footixVibe/login");
    }
  }, [user, loading, navigate]);

  const menuOptions = [
    {
      text: "Matches",
      icon: <StadiumIcon />,
    },
    {
      text: "Standings",
      icon: <FormatListNumberedIcon />,
    },
    {
      text: "Fixtures",
      icon: <SkipNextIcon />,
    },
    {
      text: "Results",
      icon: <ScoreboardIcon />,
    },
    {
      text: "News",
      icon: <NewspaperIcon />,
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      action: () => {
        setOpenMenu(false);
        logout();
      },
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top: element.offsetTop - 50,
      });
    }
  };

  return (
    <div>
      <nav>
        <div className="nav-logo-container">
          <h1>FootixVibe</h1>
        </div>
        <div className="navbar-links-container">
          <Link to="/footixVibe/matches">
            <p
              className={
                location.pathname === "/footixVibe/matches" ? "active" : ""
              }
            >
              Matches
            </p>
          </Link>
          <Link to="/footixVibe/standings">
            <p
              className={
                location.pathname === "/footixVibe/standings" ? "active" : ""
              }
            >
              Standings
            </p>
          </Link>
          <Link to="/footixVibe/fixtures">
            <p
              className={
                location.pathname === "/footixVibe/fixtures" ? "active" : ""
              }
            >
              Fixtures
            </p>
          </Link>
          <Link to="/footixVibe/results">
            <p
              className={
                location.pathname === "/footixVibe/results" ? "active" : ""
              }
            >
              Results
            </p>
          </Link>
          <Link to="/footixVibe/news">
            <p
              className={
                location.pathname === "/footixVibe/news" ? "active" : ""
              }
            >
              News
            </p>
          </Link>
          <Link to="/footixVibe/login">
            <button className="primary-button" onClick={logout}>
              Logout
            </button>
          </Link>
        </div>
        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          anchor="right"
        >
          <Box
            sx={{ width: 250, height: "100%", backgroundColor: "#333333" }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List className="sideMenu">
              {menuOptions.map((item) => (
                <ListItem
                  className="sideMenuItem"
                  key={item.text}
                  disablePadding
                  onClick={() => {
                    if (item.action) {
                      item.action(); // Call the action if defined
                    } else {
                      setOpenMenu(false);
                      scrollToSection(item.text);
                    }
                  }}
                >
                  {item.action ? (
                    // Render a button for the logout option
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  ) : (
                    <Link
                      to={`/footixVibe/${item.text.toLowerCase()}`}
                      className="sideMenuLink"
                    >
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </Link>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
    </div>
  );
};

export default Navbar;
