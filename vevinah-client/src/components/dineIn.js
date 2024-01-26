import React from 'react';
import '../App.css';


const DineIn = () => {
  return (
    <div className="dine-in-section">
      <div className="video-card">
        <iframe
          title="Restaurant Video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/_l_8mjVXEs0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="dine-in-description">
        <h2>Dine In</h2>
        <p>
        Savor the essence of culinary bliss in our cozy ambiance. Join us for an unforgettable DINE IN experience!
        </p>
      </div>
    </div>
  );
};

export default DineIn