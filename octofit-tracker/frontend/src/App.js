import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container">
          <div className="d-flex align-items-center gap-2">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt="OctoFit"
              className="app-brand-logo"
            />
            <span className="navbar-brand app-brand-title">OctoFit Tracker</span>
          </div>
          <div className="navbar-nav gap-2">
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/teams">
              Teams
            </NavLink>
            <NavLink className="nav-link" to="/activities">
              Activities
            </NavLink>
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="nav-link" to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <h1 className="app-heading mb-4">Fitness Dashboard</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
