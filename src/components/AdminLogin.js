
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'; // Importing React icons
import './AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7173/api/admin/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        
        // Store authentication status in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        
        navigate('/admin-dashboard'); // Redirect to the admin dashboard
      }
    } catch (error) {
      setErrorMessage('Invalid username or password.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>
            <AiOutlineUser /> {/* Add the user icon */}
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>
            <AiOutlineLock /> {/* Add the lock icon */}
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>

        {/* Success and error messages inside the form */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
