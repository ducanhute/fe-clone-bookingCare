import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { getExtraDoctorInfoById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import { getScheduleByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailCost: false,
            extraDoctorInfo: {},
        };
    }
    async componentDidMount() {
        if (this.props.doctorId) {
            let res = await getExtraDoctorInfoById(this.props.doctorId);
            if (res && res.data) {
                this.setState({
                    extraDoctorInfo: res.data,
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, savedProps) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getExtraDoctorInfoById(this.props.doctorId);
            if (res && res.data) {
                this.setState({
                    extraDoctorInfo: res.data,
                });
            }
        }
    }

    isShowDetailCost = (input) => {
        this.setState({
            isShowDetailCost: input,
        });
    };
    render() {
        let { extraDoctorInfo, isShowDetailCost } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-extra-info-container">
                <div className="top-content ">
                    <h3 className="font-weight-bold text-uppercase ">
                        <FormattedMessage id="patient.extra-info.address" />
                    </h3>
                    {language === LANGUAGES.VI && (
                        <div className="clinic-name font-weight-bold">{extraDoctorInfo && extraDoctorInfo.clinicName ? extraDoctorInfo.clinicName : ""}</div>
                    )}
                    {language === LANGUAGES.EN && (
                        <div className="clinic-name font-weight-bold">
                            {extraDoctorInfo && extraDoctorInfo.clinicNameEn ? extraDoctorInfo.clinicNameEn : ""}
                        </div>
                    )}

                    {language === LANGUAGES.VI && (
                        <div className="address mb-2">{extraDoctorInfo && extraDoctorInfo.clinicAddress ? extraDoctorInfo.clinicAddress : ""}</div>
                    )}
                    {language === LANGUAGES.EN && (
                        <div className="address mb-2">{extraDoctorInfo && extraDoctorInfo.clinicAddressEn ? extraDoctorInfo.clinicAddressEn : ""}</div>
                    )}
                </div>

                <div className="intermediate-content">
                    <div className="my-2">
                        <span className="font-weight-bold text-uppercase">
                            {" "}
                            <FormattedMessage id="patient.extra-info.cost" />
                            :&nbsp;
                        </span>
                        <span>
                            {extraDoctorInfo && extraDoctorInfo.priceData && language === LANGUAGES.VI && (
                                <NumberFormat
                                    className="currency"
                                    displayType="text"
                                    value={extraDoctorInfo.priceData.valueVi && extraDoctorInfo.priceData.valueVi}
                                    suffix="VND"
                                    thousandSeparator=","
                                ></NumberFormat>
                            )}
                            {extraDoctorInfo && extraDoctorInfo.priceData && language === LANGUAGES.EN && (
                                <NumberFormat
                                    className="currency"
                                    displayType="text"
                                    value={extraDoctorInfo.priceData.valueEn}
                                    suffix="$"
                                    thousandSeparator=","
                                ></NumberFormat>
                            )}
                        </span>
                        <span className="show-detail text-high-light cursor-pointer" onClick={() => this.isShowDetailCost(true)}>
                            &nbsp; <FormattedMessage id="patient.extra-info.more-details" />
                        </span>
                    </div>
                    {isShowDetailCost && (
                        <div className="expand-content">
                            <div className="group-content">
                                <div className="d-flex justify-content-between">
                                    <span className=" ">
                                        <FormattedMessage id="patient.extra-info.cost" />
                                    </span>
                                    <span>
                                        {extraDoctorInfo && extraDoctorInfo.priceData && language === LANGUAGES.VI && (
                                            <NumberFormat
                                                className="currency"
                                                displayType="text"
                                                value={extraDoctorInfo.priceData.valueVi}
                                                suffix="VND"
                                                thousandSeparator=","
                                            ></NumberFormat>
                                        )}
                                        {extraDoctorInfo && extraDoctorInfo.priceData && language === LANGUAGES.EN && (
                                            <NumberFormat
                                                className="currency"
                                                displayType="text"
                                                value={extraDoctorInfo.priceData.valueEn}
                                                suffix="$"
                                                thousandSeparator=","
                                            ></NumberFormat>
                                        )}
                                    </span>
                                </div>
                                <div className="note">
                                    {language === LANGUAGES.VI && extraDoctorInfo && extraDoctorInfo.note ? extraDoctorInfo.note : ""}
                                    {language === LANGUAGES.EN && extraDoctorInfo && extraDoctorInfo.noteEn ? extraDoctorInfo.noteEn : ""}
                                </div>
                                <div className="payment">
                                    <FormattedMessage id="patient.extra-info.payment-method" />
                                    :&nbsp;
                                    {extraDoctorInfo &&
                                        extraDoctorInfo.paymentData &&
                                        (language === LANGUAGES.VI ? extraDoctorInfo.paymentData.valueVi : extraDoctorInfo.paymentData.valueEn)}
                                </div>
                            </div>
                            <div className="text-high-light cursor-pointer my-2" onClick={() => this.isShowDetailCost(false)}>
                                <FormattedMessage id="patient.extra-info.hide" />
                            </div>
                        </div>
                    )}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
