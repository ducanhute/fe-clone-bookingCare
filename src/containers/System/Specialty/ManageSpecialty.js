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
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, savedProps) {}
    handleOnechangeInput = (e) => {
        let copyState = { ...this.state };
        copyState[e.target.name] = e.target.value;
        this.setState(copyState);
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
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
            name: this.state.name,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
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
                        <label>Tên chuyên khoa</label>
                        <input value={this.state.name} name="name" onChange={(e) => this.handleOnechangeInput(e)} className="form-control" type="text"></input>
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input onChange={(e) => this.handleOnechangeImage(e)} className="form-control-file" type="file"></input>
                    </div>
                    <div className="col-12">
                        <MdEditor
                            value={this.state.descriptionMarkdown}
                            style={{ height: "600px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <div className="col-12">
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
