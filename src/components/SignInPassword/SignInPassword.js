import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataRequest } from "../../services/RequestService";
import axios from "axios";
import { Box, TextField, InputAdornment, IconButton, Button, Grid, Typography, Chip } from "@material-ui/core";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

class SignInPassword extends Component {
constructor() {
        super();
        this.state = {
            emailId: "",
            password: "",
            showPassword: false,
            passwordError: ""
        }
    }

    handleClickShowPassword() {
        const Password = this.state.showPassword;
        this.setState({showPassword: !Password});
    };

    handleMouseDownPassword(event) {
        event.preventDefault();
    };

    validatePassword(event) {
        const currentPassword = event.target.value;
        if( currentPassword.length > 0 && currentPassword.length < 6) {
            this.setState({password : "", passwordError: "Password length should be 6"});
        }
        else{
            this.setState({password : event.target.value, passwordError:"",
                            emailId : this.props.email});
        }       
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { emailId } = this.state;
        // console.log(emailId);
        const { password } = this.state;
        // const User = {
        //     email: emailId,
        //     password: password
        // };

        // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, User,);
        // console.log(response);
        // console.log(response.status);
        // this.props.history.push(`/Dashboard`);    
        // alert('In get User');
        const User = {
            email: emailId,
            password: password
        };

        this.props.sendLoginData(User);

        // DataRequest(User, "/user/login").then((res)=>{
        //     if(res.status == 200) {
        //         this.props.history.push("/dashboard")
        //     }
        // })

    }


    ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        width: '120px',
        height: '36px',
        fontSize: '1.3rem',
        '&:hover': {
            backgroundColor: blue[700],
        },
    }));

    WOBackgroundButton = styled(Button)(({ theme }) => ({
        color: blue[600],
        width: '140px',
        height: '36px',
        fontSize: '1.3rem',
        padding: 0,

        '&:hover': {
            backgroundColor: blue[50],
        },
    }));

    render() {
        return(
            <Box data-testid="sign-in-password"
            sx={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center'
            }}>
                <Box component="form" onSubmit={(e)=>{this.handleSubmit(e)}} sx={{
                fontSize: '62.5%',
                width: '27vw',
                height: '63.3vh',
                paddingTop: '4.8rem',
                paddingBottom: '3.6rem',
                paddingLeft: '4rem',
                paddingRight: '4rem',
                border: '1px solid #dadce0', 
                borderRadius: '0.8rem',
                alignSelf: 'center',
                }}>
                    <Grid container spacing={7} justifyContent="center">
                        <Grid item lg={12}>
                            <Typography variant="h4" align="center" color="error">
                                FUNDO
                            </Typography>
                        </Grid>
                        <Grid item lg={12} style={{paddingRight:'105px', paddingLeft:'105px', paddingTop:0, paddingBottom:0}}>
                            <Typography variant="h4" align="center">
                                Welcome
                            </Typography><br />
                            <Chip
                                clickable 
                                icon={<AccountCircleIcon sx={{fontSize: '2rem'}} />} 
                                label={this.props.email} 
                                variant="outlined" 
                                style={{ width: '214px', height:'35px',
                                fontSize: '1.3rem'}}
                                />
                        </Grid>
                        <Grid item lg={12}>
                            <TextField
                                id="user-password"
                                label="Enter Your Password"
                                variant="outlined"
                                size="medium"
                                type="text"
                                helperText={this.state.passwordError}
                                fullWidth
                                required
                                style={{fontSize:'2rem'}}
                                type={this.state.showPassword ? "text" : "password"}
                                onChange={(event) => { this.validatePassword(event) }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => this.handleClickShowPassword()}
                                                onMouseDown={(event) => this.handleMouseDownPassword(event)}
                                                edge="end">
                                                {this.state.showPassword ? (<VisibilityOff />) : (<Visibility />)}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item lg={12} container justifyContent="space-between">
                            <Grid item md={4} sm={12}>
                                <this.WOBackgroundButton onClick={()=>{<Link to="/forgotpassword" />}}>Forgot Password?</this.WOBackgroundButton>
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <this.ColorButton type="submit">Login</this.ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    }
}

export default SignInPassword;