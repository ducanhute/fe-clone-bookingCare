import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import NumberFormat from "react-number-format";
import { LANGUAGES } from "../../../../utils";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    render() {
        let { isOpenModal, closeBookingModal, dataScheduleTimeModal, price, language } = this.props;
        console.log("check", price);
        let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : "";
        return (
            <>
                <Modal isOpen={isOpenModal} size="lg" centered className="wrap-all-modal">
                    <div className="modal-booking-container">
                        <div className="booking-modal-header">
                            <span className="left">Thông tin đặt lịch khám bệnh</span>
                            <span className="right" onClick={() => closeBookingModal()}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-info">
                                <ProfileDoctor isShowDescriptionDoctor={false} doctorId={doctorId} dataScheduleTimeModal={dataScheduleTimeModal} />
                            </div>
                            <div className="price mt-2">
                                Giá khám:&nbsp;
                                {price && language === LANGUAGES.VI && (
                                    <NumberFormat
                                        className="currency"
                                        displayType="text"
                                        value={price.valueVi}
                                        suffix="VND"
                                        thousandSeparator=","
                                    ></NumberFormat>
                                )}
                                {price && language === LANGUAGES.EN && (
                                    <NumberFormat className="currency" displayType="text" value={price.valueEn} suffix="$" thousandSeparator=","></NumberFormat>
                                )}
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ tên</label>
                                    <input className="form-control"></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input className="form-control"></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Email</label>
                                    <input className="form-control"></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ liên hệ</label>
                                    <input className="form-control"></input>
                                </div>
                                <div className="col-12 form-group">
                                    <label>Lý do khám</label>
                                    <input className="form-control"></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Đặt cho ai</label>
                                    <input className="form-control"></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    <input className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className="btn-booking-confirm">Xác nhận</button>
                            <button onClick={() => closeBookingModal()} className="btn-booking-cancel">
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
