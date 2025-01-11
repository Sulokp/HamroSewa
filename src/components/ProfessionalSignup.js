import React, { useState } from "react";
import './ProfessionalSignup.css';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaKey, FaHome, FaSuitcase, FaWrench, FaDollarSign, FaImage, FaIdCard } from 'react-icons/fa';

const ProfessionalSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [expertise, setExpertise] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [image, setImage] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentImage, setDocumentImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDocumentImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocumentImage(file);
    }
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = () => {
    if (!email) {
      setError("Email is required.");
      return;
    }
    setLoading(true);
    const code = generateVerificationCode();
    setVerificationCode(code);
    setCodeSent(true);
    setSuccessMessage(`Verification code sent to ${email}.`);
    setError("");
    setLoading(false);
  };

  const verifyCode = () => {
    if (userEnteredCode === verificationCode) {
      setSuccessMessage("Email verified successfully! You can now submit your details.");
      setError("");
    } else {
      setError("Invalid verification code.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <h2>Professional Signup</h2>

      {/* Name */}
      <div className="form-group">
        <label><FaUser /> Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {/* Email */}
      <div className="form-group">
        <label><FaEnvelope /> Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      {/* Password */}
      <div className="form-group password-container">
        <label><FaKey /> Password</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</i>
        </div>
      </div>

      {/* Address */}
      <div className="form-group">
        <label><FaHome /> Address</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      {/* Profession */}
      <div className="form-group">
        <label><FaSuitcase /> Profession</label>
        <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} />
      </div>

      {/* Expertise */}
      <div className="form-group">
        <label><FaWrench /> Expertise</label>
        <input type="text" value={expertise} onChange={(e) => setExpertise(e.target.value)} />
      </div>

      {/* Hourly Rate */}
      <div className="form-group">
        <label><FaDollarSign /> Hourly Rate</label>
        <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
      </div>

      {/* Profile Image */}
      <div className="form-group">
        <label><FaImage /> Profile Image</label>
        <input type="file" onChange={handleImageChange} />
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Profile Preview" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
          </div>
        )}
      </div>

      {/* Document Type */}
      <div className="form-group">
        <label><FaIdCard /> Document Type</label>
        <select value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
          <option value="">Select Document Type</option>
          <option value="Citizenship">Citizenship</option>
          <option value="Passport">Passport</option>
          <option value="Drivers License">Driver's License</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Document Number */}
      <div className="form-group">
        <label>Document Number</label>
        <input type="text" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} />
      </div>

      {/* Document Image */}
      <div className="form-group">
        <label><FaImage /> Document Image</label>
        <input type="file" onChange={handleDocumentImageChange} />
        {documentImage && (
          <div className="image-preview">
            <img src={URL.createObjectURL(documentImage)} alt="Document Preview" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
          </div>
        )}
      </div>

      {/* Error and Success Messages */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Send Verification Code */}
      {!codeSent && (
        <div>
          <button onClick={sendVerificationCode} disabled={loading}>
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </div>
      )}

      {/* Verify Code */}
      {codeSent && (
        <div>
          <div>
            <label>Enter Verification Code</label>
            <input
              type="text"
              value={userEnteredCode}
              onChange={(e) => setUserEnteredCode(e.target.value)}
            />
          </div>
          <button onClick={verifyCode}>Verify Code</button>
        </div>
      )}
    </div>
  );
};

export default ProfessionalSignup;
