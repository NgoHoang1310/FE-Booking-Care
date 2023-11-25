import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLoginAPI } from "../../services/userService"
import '../Auth/login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errorMessage: "",
        }
    }

    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        },)
    }

    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleLogin = async () => {
        this.setState({
            errorMessage: "",
        })
        try {
            let dataMess = await handleLoginAPI(this.state.username, this.state.password);
            console.log(dataMess.data);

            if (dataMess.data) {
                if (dataMess.data.errCode != 0) {
                    this.setState({
                        errorMessage: dataMess.data.message,
                    })
                } else {
                    this.props.userLoginAccess(dataMess.data.userData.user)
                    console.log('Login succeed');
                }
            }

        } catch (error) {
            console.log(error.response);
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message,
                    })
                }
            }
        }
    }

    handleHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }

    handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <h1 className='login-heading text-center mt-5 mb-5' >LOGIN</h1>
                    <div className='login-content ms-3 me-3 fs-4'>
                        <div className="mb-3 ">
                            <label for="formGroupExampleInput" className="form-label">Email</label>
                            <input type="email"
                                className="form-control"
                                id="formGroupExampleInput"
                                placeholder="example@gmail.com"
                                value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)}
                                name='email'


                            />
                        </div>
                        <div className="mb-3">
                            <label for="formGroupExampleInput2" className="form-label">Password</label>
                            <input
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                className="form-control"
                                id="formGroupExampleInput2"
                                placeholder="password"
                                value={this.state.password}
                                onChange={(event) => this.handleOnchangePassword(event)}
                                name='password'
                                onKeyDown={(event) => this.handleOnKeyDown(event)}

                            />
                            <span className='hide-password' onClick={this.handleHidePassword} >
                                <i class={this.state.isShowPassword ? "fas fa-eye" : "far fa-eye-slash"}></i>
                            </span>
                        </div>
                        <span className='errorMessage fs-5' style={{ color: "red" }} >
                            {this.state.errorMessage}
                        </span>
                        <button className='login-btn mt-5' onClick={this.handleLogin} >Login</button>
                        <span className='forget-password d-block mt-3'>Forget Password?</span>
                        <span className='login-option d-block mt-3 text-center fs-5'>Or login with:</span>
                        <div className='login-social'>
                            <div className='google' >
                                <i class="fab fa-google"></i>
                            </div>
                            <div className='facebook'>
                                <i class="fab fa-facebook-f"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginAccess: (userinfo) => dispatch(actions.userLoginAccess(userinfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
