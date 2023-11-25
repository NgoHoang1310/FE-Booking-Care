import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { languages, role } from '../../utils/constant';
import { isEmpty } from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage(language) {
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !isEmpty(userInfo)) {
            if (userInfo.roleId === role.ADMIN) {
                menu = adminMenu;
            }
            if (userInfo.roleId === role.DOCTOR) {
                menu = doctorMenu;
            }

            this.setState({
                menuApp: menu,
            })
        }
    }


    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='header-setting'>
                    <div className='welcome me-3' ><FormattedMessage id="homeHeader.welcome" />, {userInfo.lastName} !</div>
                    <div className='header-languages'>
                        <span className={(language === languages.VI) ? "language-vn active" : "language-vn"} onClick={() => this.handleChangeLanguage(languages.VI)} >VN</span>
                        <span className={(language === languages.EN) ? "language-en active" : "language-en"} onClick={() => this.handleChangeLanguage(languages.EN)}>EN</span>
                    </div>


                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (lang) => dispatch(actions.changeLanguage(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
