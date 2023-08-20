import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_USER", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }
  componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnchangeInput = (event, id) => {
    // Khong khuyen khich viet cach nay
    // this.state[id] = event.target.value;
    // this.setState({
    //     ...this.state
    // },  () => {
    //     console.log("bad state:", this.state)
    // })
    // Good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  // validate form
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter:" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = async () => {
    let isvalid = this.checkValidateInput();
    if (isvalid === true) {
      // Goi API
      // console.log("data:", this.state)
      await this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className="modal-user-container"
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Create a new users!</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email:</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "password");
                }}
                value={this.state.password}
              ></input>
            </div>
            <div className="input-container">
              <label>FirstName</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              ></input>
            </div>
            <div className="input-container">
              <label>LastName</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              ></input>
            </div>
            <div className="input-container max-width-input">
              <label>Address:</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
                value={this.state.address}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleAddNewUser();
            }}
            className="px-3"
          >
            Save
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle} className="px-3">
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
