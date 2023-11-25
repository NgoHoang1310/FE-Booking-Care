import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NumericFormat } from 'react-number-format';
import "flatpickr/dist/themes/material_green.css";
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

import './RemedyModal.scss';
import * as action from '../../store/actions';
import { languages } from '../../utils';
import { isEmpty } from 'lodash';
import { CommonUtils } from '../../utils';
import { confirmRemedy } from '../../services/userService';


class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
            patientId: '',
            doctorId: '',
            name: '',

        }
    }

    handleConfirm = async () => {
        // let { email, imageBase64, doctorId, patientId, name } = this.state;
        let response = await confirmRemedy({
            ...this.state,
            language: this.props.lang
        })
        console.log(response);

        if (response) {
            toast.success("Thành công!");
        } else {
            toast.error("Thất bại!")
        }
    }

    handleOnChangeFile = async (element) => {
        let files = element.target.files[0];
        // console.log(files);
        if (files) {
            let base64 = await CommonUtils.getBase64(files);
            this.setState({
                imageBase64: base64,
            })
        }
    }


    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if (prevProps.patientEmail !== this.props.patientEmail) {
            this.setState({
                email: this.props.patientEmail,
            })
        }
        if (prevProps.patientId !== this.props.patientId) {
            this.setState({
                patientId: this.props.patientId,
            })
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            this.setState({
                doctorId: this.props.doctorId,
            })
        }
        if (prevProps.patientName !== this.props.patientName) {
            this.setState({
                name: this.props.patientName,
            })
        }

    }

    render() {
        let { email } = this.state;
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.isModalShow}
                    toggle={this.props.toggle}
                    size='lg'
                    centered
                >
                    <ModalHeader
                        className='remedy-modal__heading '
                    >
                        Xác nhận đã khám
                    </ModalHeader>
                    <ModalBody>
                        <div className='remedy-modal__body' >
                            <div className="col-md-6">
                                <label htmlFor="validationDefault01" className="form-label">Email bệnh nhân</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={email}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="validationDefault02" className="form-label mt-3">Thông tin đơn thuốc</label>
                                <input
                                    type="file"
                                    onChange={(event) => this.handleOnChangeFile(event)}

                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-cancel"
                            onClick={this.props.toggle}
                        >
                            <FormattedMessage id='remedy-modal.btn.cancel' />
                        </Button>
                        <Button
                            className="btn-confirm"
                            onClick={this.handleConfirm}
                        >
                            <FormattedMessage id='remedy-modal.btn.confirm' />
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
        confirmBooking: (dataBooking) => dispatch(action.confirmBookingStart(dataBooking)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
