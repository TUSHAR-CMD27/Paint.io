import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="tagline">Bringing your imagination to paper, one sketch at a time.</p>
      <div className="socials">
        <a href="https://www.instagram.com/_.2shar.__/?__pwa=1#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="mailto:tushargadhari3@gmail.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <p>© 2025 Paint.io. All rights reserved.</p>
    </footer>
  );
}
