import CategoryItem from './CategoryItem';
import { useEffect, useState } from 'react';

const Categories = () => {
	const [categoryItems, setCategoryItems] = useState([]);
	useEffect(() => {
        fetch('categories')
        .then((res) => res.json())
        .then((result) => {
            result.categories.sort((a,b) => a.order - b.order);
            setCategoryItems(result.categories);
        });
	}, []);

	return (
		<div className='container-lg'>
			{categoryItems.map((categoryItem, index) =>
				categoryItem.enabled ? (
					<CategoryItem item={categoryItem} alignment= {index % 2 === 0 ? 'reverse' : ''} key={categoryItem.id} />
				) : null
			)}
		</div>
	);
};

export default Categories;