import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import "flatpickr/dist/themes/material_green.css";
import DatePicker from 'react-flatpickr';
import * as action from '../../../store/actions';
import './ManageSchedule.scss';
import { languages } from '../../../utils';
import moment from 'moment/moment';
import { toast } from 'react-toastify';


class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctor: '',
            allSchedule: '',
            selectedOption: '',
            currentDate: new Date(),
        }
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(this.state.selectedOption);
    };

    handleDateChange = (date) => {
        this.setState({
            currentDate: date,
        })
    }

    handleChecked = (item) => {
        this.state.allSchedule.map((schedule) => {
            if (item.id === schedule.id)
                schedule.isSelected = !schedule.isSelected;
        })
        this.setState({
            allSchedule: this.state.allSchedule,
        })
    }

    handleSaveSchedule = () => {
        let { selectedOption, currentDate, allSchedule } = this.state;
        let result = [];
        if (!selectedOption) {
            toast.warn("Missing data input");
            return;
        }
        if (allSchedule && allSchedule.length > 0) {
            let arrSelected = allSchedule.filter((item) => {
                return item.isSelected === true;
            })

            if (arrSelected && arrSelected.length > 0) {
                arrSelected.map((select) => {
                    let objData = {};
                    objData.doctorID = selectedOption.id;
                    objData.date = new Date(currentDate).getTime();
                    objData.timeType = select.keyMap;
                    result.push(objData);
                })
                this.props.createSchedule(result);
            } else {
                toast.warn("Missing data time");
            }

        }


    }


    componentDidMount() {
        this.props.getAllDoctor();
        this.props.getAllSchedule();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctor != this.props.allDoctor) {
            let arrDoctor = [];
            this.props.allDoctor.map((doctor) => {
                return arrDoctor.push({ value: `${doctor.firstName} ${doctor.lastName}`, label: `${doctor.firstName} ${doctor.lastName}`, id: doctor.id });
            })
            this.setState({
                allDoctor: arrDoctor,
            })
        }

        if (prevProps.allSchedule != this.props.allSchedule) {
            let arrSchedule = [];
            this.props.allSchedule.map((schedule) => {
                return arrSchedule.push({ ...schedule, isSelected: false });
            })
            this.setState({
                allSchedule: arrSchedule,
            })
        }
    }

    render() {
        let { allSchedule, isChecked, currentDate } = this.state;
        console.log(new Date(currentDate).getTime());
        return (
            <div className='manage-schedule-container' >
                <div className='manage-schedule__title' >
                    <FormattedMessage id="doctor.manage-schedule" />
                </div>

                <div className='manage-schedule__form' >
                    <div className='col-4 manage-schedule__selected ' >
                        <label> <FormattedMessage id="doctor.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.allDoctor}

                        />
                    </div>
                    <div className='col-4 manage-schedule__date-picked' >
                        <label className='d-block ' > <FormattedMessage id="doctor.choose-time" /></label>
                        <DatePicker
                            className='date-picker'
                            value={new Date(currentDate).getTime()}
                            options={{ minDate: 'today', dateFormat: "d-m-Y" }}
                            onChange={(selectedDates, dateStr) => this.handleDateChange(selectedDates[0])}
                        />
                    </div>
                </div>

                <div className='col-12 manage-schedule__time' >
                    <h3 className='text-center'>Thời gian khám</h3>
                    <ul className='col-6 manage-schedule__time--list' >
                        {allSchedule && allSchedule.map((schedule, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`manage-schedule__time--item ${schedule.isSelected ? 'btn-success' : ''} `}
                                    onClick={() => this.handleChecked(schedule)}
                                >
                                    {this.props.lang === languages.EN ? schedule.valueEn : schedule.valueVi}
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        className='btn-primary btn-save '
                        onClick={this.handleSaveSchedule}
                    >Lưu thông tin</button>
                </div>
                {/* ${isChecked ? 'btn-success' : '' */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        allSchedule: state.admin.allSchedule,
        lang: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctor: () => dispatch(action.fetchAllDoctorStart()),
        getAllSchedule: () => dispatch(action.fetchScheduleStart()),
        createSchedule: (data) => dispatch(action.createScheduleStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

