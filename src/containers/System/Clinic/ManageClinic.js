import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManageClinic.scss";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            address: "",
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
    handleSaveNewClinic = async () => {
        let res = await createNewClinic({
            name: this.state.name,
            address: this.state.address,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
        });
        if (res && res.errCode === 0) {
            toast.success("Create new specialty successfully!");
        } else {
            toast.error(res.errMessage);
        }
    };
    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>

                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên phòng khám</label>
                        <input value={this.state.name} name="name" onChange={(e) => this.handleOnechangeInput(e)} className="form-control" type="text"></input>
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh phòng khám</label>
                        <input onChange={(e) => this.handleOnechangeImage(e)} className="form-control-file" type="file"></input>
                    </div>
                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input
                            value={this.state.address}
                            name="address"
                            onChange={(e) => this.handleOnechangeInput(e)}
                            className="form-control"
                            type="text"
                        ></input>
                    </div>
                    <div className="col-12">
                        <MdEditor
                            value={this.state.descriptionMarkdown}
                            style={{ height: "400px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <div className="col-12">
                        <button onClick={() => this.handleSaveNewClinic()} className="btn-save-specialty my-4">
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
