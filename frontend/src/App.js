// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import SupplyOrder from './components/supplies/SupplyOrder';
import TrainingPage from './components/training/TrainingPage'; // <-- IMPORT
import MembershipTiers from './components/membership/MembershipTiers'; // <-- IMPORT
import './index.css'; // We'll add some basic styles

function App() {
  return (
    <Router>
      <div className="App">
        {/* We can add a Navbar here later */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
	  <Route path="/franchise" element={<MembershipTiers />} /> {/* <-- ADD ROUTE */}
	  <Route path="/training" element={<TrainingPage />} /> {/* <-- ADD ROUTE */}
	  <Route path="/supplies" element={<SupplyOrder />} /> {/* <-- ADD ROUTE */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;