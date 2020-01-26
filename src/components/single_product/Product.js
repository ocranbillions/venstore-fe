import React from 'react';
import './product.scss'


export default function Product() {
    return (
        <div className="inner-container">
            <h1>Single Product Page</h1>
            <div className="product-container mt-10">
                <div className="image-container">
                    <img src="https://via.placeholder.com/250/FF0000/FFFFFF?Text=Down.com" alt="product"/>
                </div>
                <div className="product-info">
                    <h4>Product Name</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ultrices ipsum, vitae euismod nisl.</p>
                    <p>Category</p>
                    <p>Color</p>
                    <p>Price: $55.90</p>
                </div>
            </div>
        </div>
    )
}