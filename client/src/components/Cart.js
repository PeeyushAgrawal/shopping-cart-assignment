import { useSelector, useDispatch } from 'react-redux';
import useCartDetails from '../services/useCartDetails';
import { cartActions } from '../reducers/CartReducer';
import lowestPrice from '../images/lowest-price.png';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { totalPrice, totalQty } = useCartDetails();
    const cartItems = useSelector((state) => state.cart);

	const dispatch = useDispatch();
	const increaseQty = (id) => {
		dispatch(cartActions.addCartItemCount(id));
	};

	const decreaseQty = (id) => {
		dispatch(cartActions.subtractCartItemCount(id));
	};

    return (
        <div className='cpBlock'>
            <div className='cpHeading'>
                <h5 className='cartHeading'>My Cart({totalQty})</h5>
            </div>
            { totalQty !== 0 ?
                cartItems.map((item, index) => {
                return (
                    <>
                    <div key={item.id || index} className="cartItems">
                        <div className="cartItemsImageWrapper col-3">
                            <img src={item.imageURL} alt={item.name} />
                        </div>
                        <div className="cartItemsDetails col-9">
                            <h6 className="cartItemsHeading"><strong>{item.name}</strong></h6>
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
                    <div className="cartItemsLine">
                        <img src={lowestPrice} alt="Lowest Price" />
                        <span>You won't find it cheaper anywhere</span>
                    </div>
                    <div className="promoCode">
                        <p className="promoCodeDesc">Promo code can be applied on the payment page</p>
                        <button className="promoCodeButton button button-primary">
                        <span>Proceed to Checkout</span>&nbsp;<span className="promoCodeButtonPrice">Rs.{totalPrice}</span>
                        </button>
                    </div>
                    </>
                )
                })
                : 
                <>
                <div className='cartitemBlock noItem'>
                    <div className="cartempty">
                        <h4>No Items in your Cart</h4>
                        <span>Your Favourite items are just a click away</span>
                    </div>
                </div>
                <div className='emptyCartFooter'>
                    <Link to="/" className="navlinks"><button className='startShopping button button-primary'> Start Shopping</button></Link>
                </div>
                </>
            }
        </div>
    );
};

export default Cart;