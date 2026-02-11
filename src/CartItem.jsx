import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // 1. Initialize a variable total to hold the cumulative sum
    let total = 0;

    // 2. Iterate over the cart array using cart.forEach()
    cart.forEach((item) => {
      // 3. Extract quantity and cost
      // 4. Convert cost string (e.g., "$10.00") to number and multiply by quantity
      const itemCost = parseFloat(item.cost.substring(1));
      const itemTotal = itemCost * item.quantity;

      // 5. Add the resulting value to total
      total += itemTotal;
    });

    // 6. Return the final total sum
    return total;
  };

  const handleContinueShopping = (e) => {
    // We check if the onContinueShopping function exists and call it
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };


  const handleIncrement = (item) => {
    // Dispatch updateQuantity with current quantity + 1
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // If quantity > 1, decrease by 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity would drop to 0, remove the item entirely
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // Dispatch removeItem using the plant name as the identifier
    dispatch(removeItem(item.name));
  };

  // Calculate the total cost for a specific item (Subtotal)
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));

    // We multiply the price by the current quantity
    const subtotal = unitPrice * item.quantity;

    return subtotal;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
              <button 
  className="cart-item-button cart-item-button-dec" 
  onClick={() => handleDecrement(item)}
>-</button>

<span className="cart-item-quantity-value">{item.quantity}</span>

<button 
  className="cart-item-button cart-item-button-inc" 
  onClick={() => handleIncrement(item)}
>+</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


