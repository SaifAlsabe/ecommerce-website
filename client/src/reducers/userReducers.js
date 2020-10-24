import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_SHIPPING_INFO,
    USER_PAYMENT_INFO,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    ADDRESS_UPDATE_REQUEST,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAIL,
    GET_ADDRESS_REQUEST,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAIL,
} from '../constants/userConstants';

function userSigninReducer(state = {}, action) {

    switch (action.type) {
        //SIGNIN
        case USER_SIGNIN_REQUEST:
            return { loading: true }
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
            //REGISTER    
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
            //UPDATE
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
            //DEFAULT
        default:
            return state;
    }

}

function shippingInfoReducer(state = {}, action) {

    switch (action.type) {
        // UPDATE
        case ADDRESS_UPDATE_REQUEST:
            return { loading: true }
        case ADDRESS_UPDATE_SUCCESS:
            return { loading: false, shippingInfo: action.payload }
        case ADDRESS_UPDATE_FAIL:
            return { loading: false, error: action.payload }
            // GET
        case GET_ADDRESS_REQUEST:
            return { loading: true }
        case GET_ADDRESS_SUCCESS:
            return { loading: false, shippingInfo: action.payload }
        case GET_ADDRESS_FAIL:
            return { loading: false, error: action.payload }
            // TEMPORARY
        case USER_SHIPPING_INFO:
            return { shippingInfo: action.payload };
        default:
            return state;
    }
}

function PaymentMethodReducer(state = {}, action) {

    switch (action.type) {
        case USER_PAYMENT_INFO:
            return { paymentMethod: action.payload };
        default:
            return state;
    }
}

export { userSigninReducer, shippingInfoReducer, PaymentMethodReducer }