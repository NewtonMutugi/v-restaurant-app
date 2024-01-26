import React from 'react';
import './AboutUs.css';
import Navbar from './Navbar';
import HomeFooter from './HomeFooter';
// import Footer from './Footer';

const AboutUs = () => {
    return (
    <div>
      <div>{<Navbar />}</div>
        <div className="about-us-container">
          <div className="top-section">
            <div className="left-photo">
          <img src="/images/935c701b-c026-4c74-a091-c132da2d9749.jpeg" alt="About Us" />
          </div>
          <div className="right-content">
            <p>
              Nestled in the heart of the city, our restaurant is a culinary haven for those seeking a genuine taste of tradition. Our chefs skillfully craft each dish with a commitment to authenticity...
            </p>
          </div>
        </div>
        <div className="bottom-section">
          <div className="right-content">
            <p>
              From the warm and inviting ambiance to the rich aromas wafting from the kitchen, every element reflects our dedication to providing a truly traditional dining experience. Explore a menu that showcases the diverse flavors of our cultural heritage...
          </p>
        </div>
          <div className="right-photo">
          <img src="/images/pngtree-african-american-chef-expertly-grilling-meat-on-bbq-animated-representation-of-image_13895979.png" alt="About Us" />
          </div>
        </div>
      <div>{<HomeFooter />}</div>
    </div>
    </div>
  );
};

export default AboutUs;