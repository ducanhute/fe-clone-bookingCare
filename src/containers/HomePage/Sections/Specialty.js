/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllSpecialty } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { LANGUAGES } from "../../../utils";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }
    async componentDidMount() {
        this.props.fetchAllSpecialty();
        // let res = await getAllSpecialty();
        // if (res && res.errCode === 0) {
        //     this.setState({
        //         dataSpecialty: res.data,
        //     });
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allSpecialties !== this.props.allSpecialties) {
            this.setState({
                dataSpecialty: this.props.allSpecialties,
            });
        }
    }
    handleViewDetailDoctor = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`);
    };
    render() {
        let Slider = this.props.Slider;
        let settings = this.props.settings;
        // let { dataSpecialty } = this.state;
        let { language, allSpecialties } = this.props;
        return (
            <div className="section-specialty share-slick-style" id="specialty">
                <div className="total-content">
                    <div className="wrap-content">
                        <div className="title-content d-flex justify-content-between align-items-center">
                            <h2 className="title-text">
                                <FormattedMessage id="home-page.specialty" />
                            </h2>
                            {/* <div className="see-more-btn">
                                {" "}
                                <FormattedMessage id="home-page.see-more" />
                            </div> */}
                        </div>
                        <div className="slider-content">
                            <Slider {...settings}>
                                {allSpecialties &&
                                    allSpecialties.length > 0 &&
                                    allSpecialties.map((item, index) => {
                                        return (
                                            <div key={index} className="wrap-item cursor-pointer">
                                                <div
                                                    className="image-slick"
                                                    onClick={() => this.handleViewDetailDoctor(item)}
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                ></div>
                                                <div className="text-center">{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</div>
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
        allSpecialties: state.admin.allSpecialties,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
