import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './components/form/Form';
import SingleProduct from './components/single_product/Product';
import ProductList from './components/product_list/ProductList';
import store from './redux/store';


const App = () => (
    <Provider store={store}>
        <Router>
            <section className="container">
                <Switch>
                    <Route exact path='/' component={Form} />
                    <Route exact path='/products/:id' component={SingleProduct} />
                    <Route exact path='/products' component={ProductList} />
                </Switch>
            </section>
        </Router>
    </Provider>
);

export default App;
