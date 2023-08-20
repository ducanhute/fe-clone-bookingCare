/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";

class Specialty extends Component {
    render() {
        let Slider = this.props.Slider;
        let settings = this.props.settings;
        return (
            <div className="section-specialty share-slick-style">
                <div className="total-content">
                    <div className="wrap-content">
                        <div className="title-content d-flex justify-content-between align-items-center">
                            <h2 className="title-text">Chuyên khoa phổ biến</h2>
                            <div className="see-more-btn">Xem thêm</div>
                        </div>
                        <div className="slider-content">
                            <Slider {...settings}>
                                <div className="wrap-item">
                                    <div className="image-slick"></div>
                                    <h3>Cơ xương khớp</h3>
                                </div>
                                <div className="wrap-item">
                                    <div className="image-slick"></div>
                                    <h3>Chuyên khoa tiêu hóa</h3>
                                </div>
                                <div className="wrap-item">
                                    <div className="image-slick"></div>
                                    <h3>Chuyen khoa than kinh</h3>
                                </div>
                                <div className="wrap-item">
                                    <div className="image-slick"></div>
                                    <h3>Chuyen khoa mat</h3>
                                </div>
                                <div className="wrap-item">
                                    <div className="image-slick"></div>
                                    <h3>Chuyen khoa tinh than</h3>
                                </div>
                                <div className="wrap-item">
                                    <div className="image-slick"></div>
                                    <h3>Chuyen khoa xxx</h3>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
