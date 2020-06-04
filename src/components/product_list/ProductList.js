import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProductList, fetchProductsByCategory } from '../../redux/actions/product.action';
import Pagination from '../layout/pagination/Pagination';
import './productList.scss'



const ProductList = ({ products, fetchProductList, fetchProductsByCategory, fetching }) => {

    useEffect(() => {
        fetchProductList()
    }, []);

    const [categoryState, setCategoryState] = useState({
        category: 'all',
    });

    const { category } = categoryState;

    const onChangeHandler = event => {
        setCategoryState({...categoryState, category: event.target.value });
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    // Get current posts
    const indexOfLastProduct = currentPage * productsPerPage;
    const indesOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indesOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    const onSubmit = (event) => {
        event.preventDefault();

        setCurrentPage(1)

        if(category === 'all') {
            fetchProductList()
        } else {
            fetchProductsByCategory(category)
        }
    }

    return products ? (
        <div className="inner-container">
            <h2 className="heading">{fetching ? 'Fetching products...' : 'Product Listing'}</h2>
            <form className="select-cat-form" onSubmit={onSubmit}>
                <select name="category" value={category} onChange={onChangeHandler}>
                    <option value="all">All products</option>
                    <option value="fashion">Fashion</option>
                    <option value="computing">Computing</option>
                    <option value="electronics">Electronics</option>
                    <option value="home-office">Home &amp; Office</option>
                    <option value="health-beauty">Health &amp; Beauty</option>
                    <option value="grocery">Grocery</option>
                </select>
                <input type="submit" value="  Filter  "/>
            </form>
            <div className="list mt-10">
                {
                    currentProducts.map(item => (
                        <Link to={`/products/${item.id}`} className="product-card mb-10" key={item.id}>
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

                {/* Show page numbers */}
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={products.length}
                    paginate={paginate} 
                />
            </div>
        </div>
    ) : (
        <div className="inner-container">
            { !products && fetching ? <h2 className="heading">Loading...</h2> : <h2 className="heading">No products were found</h2>}
        </div>
    )
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchProductList: PropTypes.func.isRequired,
    fetchProductsByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    products: state.productReducer.products,
    fetching: state.productReducer.fetching,
});

export default connect(mapStateToProps, { fetchProductList, fetchProductsByCategory })(ProductList);