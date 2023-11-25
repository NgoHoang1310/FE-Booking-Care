import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { role } from '../utils';
import { Link, withRouter } from 'react-router-dom';


class Home extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = '/login';
        if (isLoggedIn && this.props.userInfo.roleId === role.ADMIN) {
            linkToRedirect = '/system/user-redux';
        }
        if (isLoggedIn && this.props.userInfo.roleId === role.DOCTOR) {
            linkToRedirect = '/doctor/manage-schedule';
        }


        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
