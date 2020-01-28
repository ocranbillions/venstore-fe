import React from 'react'
import { Link } from 'react-router-dom';
import './nav.scss'

export default function Nav() {
    return (
        <div className="wrapper">
            <div className="inner-container flex-container">
                <div className="link-container">
                    <Link to="/" className="nav-links">Add product</Link>
                    <Link to="/products" className="nav-links">Product List</Link>
                </div>
            </div>
        </div>
    )
}
