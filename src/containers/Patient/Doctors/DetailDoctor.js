import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Sections/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "../Doctors/DoctorSchedule";
import DoctorExtraInfro from "../Doctors/DoctorExtraInfro";
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailDoctorById(+id);
            this.setState({ detailDoctor: res.data });
        }
    }
    removeAccents(str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    }
    render() {
        let { detailDoctor } = this.state;
        let { language } = this.props;
        let textVi, textEn;
        if (detailDoctor && detailDoctor.positionData) {
            textVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            textEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            textEn = this.removeAccents(textEn);
        }
        let doctorPrice = {};
        if (detailDoctor && detailDoctor.Doctor_Info && detailDoctor.Doctor_Info.priceData) {
            doctorPrice.valueEn = detailDoctor.Doctor_Info.priceData.valueEn;
            doctorPrice.valueVi = detailDoctor.Doctor_Info.priceData.valueVi;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="total-content" style={{ marginTop: "60px" }}>
                    <div className="border-bottom py-2">
                        <div className="doctor-detail-container intro-doctor d-flex align-items-center">
                            <div className="avatar-wrap">
                                {<div className="avatar" style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ""})` }}></div>}
                            </div>
                            <div className="detail-info w-50">
                                <div className="name ">
                                    <h3 className="font-weight-bold">{language === LANGUAGES.VI ? textVi : textEn}</h3>
                                </div>
                                <div className="field">
                                    {language === LANGUAGES.VI && detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && (
                                        <span>{detailDoctor.Markdown.description}</span>
                                    )}
                                    {language === LANGUAGES.EN && detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.descriptionEn && (
                                        <span>{detailDoctor.Markdown.descriptionEn}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="schedule-doctor doctor-detail-container d-flex">
                            <div className="content-right w-50">
                                <DoctorSchedule doctorId={detailDoctor.id} price={doctorPrice} />
                            </div>
                            <div className="content-left w-50">
                                <DoctorExtraInfro doctorId={detailDoctor.id}></DoctorExtraInfro>
                            </div>
                        </div>
                    </div>
                    <div className="wrap-bg-gray border-bottom py-4">
                        <div className="doctor-detail-container detail-info-doctor">
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && detailDoctor.Markdown.contentHTMLEn && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: `${language === LANGUAGES.VI ? detailDoctor.Markdown.contentHTML : detailDoctor.Markdown.contentHTMLEn}`,
                                    }}
                                ></div>
                            )}
                        </div>
                        <div className="comment-doctor"></div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
