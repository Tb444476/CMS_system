import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'; // Use the CSS you provided

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store the token
      onLogin(token); // Update authentication state
      navigate('/admin'); // Redirect to the admin panel
    } catch (err) {
      setError('Error logging in');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        <p><Link to="/forgot-password">Forgot Password?</Link></p>
      </form>
    </div>
  );
};

export default Login;
