import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as action from '../../../store/actions';
import moment from 'moment';
import "moment/locale/vi";
import { NumericFormat } from 'react-number-format';
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DoctorExtraInfo.scss';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            addressClinic: '',
            nameClinic: '',
            price: '',
            payment: '',
            province: ''

        }
    }

    handleMorePrice = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }


    componentDidMount() {
        this.props.getExtraInfoDoctor(this.props.doctorId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.extraInfoDoctor != this.props.extraInfoDoctor) {
            this.setState({
                addressClinic: this.props.extraInfoDoctor.addressClinic,
                nameClinic: this.props.extraInfoDoctor.nameClinic,
                price: this.props.extraInfoDoctor.priceData,
                payment: this.props.extraInfoDoctor.paymentData,
                province: this.props.extraInfoDoctor.provinceData
            })
        }
    }

    render() {
        let { isShow, addressClinic, nameClinic, price, payment, province } = this.state;
        return (
            <div className='doctor-extraInfo' >
                <div className='doctor-extraInfo__address' >
                    <h5 className='heading' ><FormattedMessage id="common.address-clinic" /></h5>
                    <p className='name-clinic' >{nameClinic}</p>
                    <p className='add-clinic' >{addressClinic}, {this.props.lang === languages.EN ? province.valueEn : province.valueVi} </p>

                </div>
                <div className='doctor-extraInfo__price' >
                    <h5 className='heading' ><FormattedMessage id="common.price" />:</h5>
                    <p className='price' >
                        <NumericFormat
                            displayType='text'
                            value={this.props.lang === languages.EN ? price.valueEn : price.valueVi} suffix={this.props.lang === languages.EN ? '$' : 'đ'}
                            thousandSeparator=","
                        />.
                    </p>
                    <p className='detail' onClick={() => this.handleMorePrice()} >{isShow ? <FormattedMessage id="common.btn.hide" /> : <FormattedMessage id="common.btn.see-detail" />}</p>
                    <div className={isShow ? 'more-info active-more-price' : 'more-info'} >
                        <div className='more-price' >
                            <div className='heading' >
                                <h5 className='price-title' ><FormattedMessage id="common.price" /></h5>
                                <span className='price' >
                                    <NumericFormat
                                        displayType='text'
                                        value={this.props.lang === languages.EN ? price.valueEn : price.valueVi}
                                        suffix={this.props.lang === languages.EN ? '$' : 'đ'}
                                        thousandSeparator=","
                                    />.
                                </span>
                            </div>
                            <p>
                                - Giá tái khám: 250.000 VNĐ ( bệnh nhân phải có mặt)
                            </p>
                            <p className='m-0' >
                                - Giá tư vấn tái khám: 200.000 VNĐ (người nhà bệnh nhân đến báo lại tình trạng của bệnh nhân và lấy thuốc)
                            </p>
                        </div>
                        <div className='note' ><FormattedMessage id="common.payment" />: {this.props.lang === languages.EN ? payment.valueEn : payment.valueVi}</div>

                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        extraInfoDoctor: state.user.extraInfoDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getExtraInfoDoctor: (doctorId) => dispatch(action.fetchExtraInfoDoctorStart(doctorId)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
