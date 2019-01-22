import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '../pages/App';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/stores" component={App} />
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;