import React, { useState } from "react";
import "../App.css";
import ImageCarousel from "./ImageCarousel";
import TodaysSpecialSection from "./TodaysSpecialSection";
import DineIn from "./dineIn";
import ReviewSection from "./ReviewSection";
import HomeFooter from "./HomeFooter";
import Sidebar from "./sidebar";

const HomePage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app">
      <header>
        <Sidebar /> {/* Replace the menu icon and nav with the Sidebar component */}
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
