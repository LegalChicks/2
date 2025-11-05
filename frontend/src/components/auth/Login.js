// src/components/auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // We point to our backend API
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );
      
      // Store the token (e.g., in localStorage)
      localStorage.setItem('token', res.data.token);
      
      // Redirect to the member dashboard
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Tagline from prompt */}
        <h1>🐔 Grow With Us.</h1>
        {/* Explainer sentence from prompt */}
        <p>Your journey to poultry entrepreneurship starts here.</p>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
        <div className="auth-footer">
          {/* Trust-building subtext from prompt */}
          <p>
            Your data is protected. We are partners in building a sustainable
            livelihood for Cagayanos .
          </p>
          <p>
            Not a member yet?{' '}
            <Link to="/register">Become a Member</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;