import React, {Component} from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, Grid } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { HandleRequest } from "../services/RequestService";

class Reset extends Component {
    constructor() {
        super();
        this.state = {
            emailId: "",
            emailIdError: "",    
        }
    }
    
    validateEmail(event) {
        const currentEmail = event.target.value;
        const isValid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(event.target.value);
        if(isValid){
            this.setState({emailId : event.target.value, emailIdError : ""});
        }
        else if(currentEmail.length === 0){
            this.setState({emailId : "", emailIdError : ""})
        }
        else{
            this.setState({emailId : "", emailIdError : "Invalid Email"})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { emailId } = this.state;
        const UserEmail = {
            email: emailId
        };

        HandleRequest(UserEmail, "/user/reset").then((res) => {
            if (res.status === 200) {
                alert("Reset Password Link Send Sucessfully");
            }
        })    
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
        width: '120px',
        height: '36px',
        fontSize: '1.3rem',
        padding: 0,
        '&:hover': {
            backgroundColor: blue[50],
        },
    }));

    render() {
        return (
            <Box sx={{
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
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item lg={12}>
                            <Typography variant="h4" align="center" color="error">
                                FUNDO
                            </Typography>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography variant="h4" align="center">
                                Reset Your Password
                            </Typography><br />
                            <Typography variant="h5" align="center">
                                Enter your registered email
                            </Typography>
                        </Grid>
                        <Grid item lg={12} >
                            <TextField
                                margin="normal"
                                id="user-email"
                                label="Email or phone"
                                variant="outlined"
                                type="text"
                                onChange={(event) => { this.validateEmail(event) }}
                                helperText={this.state.emailIdError}
                                fullWidth
                                required
                            />
                        </Grid>    
                        <Grid item lg={12} container justifyContent="space-between">
                            <Grid item md={4} sm={12}>
                                <this.WOBackgroundButton onClick={()=>{this.props.history.push(`/`)}}>Sign in instead</this.WOBackgroundButton>
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <this.ColorButton type="submit">Get Link</this.ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>    
        );
    }
}

export default Reset;