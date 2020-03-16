import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from "./screens/home/Home";
import Profile from "./screens/profile/Profile";
import Details from './screens/details/Details';

class FoodOrderingApp extends Component {

    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api/"
    }


    render() {
        return(
            <Router>
                <div className="main-container">
                    <Route exact path="/" render={({history},props) => <Home history={history} {...props} baseUrl={this.baseUrl}/>}/>
                    <Route path="/profile" render={({history},props) => <Profile history={history} {...props} baseUrl={this.baseUrl} />} />
                    <Route path="/details/:id" render={({history},props) => <Details {...props} baseUrl={this.baseUrl} />} />
                </div>
            </Router>
        )
    }
}

export default FoodOrderingApp;