import React, { Component} from 'react';
import { connect } from 'react-redux';
import AddToCart from '../actions/AddToCart';
import Products from '../components/Products';

// Actions: AddToCart
class ProductsContainer extends Component {
  render() {
    console.log('ProductsContainer - addToCart:', this.props.addToCart);

    if (!this.props.products) {
      return <div>loading</div>;
    } 

    return (
      <Products products={this.props.products} addToCart={this.props.addToCart} />
    );
  }
}

const mapStateToProps = state => ({
  products: state.productsReducer.products.data
});

const mapDispatchToProps = dispatch => ({
  addToCart: (num, product) => dispatch(AddToCart(num, product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);