// src/components/training/TrainingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// --- Course Card Component ---
const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <span className="course-category">{course.category}</span>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="course-footer">
        <span>{course.format}</span>
        {course.isFree && <span className="free-tag">FREE</span>}
      </div>
    </div>
  );
};

// --- Main Training Page ---
const TrainingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const config = { headers: { 'x-auth-token': token } };

      try {
        const res = await axios.get('http://localhost:5000/api/training', config);
        setCourses(res.data);
      } catch (err) {
        console.error(err.response?.data?.msg || 'API Error');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Could not load courses. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [navigate]);

  // Helper to filter courses for rendering
  const getCoursesByCategory = (category) => {
    return courses.filter((course) => course.category === category);
  };

  if (loading) return <div className="container"><p>Loading courses...</p></div>;

  return (
    <div className="container training-page">
      <header className="page-header">
        <h1>Training & Certification</h1>
        {/* Theme from prompt  */}
        <p>"Learn, Earn, Grow" — Your path to poultry success.</p>
        <Link to="/dashboard">&larr; Back to Dashboard</Link>
      </header>

      {/* --- Main Content Area --- */}
      <div className="training-layout">
        <div className="course-list">
          {error && <p className="error-msg">{error}</p>}

          {/* --- Starter Courses --- */}
          <h2>Starter Training</h2>
          <div className="course-grid">
            {getCoursesByCategory('Starter').map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          {/* --- Advanced Courses --- */}
          <h2>Advanced Farm Scaling</h2>
          <div className="course-grid">
            {getCoursesByCategory('Advanced').map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          {/* --- Business & Safety --- */}
          <h2>Business & Safety</h2>
          <div className="course-grid">
            {getCoursesByCategory('Business').map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
            {getCoursesByCategory('Safety').map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>

        {/* --- Sidebar --- */}
        <div className="training-sidebar">
          {/* Webinar Invite from prompt  */}
          <div className="sidebar-widget webinar-invite">
            <h3>Free Intro Webinar</h3>
            <p>
              New to LCEN? Join our free introductory webinar on poultry basics
              and the LCEN cooperative model.
            </p>
            <a href="#" className="btn btn-secondary">
              Sign Up for Webinar
            </a>
          </div>

          {/* TESDA NC II Promo from prompt  */}
          <div className="sidebar-widget tesda-promo">
            <h3>TESDA NC II Certification</h3>
            <p>
              Take your skills to the next level. LCEN's partnership with
              TESDA provides a clear path to your official NC II Poultry
              Production certification[cite: 71].
            </p>
            <p>This adds formal credentials to your agri-business.</p>
            <a href="#" className="btn btn-primary">
              Learn About NC II Path
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;