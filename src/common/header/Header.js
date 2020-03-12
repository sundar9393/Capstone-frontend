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


    render() {
        const { classes } = this.props;
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
                    InputProps={{
                        classes: {input : classes.input}
                    }}                  
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