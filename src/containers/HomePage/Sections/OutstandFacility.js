/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import specialtyImmage1 from "../../../assets/images/Speciallty/1.jpg";

import { getAllClinic } from "../../../services/userService";

class OutstandFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        };
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : [],
            });
        }
    }
    handleViewDetailDoctor = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`);
    };
    render() {
        let Slider = this.props.Slider;
        let settings = this.props.settings;
        let { dataClinics } = this.state;
        return (
            <div className="section-outstand-facility share-slick-style">
                <div className="total-content">
                    <div className="wrap-content">
                        <div className="title-content d-flex justify-content-between align-items-center">
                            <h2 className="title-text">Cơ sở y tế nổi bật</h2>
                            <div className="see-more-btn">Tìm kiếm</div>
                        </div>
                        <div className="slider-content">
                            <Slider {...settings}>
                                {dataClinics &&
                                    dataClinics.length > 0 &&
                                    dataClinics.map((item, index) => {
                                        return (
                                            <div key={index} className="wrap-item cursor-pointer">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandFacility));
