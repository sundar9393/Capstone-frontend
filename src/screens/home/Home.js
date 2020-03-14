import React, {Component} from 'react';
import Header from "../../common/header/Header.js";

class Home extends Component {
    render() {
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} />
                Food Ordering App Home Page
            </div>
        )
    }
}

export default Home;