// src/components/auth/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    farmAddress: '',
    password: '',
    password2: '',
    agree: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    name,
    email,
    contactNumber,
    farmAddress,
    password,
    password2,
    agree,
  } = formData;

  const onChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    if (!agree) {
      setError('You must agree to the cooperative values');
      return;
    }

    try {
      const newUser = { name, email, contactNumber, farmAddress, password };
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        newUser
      );
      
      // Store token and redirect
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Friendly motivational intro from prompt */}
        <h2>Join the Network</h2>
        <p>
          Start your journey as an LCEN Agri-Entrepreneur.
          As a member, you get access to training, mentorship, supply discounts,
          and collective marketing .
        </p>

        <form onSubmit={onSubmit}>
          {/* Required signup fields */}
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={name} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={onChange} required />
          </div>
           <div className="form-group">
            <label>Contact Number (e.g., 09xxxxxxxxx)</label>
            <input type="text" name="contactNumber" value={contactNumber} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Farm Address (Barangay, Municipality)</label>
            <input type="text" name="farmAddress" value={farmAddress} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="password2" value={password2} onChange={onChange} required />
          </div>

          {/* Agreement checkbox */}
          <div className="form-group-check">
            <input type="checkbox" name="agree" checked={agree} onChange={onChange} />
            <label>
              I agree to uphold the LCEN cooperative values and comply
              with farm quality standards .
            </label>
          </div>
          
          {/* Disclosure text */}
          <p className="disclosure">
            Your data will be used only for LCEN membership and to provide
            livelihood support .
          </p>

          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Create My Account
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Already a member? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;