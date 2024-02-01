// App.js
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Menu from './components/Menu';
import SignIn from './components/SignIn';
import Register from './components/SignUp';
import PaymentPage from './components/PaymentPage';
import TrackingPage from './components/TrackingPage';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Cart from './components/Cart';
import DineInForm from './components/DineInForm';
import MpesaPaymentPage from './components/PaymentForm';

let isloggedIn = false;
const token = localStorage.getItem('access_token');
if (token) {
  isloggedIn = true;
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  const onAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  function PrivateRoute() {
    return isloggedIn ? <Outlet /> : <Navigate to="/sign_in" replace />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/menu"
          element={<Menu onAddToCart={onAddToCart} cartItems={cartItems} />}
        />
        <Route
          path="/cart"
          element={
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
          }
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign_up" element={<Register />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/mpesa_payment" element={<MpesaPaymentPage />} />
        </Route>
        <Route path="/dine-in" element={<DineInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
