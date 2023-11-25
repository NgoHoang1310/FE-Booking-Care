import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
class AboutSection extends Component {
    render() {
        return (
            <div className='section background-dark' style={{ height: 'auto' }} >
                <div className='section-container'>
                    <div className='silder-heading'>
                        <h3 className='slider-title'><FormattedMessage id="manage-section.media-talks-about-bookingcare" /></h3>
                    </div>
                    <div className='section-content d-flex'>
                        <div className='list-item height-about col-2'>
                            <div className='list-item_main'>
                                <iframe className='video-about' width={"100%"} src='https://www.youtube-nocookie.com/embed/FyDQljKtWnI?autoplay=1'>
                                </iframe>
                            </div>
                        </div>

                        <div className='list-item col-2'>
                            <div className='list-item_main'>

                            </div>
                        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(AboutSection);
