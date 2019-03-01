import React from 'react';
import CartItem from './CartItem';
import CartTotalContainer from '../containers/CartTotalContainer';
import PropTypes from 'prop-types';

const Cart = ({ idArray, qtyArray, products, removeFromCart, updateCart }) => {
  if (!idArray || !qtyArray) {
    return null;
  } 

  return (
    <div className='shoplah'>
      {/* <div className='horizontal-ruler'></div> */}
      <div className='shoplah-menu'>
        <h3>SHOPPING CART - {qtyArray.length !== 0 ? 
          qtyArray.reduce((acc, currentVal) => acc + currentVal) : '0'} items</h3>
        <div className='shoplah-header'>
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>
        {idArray.map((id, index) => {
          let productIndex = id - 1;
          return (
            <CartItem
              key={products[productIndex].name} 
              id={id} 
              product={products[productIndex]} 
              qty={qtyArray[index]} 
              removeFromCart={removeFromCart}
              updateCart={updateCart}
            />
          );
        })}
        <CartTotalContainer />
      </div>
    </div>
  );
};

Cart.propTypes = {
  idArray: PropTypes.array.isRequired,
  qtyArray: PropTypes.array.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
}; 

export default Cart;