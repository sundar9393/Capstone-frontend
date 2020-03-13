import React, {Component} from 'react';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import './Header.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
 
const styles = theme => ({
    input: {
        '&::placeholder': {
            color: 'white'
          }
    }
})

class Header extends Component {

    constructor() {
        super();
        this.state = {
            moviesList: [{}]
        }
    }

    searchMoviesHandler = (e) => {

        if(e.target.value !== "") {
            
        let that = this;
        let requestData = null;
        let searchMovies = new XMLHttpRequest();
        searchMovies.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({moviesList: JSON.parse(this.responseText).movies});
            }
        })

        searchMovies.open("GET", "http://localhost:8080/api/restaurant/name/"+e.target.value);
        searchMovies.setRequestHeader("Cache-Control", "no-cache");
        searchMovies.setRequestHeader("Access-Control-Allow-Origin", "*");
        searchMovies.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
        searchMovies.send(requestData);

    } 

    }


    render() {
        return(
            <div>
                <header className='header'>
                    <FastfoodIcon className="app-logo" fontSize="large" />
                    
                    <Input className="searchBar" color="primary" 
                    placeholder= "Search by Restautant Name"
                    rows= "50" size="large"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon fontSize="large" htmlColor="white" />
                        </InputAdornment>
                        }                
                    onChange={this.searchMoviesHandler}                 
                    />

                    <Button 
                    variant="contained"
                    color="default"
                    startIcon={<AccountCircleIcon />}
                    size="large"
                    >
                        Login
                    </Button>

                </header>
            </div>
        )
    }
}

export default withStyles(styles)(Header);