import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../reducers/CartReducer';

const ProductCard = (props) => {
  const { product } = props;
  const [cartValue, setCartValue] = useState();
	const dispatch = useDispatch();
    const addToCart = (item) => {
        setCartValue(true);
        dispatch(cartActions.addToCart(item));
    }
  return (
    <div className='productBlock col-md-3'>
      <h4 className='productBlockHeading'>{product.name}</h4>
      <div className='productBlockWrapper row'>
        <div className='productImageBlock col-md-12 col-6'>
          <img className='productImage' src={product.imageURL}  alt={product.name}/>
        </div>
        <div className='productDescBlock col-md-12 col-6'>
          <p className='productDesc'>{product.description}</p>
        </div>
        <div className='productPriceBlock'>
          <span className='productPrice'>{`MRP Rs.${product.price}`}</span>
          {
            cartValue
              ? <button className='pButton atcButton'>Added to Cart</button>
              : <button className='pButton buynowButton' onClick={ () => addToCart(product)}>
                Buy now
                <span className='buynowTButton'>&nbsp;{`@ Rs.${product.price}`}</span>
                </button>
          }

        </div>
      </div>
    </div>
  )
}
export default ProductCard;