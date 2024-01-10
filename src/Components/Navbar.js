import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import GroupIcon from "@mui/icons-material/Group";
import { auth, logout } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      return navigate("/footixVibe/login");
    }
  }, [user, loading]);

  const menuOptions = [
    {
      text: "Matches",
      icon: <HomeIcon />,
    },
    {
      text: "Teams",
      icon: <InfoIcon />,
    },
    {
      text: "Competitions",
      icon: <GroupIcon />,
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
            <p>Matches</p>
          </Link>
          <Link to="/footixVibe/standings">
            <p>Standings</p>
          </Link>
          <Link to="/footixVibe/fixtures">
            <p>Fixtures</p>
          </Link>
          <Link to="/footixVibe/results">
            <p>Results</p>
          </Link>
          <Link to="/footixVibe/news">
            <p>News</p>
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
                >
                  <ListItemButton onClick={() => scrollToSection(item.text)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
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
