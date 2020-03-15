import React, { Component } from 'react';
import "./Home.css"
import Header from "../../common/header/Header.js";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons'

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants : []
        }
    }

    componentWillMount() {
        let that = this;
        let data = null;
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                that.setState({restaurants : JSON.parse(this.responseText)});
            }
        })

        xhr.open("GET", "http://localhost:8080/api/restaurant");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.send(data);
    }

    renderRestaurantCard() {
        // Function that renders one single card
    }

    displayRestaurantCardsHandler() {
        // Function that takes the data from "restaurants" array in State and renders the cards
        // for all the restaurants
    }

    render() {
        return (
            <div>
                <Header />
                <div className="cardContainer" onLoad = {this.displayRestaurantCardsHandler}>
                    <Card className="restaurantCard">
                        <CardActionArea>
                            <CardMedia
                                className="restaurantImage"
                                image="Image Asset 1.jpg" />
                            <div className="restaurantName">
                                Restaurant Title
                            </div>
                            <div className="restaurantCategories">
                                Chinese, Lebanese
                            </div>
                            <div className="restaurantDetails">
                                <div className="restaurantRating">
                                    <FontAwesomeIcon icon={faStar} />
                                    <span> Rating</span>
                                </div>
                                <div className="restaurantPrice">
                                    <FontAwesomeIcon icon={faRupeeSign} />
                                    <span> for two</span>
                                    </div>
                            </div>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Home;