/* eslint-disable */
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

class Footer extends Component {
    render() {
        return (
            <div className="footer-content share-slick-style " id="footer-section">
                <div className="total-content">
                    <div className="wrap-content py-2 row">
                        <div className="col-8">
                            <div className="footer-logo"></div>
                            <h6 className=" font-weight-bold">
                                <FormattedMessage id="patient.footer.name" />
                            </h6>
                            <p>
                                <span>
                                    <i className="fa-solid fa-location-dot mr-1"></i>
                                </span>
                                <FormattedMessage id="patient.footer.address" />
                            </p>
                            <p>
                                <span>
                                    <i className="fa-solid fa-check mr-1 "></i>
                                </span>
                                <FormattedMessage id="patient.footer.check" />
                                <div className=" d-flex justify-content-start">
                                    <div className="sign-logo"></div>
                                    <div className="sign-logo"></div>
                                </div>
                            </p>
                        </div>
                        <div className="col-4 mt-4 pt-4 ">
                            <h6 className="mt-3 mb-0 font-weight-bold">
                                <FormattedMessage id="patient.footer.office" />
                            </h6>
                            <p className="mb-1 ">
                                <FormattedMessage id="patient.footer.office-address" />
                            </p>
                            <h6 className=" mb-0 font-weight-bold">
                                <FormattedMessage id="patient.footer.support" />
                            </h6>
                            <p className="mb-1 ">
                                {" "}
                                <FormattedMessage id="patient.footer.support-address" />
                            </p>
                            <h6 className=" mb-0 font-weight-bold">
                                <FormattedMessage id="patient.footer.hotline" />
                            </h6>
                            <p className="mb-0 ">
                                <span className="text-high-light">
                                    <FormattedMessage id="patient.footer.hotline-number" />
                                </span>
                                &nbsp;
                                <FormattedMessage id="patient.footer.hotline-time" />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="copy-right">
                    <p className="cp-text">© 2023 Duc Anh Ha</p>
                </div>
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
