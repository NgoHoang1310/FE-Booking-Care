import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './homeHeader';
import { verifyEmail } from '../../services/userService';
import './verifiedPage.scss';
class VerifiedPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVerify: false,
        }
    }

    async componentDidMount() {
        if (this.props.location.search) {
            console.log(this.props.location.search);
            let doctorId = new URLSearchParams(this.props.location.search).get('doctorId');
            let token = new URLSearchParams(this.props.location.search).get('token');

            let response = await verifyEmail({
                doctorId: doctorId,
                token: token
            })

            if (response.data && response.data.errCode === 0) {
                this.setState({
                    isVerify: !this.state.isVerify
                })
            }
        }
    }

    render() {
        return (
            <>
                <HomeHeader />
                {this.state.isVerify
                    ?
                    <div className='verify-container' >
                        <h1 className='verify-heading verify-heading__success' >Lịch hẹn đã được xác nhận </h1>
                    </div>
                    :
                    <div className='verify-container'>
                        <h1 className='verify-heading verify-heading__error' >Lịch hẹn không tồn tại hoặc đã được xác nhận </h1>
                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedPage);
