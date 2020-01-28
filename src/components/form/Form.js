import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
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
    
    const { name, description, price, category, imagePreview, color } = productDetails;

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

    const onSubmit = data => {
        submitProduct(productDetails, history);
    }

    
    const { register, handleSubmit, errors } = useForm();

    return (
        <div className="inner-container">
            <h2 className="heading">Digital Product</h2>
            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                <div className="product-image">
                    <img id="output" src={imagePreview} alt="product"/>
                    <input  ref={register({ required: true })} id="image_input" className="mt-10" type='file' name='image' accept="image/jpeg, image/png" onChange={selectImageHandler}/>
                    <p className="error-paragraphs"><span>.</span>{errors.image && 'This is required'}</p>
                </div>
                <div className="product-details">
                    <label htmlFor="name">Name: </label>
                    <input ref={register({ required: true, minLength: 2 })} className="" type="text" placeholder="" name="name" value={name} onChange={onChangeHandler}/>
                    <p className="error-paragraphs"><span>.</span>{errors.name && 'This is required'}</p>

                    <label htmlFor="description">Description: </label>
                    <textarea ref={register({ required: true, minLength: 6 })} className="" name="description" rows="10" cols="20" value={description} onChange={onChangeHandler}>
                        Product description...
                    </textarea>
                    <p className="error-paragraphs"><span>.</span>
                        {errors.description && errors.description.type === 'required' && 'This is required'}
                        {errors.description && errors.description.type === 'minLength' && 'Six characters required.'}
                    </p>

                    <label htmlFor="price">Price: </label>
                    <input ref={register({ required: true })} className="" type="number" placeholder="" name="price" value={price} onChange={onChangeHandler}/>
                    <p className="error-paragraphs"><span>.</span>{errors.price && 'This is required'}</p>


                    <label htmlFor="category">Category: </label>
                    <select ref={register({ required: true })} name="category" className="" value={category} onChange={onChangeHandler}>
                        <option value="">select...</option>
                        <option value="men-shirts">Men's Shirt</option>
                        <option value="women-shirt">Women's Shirts</option>
                        <option value="men-shoes">Men's Shoes</option>
                        <option value="women-shoes">Women's Shoes</option>
                        <option value="hand-bags" defaultValue>Hand Bags</option>
                        <option value="necklace">Necklace</option>
                    </select>
                    <p className="error-paragraphs"><span>.</span>{errors.category && 'This is required'}</p>


                    <label htmlFor="color">Color: </label>
                    <select ref={register({ required: true })} name="color" className="" value={color} onChange={onChangeHandler}>
                        <option value="">select...</option>
                        <option value="red">Red</option>
                        <option value="blue" defaultValue>Blue</option>
                        <option value="green">Green</option>
                        <option value="black">Black</option>
                        <option value="yellow">Yellow</option>
                        <option value="pink">Pink</option>
                    </select>
                    <p className="error-paragraphs"><span>.</span>{errors.color && 'This is required'}</p>

                    <input className="btn mt-5" type="submit" value={ submitting ? "Sending..." : "Submit" }/>
                    <Alert/>
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