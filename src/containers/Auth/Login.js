import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from 'react-intl';
// import { divide } from 'lodash';
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }
    // Xử lý vấn đề fix cứng giá trị của attribute value trong thẻ input username
    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value, // set lại state
        });
    }; // Xử lý vấn đề fix cứng giá trị của attribute value trong thẻ input password
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value, // set lại state
        });
    };
    // Lấy data trong các ô input khi nhấn login
    handleLogin = async () => {
        this.setState({
            errMessage: "", // clear lỗi khi nhấn login
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                // login thành công todo here
                this.props.userLoginSuccess(data.user);
                console.log("login succeed");
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message, // Lấy ra erro.response.data.message trả về của API
                    });
                }
            }
        }
    };
    // Switch icon show hide password when onClick
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    handleOnchangeKeyboard = (e) => {
        if (e.keyCode === 13) {
            this.handleLogin();
        }
    };
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">LOGIN</div>
                        <div className="col-12 form-group login-input">
                            <label>UserName:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Name?"
                                value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>PassWord:</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Enter Your Password?"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                    onKeyDown={(e) => this.handleOnchangeKeyboard(e)}
                                />
                                <span
                                    onClick={() => {
                                        this.handleShowHidePassword();
                                    }}
                                >
                                    <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-orther-login">Or Login With:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
