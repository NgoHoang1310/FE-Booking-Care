import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './slider.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { getAllClinic } from '../../../services/userService';

import { CommonUtils } from '../../../utils';
class ClinicSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: []
        }
    }

    handleViewDetailClinic = (id) => {
        this.props.history.push(`/detail-clinic/${id}`);
    }

    async componentDidMount() {
        let clinics = await getAllClinic();
        if (clinics.data && clinics.data.errCode === 0) {
            this.setState({
                clinics: clinics.data.clinics,
            })
        }
    }

    render() {
        let { clinics } = this.state;
        console.log(clinics);
        return (
            <div className='section'>
                <div className='section-container'>
                    <div className='silder-heading'>
                        <h3 className='slider-title'><FormattedMessage id="manage-section.outstanding-medical-facilities" /></h3>
                        <div className='slider-more-btn'>
                            <a href=''><FormattedMessage id="common.more" /></a>
                        </div>
                    </div>
                    <div className='section-content'>
                        <Slider {...this.props}>
                            {clinics && clinics.length > 0 && clinics.map((clinic, index) => {
                                return (
                                    <div key={index} className='list-item' onClick={() => this.handleViewDetailClinic(clinic.id)} >
                                        <div
                                            className='img-container health-facility-img '
                                            style={{
                                                backgroundImage: `url(${CommonUtils.encodeBase64(clinic.image)})`,
                                                backgroundSize: 'contain',
                                            }}
                                        ></div>
                                        <a href=''>{clinic.name}</a>
                                    </div>
                                );
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux: (lang) => dispatch(changeLanguage(lang))

    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClinicSection));
