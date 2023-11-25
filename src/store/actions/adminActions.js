import actionTypes from './actionTypes';
import {
    getAllCode,
    createUser,
    getAllUser,
    deleteUser,
    updateUser,
    getTopDoctor,
    getAllDoctor,
    SaveInfoDoctor,
    createSchedule,
    getAllSpecialty,
    getAllClinic
} from '../../services/userService';


import { toast } from 'react-toastify';
//lấy thông tin giới tính
export const fetchGenderStart = () => {
    return async (dispatch) => {
        try {
            let dataCode = await getAllCode('GENDER');
            if (dataCode.data.dataAllCode && dataCode.data.dataAllCode.errCode === 0) {
                dispatch(fetchGenderSuccess(dataCode.data.dataAllCode.dataAllCode));
                // console.log(dataCode.data.dataAllCode)
            };
        } catch (error) {
            dispatch(fetchGenderFailed(error));
        }
    }
};

export const fetchGenderSuccess = (gender) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: gender,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});
//lấy thông tin vai trò

export const fetchRoleStart = () => {
    return async (dispatch) => {
        try {
            let dataCode = await getAllCode('ROLE');
            if (dataCode.data.dataAllCode && dataCode.data.dataAllCode.errCode === 0) {
                dispatch(fetchRoleSuccess(dataCode.data.dataAllCode.dataAllCode));
                // console.log(dataCode.data.dataAllCode)
            };
        } catch (error) {
            dispatch(fetchRoleFailed(error));
        }
    }
};

export const fetchRoleSuccess = (gender) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: gender,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});
//lấy thông tin vị trí

export const fetchPositionStart = () => {
    return async (dispatch) => {
        try {
            let dataCode = await getAllCode('POSITION');
            if (dataCode.data.dataAllCode && dataCode.data.dataAllCode.errCode === 0) {
                dispatch(fetchPositionSuccess(dataCode.data.dataAllCode.dataAllCode));
                // console.log(dataCode.data.dataAllCode)
            };
        } catch (error) {
            dispatch(fetchPositionFailed(error));
        }
    }
};

export const fetchPositionSuccess = (gender) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: gender,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});
//tạo người dùng
export const createNewUser = (data) => {
    return async (dispatch) => {
        try {
            let dataUser = await createUser(data);
            console.log(dataUser)
            if (dataUser.data.userData && dataUser.data.errCode === 0) {
                dispatch(saveUserSuccess());
                dispatch(fetchUserStart());
                toast.success("Tạo mới người dùng thành công !");
            } else {
                toast.error(dataUser.data.message);
            }
        } catch (error) {
            dispatch(saveUserFailed());
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_SUCCESS
})
//lấy thông tin người dùng

export const fetchUserStart = () => {
    return async (dispatch) => {
        try {
            let dataUser = await getAllUser('ALL');
            console.log(dataUser);
            if (dataUser.data.userData && dataUser.data.errCode === 0) {
                dispatch(fetchUserSuccess(dataUser.data.userData.user.reverse()));
            };
        } catch (error) {
            dispatch(fetchUserFailed(error));
        }
    }
};

export const fetchUserSuccess = (user) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    data: user,
});

export const fetchUserFailed = () => ({
    type: actionTypes.FETCH_USER_FAILED,
});
//Xóa người dùng
export const DeleteUserStart = (id) => {
    return async (dispatch) => {
        try {
            let dataDelete = await deleteUser(id);
            console.log(dataDelete);
            if (dataDelete.data.userData && dataDelete.data.errCode === 0) {
                dispatch(DeleteUserSuccess(dataDelete.data.message));
                dispatch(fetchUserStart());
                toast.success("Xóa người dùng thành công !");
            };
        } catch (error) {
            dispatch(DeleteUserFailed());
        }
    }
};
export const DeleteUserSuccess = (message) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    data: message,
});

export const DeleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

//sửa người dùng

export const EditUserStart = (user) => {
    return async (dispatch) => {
        try {
            let dataEdit = await updateUser(user);
            console.log(dataEdit);
            if (dataEdit.data.userData && dataEdit.data.errCode === 0) {
                dispatch(EditUserSuccess(dataEdit.data.message));
                dispatch(fetchUserStart());
                toast.success("Cập nhật người dùng thành công !");
            };
        } catch (error) {
            // dispatch(EditUserFailed());
        }
    }
};
export const EditUserSuccess = (message) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    data: message,
});

export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctorStart = () => {
    return async (dispatch) => {
        try {
            let dataUser = await getTopDoctor();
            console.log(dataUser);
            if (dataUser.data && dataUser.data.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(dataUser.data.doctors.reverse()));
            };
        } catch (error) {
            // dispatch(fetchUserFailed(error));
        }
    }
};

export const fetchTopDoctorSuccess = (user) => ({
    type: actionTypes.FETCH_TOPDOCTOR_SUCCESS,
    data: user,
});

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOPDOCTOR_FAILED,
});

export const fetchAllDoctorStart = () => {
    return async (dispatch) => {
        try {
            let dataUser = await getAllDoctor();
            if (dataUser.data && dataUser.data.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(dataUser.data.doctors.reverse()));
            };
        } catch (error) {
            dispatch(fetchAllDoctorFailed(error));
        }
    }
};

export const fetchAllDoctorSuccess = (user) => ({
    type: actionTypes.FETCH_ALLDOCTOR_SUCCESS,
    data: user,
});

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALLDOCTOR_FAILED,
});

export const SaveInfoDoctorStart = (infoDoctor) => {
    return async (dispatch) => {
        try {
            let dataSave = await SaveInfoDoctor(infoDoctor);
            if (dataSave.data && dataSave.data.errCode === 0) {
                dispatch(SaveInfoDoctorSuccess(dataSave.data));
                toast.success(dataSave.data.message);
            } else {
                dispatch(SaveInfoDoctorFailed(dataSave.data))
                toast.error(dataSave.data.message);
            };
        } catch (error) {
            dispatch(SaveInfoDoctorFailed(error));
        }
    }
};

export const SaveInfoDoctorSuccess = (dataErr) => ({
    type: actionTypes.SAVE_INFODOCTOR_SUCCESS,
    data: dataErr
});

export const SaveInfoDoctorFailed = (dataErr) => ({
    type: actionTypes.SAVE_INFODOCTOR_FAILED,
    data: dataErr
});


export const fetchScheduleStart = () => {
    return async (dispatch) => {
        try {
            let dataCode = await getAllCode('TIME');
            console.log(dataCode);
            if (dataCode.data.dataAllCode && dataCode.data.dataAllCode.errCode === 0) {
                dispatch(fetchScheduleSuccess(dataCode.data.dataAllCode.dataAllCode));
            };
        } catch (error) {
            // dispatch(fetchScheduleFailed(error));
        }
    }
};

export const fetchScheduleSuccess = (dataCode) => ({
    type: actionTypes.FETCH_SCHEDULE_SUCCESS,
    data: dataCode,
});

export const fetchScheduleFailed = () => ({
    type: actionTypes.FETCH_SCHEDULE_FAILED,
});


export const createScheduleStart = (data) => {
    return async (dispatch) => {
        try {
            let dataSchedule = await createSchedule(data);
            console.log(dataSchedule)
            if (dataSchedule.data && dataSchedule.data.errCode === 0) {
                toast.success(dataSchedule.data.message);
                dispatch(saveScheduleSuccess());
            } else {
                toast.error(dataSchedule.data.message);
            }
        } catch (error) {
            dispatch(saveScheduleFailed());
        }
    }
}

export const saveScheduleSuccess = () => ({
    type: actionTypes.SAVE_SCHEDULE_SUCCESS,
})

export const saveScheduleFailed = () => ({
    type: actionTypes.SAVE_SCHEDULE_FAILED
})

export const fetchRequireDoctorStart = (doctorId) => {
    return async (dispatch) => {
        try {
            let dataPrice = await getAllCode('PRICE');
            let dataPayment = await getAllCode('PAYMENT');
            let dataProvince = await getAllCode('PROVINCE');
            let dataSpecialty = await getAllSpecialty();
            let dataClinic = await getAllClinic();
            // console.log(dataClinic);
            if (dataPrice.data.dataAllCode && dataPrice.data.dataAllCode.errCode === 0
                && dataPayment.data.dataAllCode && dataPayment.data.dataAllCode.errCode === 0
                && dataProvince.data.dataAllCode && dataProvince.data.dataAllCode.errCode === 0
                && dataSpecialty.data.specialties && dataSpecialty.data.errCode === 0
                && dataClinic.data.clinics && dataClinic.data.errCode === 0) {
                dispatch(fetchRequireDoctorSuccess({
                    prices: dataPrice.data.dataAllCode.dataAllCode,
                    payments: dataPayment.data.dataAllCode.dataAllCode,
                    provinces: dataProvince.data.dataAllCode.dataAllCode,
                    specialties: dataSpecialty.data.specialties,
                    clinics: dataClinic.data.clinics,
                }));
            } else {
                dispatch(fetchRequireDoctorFailed());
            };
        } catch (error) {
            // dispatch(fetchUserFailed(error));
        }
    }
};

export const fetchRequireDoctorSuccess = (dataRequire) => ({
    type: actionTypes.FETCH_REQUIREDOCTORINFO_SUCCESS,
    data: dataRequire,
});

export const fetchRequireDoctorFailed = () => ({
    type: actionTypes.FETCH_REQUIREDOCTORINFO_FAILED,

});


// export const fetchAllClinicStart = () => {
//     return async (dispatch) => {
//         try {
//             let dataClinic = await getAllClinic();
//             console.log(dataClinic);
//             if (dataClinic.data && dataClinic.data.errCode === 0) {
//                 dispatch(fetchAllClinicSuccess(dataClinic.data.clinics.reverse()));
//             };
//         } catch (error) {
//             dispatch(fetchAllClinicFailed(error));
//         }
//     }
// };

// export const fetchAllClinicSuccess = (clinic) => ({
//     type: actionTypes.FETCH_ALLCLINIC_SUCCESS,
//     data: clinic,
// });

// export const fetchAllClinicFailed = () => ({
//     type: actionTypes.FETCH_ALLCLINIC_FAILED,
// });
