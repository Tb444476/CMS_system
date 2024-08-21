import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Resetpassword = () => {
  const { token } = useParams(); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleConfirmPassword = (event) => {
    if (event.target.value !== newPassword) {
      setError("Passwords don't match");
    } else {
      setError('');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        setSuccessMessage('Password reset successfully');
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.status || 'Password reset failed');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Internal Server Error');
    }
    
   
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className='success'>{successMessage}</p>}
      <form onSubmit={handleResetPassword} className='auth-form'>
        <input
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleConfirmPassword}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default Resetpassword;
