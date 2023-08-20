/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";

class OutstandFacility extends Component {
    render() {
        let Slider = this.props.Slider;
        let settings = this.props.settings;
        return (
            <div className="section-guide-book share-slick-style">
                <div className="total-content">
                    <div className="wrap-content">
                        <div className="title-content d-flex justify-content-between align-items-center">
                            <h2 className="title-text">Cẩm Nang</h2>
                            <div className="see-more-btn">Tất cả bài viết</div>
                        </div>
                        <div className="slider-content">
                            <Slider {...settings}>
                                <div className="wrap-item d-flex">
                                    <div className="image-slick"></div>
                                    <h3>Xét nghiệm chẩn đoán tiểu đường diễn ra như thế nào? Ý nghĩa của từng chỉ số</h3>
                                </div>
                                <div className="wrap-item d-flex">
                                    <div className="image-slick"></div>
                                    <h3>Bệnh viện 2</h3>
                                </div>
                                <div className="wrap-item d-flex">
                                    <div className="image-slick"></div>
                                    <h3>Bệnh viện 3</h3>
                                </div>
                                <div className="wrap-item d-flex">
                                    <div className="image-slick"></div>
                                    <h3>Bệnh viện 4</h3>
                                </div>
                                <div className="wrap-item d-flex">
                                    <div className="image-slick"></div>
                                    <h3>Bệnh viện 5</h3>
                                </div>
                                <div className="wrap-item d-flex">
                                    <div className="image-slick"></div>
                                    <h3>Bệnh viện 6</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandFacility);
