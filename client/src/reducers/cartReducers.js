import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"


function cartReducer(state = { cartItems: [] }, action) {

    switch (action.type) {

        case CART_ADD_ITEM:
            const newItem = action.payload
            const product = state.cartItems.find(cartItem => cartItem._id === newItem._id)
            if (product) {
                return {
                    cartItems: state.cartItems.map(cartItem => cartItem._id === product._id ? newItem : cartItem)
                }
            } else {
                return { cartItems: [...state.cartItems, newItem] }
            }

        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(item => item._id !== action.payload) }

        default:
            return state
    }
}

export { cartReducer }