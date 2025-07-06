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

  // Menu links (for DRYness)
  const menuLinks = (
    <>
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
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo"><Link to="/">Paint.io</Link></div>
      {/* Desktop links */}
      <div className="navbar-links-desktop">{menuLinks}</div>
      {/* Hamburger for mobile */}
      <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)}>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </div>
      {/* Side drawer menu for mobile */}
      <div className={`side-drawer${isMenuOpen ? ' open' : ''}`}>
        <button className="close-drawer" onClick={() => setIsMenuOpen(false)}>&times;</button>
        <div className="side-drawer-links">{menuLinks}</div>
      </div>
      {/* Overlay */}
      {isMenuOpen && <div className="drawer-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </nav>
  );
}