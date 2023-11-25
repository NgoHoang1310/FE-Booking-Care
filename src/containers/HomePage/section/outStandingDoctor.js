import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './slider.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { languages, path } from '../../../utils';
import * as action from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import CommonUtils from '../../../utils/CommonUtils';


// let history = useHistory();

class OutStandingDoctorSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTopDoctor: []
        }
    }

    handleViewDetailDoctor = (id) => {
        this.props.history.push(`/detail-doctor/${id}`);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topDoctors != this.props.topDoctors) {
            this.setState({
                arrTopDoctor: this.props.topDoctors,
            })
        }
    }

    componentDidMount() {
        this.props.getTopDoctor();
    }

    render() {
        let { arrTopDoctor } = this.state;
        let language = this.props.lang;
        console.log(arrTopDoctor.length > 0 && arrTopDoctor[0].image);
        return (
            <div className='section background-dark'>
                <div className='section-container'>
                    <div className='silder-heading'>
                        <h3 className='slider-title'><FormattedMessage id="manage-section.goodDoctor" /></h3>
                        <div className='slider-more-btn'>
                            <a href=''><FormattedMessage id="common.more" /></a>
                        </div>
                    </div>
                    <div className='section-content'>
                        <Slider {...this.props}>
                            {arrTopDoctor && arrTopDoctor.length > 0 && arrTopDoctor.map((doctor, index) => {
                                return (
                                    <div key={index} className='list-item text-center' onClick={() => this.handleViewDetailDoctor(doctor.id)} >
                                        <div className='img-container doctor-img circle-img' style={{
                                            backgroundImage: `url(${CommonUtils.encodeBase64(doctor.image)})`,
                                        }} ></div>
                                        <div className='list-item__doctorInfo' >
                                            <a>{((language === languages.VI) ? doctor.positionData.valueVi : doctor.positionData.valueEn) + ','}</a>
                                            <a>{`${doctor.firstName} ${doctor.lastName}`}</a>
                                        </div>
                                        <div>
                                            {/* <a href=''>Bác sĩ 1</a> */}
                                        </div>
                                    </div>
                                )
                            }) ||
                                <div class="w-100 d-flex justify-content-center text-primary m-5">
                                    <div class="spinner-grow text-success" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            }
                        </Slider>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        topDoctors: state.admin.topDoctors,
        // isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctor: () => dispatch(action.fetchTopDoctorStart()),
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctorSection));
