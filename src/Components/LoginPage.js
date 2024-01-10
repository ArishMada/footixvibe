import React from "react";
import Container from "./Container";
import Login from "./Login";
import Signup from "./Signup";
import { Link } from "react-router-dom";


const LoginPage = () => {
  return (
    <div>
      <Link to="/">
        <div className="logo">
          <h2>FootixVibe</h2>
        </div>
      </Link>
      <Container>
        <div>
          <Login />
          <Signup />
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
