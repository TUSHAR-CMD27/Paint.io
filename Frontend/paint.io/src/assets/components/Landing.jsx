import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Explore from './Explore';

import Tempimg1 from '../Imgs/Tempimg1.jpg';
import Tempimg2 from '../Imgs/Tempimg2.jpg';
import Tempimg3 from '../Imgs/Tempimg3.jpg';
import Tempimg4 from '../Imgs/Tempimg4.jpg';
import Tempimg5 from '../Imgs/Tempimg5.jpg';
import Tempimg6 from '../Imgs/Tempimg6.jpg';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="landing">
      <h1 className="headline">UNLEASH YOUR CREATIVITY</h1>
      <p className="subheadline">A space to share art and discover artists</p>

      <div className="hero-images-grid">
        <img src={Tempimg1} alt="Art 1" />
        <img src={Tempimg2} alt="Art 2" />
        <img src={Tempimg3} alt="Art 3" />
        <img src={Tempimg4} alt="Art 4" />
        <img src={Tempimg5} alt="Art 5" />
        <img src={Tempimg6} alt="Art 6" />
      </div>
      
      <div className="button-group">
        <Link className="primary-btn" to="/explore">Explore Feed</Link>
        {user ? (
          <Link className="secondary-btn" to="/explore">Start Creating</Link>
          
        ) : (
          <Link className="secondary-btn" to="/Login">Login</Link>
        )}
      </div>
      
      
      {user && (
        <div className="landing-explore-section">
         {/* <h2>Discover Amazing Artwork</h2> */}
          <Explore />
        </div>
      )}
    </div>
  );
}