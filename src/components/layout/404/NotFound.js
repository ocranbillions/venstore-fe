import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="mt-10">
            <h3>Page Not Found!</h3>
            <Link to="/" className="btn-primary">
                back
            </Link>
		</div>
	);
}

export default NotFound;