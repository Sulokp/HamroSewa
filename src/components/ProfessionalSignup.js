import React, { useState } from "react";
import axios from "axios";
import "./ProfessionalSignup.css";
import {
  FaEye, FaEyeSlash, FaUser, FaEnvelope, FaKey, FaHome,
  FaSuitcase, FaWrench, FaDollarSign, FaImage, FaIdCard
} from "react-icons/fa";

const ProfessionalSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    profession: "",
    expertise: "",
    hourlyRate: "",
    documentType: "",
    documentNumber: "",
  });

  const [image, setImage] = useState(null);
  const [documentImage, setDocumentImage] = useState(null);
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage && selectedImage.type === "image/jpeg") {
      setImage(selectedImage);
      setError(""); // Clear error if valid image
    } else {
      setError("Profile image must be a .jpg file.");
    }
  };

  const handleDocumentImageChange = (event) => {
    const selectedDocumentImage = event.target.files[0];
    if (selectedDocumentImage && selectedDocumentImage.type === "image/jpeg") {
      setDocumentImage(selectedDocumentImage);
      setError(""); // Clear error if valid image
    } else {
      setError("Document image must be a .jpg file.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendVerificationCode = async () => {
    if (!formData.email) {
      setError("Email is required.");
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
      setError("Please enter the verification code.");
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
    // Check for missing required fields
    if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.profession || !formData.expertise || !formData.hourlyRate || !formData.documentType || !formData.documentNumber || !image || !documentImage) {
      setError("All fields are required.");
      return;
    }

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => submitData.append(key, formData[key]));
    submitData.append("image", image);
    submitData.append("documentImage", documentImage);

    try {
      setLoading(true);
      await axios.post("https://localhost:7173/api/Professional/create", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Professional details submitted successfully!");
      setError(""); // Clear any existing errors
    } catch (error) {
      // Handle error responses
      if (error.response?.data && typeof error.response.data === "object") {
        setError(error.response.data.title || error.response.data.errors || "Failed to submit details.");
      } else {
        setError("Failed to submit details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Professional Signup</h2>

      {/* Form inputs */}
      <div className="form-group">
        <label><FaUser /> Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label><FaEnvelope /> Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </div>

      <div className="form-group password-container">
        <label><FaKey /> Password</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <i onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</i>
        </div>
      </div>

      <div className="form-group">
        <label><FaHome /> Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label><FaSuitcase /> Profession</label>
        <input type="text" name="profession" value={formData.profession} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label><FaWrench /> Expertise</label>
        <input type="text" name="expertise" value={formData.expertise} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label><FaDollarSign /> Hourly Rate</label>
        <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label><FaImage /> Profile Image</label>
        <input type="file" onChange={handleImageChange} />
      </div>

      <div className="form-group">
        <label><FaIdCard /> Document Type</label>
        <select name="documentType" value={formData.documentType} onChange={handleInputChange}>
          <option value="">Select Document Type</option>
          <option value="Citizenship">Citizenship</option>
          <option value="Passport">Passport</option>
          <option value="Drivers License">Driver's License</option>
        </select>
      </div>

      <div className="form-group">
        <label>Document Number</label>
        <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label><FaImage /> Document Image</label>
        <input type="file" onChange={handleDocumentImageChange} />
      </div>

      {/* Error & Success Messages */}
      {error && typeof error === "string" && <div className="error-message">{error}</div>}
      {successMessage && typeof successMessage === "string" && <div className="success-message">{successMessage}</div>}

      {/* Verification */}
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
          <button onClick={verifyCode} disabled={!userEnteredCode}>
            Verify Code
          </button>
        </>
      )}

      {/* Submit Button */}
      {isVerified && (
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Details"}
        </button>
      )}
    </div>
  );
};

export default ProfessionalSignup;
