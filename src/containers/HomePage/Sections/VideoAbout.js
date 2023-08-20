/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";

class VideoAbout extends Component {
    render() {
        return (
            <div className="video-about share-slick-style">
                <div className="total-content">
                    <div className="wrap-content">
                        <div className="title-content d-flex justify-content-between align-items-center">
                            <h2 className="title-text">Truyền thông nói về BookingCare</h2>
                        </div>
                        <div className=" d-flex gap-3">
                            <div className="left-content" style={{ width: "60%" }}>
                                <iframe
                                    width="100%"
                                    height="400px"
                                    src="https://www.youtube.com/embed/PqWRGqIEW0w"
                                    title="2-Hour Study with Me | Pomodoro Timer / Morning / Soft Piano 🎹 | Day 132"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="rignt-content" style={{ width: "40%" }}>
                                <h3>Mot so thong tin them</h3>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoAbout);
