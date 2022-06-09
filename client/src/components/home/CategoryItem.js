import { useNavigate } from 'react-router-dom';

const CategoryItem = (props) => {
	let navigate = useNavigate();
    const { alignment, item } = props;
	const handleProduct = () => {
		navigate(`product/${item.id}`, { replace: true });
	};

	return (
		<div  key={item.id} className={`banner ${alignment === 'reverse' ? 'reverse' : ''} categoryBlock`}>
			<div className='catImageBlock'>
				<img src={item.imageUrl} alt={item.key} width="80%" />
			</div>
			<div className='catDataBlock'>
				<div className='catdetails'>
					<h4 className='catHeading'>{item.name}</h4>
					<p className='catDescription'>{item.description}</p>
					<button className='catButton' onClick={handleProduct}>
						{'Explore ' + item.key}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CategoryItem;