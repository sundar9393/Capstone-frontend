import React, {Component} from 'react';
import './Details.css';
import Header from "../../common/header/Header.js";
import { Typography, Divider, List } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import ListItem from '@material-ui/core/ListItem';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import AddIcon from '@material-ui/icons/Add';


class Details extends Component {

    constructor() {
        super();

        this.state= {
            restaurantDetail: {
                address: {},
                categories: []
            }
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

    xhrRestaurant.open("GET", this.props.baseUrl+"restaurant/2461973c-a238-11e8-9077-720006ceb890");
    xhrRestaurant.setRequestHeader("Cache-Control", "no-cache");
    xhrRestaurant.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhrRestaurant.send(restaurantData);

}

    render() {
        let restaurant = this.state.restaurantDetail;
        let categoryArray = [];
        return (

            <div>
                <Header />
                <div className="restaurantDiv">

                    <div className="leftDetails">
                    <img src={restaurant.photo_URL} alt={restaurant.restaurant_name} height className="restImg" />
                    </div>

                    <div className="middleDetails">
                        <br /><br /><br />
                        <div>
                            <Typography variant="h3">{restaurant.restaurant_name}</Typography>
                        </div>

                        <div>
                            <Typography variant="h6">{restaurant.address.locality}, {restaurant.address.city}</Typography>
                        </div> <br />
                         
                        <div>
                            {
                                restaurant.categories.forEach((category, index)=>{
                                categoryArray.push(category.category_name)   
                                })                                
                            }                            
                            <Typography>{categoryArray.join(',')}</Typography>                               
                        </div>

                        <div>
                            <Typography>
                               <span> 
                               <FontAwesomeIcon icon={faStar} />: 
                                    { restaurant.customer_rating}
                                </span> 
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="caption"className="drakGray">AVERAGE RATING BY</Typography>   
                            <br/>
                            <Typography variant="caption"className="drakGray">{restaurant.number_customers_rated} CUSTOMERS</Typography>
                        </div>

                    </div>

                    <div className="rightDetails">
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            <div>
                                <Typography>
                                    <FontAwesomeIcon icon={faRupeeSign} /> { restaurant.average_price}
                                </Typography>
                                <Typography variant="caption" className="drakGray">AVERAGE COST FOR</Typography>
                                <br/>
                                <Typography variant="caption"className="drakGray">TWO PEOPLE</Typography>                                  
                                
                            </div>
                    </div>
                </div>

                <div className="itemsNOrderDiv">
                       {restaurant.categories.map(category => ( 
                           
                           <List key={category.id}>
                                <Typography variant="h4">{category.category_name}</Typography>
                                <Divider />
                                {category.item_list.map(item => (
                                    <ListItem key={item.id}>
                                        {item.item_type === "NON_VEG" ? <FontAwesomeIcon className="red" icon={faCircle}/>:
                                        <FontAwesomeIcon className="green" icon={faCircle}/>}

                                        <Typography variant="h6">
                                            <span className="itemName">{item.item_name}</span>
                                        </Typography>

                                        <Typography>
                                            <span className="itemPrice">
                                            <FontAwesomeIcon icon={faRupeeSign} />
                                            {item.price}
                                            </span>
                                            
                                        </Typography>

                                        <Typography>
                                            <span className="addIcon">
                                                <AddIcon />
                                            </span>
                                        </Typography>

                                       
                                         
                                    </ListItem>
                                ))}
                           </List>
                       ))}                    
                </div>
            </div>
        )
    }

}

export default Details;