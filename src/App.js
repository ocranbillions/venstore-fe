import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/landing/Landing';
import ProductListing from './components/products/Products';

const App = () => (
    <Router>
        <Fragment>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/products' component={ProductListing} />
            </Switch>
        </Fragment>
    </Router>
);

export default App;
