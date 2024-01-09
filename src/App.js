import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LPcomponents/LandingPage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/footixVibe/login" element={<LoginPage />} />
        <Route path ="/footixVibe/signup" element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
