import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LPcomponents/LandingPage';
import LoginPage from './Components/LoginPage';
import Standings from './Components/Standings';
import Fixtures from './Components/Fixtures'
import Matches from './Components/Matches';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/footixVibe/login" element={<LoginPage />} />
        <Route path="/footixVibe/fixtures" element={<Fixtures />} />
        <Route path="/footixVibe/standings" element={<Standings />}/>
        <Route path="/footixVibe/matches" element={<Matches />}/>
      </Routes>
    </div>
  );
}

export default App;
