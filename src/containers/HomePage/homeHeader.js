import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../utils/constant';
import { changeLanguage } from '../../store/actions/appActions';
import './homeHeader.scss'
class HomeHeader extends Component {

    changeLanguageApp(languageData) {
        this.props.changeLanguageAppRedux(languageData);
    }
    render() {
        let language = this.props.lang;
        return (
            <React.Fragment>
                <div className='homeHeader-container'>
                    <div className='homeHeader-content'>
                        <div className='homeHeader-logo'>
                            <span >
                                <i class="fas fa-bars"></i>
                            </span>
                            <a href='/home' >
                                <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt=""></img>

                            </a>
                        </div>
                        <div className='homeHeader-nav_list'>
                            <a href='' className='homeHeader-nav_item'>
                                <h5><FormattedMessage id="homeHeader.specialist" /></h5>
                                <p><FormattedMessage id="homeHeader.findDoctorsBySpecialty" /></p>
                            </a>
                            <a href='' className='homeHeader-nav_item'>
                                <h5><FormattedMessage id="homeHeader.healthFacilities" /></h5>
                                <p><FormattedMessage id="homeHeader.clinic" /></p>
                            </a>
                            <a href='' className='homeHeader-nav_item'>
                                <h5><FormattedMessage id="homeHeader.doctors" /></h5>
                                <p><FormattedMessage id="homeHeader.greatestDoctor" /></p>
                            </a>
                            <a href='' className='homeHeader-nav_item'>
                                <h5><FormattedMessage id="homeHeader.examinationPackage" /></h5>
                                <p><FormattedMessage id="homeHeader.generalHealth" /></p>
                            </a>
                        </div>
                        <div className='homeHeader-support'>
                            <div className='homeHeader-support_icon'>
                                <i class="fas fa-question-circle"></i>
                                <FormattedMessage id="homeHeader.support" />
                            </div>
                            <div>0343-027-930</div>
                            <div className='homeHeader-support_language'>
                                <span className={(language === languages.VI) ? "language__vi me-3 active" : "language__vi me-3"} onClick={() => this.changeLanguageApp(languages.VI)}>VN</span>
                                <span className={(language === languages.EN) ? "language_en active" : "language__en"} onClick={() => this.changeLanguageApp(languages.EN)}>EN</span>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
                {this.props.isShowBanner &&
                    <div className='homeHeader-banner'>
                        <div className='homeHeader-banner_layer'>
                            <div className='homeHeader-banner_container'>
                                <h2 className='homeHeader-banner_title'><FormattedMessage id="banner.title1" /></h2>
                                <h2 className='homeHeader-banner_title'><FormattedMessage id="banner.title2" /></h2>
                                <div className='homeHeader-banner_search'>
                                    <i class="fas fa-search"></i>
                                    <input className='homeHeader-banner_search__input' placeholder={'Bác sĩ, chuyên khoa,...'} ></input>
                                </div>

                            </div>
                            <div className='homeHeader-banner_options'>
                                <div className='homeHeader-banner_options__list'>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon specialist-examination'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.specialist1" /></h5>
                                            <h5><FormattedMessage id="options.specialist2" /></h5>


                                        </a>
                                    </div>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon remote-examination'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.remoteExamination1" /></h5>
                                            <h5><FormattedMessage id="options.remoteExamination2" /></h5>


                                        </a>
                                    </div>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon general-examination'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.generalExamination1" /></h5>
                                            <h5><FormattedMessage id="options.generalExamination2" /></h5>


                                        </a>
                                    </div>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon medical-tests'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.medicalTests1" /></h5>
                                            <h5><FormattedMessage id="options.medicalTests2" /></h5>
                                        </a>
                                    </div>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon mental-health'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.mentalHealth1" /></h5>
                                            <h5><FormattedMessage id="options.mentalHealth2" /></h5>

                                        </a>
                                    </div>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon dental-examination'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.dentist1" /></h5>
                                            <h5><FormattedMessage id="options.dentist2" /></h5>

                                        </a>
                                    </div>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon surgical-package'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.examinationPackage1" /></h5>
                                            <h5><FormattedMessage id="options.examinationPackage2" /></h5>

                                        </a>
                                    </div>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon Live-healthy-with-diabetes'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.diabetes1" /></h5>
                                            <h5><FormattedMessage id="options.diabetes2" /></h5>

                                        </a>
                                    </div>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon health-test'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.healthTest1" /></h5>
                                            <h5><FormattedMessage id="options.healthTest2" /></h5>

                                        </a>
                                    </div>
                                    <div className='homeHeader-banner_options__item'>
                                        <div className='homeHeader-banner_options__item--icon medical-near-you'></div>
                                        <a href="" className='homeHeader-banner_options__item--title'>
                                            <h5><FormattedMessage id="options.nearHome1" /></h5>
                                            <h5><FormattedMessage id="options.nearHome2" /></h5>

                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
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
        changeLanguageAppRedux: (lang) => dispatch(changeLanguage(lang))

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
