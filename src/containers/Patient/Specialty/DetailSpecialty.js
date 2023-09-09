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
            isShowMoreDescription: false,
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
                            arrDoctorId.push(+item.doctorId);
                        });
                    }
                }
                if (resProvince && resProvince.data.length > 0) {
                    resProvince.data.unshift({
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "All location",
                        valueVi: "Toàn quốc",
                    });
                }
                this.setState({ dataDetailSpecialty: res.data, arrDoctorId: arrDoctorId, listProvince: resProvince.data ? resProvince.data : [] });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, savedProps) {}
    handleOnchangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = e.target.value;

            let res = await getAllSpecialtyById({ id: id, location: location });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;

                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(+item.doctorId);
                        });
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    selectedProvince: location,
                });
            }
        }
    };
    handleToggleShowContent() {
        this.setState({
            isShowMoreDescription: !this.state.isShowMoreDescription,
        });
    }
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince, isShowMoreDescription } = this.state;
        let { language } = this.props;

        return (
            <div className="detail-specialty-container">
                <HomeHeader />

                <div className="description-specialty mt-5 pt-5">
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                        <div
                            className={isShowMoreDescription ? "description-specialty-content show-more" : "description-specialty-content"}
                            dangerouslySetInnerHTML={{
                                __html: `${language === LANGUAGES.VI ? dataDetailSpecialty.descriptionHTMLVi : dataDetailSpecialty.descriptionHTMLEn}`,
                            }}
                        ></div>
                    )}
                    <div
                        className="show-more-specialty-info text-high-light"
                        onClick={() => {
                            this.handleToggleShowContent();
                        }}
                    >
                        {language === LANGUAGES.VI && (isShowMoreDescription ? "Ẩn bớt" : "Xem thêm")}
                        {language === LANGUAGES.EN && (isShowMoreDescription ? "Hide less" : "See more...")}
                    </div>
                </div>
                <div className="wrap-content-secialty">
                    <div className="filter-specialty my-2">
                        <select className="minimal" onChange={(e) => this.handleOnchangeSelect(e)} value={this.state.selectedProvince}>
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap} className="cursor-pointer">
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div key={index} className="part-package">
                                    <div className="each-doctor d-flex">
                                        <div className="dt-content-left w-50">
                                            <h1>
                                                <ProfileDoctor isShowDescriptionDoctor={true} doctorId={item} isShowLinkDetail={true} />
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
