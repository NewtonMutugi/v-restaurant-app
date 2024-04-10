import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="stylesheet" type="text/css" href="App.css" />
      </head>
      <footer className="footer">
        <div className="social-media">
          <div className="left-section">
            <div className="middle-text">
            <h1>Visit us today!</h1>
              <p>
                We're committed to great food, great tea, great service, an
                experience that will make your time with us fabulous. All visuals are
                serving suggestions only. Prices are quoted in Kenyan Shillings and
                inclusive of VAT.
              </p>
            </div>
          </div>
          <div className="right-section">
            <h3 className="follow-us">Follow Us:</h3>
            <ul className="social-icons">
              <li>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/chaivenina/?igsh=MXZrMms5bzRqYzh0NQ%3D%3D" className="social-icon">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="middle-section">
          <h3 className='contact-us'>Contact Us:</h3>
          <p>+254700000000</p>
          <h3 className="location">
            Location📍:
          </h3>
          <p>Lusengeti Road, Industrial Area, Kenya.</p>
        </div>
        <hr className="footer-line" />
        <div className="copyright">
          &copy; 2024 Chai Venina. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;