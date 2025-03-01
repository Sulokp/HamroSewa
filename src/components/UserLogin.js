import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'; // Importing icons
import './UserLogin.css'; // Import the CSS file

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7173/api/User/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage('Login successful!');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="user-login-container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>
            <AiOutlineUser /> {/* User icon */}
            Email:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>
            <AiOutlineLock /> {/* Lock icon */}
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

export default UserLogin;
