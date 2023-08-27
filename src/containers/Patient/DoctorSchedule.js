import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import "moment/locale/vi";
import { LANGUAGES } from "../../utils";
import { getScheduleByDate } from "../../services/userService";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        };
    }
    createdArrayDay = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
            labelVi = labelVi.charAt(0).toUpperCase() + labelVi.slice(1);
            object.labelVi = labelVi;
            object.labelEn = moment(new Date()).add(i, "days").locale("en").format("dddd - DD/MM");
            object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        });
    };
    componentDidMount() {
        this.createdArrayDay();
    }
    handleOnchageSelect = async (e) => {
        let { doctorId } = this.props;
        console.log(doctorId);
        if (doctorId) {
            let date = e.target.value;
            let res = await getScheduleByDate(doctorId, date);
            console.log(res);
        }
    };
    render() {
        let { allDays } = this.state;
        let { language } = this.props;
        return (
            <Router>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
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
                </div>
            </Router>
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
