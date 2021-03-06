import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './components/form/Form';
import Product from './components/product/Product';
import ProductList from './components/product_list/ProductList';
import Nav from './components/layout/navigation/Nav'
import NotFound from './components/layout/404/NotFound';
import store from './redux/store';
import './app.scss';


const App = () => (
    <Provider store={store}>
        <Router>
            <Nav/>
            <section className="container">
                <Switch>
                    <Route exact path='/' component={Form} />
                    <Route exact path='/products/:id' component={Product} />
                    <Route exact path='/products' component={ProductList} />
                    <Route component={NotFound} />
                </Switch>
            </section>
        </Router>
    </Provider>
);

export default App;
