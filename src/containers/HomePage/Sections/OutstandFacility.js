/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import specialtyImmage1 from "../../../assets/images/Speciallty/1.jpg";
import * as actions from "../../../store/actions";

import { getAllClinic } from "../../../services/userService";

class OutstandFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        };
    }
    async componentDidMount() {
        this.props.getAllClinic();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allClinics !== this.props.allClinics) {
            this.setState({
                dataClinics: this.props.allClinics,
            });
        }
    }
    handleViewDetailDoctor = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`);
    };
    render() {
        let Slider = this.props.Slider;
        let settings = this.props.settings;
        // let { dataClinics } = this.state;
        let { language, allClinics } = this.props;
        return (
            <div className="section-outstand-facility share-slick-style" id="facility">
                <div className="total-content">
                    <div className="wrap-content">
                        <div className="title-content d-flex justify-content-between align-items-center">
                            <h2 className="title-text">
                                <FormattedMessage id="patient.facility.outstand-facility" />
                            </h2>
                        </div>
                        <div className="slider-content">
                            <Slider {...settings}>
                                {allClinics &&
                                    allClinics.length > 0 &&
                                    allClinics.map((item, index) => {
                                        return (
                                            <div key={index} className="wrap-item cursor-pointer">
                                                <div
                                                    className="image-slick"
                                                    onClick={() => this.handleViewDetailDoctor(item)}
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                ></div>

                                                <h3 className="text-center">{language === LANGUAGES.VI ? item.name : item.nameEn}</h3>
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
        allClinics: state.admin.allClinics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClinic: () => dispatch(actions.fetchAllClinic()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandFacility));
