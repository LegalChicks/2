// src/components/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Helper component for stat boxes
const StatCard = ({ title, value, unit }) => (
  <div className="stat-card">
    <h4>{title}</h4>
    <p>{value} <span>{unit}</span></p>
  </div>
);

// Helper component for access buttons
const AccessButton = ({ title, path }) => (
  <Link to={path} className="access-btn">
    {title}
  </Link>
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Not logged in
        return;
      }

      // Create headers config with auth token
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', config);
        setDashboardData(res.data);
      } catch (err) {
        console.error(err.response?.data?.msg || 'Error fetching data');
        setError('Could not load dashboard. Please try logging in again.');
        // If token is invalid, log out user
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading your dashboard...</p></div>;
  }

  if (error) {
    return <div className="dashboard-container"><p>{error}</p></div>;
  }

  // Once loaded, display the dashboard
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {dashboardData?.name}!</h1>
        <button onClick={onLogout} className="btn-logout">
          Logout
        </button>
      </header>

      {/* --- Main Dashboard Grid --- */}
      <div className="dashboard-grid">

        {/* --- Left Column --- */}
        <div className="main-content">
          
          {/* Farm Journey Status  */}
          <div className="dash-section">
            <h3>Your Farm Journey Status</h3>
            <div className="journey-status-box">
              <p>{dashboardData?.farmJourneyStatus}</p>
              {/* Motivational micro-message  */}
              <span>"Taga-Cagayan helping fellow Cagayanos rise." [cite: 112]</span>
            </div>
          </div>

          {/* Quick Stats  */}
          <div className="dash-section">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <StatCard title="Flock Size" value={dashboardData?.flockSize} unit="Birds" />
              <StatCard title="Today's Egg Count" value={dashboardData?.eggCount} unit="Eggs" />
              <StatCard title="Feed Usage (Month)" value={dashboardData?.feedUsage} unit="kg" />
              <StatCard title="Projected Earnings" value={dashboardData?.projectedEarnings} unit="PHP" />
            </div>
          </div>

          {/* Access Buttons  */}
          <div className="dash-section">
            <h3>Network Tools</h3>
            <div className="access-buttons-grid">
              <AccessButton title="Training Modules" path="/training" />
              <AccessButton title="Farm Mentorship" path="/mentorship" />
              <AccessButton title="Reorder Supplies" path="/supplies" />
              <AccessButton title="Franchise Info" path="/franchise" />
              <AccessButton title="Member Directory" path="/directory" />
              <AccessButton title="Request Farm Visit" path="/visit-request" />
            </div>
          </div>
        </div>

        {/* --- Right Sidebar --- */}
        <div className="sidebar-content">

          {/* Training Banner  */}
          <div className="dash-section sidebar-box training-banner">
            <h4>Upcoming Training</h4>
            <p>Join our free webinar on Advanced Farm Scaling this Friday. Learn how to secure your NC II path!</p>
            <Link to="/training" className="btn btn-secondary">Enroll Now</Link>
          </div>
	{/* --- NEW REFERRAL PANEL --- */}
          {/* Add this new block here */}
          <div className="dash-section sidebar-box referral-panel">
            <h4>Grow the Network & Earn</h4>
            <p>
              Earn a <strong>5% incentive</strong> for every new member you
              successfully refer.
            </p>
            <p className="referral-subtext">
              This is trust-based community expansion. Help us empower your
              neighbors and grow our collective strength[cite: 14].
            </p>
            <strong>Your Referral Link:</strong>
            <div className="referral-link-box">
              <input
                type="text"
                value="http://lcen.app/register?ref=MEMBER123"
                readOnly
              />
              <button className="btn-copy">Copy</button>
            </div>
          </div>
          {/* --- END OF NEW PANEL --- */}
          {/* Notice Area  */}
          <div className="dash-section sidebar-box notice-area">
            <h4>Livelihood Notices</h4>
            <ul>
              <li>DA Livelihood Grant applications are now open.</li>
              <li>TESDA NC II scholarships available for LCEN members.</li>
              <li>Check for LGU support programs in your municipality.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;