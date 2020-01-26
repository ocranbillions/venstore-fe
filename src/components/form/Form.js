import React from 'react';
import './form.scss'


export default function Form() {
    return (
        <div className="inner-container">
            <h2>Digital Product</h2>
            <form enctype="multipart/form-data">
                <div className="product-image">
                    <img src="https://via.placeholder.com/150" alt="product"/>
                    <input type='file' name='image' />
                </div>
                <div className="product-details">
                    <input className="mb-5" type="text" placeholder="Name" name="name"/>
                    <textarea className="mb-5" name="description" rows="10" cols="20">
                        Product description...
                    </textarea>
                    <input className="mb-5" type="number" placeholder="Price" name="price"/>
                    <select name="category" className="mb-5">
                        <option value="men-shirts">Men's Shirt</option>
                        <option value="women-shirt">Women's Shirts</option>
                        <option value="men-shoes">Men's Shoes</option>
                        <option value="women-shoes">Women's Shoes</option>
                        <option value="hand-bags">Hand Bags</option>
                        <option value="necklace">Necklace</option>
                    </select>
                    <select name="color" className="mb-5">
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="black">Black</option>
                        <option value="yellow">Yellow</option>
                        <option value="pink">Pink</option>
                    </select>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    )
}
