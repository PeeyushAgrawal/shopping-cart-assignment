
import { useState } from 'react';
import Logo from '../images/logo.png';
import Modal from 'react-bootstrap/Modal';
import lowestPrice from '../images/lowest-price.png';
import cartIcon from '../images/cart.svg';
import { Link } from 'react-router-dom';
import useCartDetails from '../services/useCartDetails';
import { cartActions } from '../reducers/CartReducer';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
	const { totalPrice, totalQty } = useCartDetails();
	const [show, setShow] = useState(false);
	const cartItems = useSelector((state) => state.cart);

	const dispatch = useDispatch();
	const increaseQty = (id) => {
		dispatch(cartActions.addCartItemQty(id));
	};

	const decreaseQty = (id) => {
		dispatch(cartActions.decreaseCartItemQty(id));
	};

	return (
        <div className='Header shadow-sm'>
			<div className='container-lg'>
				<div className='row'>
					<div className='logoBlock col-md-3 col-4 col-sm-3'>
						<img src={Logo} alt="App Logo" />
					</div>
					<div className='navLinkBlock col-md-6 col-sm-6'>
						<nav>
							<ul className='nav'>
								<li className='nav-item'>
									<Link to="/" className="navlinks"><strong>Home</strong></Link>
								</li>
								<li className='nav-item'>
									<Link to="/product" className="navlinks"><strong>Products</strong></Link>
								</li>
							</ul>
						</nav>
					</div>
					<div className='headerRightBlock col-md-3 col-8 col-sm-3'>
						<div className='authBlock'>
							<ul className='auth-links-list'>
								<li className='auth-links'>
									<Link to="/signin" className="navlinks">Signin</Link>
								</li>
								<li className='auth-links'>
									<Link to="/register" className="navlinks">Register</Link>
								</li>
							</ul>
						</div>
						<div className='cartBlock'>
							<button className='cartButton button button-secondary' onClick={() => setShow(true)}>
								<span><img src={cartIcon} alt="cart"/></span>
								<span>{totalQty} Items</span>
							</button>
						</div>
						<Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="">
							<Modal.Header closeButton closeVariant={'white'}>
								<Modal.Title>
									My Cart({totalQty})
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className={`${totalQty === 0 ? "modalContent" : ""}`}>
							{ totalQty !== 0 ?
								cartItems.map((item, index) => {
								return (
									<div key={item.id || index} className="cartItems">
										<div className="cartItemsImageWrapper">
											<img src={item.imageURL} alt={item.name} />
										</div>
										<div className="cartItemsDetails">
											<h3 className="cartItemsHeading">{item.name}</h3>
											<div className="cartItemsPriceQty">
												<button onClick={() => decreaseQty(item.id)}>-</button> 
												<span>{item.qty}</span> 
												<button onClick={() => increaseQty(item.id)}>+</button> 
												<span>x</span> 
												<span>Rs.{item.price}</span>  
												<span>Rs.{item.price * item.qty}</span>
											</div>
										</div>
									</div>
								)
								})
								: 
								<div className="cartempty">
									<h4>No Items in your Cart</h4>
									<span>Your Favourite items are just a click away</span>
								</div>
							}
							{
								totalQty !== 0 ? 
								<div className="cartItemsLine">
									<img src={lowestPrice} alt="Lowest Price" />
									<span>You won't find it cheaper anywhere</span>
								</div>
								: ''
							}
							</Modal.Body>
							<Modal.Footer className={`${totalQty === 0 ? "modalFooter" : ""}`}>
							    {
									totalQty !== 0 ?
										<div className="promoCode">
											<p className="promoCodeDesc">Promo code can be applied on the payment page</p>
											<button className="promoCodeButton">
											<span>Proceed to Checkout</span><span className="promoCodeButtonPrice">Rs.{totalPrice}</span>
											</button>
										</div>
									: 
									<div className='emptyCartFooter'>
										<button className='startShopping button button-primary'> Start Shopping</button>
									</div>
								}

							</Modal.Footer>
						</Modal>
					</div>
				</div>
			</div>
        </div>
	);
};

export default Header;