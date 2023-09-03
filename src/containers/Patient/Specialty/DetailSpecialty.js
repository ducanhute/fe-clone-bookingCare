import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/Sections/HomeHeader";
import DoctorSchedule from "../Doctors/DoctorSchedule";
import DoctorExtraInfro from "../Doctors/DoctorExtraInfro";
import ProfileDoctor from "../Doctors/ProfileDoctor";
import { getAllSpecialtyById, getAllCodeService } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            selectedProvince: "",
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllSpecialtyById({ id: id, location: "ALL" });
            let resProvince = await getAllCodeService("PROVINCE");
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let arrDoctorId = [];
                if (res.data && !_.isEmpty(res.data)) {
                    let arr = res.data.doctorSpecialty;

                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({ dataDetailSpecialty: res.data, arrDoctorId: arrDoctorId, listProvince: resProvince.data });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, savedProps) {}
    handleOnchangeSelect = (e) => {
        this.setState({
            selectedProvince: e.target.value,
        });
    };
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />

                <div className="description-specialty mt-5 pt-5">
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                        <div dangerouslySetInnerHTML={{ __html: `${dataDetailSpecialty.descriptionHTML}` }}></div>
                    )}
                </div>
                <div className="wrap-content-secialty">
                    <div className="seach-sp-btn">
                        <select onChange={(e) => this.handleOnchangeSelect(e)} value={this.state.selectedProvince}>
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {arrDoctorId.map((item, index) => {
                        return (
                            <div key={index} className="part-package">
                                <div className="each-doctor d-flex" key={index}>
                                    <div className="dt-content-left w-50">
                                        <h1>
                                            <ProfileDoctor isShowDescriptionDoctor={true} doctorId={item} />
                                        </h1>
                                    </div>
                                    <div className="dt-content-right w-50">
                                        <div className="doctor-extra">
                                            <DoctorExtraInfro doctorId={item} />
                                        </div>
                                        <div className="doctorSchedule">
                                            <DoctorSchedule doctorId={item} />;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    b;
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
