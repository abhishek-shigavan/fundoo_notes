import React, { Component } from "react";
import SignInEmail from "./SignInEmail/SignInEmail";
import SignInPassword from "./SignInPassword/SignInPassword";
import '../sass/Responsive.scss';
import { HandleRequest } from "../services/RequestService";

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            emailId: "",
            // isEnable: true
        }
    }

    isEnable = true;
    updateState = (newEmail, enable) => {
        this.setState({ emailId : newEmail });
        this.isEnable = enable;
    }

    handleLogin = (obj) => {
        HandleRequest(obj, "/user/login").then((res)=>{
            if(res.status == 200) {
                this.props.history.push("/dashboard")
            }
        })
    }
    render(){
        const mailID = this.state.emailId;
        return(
            <div>
                {this.isEnable && (
                    <SignInEmail setEmailState={this.updateState} />
                )}
                {!this.isEnable && (
                    // {console.log(this.state.emailId)},
                    <SignInPassword email={mailID} sendLoginData={this.handleLogin}/>
                )}
            </div>
        );
    }
}

export default SignIn;