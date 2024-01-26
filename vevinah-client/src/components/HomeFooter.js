import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function HomeFooter() {
  const api_key = process.env.REACT_APP_MAPS_API_KEY;
  // console.log("API-KEY: " + api_key);
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
      <footer class="footer">
        <div class="content">
          <div class="inner-content">
            <h1>Visit us today!</h1>
            <ul class="icon-text">
              {/* <li>
                <i class="fas fa-check-circle"></i>
              </li> */}
              <li>
                <p>
                  We're committed to great food, great coffee, great service, an
                  experience that will make your time with us fabulous.All
                  visuals are serving suggestions only. Prices are quoted in
                  Kenyan Shillings and inclusive of VAT.
                </p>
              </li>
            </ul>
          </div>
          <div class="location">
            <h3>Location📍: Lusengeti Road,Industrial Area, Kenya.</h3>
            <iframe
              width="400"
              height="200"
              // style="border:0"
              loading="lazy"
              allowfullscreen
              src={`https://www.google.com/maps/embed/v1/place?q=place_id:EhxMdXNpbmdldGkgUmQsIE5haXJvYmksIEtlbnlhIi4qLAoUChIJo6kfYXcRLxgReTXv45ZeLUQSFAoSCb_95Q58ES8YEX7WtjfkRlnV&key=${api_key}`}
            ></iframe>
          </div>
        </div>
        <div class="social-media">
          <h3 class="follow-us">Follow Us:</h3>
          <ul class="social-icons">
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
          </ul>
        </div>
        <div class="copyright">
          &copy; 2024 Chai Vevinah. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomeFooter;
