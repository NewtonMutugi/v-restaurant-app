import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <link rel="stylesheet" type="text/css" href="App.css" />
</head>
    <footer className="footer">
      <div className="social-media">
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
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <h3 className="location">
            Location📍: Lusengeti Road, Industrial Area, Kenya.
          </h3>
        </ul>
      </div>
  <div class="content">
    <div class="middle-text">
      
        <li>
          <p>
            We're committed to great food, great coffee, great service, an
            experience that will make your time with us fabulous.All visuals are
            serving suggestions only. Prices are quoted in Kenyan Shillings and
            inclusive of VAT.
          </p>
        </li>
      
    </div>
  </div>
  <div class="copyright">&copy; 2024 Chai Vevinah. All Rights Reserved.</div>
</footer>
</div>
  );
}

export default Footer;