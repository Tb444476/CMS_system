import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                setSuccessMessage('Password reset successfully!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password', error);
            setError('Internal Server Error');
        }
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
