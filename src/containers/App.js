import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/login';
import System from '../routes/System';
import Doctor from '../routes/Doctor';
import DetailDoctor from './HomePage/Doctor/DetailDoctor';
import DetailSpecialty from './HomePage/Specialty/DetailSpecialty';
import DetailClinic from './HomePage/Clinic/DetailClinic';
import DetailHandbook from './HomePage/Handbook/DetailHandbook';
import verifiedPage from './HomePage/verifiedPage';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/homePage';
import { role } from '../utils';
import CustomScrollbars from '../components/CustomScrollbars';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        console.log(this.props.userInfo);
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container" >
                        <ConfirmModal />
                        <span className="content-container">
                            <CustomScrollbars
                                style={{ height: '100vh' }}
                            >
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={(this.props.userInfo && (this.props.userInfo.roleId === role.ADMIN)) ? userIsAuthenticated(System) : userIsNotAuthenticated(Login)} />
                                    <Route path={path.DOCTOR_SCHEDULE} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.DOCTOR_PATIENT} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route path={path.DETAIL_HANDBOOK} component={DetailHandbook} />
                                    <Route path={path.VERIFY_EMAIL} component={verifiedPage} />
                                </Switch>
                            </CustomScrollbars>
                        </span>
                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);