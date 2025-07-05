import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("https://paint-io-backend.onrender.com/api/auth/signup", formData);
      
      // Auto-login after successful signup
      const loginRes = await axios.post("https://paint-io-backend.onrender.com/api/auth/login", {
        email: formData.email,
        password: formData.password
      });
      
      login(loginRes.data.user);
      navigate('/explore');
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="firstname">First Name</label>
          <input 
            id="firstname"
            name="firstname" 
            type="text" 
            placeholder="Enter your first name" 
            required 
            onChange={handleChange}
            value={formData.firstname}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="lastname">Last Name</label>
          <input 
            id="lastname"
            name="lastname" 
            type="text" 
            placeholder="Enter your last name" 
            required 
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            id="phone"
            name="phone" 
            type="tel" 
            placeholder="Enter your phone number" 
            required 
            onChange={handleChange}
            value={formData.phone}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            name="email" 
            type="email" 
            placeholder="Enter your email address" 
            required 
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input 
              id="password"
              name="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Create a password (min 6 characters)" 
              required 
              onChange={handleChange}
              value={formData.password}
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input">
            <input 
              id="confirmPassword"
              name="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm your password" 
              required 
              onChange={handleChange}
              value={formData.confirmPassword}
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Creating Account...
            </>
          ) : (
            <>
             
              Create Account
            </>
          )}
        </button>
      </form>
    </div>
  );
}
