import React, { useState } from "react";
import { Link } from 'react-router-dom'; // If using React Router
import "../App.css";
import ImageCarousel from "./ImageCarousel";
import TodaysSpecialSection from "./TodaysSpecialSection";
import DineIn from "./dineIn";
import ReviewSection from "./ReviewSection";
// import Footer from "./Footer";
import HomeFooter from "./HomeFooter";



const HomePage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

const toggleMenu = () => {
setMenuOpen(!isMenuOpen);
};
  return (
    <div className="app">
      <header>
        <div className="menu-icon" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </div>
        <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li className="SideBar-item">
              <Link to="/">Home</Link>
              </li>   
            <li className="SideBar-item">
              <Link to="/menu">Menu</Link>
              </li>
            <li className="SideBar-item">
              <Link to="/cart">Orders</Link>
              </li>
            <li className="SideBar-item">
              <Link to="/about-us">About Us</Link>
              </li>
              <li className="SideBar-item">
              <Link to="/contact-us">Contact Us</Link>
              </li>
          </ul>
        </nav>
      </header>

      <main>
        <div
          className={`image-carousel-container ${
            isMenuOpen ? "menu-open" : ""
          }`}
        >
          <ImageCarousel />
        </div>
        {/* <ImageCarousel /> */}
        <TodaysSpecialSection />
        <DineIn />
        <ReviewSection />
      </main>

      <HomeFooter />
    </div>
  );
};

export default HomePage;
