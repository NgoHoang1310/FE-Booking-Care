import axios from "../axios";
const handleLoginAPI = (username, password) => {
    return axios.post('/api/login', {
        email: username,
        password: password
    });
}

const getAllUser = (userId) => {
    return axios.get(`/api/getAllUsers?id=${userId}`)
}

const createUser = (dataCreate) => {
    return axios.post('/api/createUsers', {
        firstName: dataCreate.firstName,
        lastName: dataCreate.lastName,
        email: dataCreate.email,
        password: dataCreate.password,
        phone: dataCreate.phone,
        address: dataCreate.address,
        gender: dataCreate.gender,
        role: dataCreate.role,
        position: dataCreate.position,
        avatar: dataCreate.avatar

    })
}

const updateUser = (dataUpdate) => {
    return axios.put('/api/editUsers', dataUpdate)
}

const deleteUser = (userId) => {
    return axios.delete('/api/deleteUsers', {
        data: {
            id: userId,
        }
    });
}

const getAllCode = (type) => {
    return axios.get(`/api/getAllCode?type=${type}`);
}

const getTopDoctor = () => {
    return axios.get('/api/outstanding_doctor');
}

const getAllDoctor = () => {
    return axios.get('/api/getAllDoctor');
}

const SaveInfoDoctor = (data) => {
    return axios.post('/api/saveInfoDoctor', data);
}

const getDetailDoctor = (doctorId) => {
    return axios.get(`/api/getDetailDoctor?id=${doctorId}`)
}

const createSchedule = (data) => {
    return axios.post(`/api/createSchedule`, data);

}

const getDoctorSchedule = (doctorId, date) => {
    return axios.get(`/api/getScheduleByDoctor?doctorId=${doctorId}&date=${date}`);
}


const getExtraInfoDoctor = (doctorId) => {
    return axios.get(`/api/getExtraDoctorInfo?doctorId=${doctorId}`);

}

const getProfileDoctor = (doctorId) => {
    return axios.get(`/api/getProfileDoctor?doctorId=${doctorId}`);

}

const confirmBooking = (dataBooking) => {
    return axios.post('/api/patientBooking', dataBooking);
}

const verifyEmail = (dataVerify) => {
    return axios.post('/api/verifyEmailBooking', dataVerify);

}

const createSpecialty = (dataCreate) => {
    return axios.post('/api/createSpecialty', dataCreate);

}

const getAllSpecialty = () => {
    return axios.get('/api/getAllSpecialty');

}

const editSpecialty = (dataEdit) => {
    return axios.put('/api/editSpecialty', dataEdit);
}

const deleteSpecialty = (dataDelete) => {
    return axios.delete(`/api/deleteSpecialty?id=${dataDelete}`);
}

const getDetailSpecialty = (specialtyId) => {
    return axios.get(`/api/getDetailSpecialty?specialtyId=${specialtyId}`);
}

const createClinic = (dataCreate) => {
    return axios.post('/api/createClinic', dataCreate);
}

const getAllClinic = () => {
    return axios.get('/api/getAllClinic');
}

const editClinic = (dataEdit) => {
    return axios.put('/api/editClinic', dataEdit);
}

const deleteClinic = (dataDelete) => {
    return axios.delete(`/api/deleteClinic?id=${dataDelete}`);
}

const getDetailClinic = (clinicId) => {
    return axios.get(`/api/getDetailClinic?clinicId=${clinicId}`);
}

const createHandbook = (dataCreate) => {
    return axios.post('/api/createHandbook', dataCreate);
}

const getAllHandbook = () => {
    return axios.get('/api/getAllHandbook');
}

const editHandbook = (dataEdit) => {
    return axios.put('/api/editHandbook', dataEdit);
}

const deleteHandbook = (dataDelete) => {
    return axios.delete(`/api/deleteHandbook?id=${dataDelete}`);
}

const getDetailHandbook = (clinicId) => {
    return axios.get(`/api/getDetailHandbook?id=${clinicId}`);
}

const getAllBooking = (doctorId, date) => {
    return axios.get(`/api/getAllBooking?date=${date}&doctorId=${doctorId}`);
}

const confirmRemedy = (dataRemedy) => {
    return axios.post('/api/confirmRemedy', dataRemedy);
}

export {
    handleLoginAPI,
    getAllUser,
    createUser,
    deleteUser,
    updateUser,

    getAllCode,

    getTopDoctor,
    getAllDoctor,
    SaveInfoDoctor,
    getDetailDoctor,
    getExtraInfoDoctor,
    getProfileDoctor,

    createSchedule,
    getDoctorSchedule,

    confirmBooking,
    verifyEmail,
    getAllBooking,

    createSpecialty,
    getAllSpecialty,
    editSpecialty,
    deleteSpecialty,
    getDetailSpecialty,

    createClinic,
    getAllClinic,
    editClinic,
    deleteClinic,
    getDetailClinic,
    confirmRemedy,

    createHandbook,
    getAllHandbook,
    editHandbook,
    deleteHandbook,
    getDetailHandbook,
};