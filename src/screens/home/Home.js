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
    render() {
        return (
            <div>
                <Header />
                <div className="cardContainer">
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