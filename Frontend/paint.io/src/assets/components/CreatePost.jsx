import React, { useState } from 'react';
import './CreatePost.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost({ onAddPost }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !caption || !image) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Create FormData to send file and text data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('caption', caption);
      formData.append('image', image);

      // Send post data to backend with file upload
      const response = await axios.post('https://paint-io-backend.onrender.com/api/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Call the parent component's callback
      if (onAddPost) {
        onAddPost(response.data.post);
      }

      // Show success message
      alert('Post created successfully!');

      // Reset form and close modal
      setOpen(false);
      setTitle('');
      setCaption('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating post:', error);
      alert(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    if (!user) {
      alert('Join Paint.io to share your amazing artwork! Please login or signup to create posts.');
      navigate('/Login');
      return;
    }
    setOpen(true);
  };



  return (
    <>
      <button className="create-btn" onClick={handleCreateClick}>+</button>

      {open && (
        <div className="create-modal-overlay" onClick={() => setOpen(false)}>
          <div className="create-modal" onClick={(e) => e.stopPropagation()}>
            <h3>New Post</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Caption"
                rows="3"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                required
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <p>Image selected: {image.name}</p>
                </div>
              )}
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Creating...' : 'Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
