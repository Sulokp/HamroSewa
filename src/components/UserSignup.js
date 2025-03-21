import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./UserSignup.css";
import { 
  FaEye, FaEyeSlash, FaUser, FaEnvelope, FaKey, FaHome, 
  FaImage 
} from "react-icons/fa";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" }); // Clear field error
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      if (selectedImage.type === "image/jpeg") {
        setImage(selectedImage);
        setValidationErrors({ ...validationErrors, image: "" });
      } else {
        setValidationErrors({ ...validationErrors, image: "Profile image must be a .jpg file." });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendVerificationCode = async () => {
    if (!formData.email) {
      setValidationErrors({ ...validationErrors, email: "Email is required." });
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post("https://localhost:7173/api/Verification/send-code", formData.email, {
        headers: { "Content-Type": "application/json" },
      });
      setCodeSent(true);
      setSuccessMessage(`Verification code sent to ${formData.email}.`);
    } catch (error) {
      setError(error.response?.data || "Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!userEnteredCode) {
      setValidationErrors({ ...validationErrors, code: "Please enter the verification code." });
      return;
    }
    try {
      await axios.post("https://localhost:7173/api/Verification/verify-code", {
        email: formData.email,
        code: userEnteredCode,
      });
      setIsVerified(true);
      setSuccessMessage("Email verified successfully!");
      setError("");
    } catch (error) {
      setError(error.response?.data || "Invalid verification code.");
    }
  };

  const handleSubmit = async () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!image) newErrors.image = "Profile image is required and must be a .jpg file.";

    setValidationErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // Stop submission if there are errors

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => submitData.append(key, formData[key]));
    submitData.append("image", image);

    try {
      setLoading(true);
      await axios.post("https://localhost:7173/api/User/register", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("User registered successfully!");
      navigate('//UserLogin');
      setError("");
    } catch (error) {
      setError(error.response?.data?.title || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>User Signup</h2>

      <div className="form-group">
        <label><FaUser /> Name<span style={{color: "red"}}> *</span></label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        {validationErrors.name && <div className="error-message">{validationErrors.name}</div>}
      </div>

      <div className="form-group">
        <label><FaEnvelope /> Email<span style={{color: "red"}}> *</span></label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        {validationErrors.email && <div className="error-message">{validationErrors.email}</div>}
      </div>

      <div className="form-group password-container">
        <label><FaKey /> Password<span style={{color: "red"}}> *</span></label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <i onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</i>
        </div>
        {validationErrors.password && <div className="error-message">{validationErrors.password}</div>}
      </div>

      <div className="form-group">
        <label><FaHome /> Address<span style={{color: "red"}}> *</span></label>
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        {validationErrors.address && <div className="error-message">{validationErrors.address}</div>}
      </div>

      <div className="form-group">
        <label><FaImage /> Profile Image<span style={{color: "red"}}> *</span></label>
        <input type="file" accept=".jpg" onChange={handleImageChange} />
        {validationErrors.image && <div className="error-message">{validationErrors.image}</div>}
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {!codeSent ? (
        <button onClick={sendVerificationCode} disabled={loading}>
          {loading ? "Sending..." : "Send Verification Code"}
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter Verification Code"
            value={userEnteredCode}
            onChange={(e) => setUserEnteredCode(e.target.value)}
          />
          {validationErrors.code && <div className="error-message">{validationErrors.code}</div>}
          <button onClick={verifyCode} disabled={!userEnteredCode}>
            Verify Code
          </button>
        </>
      )}

      {isVerified && (
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Details"}
        </button>
      )}
      <p>
        Already Have an Account? <Link to="/UserLogin">Sign in</Link>
      </p>
    </div>
  );
};

export default UserSignup;
