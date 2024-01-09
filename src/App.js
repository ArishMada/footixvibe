import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LPcomponents/LandingPage';
import LoginPage from './Components/LoginPage';
import Standings from './Components/Standings';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/footixVibe/login" element={<LoginPage />} />
        <Route path="/footixVibe/standings" element={<Standings />} />
      </Routes>
    </div>
  );
}

export default App;
