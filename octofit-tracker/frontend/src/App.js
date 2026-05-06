import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg octofit-navbar px-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src="/octofitapp-small.png" alt="OctoFit logo" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {[
                { to: '/activities', label: '🏃 Activities' },
                { to: '/leaderboard', label: '🏆 Leaderboard' },
                { to: '/teams', label: '👥 Teams' },
                { to: '/users', label: '👤 Users' },
                { to: '/workouts', label: '💪 Workouts' },
              ].map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="/"
            element={
              <div className="octofit-hero mt-4">
                <h1>Welcome to OctoFit Tracker</h1>
                <p className="mt-3">
                  Track activities, compete on the leaderboard, manage workouts and teams.
                </p>
                <NavLink to="/activities" className="btn btn-octofit mt-3 me-2">
                  Get Started
                </NavLink>
                <NavLink to="/leaderboard" className="btn btn-outline-light mt-3">
                  View Leaderboard
                </NavLink>
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;

