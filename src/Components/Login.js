import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaDoorOpen } from "react-icons/fa";
import "./Login.css";
import { auth, signInWithGoogle, logInWithEmailAndPassword } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  function login() {
    logInWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    console.log(user);
    if (loading) {
      return;
    }

    if (user) {
      console.log("has user")
      console.log(user.displayName);
      navigate("/footixVibe/fixtures", { replace: true });
    }
    if (error) alert(error);
  }, [error, loading, user]);

  return (
    <div className="login">
      <div className="icon">
          <FaDoorOpen />
        </div>
          <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={() => login()}>Login</button>
          <button className="login__btn login__google" onClick={signInWithGoogle}>Login with Google</button>
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Login
