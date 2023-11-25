import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctor: [],
    allClinic: [],
    allSchedule: [],
    dataError: {},
    requireDoctorInfo: {},
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
            }
        case actionTypes.SAVE_USER_SUCCESS:
            return {
                ...state,

            }
        case actionTypes.SAVE_USER_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                users: action.data
            }
        case actionTypes.FETCH_USER_FAILED:
            return {
                ...state,

            }
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                message: action.data
            }
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state,

            }
        case actionTypes.FETCH_TOPDOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.data
            }
        case actionTypes.FETCH_TOPDOCTOR_FAILED:
            return {
                ...state,

            }

        case actionTypes.FETCH_ALLDOCTOR_SUCCESS:
            return {
                ...state,
                allDoctor: action.data
            }
        case actionTypes.FETCH_ALLDOCTOR_FAILED:
            return {
                ...state,

            }

        case actionTypes.FETCH_SCHEDULE_SUCCESS:
            return {
                ...state,
                allSchedule: action.data
            }
        case actionTypes.FETCH_SCHEDULE_FAILED:
            return {
                ...state,

            }
        case actionTypes.FETCH_REQUIREDOCTORINFO_SUCCESS:
            return {
                ...state,
                requireDoctorInfo: action.data
            }
        case actionTypes.FETCH_REQUIREDOCTORINFO_FAILED:
            return {
                ...state,

            }
        case actionTypes.SAVE_INFODOCTOR_SUCCESS:
            return {
                ...state,
                dataError: action.data

            }
        case actionTypes.SAVE_INFODOCTOR_FAILED:
            return {
                ...state,
                dataError: action.data

            }
        default:
            return state;
    }
}

export default adminReducer;