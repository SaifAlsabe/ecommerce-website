import axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants.js'

const addToCart = (productId, qty) => {

    return (dispatch, getState) => {

        axios.get(`/api/products/${productId}`)
            .then((res) => {
                const data = res.data
                dispatch({
                    type: CART_ADD_ITEM,
                    payload: {
                        ...data,
                        qty
                    }
                })
                const { cart: { cartItems } } = getState();
                Cookie.set("cartItems", JSON.stringify(cartItems));

            })

    }
}

const removeFromCart = (productId) => {

    return (dispatch, getState) => {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: productId
        })

        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
}

export { addToCart, removeFromCart }