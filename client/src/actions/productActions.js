import axios from "axios";
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL
} from "../constants/productConstants";

const listProducts = (category = '') => {

    return (dispatch) => {

        dispatch({ type: PRODUCT_LIST_REQUEST });

        axios.get("/api/products", { headers: { category } })
            .then(res => {
                const data = res.data
                dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
            })
            .catch((error) => {
                dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
            })
    }
}

const detailsProduct = (productId) => {

    return (dispatch) => {

        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        axios.get(`/api/products/${productId}`)
            .then(res => {
                const data = res.data
                dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
            })
            .catch((error) => {
                dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
            })
    }
}

const deleteProduct = (productId) => {

    return (dispatch, getState) => {

        const { userSignin } = getState();

        dispatch({ type: PRODUCT_DELETE_REQUEST });

        axios.delete(`/api/products/${productId}`, { headers: { Authorization: 'Bearer ' + userSignin.userInfo.token } })
            .then(res => {
                const data = res.data
                dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data })
            })
            .catch((error) => {
                dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
            })
    }
}

export { listProducts, detailsProduct, deleteProduct };