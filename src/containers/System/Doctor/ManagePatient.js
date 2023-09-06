import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor, postSendRemedy } from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: [],
        };
    }
    async componentDidMount() {
        this.getDataPatient();
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };
    handleOnchangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            }
        );
    };
    async componentDidUpdate(prevProps, prevState, savedProps) {}
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };
    sendRemedy = async (dataFromChild) => {
        let { dataModal } = this.state;
        let res = await postSendRemedy({
            email: dataFromChild.email,
            imgBase64: dataFromChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            toast.success("Send Remedy successfully");
            await this.getDataPatient();
            this.closeRemedyModal();
        } else {
            toast.error("Something wrongs...");
        }
    };
    handleBtnSendPrescription = () => {};
    render() {
        let { dataPatient, dataModal, isOpenRemedyModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <div>
                    <h4 className="mt-4 font-weight-bold text-uppercase text-center">Quản lý bệnh nhân khám bệnh</h4>
                    <div className="container">
                        <div className="manage-patient-body row ">
                            <div className="col-4 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker className="form-control" onChange={this.handleOnchangeDatePicker} value={this.state.currentDate} />
                            </div>
                            <div className="col-12" id="table-patient">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Actions</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let gender =
                                                    language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-center">
                                                                <button onClick={() => this.handleBtnConfirm(item)} className="mp-btn-confirm button-33">
                                                                    Xác nhận
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr className=" text-center font-italic">
                                                <td colSpan="6">No data</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <RemedyModal sendRemedy={this.sendRemedy} isOpenModal={isOpenRemedyModal} dataModal={dataModal} closeRemedyModal={this.closeRemedyModal} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
