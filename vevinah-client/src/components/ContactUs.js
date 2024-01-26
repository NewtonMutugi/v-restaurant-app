import React, { useState } from 'react';
import './ContactUs.css';
import Navbar from './Navbar';
import HomeFooter from './HomeFooter';



const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Email submitted:', email);

    setTimeout(() => {
      setSuccessMessage('Email submitted successfully');
    }, 500);

    setEmail('');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
    <div>{<Navbar />}</div>
      <div className="contact-us-container">
        <div className="photo-section">
          <img src="/images/contactanos-2.jpg" alt="Contact" />
        </div>
        <div className="form-section">
          <h1>CONTACT US</h1>
          <p className="form-statement">PROVIDE YOUR EMAIL TO CONTACT US:</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <button type="submit">Submit</button>
          </form>
          <div className="phone-section">
            <span className="phone-icon">&#x260E;</span>
            <p className="phone-number">Call: +254700000000</p>
            <div className="phone-section">
              <span className="sms-icon">&#x1F4F2;</span>
              <p className="phone-number">Send SMS/Whatsapp us: +254700000000</p>
            </div>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
      <div>{<HomeFooter />}</div>
    </div>  
  );
};

export default ContactUs;