import axios from 'axios';
import { setAlert } from './alert.action.js';
import {
    SUBMIT_SUCCESS,
    SUBMIT_FAIL,
    SUBMITTING,
    FETCHING_PRODUCT,
    PRODUCT_FETCHED,
    PRODUCT_FETCH_FAILED,
    FETCHING_LIST,
    LIST_FETCHED,
    LIST_FETCH_FAILED,
} from './types';

const BASE_URL = 'https://venstore-api.herokuapp.com';

// Add Product
export const submitProduct = (productDetails, history) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const body = JSON.stringify(productDetails);

    dispatch({ type: SUBMITTING });
    
    try {
        const res = await axios.post(`${BASE_URL}/products`, body, config);
        const { product } = res.data.data;

        dispatch({
            type: SUBMIT_SUCCESS,
            payload: product
        });

        console.log(product);

        history.push(`/products/${product.id}`);

    } catch (error) {
        const { message } = error.response.data;
        dispatch(setAlert(message, 'danger'));
        dispatch({
            type: SUBMIT_FAIL
        });
    }
};

// Fetch Single Product
export const fetchProduct = (id) => async dispatch => {
    dispatch({
        type: FETCHING_PRODUCT,
    })
    try {
        const res = await axios.get(`${BASE_URL}/products/${id}`);
        const { product } = res.data.data;

        dispatch({
            type: PRODUCT_FETCHED,
            payload: product
        });

    } catch (error) {
        dispatch({
          type: PRODUCT_FETCH_FAILED
        });
    }
}

// Fetch All Products
export const fetchProductList = () => async dispatch => {
    dispatch({
        type: FETCHING_LIST,
    })
    try {
        const res = await axios.get(`${BASE_URL}/products`);
        const { products } = res.data.data;
        
        dispatch({
            type: LIST_FETCHED,
            payload: products
        });

    } catch (error) {
        dispatch({
          type: LIST_FETCH_FAILED
        });
    }
}