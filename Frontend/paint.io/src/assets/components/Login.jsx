import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ 
    email: "",
    password: "" 
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post("https://paint-io-backend.onrender.com/api/auth/login", formData);
      login(resp.data.user);
      alert(resp.data.message);
      navigate('/explore');
    } catch (e) {
      alert(e.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="auth-links">
          {/* <Link to="/forgot-password" className="auth-link">Forgot Password?</Link> */}
          <Link to="/signup" className="auth-link secondary-link">New User? Signup</Link>
        </div>
      </form>
    </div>
  );
}
