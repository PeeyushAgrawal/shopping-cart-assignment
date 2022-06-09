import { useSelector } from 'react-redux';

const useCartDetails = () => {
	const cartItems = useSelector((state) => state.cart);

	let totalPrice = cartItems?.reduce((total, i) => {
		return total + i.qty * i.price;
	}, 0);

	let totalQty = cartItems?.reduce((total, i) => {
		return total + i.qty;
	}, 0);

	return { totalQty, totalPrice };
};

export default useCartDetails;