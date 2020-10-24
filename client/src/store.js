import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import Cookie from 'js-cookie'
import { productListReducer, productDetailsReducer } from './reducers/productReducers.js';
import { cartReducer } from './reducers/cartReducers.js';
import { userSigninReducer, shippingInfoReducer, PaymentMethodReducer } from './reducers/userReducers'

const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo")
const shippingInfo = Cookie.getJSON("shippingInfo")
const paymentMethod = 'Paypal'


const intitialState = { cart: { cartItems }, userSignin: { userInfo }, shippingInfo: { shippingInfo }, paymentMethod: { paymentMethod } };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    shippingInfo: shippingInfoReducer,
    paymentMethod: PaymentMethodReducer,
});


const store = createStore(reducer, intitialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;