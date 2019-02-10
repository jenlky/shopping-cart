import React from 'react';
import CartItems from './CartItems';
import CartTotal from './CartTotal';
import PropTypes from 'prop-types';

const Cart = ({ productsId, qty, products, removeFromCart, inputQuantity, handleClick }) => {
  if (!productsId || !qty) {
    return null;
  } 
  
  console.log('Cart - productsId:', productsId);
  console.log('Cart - qty:', qty);
  console.log('Cart - products:', products);

  return (
    <div className='shoplah'>
      <div className='horizontal-ruler'></div>
      <div className='shoplah-menu'>
        <h3>SHOPPING CART - {qty.length !== 0 ? 
          qty.reduce((acc, currentVal) => acc + currentVal) : '0'} items</h3>
        <div className='shoplah-header'>
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>
        {productsId.map((productId, index) => {
          let productIndex = productId - 1;
          return (
            <CartItems 
              key={products[productIndex].name} 
              productId={productId} 
              product={products[productIndex]} 
              qty={qty[index]} 
              removeFromCart={removeFromCart}
              inputQuantity={inputQuantity}
              handleClick={handleClick}
            />
          );
        })}
        <CartTotal />
      </div>
    </div>
  );
};

/*
Cart.propTypes = {
  num: PropTypes.array.isRequired,
  cartItem: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  qty: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  inputQuantity: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
}; */

export default Cart;