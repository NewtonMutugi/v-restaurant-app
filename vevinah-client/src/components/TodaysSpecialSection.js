import React, { useState, useEffect } from 'react';
import '../App.css';
import PropTypes from 'prop-types';

const backend_url = 'https://veni-vay2.onrender.com/dishes';

function TodaysSpecialSection() {
  const [menuItems, setMenuItems] = useState([]);
  const savedCart = localStorage.getItem('cart');
  const [originalMenuItems, setOriginalMenuItems] = useState([]);
  const [cart, setCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    console.log(savedCart);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing savedCart:', error);
      }
    }
  }, []);
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setMenuItems(originalMenuItems);
      return;
    }
    const filteredFoods = originalMenuItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMenuItems(filteredFoods);
  };
  const Notification = ({ message, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }, [onClose]);

    return <div className="notification">{message}</div>;
  };

  Notification.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch(backend_url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const threeMenuItems = data.slice(0, 3);
        /*setMenuItems(threeMenuItems);
        setOriginalMenuItems(threeMenuItems);*/
        setMenuItems([...threeMenuItems]);
        setOriginalMenuItems([...threeMenuItems]);
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  }, []);

  const handleAddToCart = (item, event) => {
    event.preventDefault();
    const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? updatedCartItem : cartItem
      );
      setCart(updatedCart);
      console.log(cart);
    } else {
      const updatedItem = { ...item, quantity: 1 };
      setCart([...cart, updatedItem]);
      console.log(cart);
    }
    setShowNotification(true);
    setNotificationMessage(`${item.name} added to cart!`);
  };

  const handleNotificationClose = () => {
    setNotificationMessage('');
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showNotification]);

  return (
    <>
      <section>
        <div className="todays-special-heading">
          <h3>Today's Special</h3>
        </div>
      </section>
      <div className="app">
        {showNotification && <p className="notification">Item added to cart</p>}
        {notificationMessage && (
          <Notification
            message={showNotification}
            onClose={handleNotificationClose}
          />
        )}

        <div className="card-section">
          {menuItems.map((item) => (
            <div key={item.id} className="cards">
              <a href="#" onClick={(event) => handleAddToCart(item, event)}>
                <img className="images" src={item.image} alt={item.name} />
              </a>
              <h3>{item.name}</h3>
              <p style={{ color: 'black' }}>{item.description}</p>
              <p style={{ color: 'black' }}>Kshs {item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TodaysSpecialSection;
