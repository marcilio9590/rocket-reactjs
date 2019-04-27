import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from './pages/main/main.page';
import Product from './pages/product/product.page';

function Routes() {
    return (
        <Router>
            <Route path="/" exact component={Main} />
            <Route path="/products/:id" component={Product} />
        </Router>
    );
}

export default Routes;