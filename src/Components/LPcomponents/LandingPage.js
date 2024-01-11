import React, { useState } from "react";
import { Link } from "react-router-dom";
import About from "./About";
import NewList from "../NewList";
import HomeBG from "./homebg.jpg";
import Backtothetop from "../Backtothetop";

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
import { FiArrowRight } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const LandingPage = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "News",
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
    <>
      <div className="home-container" id="Home">
        <nav>
          <div className="nav-logo-container">
            <h1>FootixVibe</h1>
          </div>
          <h2>"Football is a part of I"</h2>
          <div className="navbar-links-container">
            <p onClick={() => scrollToSection("Home")}>Home</p>
            <p onClick={() => scrollToSection("About")}>About</p>
            <p onClick={() => scrollToSection("News")}>News</p>
            <Link to="/footixVibe/login">
              <button className="primary-button">Get Started</button>
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
        <div className="home-banner-container">
          <div className="home-text-section">
            <h1 className="primary-heading">
              "A Community of Football Lovers - Your Go-To Hub for Real-Time
              Football Scores!"
            </h1>
            <p className="primary-text">
              Want to follow the scores and news of your favourite football
              teams?
            </p>
            <Link to="/footixVibe/login">
              <button className="secondary-button">
                Join us now <FiArrowRight />
              </button>
            </Link>
          </div>
          <div className="home-image-section">
            <img src={HomeBG} alt=""></img>
          </div>
        </div>
      </div>
      <div>
        <section id="About">
          <About />
        </section>
        <section id="News">
          <NewList searchQuery={"soccer OR premier%league OR laliga OR champions%league OR UEFA"} shuffleNumber={12}/>
        </section>
        <div className="footer-wrapper">
          <div className="footer-section-one">
            <div className="footer-logo-container">
              <h1>FootixVibe</h1>
            </div>
            <div className="footer-icons">
              <BsTwitter />
              <SiLinkedin />
              <BsYoutube />
              <FaFacebookF />
            </div>
          </div>
          <div className="footer-section-two">
            <div className="footer-section-columns">
              <span className="footer-title">Sections</span>
              <span onClick={() => scrollToSection("Home")}>Home</span>
              <span>Help</span>
              <span onClick={() => scrollToSection("About")}>About</span>
              <span onClick={() => scrollToSection("News")}>News</span>
            </div>
            <div className="footer-section-columns">
              <span className="footer-title">Contact</span>
              <span>+261 34 02 839 04</span>
              <span>footixVibe@gmail.com</span>
              <span>footixVibeHelp@gmail.com</span>
              <span>footixVibeIssue@footixVibe.com</span>
            </div>
            <div className="footer-section-columns">
              <span className="footer-title">Legal</span>
              <span>Terms & Conditions</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
      <Backtothetop />
    </>
  );
};

export default LandingPage;
