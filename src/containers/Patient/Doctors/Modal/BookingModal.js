import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { postPatientBookingInfo } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            gender: "",
            doctorId: "",
            genders: [],
            errorArray: {},
            isSubmit: false,
            timeType: "",
        };
    }
    async componentDidMount() {
        await this.props.getGenderStart();
    }
    buildDataGenderSelect(inputData) {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let Object = {};
                Object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                Object.value = item.keyMap;
                result.push(Object);
            });
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.gender !== this.props.gender || prevProps.language !== this.props.language) {
            let genders = this.buildDataGenderSelect(this.props.gender);
            if (genders) {
                this.setState({
                    genders: genders,
                });
            }
        }
        if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
            if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {
                let doctorId = this.props.dataScheduleTimeModal.doctorId;
                this.setState({
                    doctorId: doctorId,
                    timeType: this.props.dataScheduleTimeModal.timeType,
                });
            }
        }
    }
    handleOnchangeInput = (e) => {
        let copyState = {
            ...this.state,
            isSubmit: false,
        };
        const { name, value } = e.target;
        copyState[name] = value;
        this.setState({
            ...copyState,
        });
    };
    handleOnchangeInputDay = (date) => {
        this.setState({
            birthday: date,
        });
    };
    handleChangeSelect = async (selectedOption, name) => {
        let key = name.name;
        let stateCopy = { ...this.state };
        stateCopy[key] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(dataTime.date / 1000).format("ddd - DD/MM/YYYY")
                    : moment
                          .unix(dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");
            return `${time} ${date}`;
        }
        return "";
    };
    buildDoctorNameBooking = (dataProps) => {
        let { language } = this.props;
        if (dataProps && !_.isEmpty(dataProps)) {
            let doctorName =
                language === LANGUAGES.VI
                    ? `${dataProps.doctorData.lastName} ${dataProps.doctorData.firstName}`
                    : `${dataProps.doctorData.firstName} ${dataProps.doctorData.lastName}`;
            return doctorName;
        }
        return "";
    };
    handleConfirmBooking = async () => {
        let errorArray = this.validateForm(this.state);
        let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
        let doctorName = this.buildDoctorNameBooking(this.props.dataScheduleTimeModal);
        this.setState({
            errorArray: errorArray,
            isSubmit: true,
        });
        if (Object.keys(errorArray).length === 0) {
            let date = new Date(this.state.birthday).getTime();
            let res = await postPatientBookingInfo({
                doctorId: this.state.doctorId,
                fullName: this.state.fullName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                reason: this.state.reason,
                date: date,
                gender: this.state.gender.value,
                timeType: this.state.timeType,
                language: this.props.language,
                timeString: timeString,
                doctorName: doctorName,
            });
            if (res && res.errCode === 0) {
                toast.success(res.errMessage);
            } else {
                toast.success("My booking Appointment has Failed!");
            }
        }
    };
    validateForm(formValues) {
        let errorArray = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phoneno = /^\d{10}$/;
        if (!formValues.fullName) {
            errorArray.fullName = "UserName is required!";
        }
        if (!formValues.phoneNumber) {
            errorArray.phoneNumber = "Phone number is required!";
        }
        // else if (!formValues.phoneNumber.match(phoneno)) {
        //     errorArray.phoneNumber = "Invalid phone number!";
        // }
        if (!formValues.email) {
            errorArray.email = "Email is required!";
        } else if (!regex.test(formValues.email)) {
            errorArray.email = "This is not a valid email format!";
        }
        if (!formValues.address) {
            errorArray.address = "Adress is required!";
        }
        if (!formValues.reason) {
            errorArray.reason = "Reason is required!";
        }
        if (!formValues.birthday) {
            errorArray.birthday = "Birthday is required!";
        }
        if (!formValues.gender) {
            errorArray.gender = "Gender is required!";
        }
        return errorArray;
    }

    render() {
        let { genders, gender, errorArray, isSubmit } = this.state;
        let { isOpenModal, closeBookingModal, dataScheduleTimeModal, language } = this.props;
        let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : "";
        return (
            <>
                <Modal isOpen={isOpenModal} size="lg" centered className="wrap-all-modal">
                    <div className="modal-booking-container">
                        <div className="booking-modal-header">
                            <span className="left">
                                <FormattedMessage id="patient.booking-modal.info" />
                            </span>
                            <span className="right cursor-pointer" onClick={() => closeBookingModal()}>
                                <i className="fas fa-times "></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-info">
                                <ProfileDoctor isShowDescriptionDoctor={false} doctorId={doctorId} dataScheduleTimeModal={dataScheduleTimeModal} />
                            </div>

                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.fullName" />
                                    </label>
                                    <input
                                        value={this.state.fullName}
                                        name="fullName"
                                        onChange={(e) => this.handleOnchangeInput(e, "fullName")}
                                        className="form-control"
                                    ></input>
                                    <span className="text-red">{isSubmit && errorArray.fullName && errorArray.fullName}</span>
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                    </label>
                                    <input
                                        name="phoneNumber"
                                        value={this.state.phoneNumber}
                                        onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")}
                                        className="form-control"
                                    ></input>
                                    <span className="text-red">{isSubmit && errorArray.phoneNumber && errorArray.phoneNumber}</span>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Email</label>
                                    <input
                                        name="email"
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnchangeInput(e, "email")}
                                        className="form-control"
                                    ></input>
                                    <span className="text-red">{isSubmit && errorArray.email && errorArray.email}</span>
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input
                                        name="address"
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnchangeInput(e, "address")}
                                        className="form-control"
                                    ></input>
                                    <span className="text-red">{isSubmit && errorArray.address && errorArray.address}</span>
                                </div>
                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input
                                        name="reason"
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnchangeInput(e, "reason")}
                                        className="form-control"
                                    ></input>
                                    <span className="text-red">{isSubmit && errorArray.reason && errorArray.reason}</span>
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <div className="form-control wrap-datepicker">
                                        <DatePicker selected={this.state.birthday} onChange={(date) => this.handleOnchangeInputDay(date)} />
                                        <span className="text-red">{isSubmit && errorArray.birthday && errorArray.birthday}</span>
                                    </div>
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select value={gender} name="gender" onChange={this.handleChangeSelect} options={genders} />
                                    <span className="text-red">{isSubmit && errorArray.gender && errorArray.gender}</span>
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button onClick={() => this.handleConfirmBooking()} className="btn-booking-confirm font-weight-bold">
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button onClick={() => closeBookingModal()} className="btn-booking-cancel font-weight-bold">
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        gender: state.admin.gender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
