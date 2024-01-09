import React, { useState, useRef } from "react";
import "./Container.css";
import Login from "./Login";
import Signup from "./Signup";

const Container = () => {
  //defining state to know if login or signup
  const [login, setLogin] = useState(true);

  // changing the screen
  const ContainerRef = useRef(null);

  const handleClick = () => {
    setLogin(!login);

    // focus on whatever is clicked
    ContainerRef.current.classList.toggle("active");
  };

  return (
    <div className="container" ref={ContainerRef}>
      <Login />
      <div className="side-div">
        {/*Choose title based on page */}
        <button type="button" onClick={handleClick}>
          {" "}
          {login ? "Signup" : "Login"}
        </button>
      </div>
      <Signup />
    </div>
  );
};

export default Container;
