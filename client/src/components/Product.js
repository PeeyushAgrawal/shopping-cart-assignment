import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import CategoryList from './CategoryList';
import { useParams } from 'react-router-dom';

const Products = () => {
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
const [selectId, setSelectId] = useState('');
  useEffect(() => {
    fetch('../products')
      .then(response => response.json())
      .then(data => {
        setAllProducts(data.products);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let productFilter;
    if (id) {
        productFilter = allProducts.filter((prod) => prod.category === id);
        setFilteredProducts(productFilter);
        setSelectId(id);
    } else if (selectId) {
        productFilter = allProducts.filter((prod) => prod.category === selectId);
        setFilteredProducts(productFilter);
        setSelectId(selectId);
    } else {
        productFilter = allProducts;
    }
    setFilteredProducts(productFilter);
  }, [id, selectId, allProducts]);

  function filterByCategory(id) {
    const filteredProducts = allProducts.filter(product => {
      return product.category === id;
    });
    setFilteredProducts(filteredProducts);
  }

  return (
    <div className='productsblock container-lg'>
        <div className='row'>
            <div className='productsLeftBlock col-md-3 col-lg-3 col-sm-3'>
                <CategoryList filterBy={filterByCategory}/>
            </div>
            <div className='productsRightBlock col-md-9 col-lg-9 col-sm-9'>
                <ProductList allProducts={filteredProducts.length ? filteredProducts : allProducts} />
            </div>
        </div>
    </div>
  )
}

export default Products;