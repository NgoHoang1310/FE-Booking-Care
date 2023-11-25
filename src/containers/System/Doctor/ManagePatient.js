import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import "flatpickr/dist/themes/material_green.css";
import DatePicker from 'react-flatpickr';
import * as action from '../../../store/actions';
import './ManagePatient.scss';
import { getAllBooking } from '../../../services/userService';
import { languages } from '../../../utils';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import RemedyModal from '../RemedyModal';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: '',
            doctorId: '',
            dataBooking: [],
            isModalShow: false,
            patientData: '',
        }
    }

    handleDateChange = async (date) => {
        let dataDate = date.getTime();

        let doctorId = this.props.userInfo.id;
        let response = await getAllBooking(doctorId, dataDate);
        this.setState({
            dataBooking: response.data.dataBooking,
            currentDate: date,

        })

    }



    handleShowRemedyModal = (data) => {
        this.setState({
            isModalShow: !this.state.isModalShow,
            patientData: { ...data.patientData, doctorId: data.doctorID, patientId: data.patientID } ?? '',
        })
    }


    async componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.userInfo.id != this.props.userInfo.id) {
        //     this.setState({
        //         doctorId: this.props.userInfo.id,
        //     })
        //     console.log('hello');
        // }

    }

    render() {
        let { currentDate, dataBooking, isModalShow, patientData } = this.state;
        return (
            <div className='manage-patient' >
                <h3 className='manage-patient__heading' >Quản lí bệnh nhân </h3>
                <div className='manage-patient__date' >
                    <label htmlFor='selected' className='d-block fs-5' >Ngày khám</label>
                    <DatePicker
                        className='manage-patient__date--picker'
                        value={new Date(currentDate).getTime()}
                        // options={{ minDate: 'today', dateFormat: "d-m-Y" }}
                        onChange={(selectedDates, dateStr) => this.handleDateChange(selectedDates[0])}
                    />
                </div>

                <div className='manage-patient__table'>
                    <table className='w-100'>
                        <tr>
                            <th>STT</th>
                            <th>Thời gian</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Giới tính</th>
                            <th>Địa chỉ</th>
                            <th>Trạng thái</th>


                        </tr>
                        {dataBooking && dataBooking.length > 0 && dataBooking.map((item, index) => {
                            return (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{item.bookingTimeData.valueVi}</td>
                                    <td>{item.patientData.lastName}</td>
                                    <td>{item.patientData.email}</td>
                                    <td>{item.patientData.phoneNumber}</td>
                                    <td>{item.patientData.genderData.valueVi}</td>
                                    <td>{item.patientData.address}</td>
                                    <td>
                                        <button
                                            className='confirm-btn'
                                            onClick={() => this.handleShowRemedyModal(item)}
                                        >Xác nhận đã khám</button>
                                    </td>
                                </tr>

                            );

                        })}
                    </table>
                </div>
                <RemedyModal
                    isModalShow={isModalShow}
                    patientEmail={patientData.email}
                    patientId={patientData.patientId}
                    doctorId={patientData.doctorId}
                    patientName={patientData.lastName}
                    toggle={this.handleShowRemedyModal}
                // dataSchedule={dataTimePass}
                />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allSchedule: state.admin.allSchedule,
        lang: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSchedule: () => dispatch(action.fetchScheduleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

