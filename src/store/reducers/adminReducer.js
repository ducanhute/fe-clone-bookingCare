import actionTypes from "../actions/actionTypes";

const initialState = {
    gender: [],
    roles: [],
    positions: [],
    isLoading: false,
    users: [],
    topDoctor: [],
    allScheduleTimes: [],
    allDoctors: [],
    selectedFieldManageDoctor: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // Gender
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoading = true;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.gender = action.data;
            state.isLoading = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoading = false;
            state.gender = [];
            return {
                ...state,
            };
        // Position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            };
        // Role
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctor = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTimes = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_SCHEDULE_TIME_FAILED:
            state.allScheduleTimes = [];
            return {
                ...state,
            };
        case actionTypes.GET_ALL_DOCTOR_MANGE_SELECT_FIELD_SUCCESS:
            state.selectedFieldManageDoctor = action.data;
            return {
                ...state,
            };
        case actionTypes.GET_ALL_DOCTOR_MANGE_SELECT_FIELD_FAILED:
            state.listProvinces = [];
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
