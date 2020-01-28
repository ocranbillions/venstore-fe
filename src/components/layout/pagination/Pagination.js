import React from 'react'
import { Link } from 'react-router-dom';
import './pagination.scss'

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (event, number) => {
        event.preventDefault();
        paginate(number)
    }

    return (
        <nav>
            {   (totalProducts > 0) &&
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <Link onClick={e => handlePageClick(e, number)} to='' className='page-link'>
                                {number}
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </nav>
    )
}

export default Pagination;