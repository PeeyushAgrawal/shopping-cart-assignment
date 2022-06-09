import React from 'react';
import { useState, useEffect } from "react";

const CategoryList = (props) => {
  const [categoriesData, setCategoryItems] = useState([]);
	useEffect(() => {
        fetch('../categories')
        .then((res) => res.json())
        .then((result) => {
            result.categories.sort((a,b) => a.order - b.order);
            setCategoryItems(result.categories);
        });
	}, []);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filterBy = (e) => {
    setSelectedCategory(e.target.innerText);
    props.filterBy(e.target.dataset.id);
    setDropdownOpen(!dropdownOpen);
  }

  const toggleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  }
  
  return (
    <div className='categoryBlock'>
      <div className={`categoryBlockSelector ${dropdownOpen ? 'open' : 'close'}`} onClick= {toggleDropdownOpen}>{selectedCategory}</div>
      <ul className={`categoryList ${dropdownOpen ? 'open' : 'close'}`}>
        {categoriesData.map((category) => 
            category.enabled ? (
                <li className='categoryDetail' key= {category.id} data-id={category.id}>
                  <span onClick={filterBy} data-id={category.id}><strong>{category.name}</strong></span>
                </li>
            ) : null
        )}
      </ul>
    </div>
  )
}

export default CategoryList