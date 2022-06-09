import React from 'react';
import ProductDetail from './ProductDetail';

const ProductsList = (props) => {

  const { allProducts } = props;
  return (
    <div className='productlist'>
      {
        allProducts.map((product, index) => {
          return <ProductDetail key={ product.id } product={product} />
        })
      }
    </div>
    
  )
}

export default ProductsList;