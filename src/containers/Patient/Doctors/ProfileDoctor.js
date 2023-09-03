import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import _, { size } from "lodash";
import moment from "moment";
import "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
class ProfileDoctorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
            province: "",
        };
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({ dataProfile: data, province: data && data.Doctor_Info && data.Doctor_Info.provinceData });
    }
    getInforDoctor = async (doctorId) => {
        let result = {};
        if (doctorId) {
            let res = await getProfileDoctorById(doctorId);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };
    async componentDidUpdate(prevProps, prevState, savedProps) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);

            this.setState({ dataProfile: data, province: data && data.Doctor_Info && data.Doctor_Info.provinceData });
        }
    }
    renderTimeBooking = (dataScheduleTimeModal) => {
        let { language } = this.props;
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let time = language === LANGUAGES.VI ? dataScheduleTimeModal.timeTypeData.valueVi : dataScheduleTimeModal.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(dataScheduleTimeModal.date / 1000).format("ddd - DD/MM/YYYY")
                    : moment
                          .unix(dataScheduleTimeModal.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>Miễn phí hồ sơ đăt lịch</div>
                </>
            );
        }
    };
    render() {
        let { dataProfile, province } = this.state;
        console.log("fdsafas", province);

        let { language, isShowDescriptionDoctor, dataScheduleTimeModal, isShowLinkDetail, doctorId } = this.props;
        let textVi, textEn;
        if (dataProfile && dataProfile.positionData) {
            textVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            textEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="wrap-profile-table">
                <div className="intro-doctor d-flex align-items-center">
                    <div className="avatar-wrap">
                        {<div className="avatar" style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ""})` }}></div>}
                        <div className="wrap-icon-location text-center mt-2">
                            <i className="fa-solid fa-location-dot "></i>
                            &nbsp;
                            {language === LANGUAGES.VI ? province.valueVi : province.valueEn}
                        </div>
                    </div>
                    <div className="detail-info w-75">
                        <div className="name">
                            <h5 className="font-weight-bold">{language === LANGUAGES.VI ? textVi : textEn}</h5>
                        </div>
                        <div className="field">
                            {isShowDescriptionDoctor ? (
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && <span>{dataProfile.Markdown.description}</span>}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataScheduleTimeModal)}</>
                            )}
                        </div>
                        {!isShowDescriptionDoctor && (
                            <div className="price font-italic">
                                <FormattedMessage id="patient.booking-modal.cost" />
                                :&nbsp;
                                {dataProfile && dataProfile.Doctor_Info && dataProfile.Doctor_Info.priceData && language === LANGUAGES.VI && (
                                    <NumberFormat
                                        className="currency"
                                        displayType="text"
                                        value={dataProfile.Doctor_Info.priceData.valueVi}
                                        suffix="VND"
                                        thousandSeparator=","
                                    ></NumberFormat>
                                )}
                                {dataProfile && dataProfile.Doctor_Info && dataProfile.Doctor_Info.priceData && language === LANGUAGES.EN && (
                                    <NumberFormat
                                        className="currency"
                                        displayType="text"
                                        value={dataProfile.Doctor_Info.priceData.valueEn}
                                        suffix="$"
                                        thousandSeparator=","
                                    ></NumberFormat>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {isShowLinkDetail && (
                    <div style={{ fontSize: "16px" }} className="text-high-light mt-2 cursor-pointer p-2">
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctorInfo);
