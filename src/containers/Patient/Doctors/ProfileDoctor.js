import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class ProfileDoctorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({ dataProfile: data });
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
        }
    }
    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;
        console.log("dfadf", dataProfile);
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
                    </div>
                    <div className="detail-info w-75">
                        <div className="name">
                            <h5 className="font-weight-bold">{language === LANGUAGES.VI ? textVi : textEn}</h5>
                        </div>
                        <div className="field">
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && <span>{dataProfile.Markdown.description}</span>}
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctorInfo);
