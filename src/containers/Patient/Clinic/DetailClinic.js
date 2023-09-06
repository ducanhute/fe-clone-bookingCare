import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/Sections/HomeHeader";
import DoctorSchedule from "../Doctors/DoctorSchedule";
import DoctorExtraInfro from "../Doctors/DoctorExtraInfro";
import ProfileDoctor from "../Doctors/ProfileDoctor";
import { getAllDetailClinicById, getAllCodeService } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            selectedProvince: "",
            isShowMoreDescription: false,
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailClinicById({ id: id });
            if (res && res.errCode === 0) {
                let arrDoctorId = [];
                if (res.data && !_.isEmpty(res.data)) {
                    let arr = res.data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(+item.doctorId);
                        });
                    }
                }
                this.setState({ dataDetailClinic: res.data, arrDoctorId: arrDoctorId });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, savedProps) {}

    handleToggleShowContent() {
        this.setState({
            isShowMoreDescription: !this.state.isShowMoreDescription,
        });
    }
    render() {
        let { arrDoctorId, dataDetailClinic, isShowMoreDescription } = this.state;

        let { language } = this.props;

        return (
            <div className="detail-specialty-container">
                <HomeHeader />

                <div className="description-specialty mt-5 pt-5">
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                        <>
                            <h4 className="text-center font-weight-bold">{dataDetailClinic.name}</h4>
                            <div
                                className={isShowMoreDescription ? "description-specialty-content show-more" : "description-specialty-content"}
                                dangerouslySetInnerHTML={{ __html: `${dataDetailClinic.descriptionHTML}` }}
                            ></div>
                        </>
                    )}
                    <div
                        className="show-more-specialty-info text-high-light"
                        onClick={() => {
                            this.handleToggleShowContent();
                        }}
                    >
                        {isShowMoreDescription ? "Ẩn bớt" : "Xem thêm"}
                    </div>
                </div>
                <div className="wrap-content-secialty">
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
