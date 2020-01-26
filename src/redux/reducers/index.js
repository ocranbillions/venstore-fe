import { combineReducers } from 'redux';
import alertReducer from './alert.reducer';
import productReducer from './product.reducer';

export default combineReducers({
    alertReducer,
    productReducer,
});