import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Spinner from "../../../utils/loadingEffect";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayGender: [],
            arrayPosition: [],
            arrayRole: [],
            previewImageUrl: "",
            isOpen: false,

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",

            action: "",
            userEditId: "",
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let genderRedux = this.props.genderRedux;
            this.setState({
                arrayGender: this.props.genderRedux,
                gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : "",
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let positionRedux = this.props.positionRedux;
            this.setState({
                arrayPosition: this.props.positionRedux,
                position: positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : "",
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let roleRedux = this.props.roleRedux;
            this.setState({
                arrayRole: this.props.roleRedux,
                role: roleRedux && roleRedux.length > 0 ? roleRedux[0].keyMap : "",
            });
        }
        // Clear data after creating user
        if (prevProps.listUsers !== this.props.listUsers) {
            let roleRedux = this.props.roleRedux;
            let positionRedux = this.props.positionRedux;
            let genderRedux = this.props.genderRedux;
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                avatar: "",
                role: roleRedux && roleRedux.length > 0 ? roleRedux[0].keyMap : "",
                position: positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : "",
                gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : "",
                action: CRUD_ACTIONS.CREATE,
                previewImageUrl: "",
            });
        }
    }
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            // decode mage
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                avatar: base64,
            });
        }
    };
    openReviewImage = () => {
        if (!this.state.previewImageUrl) {
            return;
        }
        this.setState({ isOpen: true });
    };
    handleSaveUser = async () => {
        let isValid = this.checkValidateInput();
        if (!isValid) {
            return;
        }
        // fire redux action
        if (this.state.action === CRUD_ACTIONS.CREATE) {
            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar,
            });
            this.props.fetchUsersRedux();
        }
        if (this.state.action === CRUD_ACTIONS.EDIT) {
            // API edit
            await this.props.editUsersStart({
                id: this.state.userEditId,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar,
            });

            this.props.fetchUsersRedux();
        }
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(`Missing ${arrCheck[i]} field`);
                break;
            }
        }
        return isValid;
    };
    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({ ...copyState });
    };
    handleEditUserFromParent = (user) => {
        //Image base64
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer.from(user.image, "base64").toString("binary");
        }
        this.setState({
            email: user.email,
            password: "NoPassword",
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            role: user.roleId,
            position: user.positionId,
            gender: user.gender,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImageUrl: imageBase64,
        });
    };
    handleCancelEditUser = () => {
        let roleRedux = this.props.roleRedux;
        let positionRedux = this.props.positionRedux;
        let genderRedux = this.props.genderRedux;
        this.setState({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            avatar: "",
            role: roleRedux && roleRedux.length > 0 ? roleRedux[0].keyMap : "",
            position: positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : "",
            gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : "",
            action: CRUD_ACTIONS.CREATE,
            previewImageUrl: "",
        });
    };
    render() {
        let genders = this.state.arrayGender;
        let positions = this.state.arrayPosition;
        let roles = this.state.arrayRole;
        let { language, isLoading } = this.props;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title">User redux </div>
                <div className="position-relative p-2">{isLoading === true ? <Spinner /> : ""}</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 font-weight-bold my-3">
                                <FormattedMessage id="manage-user.add-new-user" />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) => this.handleOnchangeInput(e, "email")}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => this.handleOnchangeInput(e, "password")}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input className="form-control" type="text" value={firstName} onChange={(e) => this.handleOnchangeInput(e, "firstName")} />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input className="form-control" type="text" value={lastName} onChange={(e) => this.handleOnchangeInput(e, "lastName")} />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    className="form-control phone-number-input"
                                    type="number"
                                    value={phoneNumber}
                                    onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")}
                                    placeholder="Number only..."
                                />
                            </div>
                            <div className="col-9">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input className="form-control" type="text" value={address} onChange={(e) => this.handleOnchangeInput(e, "address")} />
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select value={gender} className="form-control" onChange={(e) => this.handleOnchangeInput(e, "gender")}>
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((gender, index) => {
                                            return (
                                                <option value={gender.keyMap} key={index}>
                                                    {language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select value={position} className="form-control" onChange={(e) => this.handleOnchangeInput(e, "position")}>
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((position, index) => {
                                            return (
                                                <option value={position.keyMap} key={index}>
                                                    {language === LANGUAGES.VI ? position.valueVi : position.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select value={role} className="form-control" onChange={(e) => this.handleOnchangeInput(e, "role")}>
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((role, index) => {
                                            return (
                                                <option value={role.keyMap} key={index}>
                                                    {language === LANGUAGES.VI ? role.valueVi : role.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    <input id="upload" className="" type="file" hidden onChange={(e) => this.handleOnchangeImage(e)} />
                                    <label htmlFor="upload" className="label-upload">
                                        Tải ảnh <i className="fas fa-upload"></i>
                                    </label>
                                    <div
                                        className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                        onClick={() => this.openReviewImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-12 my-3 d-flex">
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )}
                                </button>
                                {this.state.action === CRUD_ACTIONS.EDIT ? (
                                    <button className="btn btn-danger ml-2" onClick={() => this.handleCancelEditUser()}>
                                        <FormattedMessage id="manage-user.cancel" />
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-12 mb-5 text-center">
                                <TableManageUser handleEditUserFromParent={this.handleEditUserFromParent} action={this.state.action}></TableManageUser>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Preview image */}
                {this.state.isOpen && <Lightbox mainSrc={this.state.previewImageUrl} onCloseRequest={() => this.setState({ isOpen: false })} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.gender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoading: state.admin.isLoading,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUsersStart: (data) => dispatch(actions.editUsersStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
