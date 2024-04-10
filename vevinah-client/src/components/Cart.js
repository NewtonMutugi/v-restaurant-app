import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ItemActions from "./ItemActions";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Cart() {
  const savedCart = localStorage.getItem("cart");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(
    savedCart ? JSON.parse(savedCart) : []
  );

  // const location = useLocation();
  // const cart = location.state ? location.state.cart : [];

  // useEffect(() => {
  //   console.log("Cart items:", cart);
  //   if (JSON.stringify(cart) !== JSON.stringify(cartItems)) {
  //     setCartItems(cart);
  //   }
  // }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const calculateTotal = () => {
      let newSubtotal = 0;

      for (let i = 0; i < cartItems.length; i++) {
        const price = parseFloat(cartItems[i].price);
        const quantity = cartItems[i].quantity;

        newSubtotal += price * quantity;
      }

      setTotal(newSubtotal.toFixed(2));
      setSubtotal(newSubtotal.toFixed(2));
    };

    calculateTotal();
  }, [cartItems]);

  const navigate = useNavigate();

  function handlePayNow() {
    const isLoggedIn = true;

    if (isLoggedIn) {
      navigate("/payment");
    } else {
      navigate("/sign_up");
    }
  }

  return (
  <div>
      <Navbar />
      <div className="cart-page">
        <div className="cart-container">
        <h2>MY CART</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-image"
                  />
                </div>
                <div className="item-details">
                  <div className="item-name">Item: {item.name}</div>
                  <div className="item-description">{item.description}</div>
                  <br />
                  <div className="item-price">Kshs {item.price}</div>
                  <ItemActions
                    item={item}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <div className="summary-item">
            <span className="summary-label">Sub total:</span>
            <span className="summary-value">{subtotal}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Delivery charges:</span>
            <span className="summary-value">N/A</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">TOTAL:</span>
            <span className="summary-value">{total}</span>
          </div>
          <div className="summary-note">
            * Delivery charges will be applicable based on your chosen address
          </div>
          <div className="payment-options">
          <Link to="/menu">
            <button className="continue-shopping">Continue Shopping</button>
          </Link>
          <Link to="/sign_up">
            <button className="continue-shopping" onClick={handlePayNow}>
              Sign in and Pay
            </button>
          </Link>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
