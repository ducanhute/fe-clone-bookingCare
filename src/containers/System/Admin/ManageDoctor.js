/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { getDetailDoctorById } from "../../../services/userService";

import "react-markdown-editor-lite/lib/index.css";
import "./MangeDoctor.scss";
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Markdown table
            contentHTML: "",
            contentMarkdown: "",
            selectedDoctor: "",
            description: "",
            allDoctors: [],
            hasOldData: false,
            //Save to doctor_infor table
            listPrices: [],
            listPayments: [],
            listProvinces: [],
            listSpecialties: [],
            listClinics: [],

            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            selectedClinic: "",
            selectedSpecialty: "",

            clinicName: "",
            clinicAddress: "",
            note: "",
        };
    }
    buildDataInputSelector = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === "SPECIALTY" || type === "CLINIC") {
                inputData.map((item, index) => {
                    let Object = {};
                    Object.label = item.name;
                    Object.value = item.id;
                    result.push(Object);
                });
                return result;
            }
            inputData.map((item, index) => {
                let Object = {};
                let labelVi = type === "USER" ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === "USER" ? `${item.firstName} ${item.lastName}` : item.valueEn;
                Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                Object.value = type === "USER" ? item.id : item.keyMap;
                result.push(Object);
            });
        }
        return result;
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedFieldManageDoctor !== prevProps.selectedFieldManageDoctor || this.props.allDoctors !== prevProps.allDoctors) {
            let allDoctors = this.buildDataInputSelector(this.props.allDoctors, "USER");
            if (
                this.props.selectedFieldManageDoctor.resPrice &&
                this.props.selectedFieldManageDoctor.resPayment &&
                this.props.selectedFieldManageDoctor.resProvince &&
                this.props.selectedFieldManageDoctor.resSepecialty &&
                this.props.selectedFieldManageDoctor.resClinic
            ) {
                let listPrices = this.buildDataInputSelector(this.props.selectedFieldManageDoctor.resPrice.data);
                let listPayments = this.buildDataInputSelector(this.props.selectedFieldManageDoctor.resPayment.data);
                let listProvinces = this.buildDataInputSelector(this.props.selectedFieldManageDoctor.resProvince.data);
                let listSpecialties = this.buildDataInputSelector(this.props.selectedFieldManageDoctor.resSepecialty.data, "SPECIALTY");
                let listClinics = this.buildDataInputSelector(this.props.selectedFieldManageDoctor.resClinic.data, "CLINIC");
                this.setState({
                    allDoctors: allDoctors.reverse(),
                    listPrices: listPrices,
                    listProvinces: listProvinces,
                    listPayments: listPayments,
                    listSpecialties: listSpecialties,
                    listClinics: listClinics,
                });
            }
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getAllDoctorManageSelectedField();
    }
    async handleSaveContentMarkdown() {
        let { hasOldData } = this.state;
        // console.log("check state", this.state);
        await this.props.saveDetailInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            //
            selectedPrice: this.state.selectedPrice && this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince && this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment && this.state.selectedPayment.value,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : "",
            specialtyId: this.state.selectedSpecialty && this.state.selectedSpecialty.value,
        });
        this.setState({
            contentHTML: "",
            contentMarkdown: "",
            selectedDoctor: "",
            description: "",
            hasOldData: false,
            // listPrices: [],
            // listPayments: [],
            // listProvinces: [],
            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            selectedSpecialty: "",
            selectedClinic: "",
            clinicName: "",
            clinicAddress: "",
            note: "",
        });
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };
    handleChangeSelect = async (selectedOption, name) => {
        let key = name.name;
        let stateCopy = { ...this.state };
        stateCopy[key] = selectedOption;
        this.setState({
            ...stateCopy,
        });
        if (key === "selectedDoctor") {
            let res = await getDetailDoctorById(selectedOption.value);
            if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.description) {
                let markdown = res.data.Markdown;
                let { listPayments, listPrices, listProvinces, listSpecialties, listClinics } = this.state;
                let clinicAddress = "",
                    clinicName = "",
                    note = "",
                    paymentId = "",
                    priceId = "",
                    provinceId = "",
                    specialtyId = "",
                    clinicId = "",
                    selectedProvince = "",
                    selectedPayment = "",
                    selectedPrice = "",
                    selectedClinic = "",
                    selectedSpecialty = "";

                if (res.data.Doctor_Info) {
                    clinicAddress = res.data.Doctor_Info.clinicAddress;
                    clinicName = res.data.Doctor_Info.clinicName;
                    note = res.data.Doctor_Info.note;

                    paymentId = res.data.Doctor_Info.paymentId;
                    priceId = res.data.Doctor_Info.priceId;
                    provinceId = res.data.Doctor_Info.provinceId;
                    specialtyId = res.data.Doctor_Info.specialtyId;
                    clinicId = res.data.Doctor_Info.clinicId;

                    selectedPrice = listPrices.find((item) => {
                        return item && item.value === priceId;
                    });
                    selectedPayment = listPayments.find((item) => {
                        return item && item.value === paymentId;
                    });
                    selectedProvince = listProvinces.find((item) => {
                        return item && item.value === provinceId;
                    });
                    selectedSpecialty = listSpecialties.find((item) => {
                        return item && item.value == specialtyId;
                    });
                    selectedClinic = listClinics.find((item) => {
                        return item && item.value == clinicId;
                    });
                }
                this.setState({
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description,
                    hasOldData: true,

                    clinicAddress: clinicAddress ? clinicAddress : "",
                    clinicName: clinicName ? clinicAddress : "",
                    note: note ? note : "",
                    selectedPrice: selectedPrice ? selectedPrice : "",
                    selectedPayment: selectedPayment ? selectedPayment : "",
                    selectedProvince: selectedProvince ? selectedProvince : "",
                    selectedSpecialty: selectedSpecialty ? selectedSpecialty : "",
                    selectedClinic: selectedClinic ? selectedClinic : "",
                });
            } else {
                this.setState({
                    contentHTML: "",
                    contentMarkdown: "",
                    description: "",
                    hasOldData: false,
                    clinicAddress: "",
                    clinicName: "",
                    note: "",
                    selectedPrice: [],
                    selectedPayment: [],
                    selectedProvince: [],
                    selectedSpecialty: [],
                    selectedClinic: [],
                });
            }
        }
    };

    handleOnChangeText(e, id) {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    }

    render() {
        const {
            selectedDoctor,
            hasOldData,
            selectedPrice,
            selectedProvince,
            selectedSpecialty,
            selectedClinic,
            listPrices,
            listProvinces,
            selectedPayment,
            listPayments,
            listSpecialties,
            listClinics,
        } = this.state;
        return (
            <div className="manage-doctor-container p-4 ">
                <h2 className="text-center font-weight-bold my-2 text-uppercase">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </h2>
                <div className="more-info d-flex my-4">
                    <div className="content-left form-group w-25 pr-4">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                        </label>
                        <Select
                            value={selectedDoctor}
                            name="selectedDoctor"
                            onChange={this.handleChangeSelect}
                            options={this.state.allDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className="content-right w-75 pl-4">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.introduction-information" />
                        </label>
                        <textarea
                            className=" form-control"
                            rows="4"
                            onChange={(e) => this.handleOnChangeText(e, "description")}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="extra-information">
                    <div className="row">
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.price" />
                            </label>
                            <Select
                                value={selectedPrice}
                                onChange={this.handleChangeSelect}
                                name="selectedPrice"
                                options={listPrices}
                                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.payment" />
                            </label>
                            <Select value={selectedPayment} name="selectedPayment" onChange={this.handleChangeSelect} options={listPayments} />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.choose-province" />
                            </label>
                            <Select value={selectedProvince} name="selectedProvince" onChange={this.handleChangeSelect} options={listProvinces} />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.clinic-name" />
                            </label>
                            <input className="form-control" onChange={(e) => this.handleOnChangeText(e, "clinicName")} value={this.state.clinicName}></input>
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.clinic-address" />
                            </label>
                            <input
                                className="form-control"
                                onChange={(e) => this.handleOnChangeText(e, "clinicAddress")}
                                value={this.state.clinicAddress}
                            ></input>
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.notes" />
                            </label>
                            <input className="form-control" onChange={(e) => this.handleOnChangeText(e, "note")} value={this.state.note}></input>
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.choose-specialty" />
                            </label>
                            <Select value={selectedSpecialty} name="selectedSpecialty" onChange={this.handleChangeSelect} options={listSpecialties} />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.choose-clinic" />
                            </label>
                            <Select value={this.state.selectedClinic} name="selectedClinic" onChange={this.handleChangeSelect} options={listClinics} />
                        </div>
                    </div>
                </div>
                <MdEditor
                    value={this.state.contentMarkdown}
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                />
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData ? "save-btn btn btn-warning mt-2" : "save-btn btn btn-primary mt-2"}
                >
                    {hasOldData ? "Sửa thông tin" : "Lưu thông tin"}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctor: state.admin.topDoctor,
        allDoctors: state.admin.allDoctors,
        selectedFieldManageDoctor: state.admin.selectedFieldManageDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
        saveDetailInfoDoctor: (data) => dispatch(actions.saveDetailInfoDoctor(data)),
        getAllDoctorManageSelectedField: () => dispatch(actions.getAllDoctorManageSelectedField()),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
