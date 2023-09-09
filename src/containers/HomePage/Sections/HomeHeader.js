/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import * as actions from "../../../store/actions";
import { iconHeader } from "../../../assets/Image";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    handleOnclickLogo = () => {
        this.props.history.push("/home");
    };
    goToViolation = (id) => {
        let element = document.getElementById(id);
        element.scrollIntoView();
        element.scrollIntoView(false);
        element.scrollIntoView({ block: "nearest" });
        element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    };
    render() {
        const data = [
            {
                img: iconHeader.icon1Header,
                firstText: <FormattedMessage id="banner.option1FirstText" />,
                secondText: <FormattedMessage id="banner.option1SecondText" />,
            },
            {
                img: iconHeader.icon2Header,
                firstText: <FormattedMessage id="banner.option2FirstText" />,
                secondText: <FormattedMessage id="banner.option2SecondText" />,
            },
            {
                img: iconHeader.icon3Header,
                firstText: <FormattedMessage id="banner.option3FirstText" />,
                secondText: <FormattedMessage id="banner.option3SecondText" />,
            },
            {
                img: iconHeader.icon4Header,
                firstText: <FormattedMessage id="banner.option4FirstText" />,
                secondText: <FormattedMessage id="banner.option4SecondText" />,
            },
            {
                img: iconHeader.icon5Header,
                firstText: <FormattedMessage id="banner.option5FirstText" />,
                secondText: <FormattedMessage id="banner.option5SecondText" />,
            },
            {
                img: iconHeader.icon6Header,
                firstText: <FormattedMessage id="banner.option6FirstText" />,
                secondText: <FormattedMessage id="banner.option6SecondText" />,
            },
        ];

        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content align-items-center">
                        <div className="left-content h-100 ">
                            <div
                                onClick={() => {
                                    this.handleOnclickLogo();
                                }}
                                className="header-logo h-75 cursor-pointer"
                            ></div>
                        </div>
                        <div className="center-content d-flex justify-content-between ">
                            <div className="child-content main-text-color">
                                <h5 className="mb-0" onClick={() => this.goToViolation("specialty")}>
                                    <a className=" font-weight-bold">
                                        <FormattedMessage id="home-header.speciality" />
                                    </a>
                                </h5>
                                <p className="mb-0 text-12 sub-text-header">
                                    {" "}
                                    <FormattedMessage id="home-header.search-doctor" />
                                </p>
                            </div>
                            <div className="child-content main-text-color">
                                <h5 className="mb-0" onClick={() => this.goToViolation("facility")}>
                                    <a className=" font-weight-bold">
                                        <FormattedMessage id="home-header.healthcare-facility" />
                                    </a>
                                </h5>
                                <p className="mb-0 text-12 sub-text-header">
                                    {" "}
                                    <FormattedMessage id="home-header.select-hospital" />
                                </p>
                            </div>
                            <div className="child-content main-text-color">
                                <h5 className="mb-0" onClick={() => this.goToViolation("doctor-section")}>
                                    <a className=" font-weight-bold">
                                        <FormattedMessage id="home-header.doctor" />
                                    </a>
                                </h5>
                                <p className="mb-0 text-12 sub-text-header">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </p>
                            </div>
                            <div className="child-content main-text-color">
                                <h5 className="mb-0 ">
                                    <a className=" font-weight-bold">
                                        <FormattedMessage id="home-header.fee" />
                                    </a>
                                </h5>

                                <p className="mb-0 text-12 sub-text-header">
                                    <FormattedMessage id="home-header.general-check" />
                                </p>
                            </div>
                        </div>
                        <div className="right-content d-flex align-items-center justify-content-end px-4">
                            <div className="support d-flex align-items-center cursor-pointer" onClick={() => this.goToViolation("footer-section")}>
                                <i className="fa-solid fa-question mx-1"></i>
                                <span className="text-14 fw-bold">
                                    <FormattedMessage id="home-header.support" />
                                </span>
                            </div>
                            <div className={this.props.language === LANGUAGES.VI ? "language-vn mx-2 active" : "language-vn mx-2 "}>
                                <span style={{ cursor: "pointer" }} onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                                    VN
                                </span>
                            </div>
                            <div className={this.props.language === LANGUAGES.EN ? "language-en mx-2 active" : "language-en mx-2"}>
                                <span style={{ cursor: "pointer" }} onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner && (
                    <div className="home-header-banner">
                        <div className="wrap-title-search">
                            <h2 className="title1 text-center text-white pt-5  ">
                                {" "}
                                <FormattedMessage id="banner.title1" />
                            </h2>
                            <h2 className="title2 text-center text-white ">
                                <FormattedMessage id="banner.title2" />
                            </h2>

                            <div className="search m-auto mt-4">
                                <i className="fas fa-search"></i>
                                <input type="text " className="main-text-color"></input>
                            </div>
                        </div>
                        <div className="options d-flex justify-content-center flex-wrap align-items-center">
                            {data.map((item, index) => {
                                return (
                                    <div key={index} className="item-options">
                                        <div style={{ backgroundImage: `url(${item.img})` }} className="icon"></div>
                                        <br />
                                        {item.firstText}
                                        <br />

                                        {item.secondText}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </>
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
    return {
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
