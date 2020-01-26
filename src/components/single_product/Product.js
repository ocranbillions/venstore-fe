import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProduct } from '../../redux/actions/product.action';
import './product.scss'


const Product = ({ product, fetchProduct, fetching, match }) => {

    useEffect(() => {
        fetchProduct(match.params.id)
    }, [fetchProduct, match]);

    return product ? 
    (
        <div className="inner-container">
            <h1>Product Page</h1>
            <div className="product-container mt-10">
                <div className="image-container">
                    <img src="https://via.placeholder.com/250/FF0000/FFFFFF?Text=Down.com" alt="product"/>
                </div>
                <div className="product-info">
                    <h4>Product Name: {product.name}</h4>
                    <p>ID: NO{product.id}</p>
                    <p>Description: {product.description}</p>
                    <p>Category: {product.category}</p>
                    <p>Color: {product.color}</p>
                    <p>Price: ${product.price}</p>
                </div>
            </div>
        </div>
    ) : (
        <div className="inner-container">
            { !product && fetching ? <h1>Spinner</h1> : <h1>The product with the given ID was not found</h1>}
        </div>
    )
}


Product.propTypes = {
    product: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    product: state.productReducer.product,
    fetching: state.productReducer.fetching,
});

export default connect(mapStateToProps, { fetchProduct })(Product);