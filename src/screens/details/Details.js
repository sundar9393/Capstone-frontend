import React, {Component} from 'react';
import './Details.css';
import Header from "../../common/header/Header.js";

class Details extends Component {

    constructor() {
        super();

        this.state= {
            restaurantDetail: {}
        }
    }

componentWillMount() {
    //Get the restaurant details

    let that = this;
    let restaurantData = null;
    let xhrRestaurant = new XMLHttpRequest();
    xhrRestaurant.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {  

            console.log(JSON.parse(this.responseText))          
            that.setState({restaurantDetail: JSON.parse(this.responseText)});                
        
        }
    })

    xhrRestaurant.open("GET", this.props.baseUrl+"restaurant/"+this.props.match.params.id);
    xhrRestaurant.setRequestHeader("Cache-Control", "no-cache");
    xhrRestaurant.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhrRestaurant.send(restaurantData);

}

    render() {
        return (
            <div>
                <Header />
                <div className="restaurantDiv">

                </div>
            </div>
        )
    }

}

export default Details;