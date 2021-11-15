import React, { Component } from "react";
import axios from "axios";
import { Box, Typography, TextField, InputAdornment, IconButton, Button, Grid } from "@material-ui/core";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { HandleRequest } from "../services/RequestService";

class ResetPassword extends Component {
    componentDidMount() {
        localStorage.setItem("token", this.props.match.params.token);
    }

    constructor() {
        super();
        this.state = {
            password: "",
            confirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
            passwordError: "",
            confirmPasswordError: "",
        }
    }

    validatePassword(event) {
        const currentPassword = event.target.value;
        if (currentPassword.length > 0 && currentPassword.length < 6) {
            this.setState({ password: "", passwordError: "Password length should be 6" });
        }
        else {
            this.setState({ password: event.target.value, passwordError: "" });
        }
    }

    handleClickShowPassword(id) {
        const Password = this.state.showPassword;
        const ConfirmPassword = this.state.showConfirmPassword;
        switch (id) {
            case 1:
                this.setState({ showPassword: !Password });
                break;
            case 2:
                this.setState({ showConfirmPassword: !ConfirmPassword });
                break;
            default:
                break;
        }
    };

    handleMouseDownPassword(event) {
        event.preventDefault();
    };

    matchPassword(event) {
        const { password } = this.state;
        const confirmPassword = event.target.value;
        if (password === confirmPassword) {
            this.setState({ confirmPassword: event.target.value, confirmPasswordError: "" });
        }
        else if (confirmPassword.length === 0) {
            this.setState({ confirmPassword: "", confirmPasswordError: "" });
        }
        else {
            this.setState({ confirmPassword: "", confirmPasswordError: "Invalid Password. Enter the same password again..!!" })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { password } = this.state;
        const updatedPassword = {
            newPassword: password
        };

        HandleRequest(updatedPassword, "/user/reset-password").then((res) => {
            if (res.status === 200) {
                alert("Password Updated Sucessfully...!!!");
                this.props.history.push(`/`);
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
        width: '140px',
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
                <Box component="form" onSubmit={(e) => { this.handleSubmit(e) }} sx={{
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
                    <Grid container spacing={4} justifyContent="center">
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
                                Enter your new password
                            </Typography>
                        </Grid>
                        <Grid item lg={12}>
                            <TextField
                                id="user-password"
                                label="Password"
                                variant="outlined"
                                size="medium"
                                type="text"
                                helperText={this.state.passwordError}
                                fullWidth
                                type={this.state.showPassword ? "text" : "password"}
                                onChange={(event) => { this.validatePassword(event) }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => this.handleClickShowPassword(1)}
                                                onMouseDown={(event) => this.handleMouseDownPassword(event)}
                                                edge="end">
                                                {this.state.showPassword ? (<VisibilityOff />) : (<Visibility />)}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <TextField
                                id="user-confirm-password"
                                label="Confirm Password"
                                variant="outlined"
                                size="medium"
                                type="text"
                                helperText={this.state.confirmPasswordError}
                                fullWidth
                                type={this.state.showConfirmPassword ? "text" : "password"}
                                onChange={(event) => { this.matchPassword(event) }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => this.handleClickShowPassword(2)}
                                                onMouseDown={(event) => this.handleMouseDownPassword(event)}
                                                edge="end">
                                                {this.state.showConfirmPassword ? (<VisibilityOff />) : (<Visibility />)}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item lg={12} container justifyContent="space-between">
                            <Grid item md={4} sm={12}>
                                <this.WOBackgroundButton onClick={() => { this.props.history.push(`/`) }}>Sign in instead</this.WOBackgroundButton>
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <this.ColorButton type="submit">Done</this.ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    }
}

export default ResetPassword;
