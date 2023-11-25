import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    doctor: [],
    extraInfoDoctor: {},
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.FETCH_DETAILDOCTOR_SUCCESS:
            return {
                ...state,
                doctor: action.data,

            }
        case actionTypes.FETCH_DETAILDOCTOR_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_EXTRAINFODOCTOR_SUCCESS:
            return {
                ...state,
                extraInfoDoctor: action.data,

            }
        case actionTypes.FETCH_EXTRAINFODOCTOR_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default appReducer;