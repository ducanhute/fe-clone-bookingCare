import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        };
    }
    componentDidMount() {
        this.props.fetchUsersRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            });
        }
    }
    handleDeleteUser = async (userId) => {
        await this.props.deleteUsersStart(userId);
        this.props.fetchUsersRedux();
    };
    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    };
    render() {
        let arrayUsers = this.state.userRedux;
        return (
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrayUsers &&
                        arrayUsers.length > 0 &&
                        arrayUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td className="action-col">
                                        <button className="edit-btn" onClick={() => this.handleEditUser(item)}>
                                            <i className=" fas fa-pencil-alt"></i> Edit
                                        </button>
                                        <button className="delete-btn" onClick={() => this.handleDeleteUser(item.id)}>
                                            <i className=" fas fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUsersStart: (userId) => dispatch(actions.deleteUsersStart(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
