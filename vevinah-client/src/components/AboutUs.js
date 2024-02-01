import React from 'react';
import './AboutUs.css';
import Navbar from './Navbar';
import Footer from './Footer';
import screenLeft from '../assets/food-about.jpg'
import screenRight from '../assets/chef-about.jpg'

const AboutUs = () => {
  const image = [screenLeft];
  const image1 = [screenRight];

    return (
    <div>
        <Navbar />
      <div className="about-us-container">
          <div className="left-section">
            <div className="left-photo">
            <img src={image} alt='about-image' />
            </div>
          </div>
          <div className="middle-content">
            <h2>ABOUT US</h2>
            <p>
              Nestled in the heart of the city, our restaurant is a culinary haven for those seeking a genuine taste of tradition. 
              <br />
              <br />
              Our chefs skillfully craft each dish with a commitment to authenticity. From the warm and inviting ambiance to the rich aromas wafting from the kitchen, every element reflects our dedication to providing a truly traditional dining experience. 
            </p>
          </div>
          <div className="right-section">
              <div className="right-photo">
              <img src={image1} alt='about-image' />
              </div>
          </div>
      </div>
        <Footer />
    </div>
  );
};

export default AboutUs;