import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen(props) {

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.userSignin)

    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const checkoutHandler = () => {
        const redirect = userInfo ? "/shipping" : "/signin";
        props.history.push(redirect)
    }


    return (
        <div className="cart">

            <div className="cart-list">
                <ul className="cart-list-container">

                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Unit Price</div>
                    </li>

                    {
                        cartItems.length === 0 ?
                            <div>
                                Cart is Empty
                            </div>
                            :
                            cartItems.map(item => (
                                <li>
                                    <div className="cart-image">
                                        <img src={item.image} alt="product" />
                                    </div>

                                    <div className="cart-name">
                                        <div>
                                            <Link to={`/products/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <br></br>
                                        <div>
                                            <>Qty: </>
                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item._id, e.target.value))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(x =>
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    )
                                                }
                                            </select>
                                            <button type="button" className="remove-button" onClick={() => removeFromCartHandler(item._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cart-price">${item.price}</div>
                                </li>
                            ))
                    }

                </ul>

            </div>

            <div className="cart-action">
                <h3>
                    subtotal ( {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)} items)
                    $  {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>

                <button onClick={checkoutHandler} className="button" disabled={cartItems.length === 0}>
                    <b>Proceed to Checkout</b>
                </button>



            </div>

        </div>
    )

}

export default CartScreen;