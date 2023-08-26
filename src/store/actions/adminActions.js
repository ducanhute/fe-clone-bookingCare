import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUser,
    deleteUserService,
    editUserService,
    getTopDocTorHomeService,
    getAllDoctorService,
    saveDoctorDetailService,
} from "../../services/userService";
import { toast } from "react-toastify";
// Get gender, position and role
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                // console.log("get state", getState);
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchGenderFailed());
        }
    };
};
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchPositionFailed());
        }
    };
};
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchRoleFailed());
        }
    };
};
// Create new user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Created new user successfully");
                dispatch(createNewUserSuccess());
            } else {
                dispatch(createNewUserFailed());
                if (res && res.errCode === 1) {
                    toast.error(res.errMessage);
                } else {
                    toast.error("Fail to create new user");
                }
            }
        } catch (e) {
            console.log(e);
            dispatch(createNewUserFailed());
            toast.error("Fail to create new user");
        }
    };
};
// Gender
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});
// Position
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});
// Role
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});
// Create new user
export const createNewUserSuccess = (roleData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: roleData,
});
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});
// get all user
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(deleteAllUsersFailed());
            }
        } catch (e) {
            console.log(e);
            dispatch(deleteAllUsersFailed());
        }
    };
};

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: data,
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});
// Delete users
export const deleteUsersStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete user successfully");
                dispatch(deleteUsersSuccess());
            } else {
                dispatch(deleteAllUsersFailed());
            }
        } catch (e) {
            console.log(e);
            toast.error("Error deleting user");
            dispatch(deleteAllUsersFailed());
        }
    };
};
export const deleteUsersSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteAllUsersFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});
// Edit user
export const editUsersStart = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(inputData);
            console.log("edit usr respnd", res);
            if (res && res.errCode === 0) {
                toast.success("Edit user successfully");
                dispatch(editUsersSuccess());
            } else {
                dispatch(editAllUsersFailed());
            }
        } catch (e) {
            console.log(e);
            toast.error("Error editing user");
            dispatch(editAllUsersFailed());
        }
    };
};
export const editUsersSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const editAllUsersFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});
// fetch top doctor
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDocTorHomeService("10");
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (e) {
            console.log(e);
            toast.error("Error editing user");
            dispatch(fetchTopDoctorFailed());
        }
    };
};
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: data,
});
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});
// get all doctor
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorFailed());
            }
        } catch (e) {
            console.log(e);
            toast.error("Error editing user");
            dispatch(fetchAllDoctorFailed());
        }
    };
};
export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: data,
});
export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
});
// Save details info about doctor
export const saveDetailInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDoctorDetailService(data);
            if (res && res.errCode === 0) {
                toast.success("Save information successfully");
                dispatch(saveDetailInfDoctorSuccess());
            } else {
                dispatch(saveDetailDoctorFailed());
            }
        } catch (e) {
            console.log(e);
            toast.error("Error editing user");
            dispatch(saveDetailDoctorFailed());
        }
    };
};
export const saveDetailInfDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});
export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

// fetch all schedules time
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");

            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(res.data));
            } else {
                dispatch(fetchAllScheduleTimeFailed());
            }
        } catch (e) {
            console.log(e);
            toast.error("Error editing user");
            dispatch(fetchAllScheduleTimeFailed());
        }
    };
};
export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_SCHEDULE_TIME_SUCCESS,
    data: data,
});
export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_SCHEDULE_TIME_FAILED,
});
