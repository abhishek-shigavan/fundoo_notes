import React, { Component } from 'react';
import { Box, TextField, Button, Grid, Typography, Link } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import '../../sass/Responsive.scss';

class SignInEmail extends Component {
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
        if (isValid) {
            this.setState({ emailId: event.target.value, emailIdError: "" });
        }
        else if (currentEmail.length === 0) {
            this.setState({ emailId: "", emailIdError: "" })
        }
        else {
            this.setState({ emailId: "", emailIdError: "Invalid Email" })
        }
    }

    sendEmailId = (event) => {
        this.props.setEmailState(this.state.emailId, false);
        event.preventDefault();
    }

    ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        width: '8.78vw',
        height: '5.48vh',
        fontSize: '1.3rem',
        '&:hover': {
            backgroundColor: blue[700],
        },
    }));

    WOBackgroundButton = styled(Button)(({ theme }) => ({
        color: blue[600],
        width: '8.78vw',
        height: '5.48vh',
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
                <Box id="box-form" component="form" onSubmit={(e) => this.sendEmailId(e)} sx={{
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
                    <Grid container spacing={3}>
                        <Grid item lg={12} sm={12} xs={12}>
                            <Typography variant="h4" align="center" color="error">
                                FUNDO
                            </Typography>
                        </Grid>
                        <Grid item lg={12} sm={12}>
                            <Typography variant="h4" align="center">
                                Sign in
                            </Typography><br />
                            <Typography variant="h5" align="center" data-testid="sub-title">
                                Use your FunDo Account
                            </Typography>
                        </Grid>
                        <Grid item lg={12} sm={12}>
                            <TextField
                                margin="normal"
                                data-testid="username"
                                id="user-email"
                                label="Email or phone"
                                variant="outlined"
                                type="text"
                                onChange={(event) => { this.validateEmail(event) }}
                                helperText={this.state.emailIdError}
                                fullWidth
                                required
                            />
                            <Link variant="h6" href="./resetpassword" underline="none">Reset Password</Link>
                        </Grid>
                        <Grid item lg={12} sm={12} container justifyContent="space-between">
                            <Grid item md={4} sm={5} xs={12}>
                                <this.WOBackgroundButton id="text-button" href="./SignUp">Create Account</this.WOBackgroundButton>
                            </Grid>
                            <Grid item md={4} sm={5} xs={12}>
                                <this.ColorButton id="color-button" type="submit" variant="text" size="large">Next</this.ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    }
}

export default SignInEmail;