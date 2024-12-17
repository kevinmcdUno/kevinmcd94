// src/components/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GlobalStyles.css';

function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to login endpoint
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 && response.data.user) {
    
        const { user } = response.data;

        // Store userId in localStorage
        localStorage.setItem('user_id', user.id);

        // Navigate to the dashboard upon successful login
        navigate('/dashboard');
      } else {
        // Handle failure: Show error message
        setError('Invalid credentials, please try again.');
      }
    } catch (error) {
      // Handle error: Network issues, server errors, etc.
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Travel Planner</h1>
      <form onSubmit={handleLogin}>
        <div className="text-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>} 
        <div className="button-container">
        <button type="submit" className="login-button">Login</button>
      <button className="register-button" onClick={handleRegister}>
        Register
        </button>
      </div>
    </form>
  </div>
  );
}

export default LandingPage;
