import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LPcomponents/LandingPage';
import LoginPage from './Components/LoginPage';
import Standings from './Components/Standings';
import Fixtures from './Components/Fixtures'
import Matches from './Components/Matches';
import News from './Components/News';
import Results from './Components/Results';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/footixVibe/login" element={<LoginPage />} />
        <Route path="/footixVibe/fixtures" element={<Fixtures />} />
        <Route path="/footixVibe/standings" element={<Standings />}/>
        <Route path="/footixVibe/matches" element={<Matches />}/>
        <Route path="/footixVibe/results" element={<Results />}/>
        <Route path="/footixVibe/news" element={<News />}/>
      </Routes>
    </div>
  );
}

export default App;
