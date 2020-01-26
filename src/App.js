import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './components/form/Form';
import SingleProduct from './components/single_product/Product';
import ProductList from './components/product_list/ProductList';


const App = () => (
    <Router>
        <section className="container">
            <Switch>
                <Route exact path='/' component={Form} />
                <Route exact path='/products/:id' component={SingleProduct} />
                <Route exact path='/products' component={ProductList} />
            </Switch>
        </section>
    </Router>
);

export default App;
