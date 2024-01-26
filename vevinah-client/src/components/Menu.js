import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'react-feather';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../App.css';
import HomeFooter from './HomeFooter';

function Menu() {
  const [menuFoods, setMenuFoods] = useState([]);
  const [originalMenuFoods, setOriginalMenuFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setMenuFoods(originalMenuFoods);
      return;
    }

    const filteredFoods = originalMenuFoods.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMenuFoods(filteredFoods);
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dishes')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMenuFoods(data);
        setOriginalMenuFoods(data);
      });
  }, []);

  const handleAddToCart = (food) => {
    const updatedFood = { ...food, quantity: 1 };
    setCart([...cart, updatedFood]);
    setShowNotification(true);
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
    <div>
    <div>{<Navbar />}</div>
    <div className="home-container">
      {showNotification && <div className="notification">Item added to cart!</div>}
      <div className="search">
        <input className='food-search'
          type="text"
          placeholder="Search favorite foods..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="container">
        <div className="cards-container">
          {menuFoods.map((food) => (
            <div key={food.id}>
              <img className="images" src={food.image} alt={food.name} />
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p>Kshs {food.price}</p>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(food)}>
                Order
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="cart">
      <Link to="/cart" state={{ cart: cart }}>
          <ShoppingCart />
          <div className="cart-length">{cart.length}</div>
        </Link>
      </div>
      <div>{<HomeFooter />}</div>
    </div>
    </div>
  );
}

export default Menu;