import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import "./homeFooter.scss";
class HomeFooter extends Component {
    render() {
        return (
            <div className='homeFooter'>
                <div className='homeFooter-content'>
                    <p className='copy-right' > &copy; 2023 Booking Care Clone</p>
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


export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
