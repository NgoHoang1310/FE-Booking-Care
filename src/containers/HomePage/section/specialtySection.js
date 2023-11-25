import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './slider.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userService';
import CommonUtils from '../../../utils/CommonUtils';

class SpecialtySection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
        }
    }

    handleViewDetailSpecialty = (id) => {
        this.props.history.push(`/detail-specialty/${id}`);
    }

    getAllSpecialty = async () => {
        let specialties = await getAllSpecialty();
        if (specialties.data && specialties.data.errCode === 0) {
            this.setState({
                specialties: specialties.data.specialties
            })
        }
    }

    async componentDidMount() {
        // this.getAllSpecialty();
        let specialties = await getAllSpecialty();
        if (specialties.data && specialties.data.errCode === 0) {
            this.setState({
                specialties: specialties.data.specialties
            })
        }
    }

    render() {
        let { specialties } = this.state;
        console.log(specialties);
        return (
            <div className='section background-dark'>
                <div className='section-container'>
                    <div className='silder-heading'>
                        <h3 className='slider-title'><FormattedMessage id="manage-section.popular-specialties" /></h3>
                        <div className='slider-more-btn'>
                            <a href=''><FormattedMessage id="common.more" /></a>
                        </div>
                    </div>
                    <div className='section-content'>
                        <Slider {...this.props}>
                            {specialties && specialties.length > 0 && specialties.map((specialty, index) => {
                                return (
                                    <div key={index} className='list-item' onClick={() => this.handleViewDetailSpecialty(specialty.id)} >
                                        <div className='img-container specialty-img' style={{ backgroundImage: `url(${CommonUtils.encodeBase64(specialty.image)})` }} ></div>
                                        <a href=''>{specialty.name}</a>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialtySection));
