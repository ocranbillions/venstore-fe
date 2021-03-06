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
            <form className="product-form" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="heading">Add Product</h2>
                <div className="center-div mt-10">
                    <div className="product-image mt-10">
                        <img id="output" src={imagePreview} alt="product"/>
                        <input  ref={register({ required: true })}
                            id="image_input" className="mt-5"
                            type='file'
                            name='image'
                            accept="image/jpeg, image/png"
                            onChange={selectImageHandler}
                            style={{display: "none"}}
                        />
                        <p className="custom-upload-btn"><label htmlFor="image_input" style={{cursor: "pointer"}}>upload</label>
                            <p className="error-paragraphs"><span>.</span>{errors.image && 'This is required'}</p>
                        </p>
                    </div>
                    <div className="product-details">
                        <label htmlFor="name">Name: </label>
                        <input ref={register({ required: true, minLength: 2 })} className="pl-5" type="text" name="name" value={name} onChange={onChangeHandler}/>
                        <p className="error-paragraphs"><span>.</span>{errors.name && 'This is required'}</p>

                        <label htmlFor="description">Description: </label>
                        <textarea ref={register({ required: true, maxLength: 255 })} className="pl-5 pt-5" name="description" rows="5" cols="" value={description} onChange={onChangeHandler}>
                            Product description...
                        </textarea>
                        <p className="error-paragraphs"><span>.</span>
                            {errors.description && errors.description.type === 'required' && 'This is required'}
                            {errors.description && errors.description.type === 'maxLength' && 'You can only type 255 characters at most'}
                        </p>

                        <label htmlFor="price">Price: </label>
                        <input ref={register({ required: true, min: 0.1 })} className="pl-5" type="number" name="price" value={price} onChange={onChangeHandler}/>
                        <p className="error-paragraphs"><span>.</span>
                            {errors.price && errors.price.type === 'required' && 'This is required'}
                            {errors.price && errors.price.type === 'min' && 'Price should be greater than 0'}
                        </p>


                        <label htmlFor="category">Category: </label>
                        <select ref={register({ required: true })} name="category" value={category} onChange={onChangeHandler}>
                            <option value="">select...</option>
                            <option value="fashion">Fashion</option>
                            <option value="computing">Computing</option>
                            <option value="electronics">Electronics</option>
                            <option value="home-office">Home &amp; Office</option>
                            <option value="health-beauty">Health &amp; Beauty</option>
                            <option value="grocery">Grocery</option>
                        </select>
                        <p className="error-paragraphs"><span>.</span>{errors.category && 'This is required'}</p>


                        <label htmlFor="color">Color: </label>
                        <select ref={register({ required: true })} name="color" value={color} onChange={onChangeHandler}>
                            <option value="">select...</option>
                            <option value="red" className="red">Red</option>
                            <option value="blue" className="blue">Blue</option>
                            <option value="green" className="green">Green</option>
                            <option value="black" className="black">Black</option>
                            <option value="yellow" className="yellow">Yellow</option>
                            <option value="pink" className="pink">Pink</option>
                            <option value="brown" className="brown">Brown</option>
                        </select>
                        <p className="error-paragraphs"><span>.</span>{errors.color && 'This is required'}</p>

                        <input className="btn mt-5" type="submit" value={ submitting ? "Sending..." : "Submit" }/>
                        <Alert/>
                    </div>
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