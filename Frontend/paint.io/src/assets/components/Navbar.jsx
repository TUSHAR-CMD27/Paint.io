import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo"><Link to="/">Paint.io</Link></div>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/explore" onClick={() => setIsMenuOpen(false)}>Explore</Link>
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.firstname}!</span>
              <Link to="/explore" className="create-post-link" onClick={() => setIsMenuOpen(false)}>Create Post</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/Login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/Signup" onClick={() => setIsMenuOpen(false)}>Signup</Link>
            </>
          )}
          <Link to="/Contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
        <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </nav>
      {/* Overlay for mobile menu */}
      <div className={`menu-overlay${isMenuOpen ? ' active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
    </>
  );
}