import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProduct } from '../../redux/actions/product.action';
import './product.scss'


const Product = ({ product, fetchProduct, fetching, match }) => {

    useEffect(() => {
        fetchProduct(match.params.id)
    }, []);

    return product ? 
    (
        <div className="inner-container">
            <h2 className="heading">{fetching ? 'Fetching product...' : product.name}</h2>
            <div className="product-container mt-10">
                <div className="image-container">
                    <img src={product.image ? product.image : 'https://via.placeholder.com/150'} alt="product"/>
                </div>
                <div className="product-info">
                    <div className="field mb-10">
                        <p>SKU: NO{product.id}</p>
                    </div>

                    <div className="field mb-5">
                        <h4>Description</h4>
                        <p>{product.description}</p>
                    </div>

                    <div className="field mb-5 mt-10">
                        <h4>Category</h4>
                        <p>{product.category}</p>
                    </div>

                    <div className="field mb-5 mt-10">
                        <p><strong>Color:</strong> <span className={`bg_${product.color} color-box`}></span></p>
                    </div>
    
                    <div className="field">
                        <p><strong>Price:</strong> ${product.price}</p>
                    </div>
                    
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
    product: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    product: state.productReducer.product,
    fetching: state.productReducer.fetching,
});

export default connect(mapStateToProps, { fetchProduct })(Product);