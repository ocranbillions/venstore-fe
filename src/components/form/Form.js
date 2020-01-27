import React, { useState } from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert.action';
import { submitProduct } from '../../redux/actions/product.action';
import PropTypes from 'prop-types';
import Alert from '../layout/alert/Alert';
import './form.scss'


const Form = ({ setAlert, submitProduct, submitting, history }) => {
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        color: ''
    });
    
    const { name, description, price, category, image, color } = productDetails;

    const onChange = event => {
        setProductDetails({...productDetails, [event.target.name]: event.target.value });
    }

    const onImageUpload = event => {
        const image_path = event.target.files[0]
        console.log(image_path)
    }

    const onSubmit = event => {
        event.preventDefault();
        submitProduct(productDetails, history)
    }

    return (
        <div className="inner-container">
            <h2>Digital Product</h2>
            <form encType="multipart/form-data" onSubmit={e => onSubmit(e)}>
                <div className="product-image">
                    <img src="https://via.placeholder.com/150" alt="product"/>
                    <input id="image_input" type='file' name='image' value={image} onChange={e => onChange(e)}/>
                </div>
                <div className="product-details">
                    <input className="mb-5" type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}/>
                    <textarea className="mb-5" name="description" rows="10" cols="20" value={description} onChange={e => onChange(e)}>
                        Product description...
                    </textarea>
                    <input className="mb-5" type="number" placeholder="Price" name="price" value={price} onChange={e => onChange(e)}/>
                    <select name="category" className="mb-5" value={category} onChange={e => onChange(e)}>
                        <option value="">Select Category</option>
                        <option value="men-shirts">Men's Shirt</option>
                        <option value="women-shirt">Women's Shirts</option>
                        <option value="men-shoes">Men's Shoes</option>
                        <option value="women-shoes">Women's Shoes</option>
                        <option value="hand-bags" defaultValue>Hand Bags</option>
                        <option value="necklace">Necklace</option>
                    </select>
                    <select name="color" className="mb-5" value={color} onChange={e => onChange(e)}>
                        <option value="">Select Color</option>
                        <option value="red">Red</option>
                        <option value="blue" defaultValue>Blue</option>
                        <option value="green">Green</option>
                        <option value="black">Black</option>
                        <option value="yellow">Yellow</option>
                        <option value="pink">Pink</option>
                    </select>
                    <input type="submit" value={ submitting ? "Sending..." : "Submit" }/>
                    <Alert />
                </div>
            </form>
        </div>
    )
}

Form.propTypes = {
    setAlert: PropTypes.func.isRequired,
    submitProduct: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
};
  
const mapStateToProps = state => ({
    submitting: state.productReducer.submitting,
});

export default connect(mapStateToProps, { setAlert, submitProduct })(Form);