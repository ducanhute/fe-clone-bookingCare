/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import "./MangeDoctor.scss";
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHTML: "",
            contentMarkdown: "",
            selectedDoctor: "",
            description: "",
            allDoctors: [],
        };
    }
    buildDataInputSelector = (inputData) => {
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
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allDoctors !== prevProps.allDoctors) {
            let allDoctors = this.buildDataInputSelector(this.props.allDoctors);
            console.log("hihi", allDoctors);
            this.setState({
                allDoctors: allDoctors,
            });
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
    }
    handleSaveContentMarkdown() {
        this.props.saveDetailInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
        });
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };
    handleChange = (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption }, () => console.log(`Option selected:`, this.state.selectedDoctor));
    };
    handleOnChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    render() {
        let { allDoctors } = this.props;
        const { selectedDoctor } = this.state;
        return (
            <div className="manage-doctor-container p-4 ">
                <h2 className="text-center font-weight-bold my-2 text-uppercase">Tạo thông tin doctor</h2>
                <div className="more-info d-flex my-4">
                    <div className="content-left form-group w-25 pr-4">
                        <label>Bác sĩ</label>
                        <Select value={selectedDoctor} onChange={this.handleChange} options={this.state.allDoctors} />
                    </div>
                    <div className="content-right w-75 pl-4">
                        <label>Thông tin giới thiệu</label>
                        <textarea className=" form-control" rows="4" onChange={(e) => this.handleOnChangeDescription(e)} value={this.state.description}>
                            fsafasdf
                        </textarea>
                    </div>
                </div>
                <MdEditor style={{ height: "500px" }} renderHTML={(text) => mdParser.render(text)} onChange={this.handleEditorChange} />
                <button onClick={() => this.handleSaveContentMarkdown()} className="save-btn btn btn-primary mt-2">
                    Lưu thông tin
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailInfoDoctor: (data) => dispatch(actions.saveDetailInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
