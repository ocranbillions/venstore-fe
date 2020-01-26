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
} from '../actions/types';
  
const initialState = {
    submitting: false,
    fetching: false,
    product: null,
    products: null,
};
  
export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SUBMITTING:
            return {
                ...state,
                submitting: true,
            }
        case SUBMIT_SUCCESS:
            return {
                ...state,
                submitting: false,
                product: payload
            };
        case SUBMIT_FAIL:
            return {
                ...state,
                submitting: false,
                product: null,
            };
        case FETCHING_PRODUCT:
            return {
                ...state,
                fetching: true,
            }
        case PRODUCT_FETCHED:
            return {
                ...state,
                fetching: false,
                product: payload
            };
        case PRODUCT_FETCH_FAILED:
            return {
                ...state,
                fetching: false,
                product: null,
            };
        case FETCHING_LIST:
            return {
                ...state,
                fetching: true,
            }
        case LIST_FETCHED:
            return {
                ...state,
                fetching: false,
                products: payload
            };
        case LIST_FETCH_FAILED:
            return {
                ...state,
                fetching: false,
                products: null,
            };
        default:
            return state;
    }
}