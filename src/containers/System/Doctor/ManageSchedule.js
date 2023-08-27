import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import Select from "react-select";

import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import "./ManageSchedule.scss";
import DatePicker from "../../../components/Input/DatePicker"; // custom component
import { saveBulkScheDuleDoctor } from "../../../services/userService";
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            selectedDoctor: {},
            currentDate: "",
            allScheduleTimes: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allDoctors !== prevProps.allDoctors) {
            let allDoctors = this.buildDataInputSelector(this.props.allDoctors);
            this.setState({
                allDoctors: allDoctors,
            });
        }
        if (this.props.allScheduleTimes !== prevProps.allScheduleTimes) {
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                // data.map((item) => {
                //     item.selected = false;
                // });
                data = data.map((item) => {
                    return { ...item, isSelected: false };
                });
            }
            this.setState({
                allScheduleTimes: data,
            });
        }
    }
    buildDataInputSelector = (inputData) => {
        inputData = inputData.reverse();
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let Object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                Object.value = item.id;
                result.push(Object);
            });
        }
        return result;
    };
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption }, () => console.log(`Option selected:`, this.state.selectedDoctor));
    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };
    handleClickBtnTime = (inputItem) => {
        let { allScheduleTimes } = this.state;
        if (allScheduleTimes && allScheduleTimes.length > 0) {
            allScheduleTimes = allScheduleTimes.map((item) => {
                if (item.id === inputItem.id) item.isSelected = !item.isSelected;
                return item;
            });
            this.setState({
                allScheduleTimes: allScheduleTimes,
            });
        }
    };
    handleSaveSchedule = async () => {
        let { selectedDoctor, allScheduleTimes, currentDate } = this.state;
        let result = [];
        let formatDate = new Date(currentDate).getTime();
        if (!currentDate) {
            toast.error("Invalid date");
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Please select a doctor");
            return;
        }

        if (allScheduleTimes && allScheduleTimes.length > 0) {
            let selectedTimes = allScheduleTimes.filter((item) => {
                return item.isSelected;
            });
            if (selectedTimes && selectedTimes.length > 0) {
                selectedTimes.map((item) => {
                    let selectedInfo = {};
                    selectedInfo.doctorId = selectedDoctor.value;
                    selectedInfo.date = formatDate;
                    selectedInfo.timeType = item.keyMap;
                    result.push(selectedInfo);
                });
            } else {
                toast.error("You haven't selected times yet");
            }
        }

        let res = await saveBulkScheDuleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatDate,
        });
        console.log("result  form server ", res);
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
        }
        if (res && res.errCode === 2) {
            toast.error(res.errMessage);
        }
    };
    render() {
        let { selectedDoctor, allDoctors, allScheduleTimes } = this.state;
        let { language } = this.props;
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title text-uppercase text-center font-weight-bold my-3">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label className="font-weight-bold">
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select value={selectedDoctor} onChange={this.handleChangeSelect} options={allDoctors} />
                        </div>
                        <div className="col-6 form-group">
                            <label className="font-weight-bold">
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker className="form-control" onChange={this.handleOnchangeDatePicker} value={this.state.currentDate} minDate={new Date()} />
                        </div>

                        <div className="col-12">
                            <h6 className="text-uppercase font-weight-bold">
                                <FormattedMessage id="manage-schedule.schedule-time" />
                            </h6>
                            <div className="pick-hour-container d-flex flex-wrap">
                                {allScheduleTimes &&
                                    allScheduleTimes.length > 0 &&
                                    allScheduleTimes.map((item, index) => {
                                        return (
                                            <button
                                                onClick={() => this.handleClickBtnTime(item)}
                                                className={item.isSelected ? "item-btn btn active" : "item-btn btn"}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        );
                                    })}
                            </div>
                            <button className="btn btn-primary mt-3" onClick={() => this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.save-btn" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTimes: state.admin.allScheduleTimes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
