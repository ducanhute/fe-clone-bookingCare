/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { logoSociality } from "../../../assets/Image";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
const dataLogo = [
    { icon: logoSociality.logo1, link: "https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm" },
    { icon: logoSociality.logo2, link: "https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" },
    { icon: logoSociality.logo3, link: "https://vietnamnet.vn/thong-tin-truyen-thong" },
    { icon: logoSociality.logo4, link: "https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html" },
    // { icon: logoSociality.logo5, link: "https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html" },
    { icon: logoSociality.logo6, link: "https://ehealth.gov.vn/?action=News&newsId=46094" },
    { icon: logoSociality.logo7, link: "https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html" },
    // { icon: logoSociality.logo8, link: "https://www.youtube.com/watch?v=mstAc81lpMc&ab_channel=BookingCare" },
];
class VideoAbout extends Component {
    render() {
        let { language } = this.props;
        return (
            <div className="video-about share-slick-style">
                <div className="total-content">
                    <div className="wrap-content">
                        <div className="title-content d-flex justify-content-between align-items-center">
                            <h2 className="title-text">
                                <FormattedMessage id="patient.videoAbout.title" />
                            </h2>
                        </div>
                        <div className=" row ">
                            <div className="left-content col-md-6">
                                <div className="mx-auto" style={{ width: "90%" }}>
                                    <iframe
                                        width="100%"
                                        height="321px"
                                        src="https://www.youtube.com/embed/FyDQljKtWnI"
                                        title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            <div className="right-content col-md-6 px-2 text-center">
                                <h5 className=" font-weight-bold">
                                    <FormattedMessage id="patient.videoAbout.sub-title" />
                                </h5>
                                <p>
                                    <FormattedMessage id="patient.videoAbout.content" />
                                </p>
                                <ul className=" d-flex flex-wrap">
                                    {dataLogo.map((item, index) => {
                                        return (
                                            <li key={index} className="item-list-logo w-25 my-2">
                                                {language === LANGUAGES.VI && (
                                                    <a target="_blank" className="mx-0" title="Xem thêm thông tin về BookingCare" href={item.link}>
                                                        <i style={{ backgroundImage: `url(${item.icon})` }}></i>
                                                    </a>
                                                )}
                                                {language === LANGUAGES.EN && (
                                                    <a target="_blank" className="mx-0" title="See more infomation about BookingCare" href={item.link}>
                                                        <i style={{ backgroundImage: `url(${item.icon})` }}></i>
                                                    </a>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
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
