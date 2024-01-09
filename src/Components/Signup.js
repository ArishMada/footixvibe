import React, {useState} from 'react'
import { FaDoorClosed } from "react-icons/fa";
import "./Signup.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Make the HTTP request to the signup API
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Signup successful
        console.log("Signup successful");
        setError("Successfull");
        // Perform any desired actions after successful signup
        setEmail("")
        setPassword("")
      } else {
        // Handle error response from the API
        const errorData = await response.json();
        setError(errorData.detail);
      }
    } catch (error) {
      console.log("Error:", error);

      // Handle network error
      setError("Network error occurred. Please try again.");
    }
  };

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
        <button type="submit">Sign up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    </div>
  )
}

export default Signup
