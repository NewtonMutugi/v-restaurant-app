import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';


function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sidebar-wrapper">
      <div className={`menu-icon${isSidebarOpen ? ' open' : ''}`} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {isSidebarOpen && (
        <div className="sidebar" onMouseLeave={isSidebarOpen ? false : true}>
          <ul className="sidebar-list">
            <li>
              <Link to="/menu">
              <FontAwesomeIcon icon={faUtensils} className='side-menu' />
              Menu</Link>
              <hr className='sidebar-line' />
            </li>
            <li>
              <Link to="/about-us">
              <FontAwesomeIcon icon={faInfoCircle} className='about-icon'/>
              About</Link>
              <hr className='sidebar-line' />
            </li>
            <li>
              <Link to="/contact-us">
              <FontAwesomeIcon icon={faEnvelope} className='contact-icon'/>
              Contact Us</Link>
              <hr className='sidebar-line' />
            </li>
            <li>
              <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} className='order-icon'/>
              Orders</Link>
              <hr className='sidebar-line' />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
