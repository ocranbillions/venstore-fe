import axios from 'axios';
import { setAlert } from './alert.action.js';
import { config } from 'dotenv';
import {
    SUBMIT_SUCCESS,
    SUBMIT_FAIL,
    SUBMITTING,
    FETCHING_PRODUCT,
    PRODUCT_FETCHED,
    PRODUCT_FETCH_FAILED,
} from './types';

config();


// Add Product
export const submitProduct = (productDetails, history) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const body = JSON.stringify(productDetails);

    dispatch({ type: SUBMITTING });
    
    try {
        // console.log(process.env.API_BASE_URL)
        // const res = await axios.post(`${process.env.API_BASE_URL}/products`, body, config);

        const res = await axios.post('http://localhost:5000/products', body, config);
        const { product } = res.data.data;

        dispatch({
            type: SUBMIT_SUCCESS,
            payload: product
        });

        history.push(`/products/${product.id}`);

    } catch (error) {
        const { message } = error.response.data;
        dispatch(setAlert(message, 'danger'));
        dispatch({
            type: SUBMIT_FAIL
        });
    }
};


export const fetchProduct = (id) => async dispatch => {
    dispatch({
        type: FETCHING_PRODUCT,
    })
    try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
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