import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FacebookProvider, Like, Comments } from 'react-facebook';

import './DetailDoctor.scss';
import HomeHeader from '../homeHeader';
import DetailSection from '../section/DetailSection';
import * as action from '../../../store/actions';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import HomeFooter from '../homeFooter';
import LikeAndSharePlugin from '../../Plugins/SocialPlugins/LikeAndSharePlugin';
import { languages } from '../../../utils';
require('dotenv').config();
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: '',
            currentURL: '',
        }
    }

    getCurrentURL = () => {
        this.setState({
            currentURL: window.location.href
        })
    }

    componentDidMount() {
        this.props.getDetailDoctor(this.props.match.params.id);
        this.getCurrentURL();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.detailDoctor != this.props.detailDoctor) {
            this.setState({
                doctor: this.props.detailDoctor,
            })
        }
    }

    render() {
        let { doctor, currentURL } = this.state;
        let imgBase64;
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='detail-doctor-container' >
                    <div className='doctor-introduction' >
                        {
                            doctor ?
                                <>
                                    <div className='detail-doctor__image' style={{ backgroundImage: `url(${imgBase64 = new Buffer(doctor && doctor.image, 'base64').toString('binary')})` }} ></div>
                                    <div className='detail-doctor__introduce' >
                                        <h2 className='detail-doctor__introduce--name' >
                                            {`${doctor.positionData && this.props.lang === languages.EN ? doctor.positionData.valueEn : doctor.positionData.valueVi}, ${doctor.firstName} ${doctor.lastName}`}
                                        </h2>
                                        <p className='detail-doctor__introduce--profile' >
                                            {doctor.Markdown && doctor.Markdown.description}
                                        </p>
                                        <div className='detail-doctor__introduce--interact' >
                                            {/* <button className='btn-primary btn-like' >Thích 56</button>
                                            <button className='btn-primary btn-share ' >Chia sẻ</button> */}
                                            {/* <LikeAndSharePlugin /> */}
                                            <FacebookProvider appId={process.env.REACT_APP_FACEBOOL_ID}>
                                                <Like href={currentURL} colorScheme="dark" showFaces share />
                                            </FacebookProvider>
                                        </div>
                                    </div>
                                </>
                                :
                                <div class="w-100 d-flex justify-content-center text-primary m-5">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className='container-schedule' >
                        <div className='left-content'>
                            <DoctorSchedule
                                doctorId={this.props.match.params.id}
                            />
                        </div>
                        <div className='right-content' >
                            <DoctorExtraInfo
                                doctorId={this.props.match.params.id}
                            />
                        </div>
                    </div>

                </div>
                <DetailSection
                    style={{ backgroundColor: '#f9f9f9' }}
                    dataDetail={doctor.Markdown}
                />
                <div
                    className='comment-plugin'
                    style={{
                        maxWidth: '1200px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <h3 className='m-3'>Bình luận</h3>
                    <FacebookProvider appId={process.env.REACT_APP_FACEBOOL_ID} >
                        <Comments href={'http://musicplayer-nth.surge.sh/'} />
                    </FacebookProvider>
                </div>
                <HomeFooter />





            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        detailDoctor: state.user.doctor,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (doctorId) => dispatch(action.fetchDetailDoctorStart(doctorId))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
