import axios from 'axios';
import { setAlert } from './alert.action.js';
import { config } from 'dotenv';
import {
    SUBMIT_SUCCESS,
    SUBMIT_FAIL,
    SUBMITTING,
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

    } catch (err) {
        const { message } = err.response.data;
        dispatch(setAlert(message, 'danger'));

        dispatch({
            type: SUBMIT_FAIL
        });
    }
};