import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './homeHeader';
import SpecialtySection from './section/specialtySection';
import ClinicSection from './section/clinicSection';
import OutStandingDoctor from './section/outStandingDoctor';
import HandBookSection from './section/handBookSection';
import HomeFooter from './homeFooter';
import AboutSection from './section/aboutSection';

import { settings } from '../../utils/constant';
class HomePage extends Component {

    render() {
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <SpecialtySection {...settings} />
                <ClinicSection {...settings} />
                <OutStandingDoctor {...settings} />
                <HandBookSection {...settings} isShowHeader />
                <AboutSection />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
