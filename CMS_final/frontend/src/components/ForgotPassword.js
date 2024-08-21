import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const ForgotPassword = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSuccessMessage('Reset Link sent successfully! Check your email.');
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // 2000 milliseconds = 2 seconds
            }else {
                const data = await response.json();
                setError(data.error || 'Failed to send reset link');
            }
        } catch (error) {
            console.error('Error sending reset link', error);
            setError('Internal Server Error');
        }
    };

    const handleBackToLogin = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className='success'>{successMessage}</p>}
            <form onSubmit={handleForgotPassword} className='auth-form'>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Send Link</button>
            </form>
            <button onClick={handleBackToLogin}>Back to Login</button> {/* Back button */}
        </div>
    );
};
export default ForgotPassword;
