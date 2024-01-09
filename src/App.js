import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LPcomponents/LandingPage';
import LoginPage from './Components/LoginPage';
import Standings from './Components/Standings';
import Fixtures from './Components/Fixtures';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/footixVibe/login" element={<LoginPage />} />
        <Route path="/footixVibe/fixtures" element={<Fixtures />} />
        <Route path="/footixVibe/standings" element={<Standings />}/>
      </Routes>
    </div>
  );
}

export default App;
