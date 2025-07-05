import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Auth.css';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      
      const result = await emailjs.sendForm(
        'service_123456', 
        'template_062dntx', 
        form.current,
        'PwZ4fZJinpUHs2zPL'
      );

      if (result.status === 200) {
        setMessage('Message sent successfully!');
        form.current.reset();
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Contact Us</h2>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666' }}>
        Have a question or feedback? We'd love to hear from you!
      </p>
      
      <form ref={form} className="auth-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="user_name"
          placeholder="Your Name" 
          required 
        />
        <input 
          type="email" 
          name="user_email"
          placeholder="Your Email" 
          required 
        />
        <input 
          type="tel" 
          name="user_phone"
          placeholder="Phone Number (Optional)" 
        />
        <textarea 
          name="message"
          rows="5" 
          placeholder="Your Message" 
          required
        ></textarea>
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
        
        {message && (
          <div className="success-message">
            <span className="success-icon">✅</span>
            {message}
          </div>
        )}
        
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Sending Message...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}
