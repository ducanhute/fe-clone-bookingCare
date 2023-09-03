import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTimes: [],
            isOpenBookingModal: false,
            dataScheduleTimeModal: {},
        };
    }
    createdArrayDay = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let labelVi = moment(new Date()).format("DD/MM");
                labelVi = `Hôm nay - ${labelVi}`;
                object.labelVi = labelVi;

                let labelEn = moment(new Date()).locale("en").format("DD/MM");
                labelEn = `Today - ${labelEn}`;
                object.labelEn = labelEn;
                object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
                allDays.push(object);
            } else {
                let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
                labelVi = labelVi.charAt(0).toUpperCase() + labelVi.slice(1);
                object.labelVi = labelVi;
                object.labelEn = moment(new Date()).add(i, "days").locale("en").format("dddd - DD/MM");
                object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
                allDays.push(object);
            }
        }
        this.setState({
            allDays: allDays,
        });
    };
    componentDidMount() {
        this.createdArrayDay();
    }
    async componentDidUpdate(prevProps, prevState, savedProps) {
        if (this.state.allDays !== prevState.allDays || this.props.doctorId !== prevProps.doctorId) {
            let { doctorId } = this.props;
            let { allDays } = this.state;
            let res = await getScheduleByDate(doctorId, allDays[0].value);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : [],
                });
            }
        }
    }
    handleOnchageSelect = async (e) => {
        let { doctorId } = this.props;

        if (doctorId) {
            let date = e.target.value;
            let res = await getScheduleByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : [],
                });
            } else {
            }
        }
    };
    handleClickScheduleTime = (item) => {
        this.setState({
            isOpenBookingModal: true,
            dataScheduleTimeModal: item,
        });
    };
    closeBookingModal = () => {
        this.setState({
            isOpenBookingModal: false,
        });
    };
    render() {
        let { allDays, allAvailableTimes, isOpenBookingModal, dataScheduleTimeModal } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule mt-4">
                        <select onChange={(e) => this.handleOnchageSelect(e)}>
                            {allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {language === LANGUAGES.VI ? item.labelVi : item.labelEn}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar my-2">
                            <span className=" text-uppercase font-weight-bold">
                                <i className="fas fa-calendar-alt mr-2"></i>
                                <FormattedMessage id="patient.detail-doctor.schedule"></FormattedMessage>
                            </span>
                        </div>
                        <div className="wrap-list-btn">
                            <div className="list-btn">
                                {allAvailableTimes && allAvailableTimes.length > 0 ? (
                                    allAvailableTimes.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        return (
                                            <button key={index} onClick={() => this.handleClickScheduleTime(item)}>
                                                {timeDisplay}
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="">
                                        <FormattedMessage id="patient.detail-doctor.announcement" />
                                    </div>
                                )}
                            </div>
                            <div className="book-fee mt-2">
                                <span>
                                    <span className="text-small">
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                    </span>
                                    <i className="far fa-hand-point-up mx-1"></i>
                                    <span className="text-small">
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <BookingModal isOpenModal={isOpenBookingModal} closeBookingModal={this.closeBookingModal} dataScheduleTimeModal={dataScheduleTimeModal} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
