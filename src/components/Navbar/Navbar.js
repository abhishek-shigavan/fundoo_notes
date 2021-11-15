import React,{ Component } from "react";
import "./Navbar.scss"
import {Typography} from "@material-ui/core"
import MenuIcon from '@mui/icons-material/Menu';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserAvatar from "../UserAvatar/UserAvatar";
import Logout from "../Logout/Logout";

class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            searchInput: "",
            showLogout: false
        }
    }

    fName = localStorage.getItem("FirstName");
    lName = localStorage.getItem("LastName");
    emailId = localStorage.getItem("EmailId");
    fullName = this.fName +" "+ this.lName; 
    
    handleSearch(e) {
        const closeIcon = document.getElementById("close-icon");
        this.setState({searchInput : e.target.value});
        const searchInput = this.state.searchInput;
        const html = `<div>
                        <IconButton>
                            <CloseIcon fontSize="large"/>
                        </IconButton>
                    </div>`

        if(searchInput.length === 1){
            closeIcon.innerHTML = html;
        }
        else if(searchInput.length === 0){
            closeIcon.innerHTML = '';
        }
    }

    handleUserAvatar = () =>{
        const { showLogout } = this.state;
        this.setState({ showLogout: !showLogout });
    }

    render() {
        return(
            <div className="navbar-container">
                <div className="menu-icon">
                    <IconButton aria-label="menu-icon">
                        <MenuIcon sx={{fontSize: '3rem'}} />
                    </IconButton>
                </div>
                <div className="logo-title-icon">    
                    <BookRoundedIcon sx={{fontSize: '4rem'}}/>
                    <Typography variant="h3" color="primary">FUNDO</Typography>
                </div>
                <div className="search-bar">
                    <div className="search-bar-icon">
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon fontSize="large"/>
                        </IconButton>
                    </div>
                    <div>
                        <input type="text" placeholder="Search" aria-label="search-input" onChange={(e)=>this.handleSearch(e)}/>
                    </div>
                    <div id="close-icon" className="search-bar-icon">    
                    </div>
                </div>
                <div className="bar-icon-group1">
                    <div>
                        <IconButton aria-label="refresh-icon">
                            <RefreshIcon sx={{fontSize: '3rem'}}/>
                        </IconButton>
                    </div>
                    <div>
                        <IconButton aria-label="sort-icon">
                            <ViewStreamIcon sx={{fontSize: '3rem'}}/>
                        </IconButton>        
                    </div>
                    <div>
                        <IconButton aria-label="settings-icon">
                            <SettingsIcon sx={{fontSize: '3rem'}}/>
                        </IconButton>
                    </div>
                </div>
                <div className="bar-icon-group2">
                    <div>
                        <IconButton aria-label="app-icon">
                            <AppsIcon sx={{fontSize: '3rem'}}/>
                        </IconButton>
                    </div>
                    <div onClick={()=>this.handleUserAvatar()}>
                        {/* <IconButton aria-label="account-icon">
                            <AccountCircleIcon sx={{fontSize: '3rem'}}/>
                        </IconButton> */}
                        <UserAvatar name={this.fullName}/>
                    </div>
                </div>
                {this.state.showLogout && (
                    <Logout UserName={this.fullName} EmailId={this.emailId}/>
                )}
            </div>
        );
    }
}

export default Navbar