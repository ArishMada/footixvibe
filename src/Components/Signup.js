import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { FaDoorClosed } from "react-icons/fa";
import "./Signup.css";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "./firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (password === cpassword) {
      registerWithEmailAndPassword(email, password)
      setEmail("");
      setPassword("");
      setCpassword("");
      navigate("/footixVibe/fixtures", { replace: true });

    } else {
      alert("Password and Confirm Password doesn't match");
    };

  };

  const handleSignup = async (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (loading) return;
  }, [user, loading, error]);

  return (
    <div>
      <div className="signup">
      <div className="icon">
        <FaDoorClosed />
      </div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
        <button type="submit" onClick={register}>Sign up</button>
        <button className="register__btn register__google" onClick={signInWithGoogle}>Register with Google</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    </div>
  )
}

export default Signup
