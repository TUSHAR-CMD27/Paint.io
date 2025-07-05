import React, { useState, useEffect } from 'react';
import './Explore.css';
import CreatePost from './CreatePost';
import axios from 'axios';

import Tempimg1 from '../Imgs/Tempimg1.jpg';
import Tempimg2 from '../Imgs/Tempimg2.jpg';
import Tempimg3 from '../Imgs/Tempimg3.jpg';
import Tempimg4 from '../Imgs/Tempimg4.jpg';
import Tempimg5 from '../Imgs/Tempimg5.jpg';
import Tempimg6 from '../Imgs/Tempimg6.jpg';

// Fallback cards if no posts from backend
const fallbackCards = [
  { img: Tempimg1, title: "Sunset Bliss", caption: "A warm evening in the wild." },
  { img: Tempimg2, title: "Art of Silence", caption: "Minimalistic vibes with emotion." },
  { img: Tempimg3, title: "Vibrant Strokes", caption: "Colors that speak louder than words." },
  { img: Tempimg4, title: "Peaceful Peaks", caption: "Inspired by the Himalayas." },
  { img: Tempimg5, title: "The Divine Form", caption: "My interpretation of energy." },
  { img: Tempimg6, title: "Dreamscape", caption: "Where imagination lives." },
];

export default function Explore() {
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from backend when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://paint-io-backend.onrender.com/api/posts/all');
      
      // Combine backend posts with fallback cards
      const backendPosts = response.data.posts || [];
      const combinedPosts = [...backendPosts, ...fallbackCards];
      
      setCards(combinedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts from backend, showing sample posts');
      // Use only fallback cards if API fails
      setCards(fallbackCards);
    } finally {
      setLoading(false);
    }
  };

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(search.toLowerCase()) ||
    card.caption.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPost = (newPost) => {
    setCards(prev => [newPost, ...prev]);
  };

  return (
    <div className="explore-container">
      <h2>Explore Gallery</h2>
      <input
        type="text"
        className="search-box"
        placeholder="Search artworks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (
        <div className="loading-message">
          <p>Loading posts...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="masonry-grid">
        {filteredCards.map((card, index) => (
          <div className="masonry-card" key={card._id || index}>
            <img src={card.imageUrl || card.img} alt={card.title} />
            <h4>{card.title}</h4>
            <p>{card.caption}</p>
          </div>
        ))}
      </div>

      <CreatePost onAdd={handleAddPost} />
    </div>
  );
}
