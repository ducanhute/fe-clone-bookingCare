import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManageSpecialty.scss";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameVi: "",
            nameEn: "",
            imageBase64: "",
            descriptionHTMLVi: "",
            descriptionMarkdownVi: "",
            descriptionHTMLEn: "",
            descriptionMarkdownEn: "",
        };
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, savedProps) {}
    handleOnechangeInput = (e) => {
        let copyState = { ...this.state };
        copyState[e.target.name] = e.target.value;
        this.setState(copyState);
    };
    handleEditorChangeVi = ({ html, text }) => {
        this.setState({
            descriptionHTMLVi: html,
            descriptionMarkdownVi: text,
        });
    };
    handleEditorChangeEn = ({ html, text }) => {
        this.setState({
            descriptionHTMLEn: html,
            descriptionMarkdownEn: text,
        });
    };
    handleOnechangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            // decode mage
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };
    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty({
            nameVi: this.state.nameVi,
            nameEn: this.state.nameEn,
            imageBase64: this.state.imageBase64,
            descriptionHTMLVi: this.state.descriptionHTMLVi,
            descriptionMarkdownVi: this.state.descriptionMarkdownVi,
            descriptionHTMLEn: this.state.descriptionHTMLEn,
            descriptionMarkdownEn: this.state.descriptionMarkdownEn,
        });
        if (res && res.errCode === 0) {
            toast.success("Create new specialty successfully!");
        } else {
            toast.error("Failed to create a new user!");
        }
    };
    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa (Vietnamese)</label>
                        <input
                            value={this.state.nameVi}
                            name="nameVi"
                            onChange={(e) => this.handleOnechangeInput(e)}
                            className="form-control"
                            type="text"
                        ></input>
                        <label>Tên chuyên khoa(English)</label>
                        <input
                            value={this.state.nameEn}
                            name="nameEn"
                            onChange={(e) => this.handleOnechangeInput(e)}
                            className="form-control"
                            type="text"
                        ></input>
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input onChange={(e) => this.handleOnechangeImage(e)} className="form-control-file" type="file"></input>
                    </div>
                    <div className="col-12">
                        <h5 className="font-weight-bold my-2">Vietnamese content</h5>
                        <MdEditor
                            value={this.state.descriptionMarkdownVi}
                            style={{ height: "400px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChangeVi}
                        />
                        <h5 className="font-weight-bold mt-4">English content</h5>
                        <MdEditor
                            value={this.state.descriptionMarkdownEn}
                            style={{ height: "400px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChangeEn}
                        />
                    </div>
                    <div className="col-12 my-4 text-right">
                        <button onClick={() => this.handleSaveNewSpecialty()} className="btn-save-specialty">
                            Save
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
