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
        imagePreview: 'https://via.placeholder.com/150',
        image: null,
        color: ''
    });
    
    const { name, description, price, category, image, imagePreview, color } = productDetails;

    const onChangeHandler = event => {
        setProductDetails({...productDetails, [event.target.name]: event.target.value });
    }

    const selectImageHandler = event => {
        const file = event.target.files[0]

        if(event.target.files && file) {
            let reader = new FileReader();
            reader.onload = (e) => {   
              const filePrev = e.target.result
              setProductDetails({...productDetails, imagePreview: filePrev, image: file });
            };
            reader.readAsDataURL(file);
        }
    }

    const onSubmitHandler = event => {
        event.preventDefault();
        submitProduct(productDetails, history)
    }

    return (
        <div className="inner-container">
            <h2 className="heading">Digital Product</h2>
            <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
                <div className="product-image">
                    <img id="output" src={imagePreview} alt="product"/>
                    <input id="image_input" className="mt-10" type='file' name='image' accept="image/jpeg, image/png" onChange={selectImageHandler}/>
                </div>
                <div className="product-details">
                    <input className="mb-5" type="text" placeholder="Name" name="name" value={name} onChange={onChangeHandler}/>
                    <textarea className="mb-5" name="description" rows="10" cols="20" value={description} onChange={onChangeHandler}>
                        Product description...
                    </textarea>
                    <input className="mb-5" type="number" placeholder="Price" name="price" value={price} onChange={onChangeHandler}/>
                    <select name="category" className="mb-5" value={category} onChange={onChangeHandler}>
                        <option value="">Select Category</option>
                        <option value="men-shirts">Men's Shirt</option>
                        <option value="women-shirt">Women's Shirts</option>
                        <option value="men-shoes">Men's Shoes</option>
                        <option value="women-shoes">Women's Shoes</option>
                        <option value="hand-bags" defaultValue>Hand Bags</option>
                        <option value="necklace">Necklace</option>
                    </select>
                    <select name="color" className="mb-5" value={color} onChange={onChangeHandler}>
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