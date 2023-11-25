import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import './DoctorSchedule.scss';
import * as action from '../../../store/actions';
import moment from 'moment';
import "moment/locale/vi";
import { languages } from '../../../utils';
import { getDoctorSchedule } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from '../Modal/BookingModal';


class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalShow: false,
            allDay: '',
            doctorId: '',
            allTime: '',
            daySelected: {
                label: moment(new Date()).locale(this.props.lang === languages.EN ? 'en' : 'vi').format('dddd - DD/MM').charAt(0).toUpperCase()
                    + moment(new Date()).locale(this.props.lang === languages.EN ? 'en' : 'vi').format('dddd - DD/MM').slice(1),
                value: moment(new Date()).startOf('day').valueOf()
            },
            dataSchedule: '',
            dataTimePass: ''

        }
    }

    getTimeData = async (doctorId, date) => {
        let response = await getDoctorSchedule(doctorId, date.value);
        if (response.data && response.data.errCode === 0) {
            this.setState({
                allTime: response.data.dataSchedule,
                daySelected: date,
            })
        }
    }


    handleOnChange = (selectedOption) => {
        this.getTimeData(this.props.doctorId, selectedOption);
    }

    weeklySchedule() {
        let weeklySchedule = [];
        for (let i = 0; i < 5; i++) {
            let obj = {};
            let weekday = moment(new Date()).add(i, 'days').locale(this.props.lang === languages.EN ? 'en' : 'vi').format('dddd - DD/MM');
            let dayInMonth = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            obj.label = weekday.charAt(0).toUpperCase() + weekday.slice(1);
            obj.value = dayInMonth;
            weeklySchedule.push(obj);

        }
        this.setState({
            allDay: weeklySchedule,
        })


    }

    componentDidMount() {
        this.weeklySchedule();
        this.getTimeData(this.props.doctorId, this.state.daySelected);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang != this.props.lang) {
            this.weeklySchedule();
        }
    }

    handleShowBookingModal = (data) => {
        this.setState({
            isModalShow: !this.state.isModalShow,
            dataTimePass: data
        })
    }



    render() {
        let { allDay, allTime, daySelected, isModalShow, dataSchedule, dataTimePass } = this.state;
        return (
            <React.Fragment>

                <div className='doctor-schedule' >
                    <div className='doctor-schedule__dropdown' >
                        <Select
                            className='doctor-schedule__dropdown--selected'
                            value={daySelected}
                            onChange={this.handleOnChange}
                            styles={{
                                control: provided => ({
                                    ...provided,
                                    boxShadow: "none",
                                    borderColor: "transparent",
                                    "&:hover": {
                                        borderColor: "transparent"
                                    },
                                    fontWeight: '600'

                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: '#08699B',
                                }),
                            }}

                            options={allDay}
                            placeholder={this.props.lang === languages.EN ? "Select" : "Chọn"}
                        />
                    </div>
                    <div className='doctor-schedule__timetable'>
                        <h5 className='doctor-schedule__timetable--heading' >
                            <span><i class="fas fa-calendar-alt"></i></span>
                            <FormattedMessage id='common.schedule' />
                        </h5>
                        <ul className='doctor-schedule__list' >
                            {allTime && allTime.length > 0
                                ? allTime.map((time, index) => {
                                    return <li
                                        key={index}
                                        className='doctor-schedule__item'
                                        onClick={() => this.handleShowBookingModal(time)}
                                    >{this.props.lang === languages.EN ? time.timeData.valueEn : time.timeData.valueVi}
                                    </li>
                                })
                                :
                                <h5 className='message' ><FormattedMessage id='common.schedule-time' /></h5>
                            }

                        </ul>
                    </div>

                    <div className='doctor-schedule__guide ' >
                        <FormattedMessage id='common.guide' />
                    </div>
                </div>
                <BookingModal
                    isModalShow={isModalShow}
                    toggle={this.handleShowBookingModal}
                    dataSchedule={dataTimePass}
                />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
