import Carousel1 from '../assets/Dishes-of-Kenyan-cuisine.jpeg'
import Carousel2 from '../assets/image 1.png'
import Carousel3 from '../assets/kenyan-foods.jpeg'
import logo from '../assets/vevinah-logo.png'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';



const ImageCarousel = () => {
  const images = [Carousel1, Carousel2, Carousel3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Automatically change image every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="carousel-section">
      <div className="image-carousel">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        <div className="carousel-tagline-overlay">
          <h4>Every Dish Tells A Story</h4>
          <h2>
            Taste the Tradition,
            <br />
            Feel the Innovation
          </h2>
        </div>

        <div className="carousel-location-overlay">
          <h3>
            Open Today Till 9pm,
            <br />
            Located at Lusengeti Shopping Center
          </h3>
        </div>

        <div className="carousel-logo-overlay">
          <img src={logo} alt="vevinah" />
        </div>

        <Link to="/menu">
        <button className="carousel-button">Check out Menu</button>
        </Link>
      </div>
    </div>
  );
};

export default ImageCarousel;


