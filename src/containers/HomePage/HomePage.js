import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import HomeHeader from "./Sections/HomeHeader";
import Specialty from "./Sections/Specialty";
import OutStandFacility from "./Sections/OutstandFacility";
import OutstandDoctor from "./Sections/OutstandDoctor";
import GuideBook from "./Sections/GuideBook";
import VideoAbout from "./Sections/VideoAbout";
import Footer from "./Sections/Footer";
import Slider1 from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            focusOnSelect: true,
        };
        let guideBookSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            focusOnSelect: true,
        };

        return (
            <>
                <HomeHeader />
                <Specialty Slider={Slider1} settings={settings} />
                <OutStandFacility Slider={Slider1} settings={settings} />
                <OutstandDoctor Slider={Slider1} settings={settings} />
                <GuideBook Slider={Slider1} settings={guideBookSettings} />
                <VideoAbout />
                <Footer />
                <div style={{ height: "100px" }}></div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
