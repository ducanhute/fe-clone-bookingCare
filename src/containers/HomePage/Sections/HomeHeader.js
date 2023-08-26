/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { icon1Header, icon2Header, icon3Header, icon4Header, icon5Header, icon6Header } from "../../../assets/Image.js";
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
    render() {
        const data = [
            {
                img: icon1Header,
                firstText: <FormattedMessage id="banner.option1FirstText" />,
                secondText: <FormattedMessage id="banner.option1SecondText" />,
            },
            {
                img: icon2Header,
                firstText: <FormattedMessage id="banner.option2FirstText" />,
                secondText: <FormattedMessage id="banner.option2SecondText" />,
            },
            {
                img: icon3Header,
                firstText: <FormattedMessage id="banner.option3FirstText" />,
                secondText: <FormattedMessage id="banner.option3SecondText" />,
            },
            {
                img: icon4Header,
                firstText: <FormattedMessage id="banner.option4FirstText" />,
                secondText: <FormattedMessage id="banner.option4SecondText" />,
            },
            {
                img: icon5Header,
                firstText: <FormattedMessage id="banner.option5FirstText" />,
                secondText: <FormattedMessage id="banner.option5SecondText" />,
            },
            {
                img: icon6Header,
                firstText: <FormattedMessage id="banner.option6FirstText" />,
                secondText: <FormattedMessage id="banner.option6SecondText" />,
            },
        ];
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content align-items-center">
                        <div className="left-content h-100 ">
                            <i className="fa-solid fa-bars"></i>

                            <div onClick={() => this.handleOnclickLogo()} className="header-logo h-75"></div>
                        </div>
                        <div className="center-content d-flex justify-content-between ">
                            <div className="child-content main-text-color">
                                <h6 className="mb-0">
                                    <b>
                                        <FormattedMessage id="home-header.speciality" />
                                    </b>
                                </h6>
                                <p className="mb-0 text-12">
                                    {" "}
                                    <FormattedMessage id="home-header.search-doctor" />
                                </p>
                            </div>
                            <div className="child-content main-text-color">
                                <h6 className="mb-0">
                                    <b>
                                        <FormattedMessage id="home-header.healthcare-facility" />
                                    </b>
                                </h6>
                                <p className="mb-0 text-12">
                                    {" "}
                                    <FormattedMessage id="home-header.select-hospital" />
                                </p>
                            </div>
                            <div className="child-content main-text-color">
                                <h6 className="mb-0">
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                </h6>
                                <p className="mb-0 text-12">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </p>
                            </div>
                            <div className="child-content main-text-color">
                                <h6 className="mb-0">
                                    <b>
                                        <FormattedMessage id="home-header.fee" />
                                    </b>
                                </h6>

                                <p className="mb-0 text-12">
                                    <FormattedMessage id="home-header.general-check" />
                                </p>
                            </div>
                        </div>
                        <div className="right-content d-flex align-items-center justify-content-end px-4">
                            <div className="support d-flex align-items-center">
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
