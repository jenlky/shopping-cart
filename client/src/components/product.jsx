import React from 'react';
import ProductInfo from './ProductInfo';
import PropTypes from 'prop-types';

const Product = ({ id, product, isLoggedIn, addToCart }) => {
  const name = product.name;
  const price = product.price;

  if (id === 1) {
    return (
      <div className='product first-product'>
        <img src={product.image} alt={name} className='img-size'></img>
        <ProductInfo id={id} name={name} price={price} isLoggedIn={isLoggedIn} addToCart={addToCart} />
      </div>
    );
  } else if (id === 2) {
    return (
      <div className='product left-products'>
        <img src={product.image} alt={name} className='img-size'></img>
        <ProductInfo id={id} name={name} price={price} isLoggedIn={isLoggedIn} addToCart={addToCart} />
      </div>
    );
  } else if (id === 3) {
    return (
      <div className='product left-products order'>
        <img src={product.image} alt={name} className='img-size'></img>
        <ProductInfo id={id} name={name} price={price} isLoggedIn={isLoggedIn} addToCart={addToCart} />
      </div>
    );
  } else if (id === 5) {
    return (
      <div className='product order'>
        <img src={product.image} alt={name} className='img-size'></img>
        <ProductInfo id={id} name={name} price={price} isLoggedIn={isLoggedIn} addToCart={addToCart} />
      </div>
    );
  } else {
    return (
      <div className='product'>
        <img src={product.image} alt={name} className='img-size'></img>
        <ProductInfo id={id} name={name} price={price} isLoggedIn={isLoggedIn} addToCart={addToCart} />
      </div>
    );
  }
};

Product.PropsType = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default Product;