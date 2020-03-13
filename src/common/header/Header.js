import React, {Component} from 'react';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import './Header.css';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{padding: 0, textAlign: "center"}}>
            {props.children}
        </Typography>
    );
}




class Header extends Component {

    constructor() {
        super();
        this.state = {
            moviesList: [{}],
            modalIsOpen: false,
            value: 0,
            contactNum: "",
            contactNumRequired: "dispNone",
            isInvalidNumber: false,
            password: "",
            passwordRequired: "dispNone",
            loggedIn: false,
            openPopupMsg: false
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

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            contactNum: "",
            contactNumRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone"
        })
    }

    tabChangeHandler = (event, value) => {
        this.setState({value})
    }

    inputContactNumChangeHandler = (e) => {
        this.setState({contactNum: e.target.value})
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value})
    }

    closeModalHandler = () => {
        this.setState({modalIsOpen: false})
    }

    loginClickHandler = () => {

        this.state.contactNum === "" ? this.setState({contactNumRequired: "dispBlock"}) :
        this.setState({contactNumRequired: "dispNone"});
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) :
        this.setState({passwordRequired: "dispNone"});

        if(this.state.password !== "" && this.state.password.length !== 10) {
            this.setState({
                isInvalidNumber: true,
                contactNumRequired: "dispBlock"
            })
        }

        if((this.state.contactNum === "") || (this.state.password === "") || (this.state.isInvalidNumber === true)) {
            return;
        }


        //api call

        let that=this;

        let loginData =  null;
        let loginAuthHeader = new Buffer(this.state.contactNum+':'+this.state.password).toString('base64');

        let xhrlogin = new XMLHttpRequest();
        xhrlogin.addEventListener("readystatechange", function() {

            if(this.readyState === 4) {
                
                console.log(JSON.parse(this.responseText));                
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrlogin.getResponseHeader("access-token"));                
                that.setState({openPopupMsg: true})
                that.closeModalHandler();

            }
        })

        xhrlogin.open("POST", "http://localhost:8080/api/customer/login");
        xhrlogin.setRequestHeader("authorization", "Basic "+loginAuthHeader);
        xhrlogin.setRequestHeader("Cache-Control", "no-cache");
        xhrlogin.send(loginData);

        //Login successful message

        


        
    }

    snackBarCloseHandler = () => {
       this.setState({openPopupMsg: false})     
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
                    onClick={this.openModalHandler}
                    >
                        Login
                    </Button>

                </header>

                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login"
                onRequestClose={this.closeModalHandler} style={customStyles}>

                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.value === 0 &&
                    <TabContainer>

                        <FormControl required>

                            <InputLabel htmlFor="contact">Contact No</InputLabel>
                            <Input id="contact" type="text" contactNum={this.state.contactNum} 
                                onChange={this.inputContactNumChangeHandler} />
                            <FormHelperText className={this.state.contactNumRequired}>
                                {this.state.isInvalidNumber === true ? <span className="red">Invalid Contact</span>
                                : <span className="red">required</span> }                                     
                            </FormHelperText>  

                        </FormControl>
                        <br /><br />
                        <FormControl required>

                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" contactNum={this.state.password} 
                                onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>                               
                            </FormHelperText>    

                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>
                                LOGIN
                            </Button>

                        </FormControl>

                    </TabContainer>

                    }
                </Modal>


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    autoHideDuration={5000}
                    className="snackbar"
                    open={this.state.openPopupMsg}
                    onClose={this.snackBarCloseHandler}
                    message={
                        <span id="client-snackbar">
                        <div className="confirm">
                            <div className="message"> 
                                Logged in successfully!!
                            </div>
                        </div>
                        </span>
                    }                    
                />
            </div>
        )
    }
}

export default Header;