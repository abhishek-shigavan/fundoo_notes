import React, { Component } from "react";
import { HandleRequest } from "../services/RequestService";
import { Box, Grid, TextField, InputAdornment, IconButton, Button, Typography } from "@material-ui/core";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            service: "advance",
            emailId: "",
            password: "",
            confirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
            firstNameError: "",
            lastNameError: "",
            emailIdError: "",
            passwordError: "",
            confirmPasswordError: ""
        }
    }

    validateName(event, nameId) {
        const currentName = event.target.value;
        const isValid = (/^[a-z,A-Z]{3,}$/).test(event.target.value);

        switch (nameId) {
            case 1:
                if (isValid || currentName.length < 1) {
                    this.setState({ firstName: event.target.value, firstNameError: "" });
                }
                else {
                    this.setState({ firstName: "", firstNameError: "Only characters..minimum 3" });
                }
                break;
            case 2:
                if (isValid || currentName.length < 1) {
                    this.setState({ lastName: event.target.value, lastNameError: "" });
                }
                else {
                    this.setState({ lastName: "", lastNameError: "Only characters..minimum 3" });
                }
                break;
            default:
                break;
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

    registerUser = (event) => {
        event.preventDefault();
        const { firstName } = this.state;
        const { lastName } = this.state;
        const { service } = this.state;
        const { emailId } = this.state;
        const { password } = this.state;
        const NewUser = {
            firstName: firstName,
            lastName: lastName,
            service: service,
            email: emailId,
            password: password
        };

        console.log(NewUser);
        HandleRequest(NewUser, "/user/userSignUp").then((res) => {
            this.props.history.push("/")
        })
        // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/userSignUp`, NewUser,);
        // console.log(response);
        // console.log(response.status);
        // this.props.history.push(`/`);
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
                <Box component="form" onSubmit={(e) => { this.registerUser(e) }} sx={{
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
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item lg={12}>
                            <Typography variant="h4" align="left" color="error">
                                FUNDO
                            </Typography>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography variant="h4" align="left" color="textPrimary">
                                Create your FunDo Account
                            </Typography>
                        </Grid>
                        <Grid item lg={12} container justifyContent="space-between">
                            <Grid item md={6} sm={12}>
                                <TextField
                                    id="first-name"
                                    label="First Name"
                                    variant="outlined"
                                    size="medium"
                                    type="text"
                                    onChange={(event) => {
                                        this.validateName(event, 1);
                                    }}
                                    helperText={this.state.firstNameError}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <TextField
                                    id="last-name"
                                    label="Last Name"
                                    variant="outlined"
                                    size="medium"
                                    type="text"
                                    onChange={(event) => {
                                        this.validateName(event, 2);
                                    }}
                                    helperText={this.state.lastNameError}
                                    fullWidth
                                />
                            </Grid>
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
                            <Typography variant="h6" align="left">
                                You can use letters, numbers & periods
                            </Typography>
                        </Grid>
                        <Grid item lg={12} container justifyContent="space-between">
                            <Grid item md={5} sm={12}>
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
                            <Grid item md={5} sm={12}>
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
                            <Typography variant="h6" align="left">
                                Use 6 or more characters with a mix of letters, numbers & symbols
                            </Typography>
                        </Grid>
                        <Grid item lg={12} container justifyContent="space-between">
                            <Grid item md={4} sm={12}>
                                <this.WOBackgroundButton onClick={() => { this.props.history.push(`/`) }}>Sign in instead</this.WOBackgroundButton>
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <this.ColorButton type="submit">Sign Up</this.ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            // <div class="main-container">
            //     <div class="signup-container">
            //         <div class="signup-container-title">
            //             <span>Create your Account</span>
            //         </div>
            //         <div class="name-container">
            //             {/* <div class="name-block"> */}
            //                 <TextField
            //                     id="first-name"
            //                     label="First Name"
            //                     variant="outlined"
            //                     size="medium"
            //                     type="text"
            //                     onChange={(event) => {
            //                         this.validateName(event,1);
            //                     }}
            //                     helperText={this.state.firstNameError}
            //                     fullWidth
            //                 />
            //                 <TextField
            //                     id="last-name"
            //                     label="Last Name"
            //                     variant="outlined"
            //                     size="medium"
            //                     type="text"
            //                     onChange={(event) => {
            //                         this.validateName(event,2);
            //                     }}
            //                     helperText={this.state.lastNameError}
            //                     fullWidth
            //                 />
            //             {/* </div> */}
            //         </div>
            //         <div class="name-container">
            //             <TextField
            //                 id="user-email"
            //                 label="Email or phone"
            //                 variant="outlined"
            //                 size="medium"
            //                 type="text"
            //                 onChange={(event) => {
            //                     this.validateEmail(event);
            //                 }}
            //                 helperText={this.state.emailIdError}
            //                 fullWidth
            //             />
            //         </div>
            //         <div class="name-container">
            //             <TextField
            //                 id="user-password"
            //                 label="Password"
            //                 variant="outlined"
            //                 size="medium"
            //                 type="text"
            //                 helperText={this.state.passwordError}
            //                 fullWidth
            //                 type={this.state.showPassword ? "text" : "password"}
            //                 onChange={(event) => { this.validatePassword(event) }}
            //                 InputProps={{
            //                     endAdornment: (
            //                         <InputAdornment position="end">
            //                             <IconButton
            //                                 aria-label="toggle password visibility"
            //                                 onClick={() => this.handleClickShowPassword(1)}
            //                                 onMouseDown={(event) => this.handleMouseDownPassword(event)}
            //                                 edge="end">
            //                                 {this.state.showPassword ? (<VisibilityOff />) : (<Visibility />)}
            //                             </IconButton>
            //                         </InputAdornment>
            //                     ),
            //                 }}
            //             />
            //         </div>
            //         <div class="name-container">
            //             <TextField
            //                 id="user-confirm-password"
            //                 label="Confirm Password"
            //                 variant="outlined"
            //                 size="medium"
            //                 type="text"
            //                 fullWidth
            //                 type={this.state.showConfirmPassword ? "text" : "password"}
            //                 onChange={(event) => { this.matchPassword(event) }}
            //                 InputProps={{
            //                     endAdornment: (
            //                         <InputAdornment position="end">
            //                             <IconButton
            //                                 aria-label="toggle password visibility"
            //                                 onClick={() => this.handleClickShowPassword(2)}
            //                                 onMouseDown={(event) => this.handleMouseDownPassword(event)}
            //                                 edge="end">
            //                                 {this.state.showConfirmPassword ? (<VisibilityOff />) : (<Visibility />)}
            //                             </IconButton>
            //                         </InputAdornment>
            //                     ),
            //                 }}
            //             />
            //         </div>
            //         <div class="signin-signup-options">
            //             <div>
            //                 <Button variant="text" href="./SignIn">
            //                     Sign in instead</Button>
            //             </div>
            //             <div>
            //                 <button onClick={this.registerUser()}>Sign Up</button>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default SignUp;