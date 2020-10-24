import axios from 'axios';
import Cookie from 'js-cookie';
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

const signin = (email, password) => {

    return (dispatch) => {

        dispatch({ type: USER_SIGNIN_REQUEST })
        axios.post("/api/users/signin", { email, password })
            .then(res => {
                const data = res.data;
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
                Cookie.set('userInfo', JSON.stringify(data));
            }).catch((error) => {
                dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
            })
    }
}

const register = (name, email, password) => {

    return (dispatch) => {

        dispatch({ type: USER_REGISTER_REQUEST })
        axios.post("/api/users/register", { name, email, password })
            .then(res => {
                const data = res.data;
                dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
                Cookie.set('userInfo', JSON.stringify(data));
            }).catch((error) => {
                dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
            })
    }
}

const updateUser = (oldName, oldEmail, newName, newEmail, newPassword) => {

    return (dispatch) => {

        dispatch({ type: USER_UPDATE_REQUEST })
        axios.patch("/api/users/updateInfo", { oldName, oldEmail, newName, newEmail, newPassword })
            .then(res => {
                const data = res.data;
                dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
                Cookie.set('userInfo', JSON.stringify(data));
            }).catch((error) => {
                dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
            })
    }
}

const userAddress = (name, email, street, city, state, zipcode, country) => {

    return (dispatch) => {

        dispatch({ type: ADDRESS_UPDATE_REQUEST })
        axios.patch("/api/users/updateAddress", { name, email, street, city, state, zipcode, country })
            .then(res => {
                const data = res.data;
                dispatch({ type: ADDRESS_UPDATE_SUCCESS, payload: data });
                Cookie.set('shippingInfo', JSON.stringify(data));
            }).catch((error) => {
                dispatch({ type: ADDRESS_UPDATE_FAIL, payload: error.message });
            })
    }
}

const getAddress = (name, email) => {

    return (dispatch) => {

        dispatch({ type: GET_ADDRESS_REQUEST })
        axios.post("/api/users/address", { name, email })
            .then(res => {
                const data = res.data;
                dispatch({ type: GET_ADDRESS_SUCCESS, payload: data });
                Cookie.set('shippingInfo', JSON.stringify(data));
            }).catch((error) => {
                dispatch({ type: GET_ADDRESS_FAIL, payload: error.message });
            })
    }
}

const shipping = (street, city, state, zipcode, country) => {

    return (dispatch) => {

        dispatch({
            type: USER_SHIPPING_INFO,
            payload: { 'address': { street, city, state, zipcode, country } }
        })
        Cookie.set('shippingInfo', JSON.stringify({ 'address': { street, city, state, zipcode, country } }))

    }
}



const paymentMethod = (payment) => {

    return {
        type: USER_PAYMENT_INFO,
        payload: payment
    }
}

export { signin, register, shipping, paymentMethod, updateUser, userAddress, getAddress }