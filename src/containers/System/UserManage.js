import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManager.scss";
import {
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenEditModalUser: false,
      userEdit: {},
    };
  }
  /** Life cycle
   * Khi run một component:
   * 1. Run constructor: init các state
   * 2.Chạy vào Did mount: khi muốn gán giá trị cho một state nào đấy:Trong hàm này sẽ gọi api lấy dữ liêu
   * để cho thằng react render ra giao diện
   * 3. Hàm render
   */
  async componentDidMount() {
    await this.getAllUserFromReact();
  }
  getAllUserFromReact = async () => {
    let response = await getAllUser("All");
    if (response && response.errCode === 0) {
      // check có response và mã lỗi = 0
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenEditModalUser: !this.state.isOpenEditModalUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        // Success fully created user
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_USER", {});
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (userId) => {
    try {
      let response = await deleteUserService(userId);
      if (response && response.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleEditUser = async (currentUser) => {
    this.setState({
      isOpenEditModalUser: true,
      userEdit: currentUser,
    });
  };
  doEditUser = async (user) => {
    try {
      let response = await editUserService(user);
      console.log(response);
      if (response && response.errCode === 0) {
        this.setState({
          isOpenEditModalUser: false,
        });
        this.getAllUserFromReact();
      } else {
        // alert( response.errCode);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenEditModalUser && (
          <ModalEditUser
            isOpen={this.state.isOpenEditModalUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="tile text-center">Booking-care </div>
        <button
          className="btn btn-primary px-2 mx-2"
          onClick={() => this.handleAddNewUser()}
        >
          <i className="fa-solid fa-user-plus"></i>
          Add new users:
        </button>
        <div className="User-table mt-4 mx-5">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrUsers.map((arrUser, index) => {
                return (
                  <tr key={index}>
                    <td>{arrUser.email}</td>
                    <td>{arrUser.firstName}</td>
                    <td>{arrUser.lastName}</td>
                    <td>{arrUser.address}</td>
                    <td className="action-col">
                      <button
                        className="edit-btn"
                        onClick={() => this.handleEditUser(arrUser)}
                      >
                        <i className=" fas fa-pencil-alt"></i> Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => this.handleDeleteUser(arrUser.id)}
                      >
                        <i className=" fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
