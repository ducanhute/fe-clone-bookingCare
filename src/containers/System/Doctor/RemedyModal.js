import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import moment from "moment";
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imgBase64: "",
        };
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email ? this.props.dataModal.email : "",
            });
        }
    }
    hanleOnchangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            // decode mage
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            });
        }
    };
    handlesendRemedy = () => {
        this.props.sendRemedy(this.state);
    };
    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;
        return (
            <>
                <Modal isOpen={isOpenModal} size="md" centered className="wrap-all-modal">
                    <ModalHeader toggle={closeRemedyModal}>Gửi hóa đơn khám bệnh thành công</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className=" col-6 form-group">
                                <label>Email bệnh viện</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={this.state.email}
                                    onChange={(e) => {
                                        this.hanleOnchangeEmail(e);
                                    }}
                                />
                            </div>

                            <div className="col-6 form-group">
                                <label>Chọn file đơn thuốc</label>
                                <input onChange={(e) => this.handleOnchangeImage(e)} className="form-control-file" type="file" />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handlesendRemedy}>
                            Send
                        </Button>{" "}
                        <Button color="secondary" onClick={closeRemedyModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        gender: state.admin.gender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
