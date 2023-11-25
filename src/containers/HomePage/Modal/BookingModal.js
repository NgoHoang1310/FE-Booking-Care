import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NumericFormat } from 'react-number-format';
import "flatpickr/dist/themes/material_green.css";
import DatePicker from 'react-flatpickr';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

import './BookingModal.scss';
import * as action from '../../../store/actions';
import { languages } from '../../../utils';
import { getProfileDoctor } from '../../../services/userService';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import moment from 'moment';
import { isEmpty } from 'lodash';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSchedule: '',
            profileDoctor: '',
            arrGender: [],

            name: '',
            email: '',
            phone: '',
            birth: '',
            gender: '',
            address: '',
            reason: ''
        }
    }

    handleOnChangeInput = (event, input) => {
        let copyState = this.state;
        copyState[input] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleBirthChange = (date) => {
        this.setState({
            birth: date,
        })
    }

    handleValidate = () => {
        let isValid = true;
        let arrInput = ['name', 'email', 'phone', 'birth', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                toast.warn("Bạn chưa điền " + arrInput[i]);
                break;
            }
        }
        return isValid;
    }


    getProfileDoctor = (data) => {
        this.setState({
            profileDoctor: data
        })
    }

    builDataTime = (data) => {
        let timeBuilded = '';
        let dateBuilded = '';
        if (data && !isEmpty(data)) {
            dateBuilded = moment(Number(data.date)).format('DD-MM-YYYY');
            timeBuilded = data && (this.props.lang === languages.EN ? data.timeData.valueEn : data.timeData.valueVi);
        }
        return `${timeBuilded} - ${dateBuilded}`;
    }

    handleConfirmBooking = () => {
        let isValid = this.handleValidate();
        let timeString = this.builDataTime(this.state.dataSchedule);
        let doctor = this.state.profileDoctor.data.detailDoctor
        if (isValid === false)
            return;

        this.props.confirmBooking({
            email: this.state.email,
            name: this.state.name,
            phone: this.state.phone,
            gender: this.state.gender,
            address: this.state.address,
            doctorId: this.props.dataSchedule.doctorID,
            date: this.props.dataSchedule.date,
            timeType: this.props.dataSchedule.timeType,
            timeString: timeString,
            doctor: `${doctor.firstName} ${doctor.lastName}`,
            language: this.props.lang
        })

        // console.log(this.state.profileDoctor.data.detailDoctor);
        this.props.toggle();
    }

    componentDidMount() {
        this.props.getGender();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataSchedule != this.props.dataSchedule) {
            this.setState({
                dataSchedule: this.props.dataSchedule,
            })
        }

        if (prevProps.dataGender != this.props.dataGender) {
            this.setState({
                arrGender: this.props.dataGender,
            })
        }

    }

    render() {
        let { dataSchedule, profileDoctor, arrGender, name, email, phone, birth, gender, address, reason } = this.state;
        console.log(this.props.lang);
        let Doctor_Info = profileDoctor ? profileDoctor.data.detailDoctor.Doctor_Info : "";
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.isModalShow}
                    toggle={this.props.toggle}
                    size='lg'
                >
                    <ModalHeader
                        className='booking-modal__heading '
                    >
                        Thông tin bệnh nhân
                    </ModalHeader>
                    <ModalBody>
                        <div className="col-12 booking-modal__container mt-3">
                            <ProfileDoctor
                                dataSchedule={dataSchedule}
                                profileDoctor={profileDoctor}
                                getProfileDoctor={this.getProfileDoctor}
                                isShowSchedule={true}
                                isShowDescription={false}
                                isShowLocation={false}
                                isShowMoreLink={false}
                            />
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label fw-bolder"><FormattedMessage id='booking-modal.patient-name' /></label>
                                <div class="form-control" >
                                    <span className='pre-icon' >
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="exampleFormControlInput1"
                                        className='booking-modal__input '
                                        placeholder="Ví dụ: Trần Văn Phú"
                                        onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                        value={name}
                                    />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label fw-bolder"><FormattedMessage id='booking-modal.email' /></label>
                                <div class="form-control" >
                                    <span className='pre-icon' >
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        id="exampleFormControlInput1"
                                        className='booking-modal__input'
                                        placeholder="Ví dụ: phu@gmail.com"
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        value={email}
                                    />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label fw-bolder"><FormattedMessage id='booking-modal.phone' /></label>
                                <div class="form-control" >
                                    <span className='pre-icon' >
                                        <i class="fas fa-phone fa-rotate-90"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="exampleFormControlInput1"
                                        className='booking-modal__input'
                                        placeholder="Ví dụ: 0358234124"
                                        onChange={(event) => this.handleOnChangeInput(event, 'phone')}
                                        value={phone}
                                    />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label fw-bolder"><FormattedMessage id='booking-modal.birth' /></label>
                                <div class="form-control" >
                                    <span className='pre-icon' >
                                        <i class="fas fa-calendar-alt"></i>
                                    </span>
                                    <DatePicker
                                        id="exampleFormControlInput1"
                                        className='booking-modal__input '
                                        placeholder="Ví dụ: 12/03/1986"
                                        onChange={(selectedDates, dateStr) => this.handleBirthChange(selectedDates[0])}
                                    />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label fw-bolder"><FormattedMessage id='booking-modal.gender' /></label>
                                <div class="form-control w-25" >
                                    <span className='pre-icon' >
                                        <i class="fas fa-venus-mars"></i>
                                    </span>
                                    <select
                                        id="exampleFormControlInput1"
                                        className='booking-modal__input'
                                        placeholder="Ví dụ: Nam"
                                        onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                    >
                                        <option selected disabled value={''} ></option>
                                        {arrGender && arrGender.length > 0 && arrGender.map((item) => {
                                            return (
                                                <option value={item.keyMap} >{(this.props.lang == languages.VI) ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label fw-bolder"><FormattedMessage id='booking-modal.address' /></label>
                                <div class="form-control" >
                                    <span className='pre-icon' >
                                        <i class="fas fa-map-marker-alt"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="exampleFormControlInput1"
                                        className='booking-modal__input '
                                        placeholder="Ví dụ: Triều Khúc - Thanh Xuân - Hà Nội"
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        value={address}
                                    />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label fw-bolder"><FormattedMessage id='booking-modal.reason' /></label>
                                <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    value={reason}
                                ></textarea>
                            </div>

                            <div className='booking-modal__payment'>
                                <h6 className='booking-modal__payment--heading' >
                                    <FormattedMessage id='booking-modal.payment-method.title1' />
                                </h6>
                                <div className='booking-modal__payment--method mb-3' >
                                    <input type='radio' checked={true} ></input>
                                    <FormattedMessage id='booking-modal.payment-method.title2' />:{Doctor_Info && (this.props.lang === languages.EN ? Doctor_Info.paymentData.valueEn : Doctor_Info.paymentData.valueVi)}
                                </div>

                            </div>
                            <div className='booking-modal__price' >
                                <div className='booking-modal__price--exam' >
                                    <span><FormattedMessage id='booking-modal.price' />: </span>
                                    <span
                                        className='price'>
                                        {Doctor_Info &&
                                            <NumericFormat
                                                displayType='text'
                                                value={this.props.lang === languages.EN ? Doctor_Info.priceData.valueEn : Doctor_Info.priceData.valueVi}
                                                suffix={this.props.lang === languages.EN ? '$' : 'đ'}
                                                thousandSeparator={true}
                                            />}
                                    </span>
                                </div>
                                <div className='booking-modal__price--fee' >
                                    <span><FormattedMessage id='booking-modal.fee' />: </span>
                                    <span className='fee' ><FormattedMessage id='booking-modal.free' /></span>
                                </div>
                                <div className='booking-modal__price--total' >
                                    <span><FormattedMessage id='booking-modal.total' />: </span>
                                    <span className='total' >
                                        {Doctor_Info &&
                                            <NumericFormat
                                                displayType='text'
                                                value={this.props.lang === languages.EN ? Doctor_Info.priceData.valueEn : Doctor_Info.priceData.valueVi}
                                                suffix={this.props.lang === languages.EN ? '$' : 'đ'}
                                                thousandSeparator={true}
                                            />}</span>
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-cancel"
                            onClick={this.props.toggle}
                        >
                            <FormattedMessage id='booking-modal.btn.cancel' />
                        </Button>
                        <Button
                            className="btn-confirm"
                            onClick={this.handleConfirmBooking}
                        >
                            <FormattedMessage id='booking-modal.btn.booking' />
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        dataGender: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(action.fetchGenderStart()),
        confirmBooking: (dataBooking) => dispatch(action.confirmBookingStart(dataBooking)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
