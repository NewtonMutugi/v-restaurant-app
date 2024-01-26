import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-icon" onClick={toggleSidebar}>
        &#9776; 
      </div>

      {isSidebarOpen && (
        <div className="sidebar">
          <ul className='sidebar-list'>
            <li>
              <Link to="/">Home</Link>
              <hr className='sidebar-line' />
            </li>
            <li>
              <Link to="/menu">Menu</Link>
              <hr className='sidebar-line' />
            </li>
            <li>
              <Link to="/about-us">About</Link>
              <hr className='sidebar-line' />
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
              <hr className='sidebar-line' />
            </li>
            <li>
              <Link to="/cart">Orders</Link>
              <hr className='sidebar-line' />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;