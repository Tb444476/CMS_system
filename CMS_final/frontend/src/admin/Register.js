import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Use the CSS you provided

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state
  const [employeeId, setEmployeeId] = useState(''); // New state
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { email, password, name, employeeId });
      setMessage('Registration successful. Please check your email for verification.');
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {message && <p>{message}</p>}
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;