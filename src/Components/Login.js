import React, {useState} from 'react'
import { FaDoorOpen } from "react-icons/fa";
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Make the HTTP request to the login API
    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
          grant_type: "password",
          scope: "",
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Access token is available in data.access_token
        console.log("Access Token:", data.access_token);
        // Store the email address
        const userEmail = email;
        // Set the logged-in state to true
        // Clear any previous error
        setError("");
      } else {
        // Handle error response from the API
        const errorData = await response.json();
        setError(errorData.detail);
        setPassword("")
      }
    } catch (error) {
      console.log("Error:", error);
      // Handle network error
      setError("Network error occurred. Please try again.");
    }
  };


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
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Login
