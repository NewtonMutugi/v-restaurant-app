import React, { useState } from 'react';

function ItemActions({ item, cartItems, setCartItems }) {
  const [confirmRemove, setConfirmRemove] = useState(false);

  const decreaseQuantity = () => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity = Math.max(updatedCartItems[itemIndex].quantity - 1, 0);
      setCartItems(updatedCartItems);
    }
  };

  const increaseQuantity = () => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (itemIndex !== -1) {
      updatedCartItems[itemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    }
  };

  const handleRemoveItem = () => {
    console.log('Removing item with ID:', item.id);
    setConfirmRemove(true);
  };

  const handleConfirmRemove = () => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    console.log('Updated cart items after removal:', updatedCartItems);
    setCartItems(updatedCartItems);
    setConfirmRemove(false);
  };

  const handleCancelRemove = () => {
    setConfirmRemove(false);
  };

  return (
    <div className="item-actions">
      <button className="quantity-button1" onClick={decreaseQuantity}> - </button>
      <span>{item.quantity}</span>
      <button className="quantity-button2" onClick={increaseQuantity}> + </button>
      <span className="vertical-line"></span>
      {confirmRemove ? (
        <ConfirmationDialog onConfirm={handleConfirmRemove} onCancel={handleCancelRemove} />
      ) : (
        <button className="remove-button" onClick={handleRemoveItem}>
          Remove
        </button>
      )}
    </div>
  );
}

function ConfirmationDialog({ onConfirm, onCancel }) {
  return (
    <div className="confirmation-dialog-container">
      <div className="confirmation-dialog">
        <p className="confirmation-message">Are you sure you want to remove this item from the cart?</p>
        <div className="confirmation-buttons">
          <button className="confirmation-button confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="confirmation-button cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemActions;