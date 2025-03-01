
import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'; // Importing React icons
import './ProfesssionalLogin.css'; // Import the CSS file

const ProfessionalLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7173/api/Professional/login", {
        email: username, 
        password,
      });
      
      if (response.status === 200) {
        setSuccessMessage('Login successful!');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Invalid username or password.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="professional-login-container">
      <h2>Professional Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>
            <AiOutlineUser /> {/* Add the user icon */}
            Email:
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

export default ProfessionalLogin;
