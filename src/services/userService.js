import axios from "../axios"; // Giúp gửi req tới server nodeJS
const handleLoginApi = (email, password) => {
    return axios.post("/api/login", { email: email, password: password });
};
//Get  đến Api bên server
const getAllUser = (inputId) => {
    //   return axios.get(`/api/get-all-users?id=${inputId}`); // Truyền id dưới dạng param
    return axios.get("/api/get-all-users", { params: { id: inputId } }); // Truyền id dưới dạng param
};
const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
    return axios.delete("/api/delete-user", { data: { id: userId } });
};
const editUserService = (inputData) => {
    return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDocTorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorService = () => {
    return axios.get("/api/all-doctor");
};
const saveDoctorDetailService = (data) => {
    return axios.post("/api/save-info-doctor", data);
};
const getDetailDoctorById = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkScheDuleDoctor = (data) => {
    return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
const getExtraDoctorInfoById = (doctorId, date) => {
    return axios.get(`/api/get-extra-doctor-info-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId, date) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookingInfo = (data) => {
    return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
    return axios.post("/api/verify-book-appointment", data);
};
export {
    handleLoginApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDocTorHomeService,
    getAllDoctorService,
    saveDoctorDetailService,
    getDetailDoctorById,
    saveBulkScheDuleDoctor,
    getScheduleByDate,
    getExtraDoctorInfoById,
    getProfileDoctorById,
    postPatientBookingInfo,
    postVerifyBookAppointment,
};
