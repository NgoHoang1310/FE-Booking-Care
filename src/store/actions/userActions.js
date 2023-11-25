import actionTypes from './actionTypes';
import { getDetailDoctor, getExtraInfoDoctor, confirmBooking } from '../../services/userService';
import { toast } from 'react-toastify';
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const userLoginAccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const fetchDetailDoctorStart = (doctorId) => {
    return async (dispatch) => {
        try {
            let dataDoctor = await getDetailDoctor(doctorId);
            if (dataDoctor.data && dataDoctor.data.errCode === 0) {
                dispatch(fetchDetailDoctorSuccess(dataDoctor.data.detailDoctor));
            };
        } catch (error) {
            // dispatch(fetchUserFailed(error));
        }
    }
};

export const fetchDetailDoctorSuccess = (user) => ({
    type: actionTypes.FETCH_DETAILDOCTOR_SUCCESS,
    data: user,
});

export const fetchDetailDoctorFailed = () => ({
    type: actionTypes.FETCH_DETAILDOCTOR_FAILED,
});

export const fetchExtraInfoDoctorStart = (doctorId) => {
    return async (dispatch) => {
        try {
            let dataExtra = await getExtraInfoDoctor(doctorId);
            if (dataExtra.data && dataExtra.data.errCode === 0) {
                dispatch(fetchExtraInfoDoctorSuccess(dataExtra.data.extraInfoDoctor));
            };
        } catch (error) {
            dispatch(fetchExtraInfoDoctorFailed(error));
        }
    }
};

export const fetchExtraInfoDoctorSuccess = (dataExtra) => ({
    type: actionTypes.FETCH_EXTRAINFODOCTOR_SUCCESS,
    data: dataExtra,
});

export const fetchExtraInfoDoctorFailed = () => ({
    type: actionTypes.FETCH_EXTRAINFODOCTOR_FAILED,
});

export const confirmBookingStart = (dataBooking) => {
    return async (dispatch) => {
        try {
            let response = await confirmBooking(dataBooking);
            if (response.data && response.data.errCode === 0) {
                dispatch(confirmBookingSuccess());
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(confirmBookingFailed(error));
        }
    }
};

export const confirmBookingSuccess = () => ({
    type: actionTypes.CONFIRM_BOOKING_SUCCESS,
});

export const confirmBookingFailed = () => ({
    type: actionTypes.CONFIRM_BOOKING_FAILED,
});