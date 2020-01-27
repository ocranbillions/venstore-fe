import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProductList } from '../../redux/actions/product.action';
import './productList.scss'



const ProductList = ({ products, fetchProductList, fetching }) => {
    
    useEffect(() => {
        fetchProductList()
    }, [fetchProductList]);

    return products ? (
        <div className="inner-container">
            <h1>Product Listing Page</h1>
            <div className="list mt-10">
                {
                    products.map(item => (
                        <Link to={`/products/${item.id}`} className="product-card mb-10">
                            <div className="pc__flex-container">
                                <div className="basic-info">
                                    <p>ID: {item.id}</p>
                                    <p>Name: {item.name}</p>
                                    <p>Price: ${item.price}</p>
                                </div>
                                <div className="image">
                                    <img src={item.image} alt={item.name}/>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    ) : (
        <div className="inner-container">
            { !products && fetching ? <h1>Loading...</h1> : <h1>No products were found</h1>}
        </div>
    )
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchProductList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    products: state.productReducer.products,
    fetching: state.productReducer.fetching,
});

export default connect(mapStateToProps, { fetchProductList })(ProductList);