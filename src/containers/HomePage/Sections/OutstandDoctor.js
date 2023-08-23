/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, path } from "../../../utils";
import { FormattedMessage } from "react-intl";

import { withRouter } from "react-router";

import "react-markdown-editor-lite/lib/index.css";

class OutstandDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctor: [],
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctor !== this.props.topDoctor) {
            this.setState({
                topDoctor: this.props.topDoctor,
            });
        }
    }
    componentDidMount() {
        this.props.loadTopDoctor();
    }
    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    render() {
        let { language } = this.props;
        let arrayDoctor = this.props.topDoctor;
        let Slider = this.props.Slider;
        let settings = this.props.settings;

        return (
            <div className="section-outstand-doctor share-slick-style">
                <div className="total-content">
                    <div className="wrap-content">
                        <div className="title-content d-flex justify-content-between align-items-center">
                            <h2 className="title-text">
                                <FormattedMessage id="home-page.out-stand-doctor" />
                            </h2>
                            <div className="see-more-btn">
                                <FormattedMessage id="home-page.find" />
                            </div>
                        </div>
                        <div className="slider-content">
                            <Slider {...settings}>
                                {arrayDoctor &&
                                    arrayDoctor.length > 0 &&
                                    arrayDoctor.map((item, index) => {
                                        let imageBase64 = "";
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, "base64").toString("binary");
                                        }
                                        let textVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                        let textEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                        return (
                                            <div className="border-item" onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div className="wrap-item d-flex align-items-center flex-column">
                                                    <div className="image-slick" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                    <h3>{language === LANGUAGES.VI ? textVi : textEn}</h3>
                                                    <h3>Thần kinh</h3>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctor: state.admin.topDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandDoctor));
