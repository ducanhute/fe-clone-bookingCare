/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllSpecialty } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log("data", res);
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data,
            });
        }
    }
    handleViewDetailDoctor = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`);
    };
    render() {
        let Slider = this.props.Slider;
        let settings = this.props.settings;
        let { dataSpecialty } = this.state;
        return (
            <div className="section-specialty share-slick-style">
                <div className="total-content">
                    <div className="wrap-content">
                        <div className="title-content d-flex justify-content-between align-items-center">
                            <h2 className="title-text">
                                <FormattedMessage id="home-page.specialty" />
                            </h2>
                            <div className="see-more-btn">
                                {" "}
                                <FormattedMessage id="home-page.see-more" />
                            </div>
                        </div>
                        <div className="slider-content">
                            <Slider {...settings}>
                                {dataSpecialty &&
                                    dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item) => {
                                        return (
                                            <div className="wrap-item cursor-pointer">
                                                <div
                                                    className="image-slick"
                                                    onClick={() => this.handleViewDetailDoctor(item)}
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                ></div>
                                                <h3>{item.name}</h3>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
