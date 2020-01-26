  
import {
    SUBMIT_SUCCESS,
    SUBMIT_FAIL,
    SUBMITTING,
  } from '../actions/types';
  
  const initialState = {
    submitting: false,
    product: null,
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
          submitting: true,
          product: payload
        };
      case SUBMIT_FAIL:
        return {
          ...state,
          submitting: false,
          product: null,
        };
      default:
        return state;
    }
  }