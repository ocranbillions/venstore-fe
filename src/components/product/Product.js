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
            <h2 className="heading">Product Page</h2>
            <div className="product-container mt-10">
                <div className="image-container">
                    <img src={product.image} alt="product"/>
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
            { !product && fetching ? <h2 className="heading">Loading...</h2> : <h2>The product with the given ID was not found</h2>}
        </div>
    )
}


Product.propTypes = {
    product: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
    fetchProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    product: state.productReducer.product,
    fetching: state.productReducer.fetching,
});

export default connect(mapStateToProps, { fetchProduct })(Product);