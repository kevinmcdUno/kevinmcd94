import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddTrip from './components/AddTrip';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import ManageTrips from './components/ManageTrips'
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-trip" element={<AddTrip />} />
          <Route path="/manage-trips" element={<ManageTrips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
