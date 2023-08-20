/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";

class Footer extends Component {
    render() {
        return (
            <div className="footer-content share-slick-style">
                <p className="cp-text">© Copyright 2015 Company Name. All rights reserved.</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
