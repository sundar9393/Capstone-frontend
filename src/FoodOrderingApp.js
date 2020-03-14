import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from "./screens/home/Home.js";

class FoodOrderingApp extends Component {
    render() {
        return(
            <Router>
                <div className="main-container">
                    <Route exact path="/" render={(props) => <Home {...props} baseUrl={this.baseUrl}/>}/>
                </div>
            </Router>
        )
    }
}

export default FoodOrderingApp;