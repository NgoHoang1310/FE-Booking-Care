import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FacebookProvider, Comments } from 'react-facebook';

import './DetailSpecialty.scss';
import HomeHeader from '../homeHeader';
import HomeFooter from '../homeFooter';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import DetailSection from '../section/DetailSection';
import { getDetailSpecialty } from '../../../services/userService';
import * as action from '../../../store/actions';
import { languages } from '../../../utils';

require('dotenv').config();

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: '',
            description: '',

        }
    }


    async componentDidMount() {
        let detailSpecialty = await getDetailSpecialty(this.props.match.params.id);
        console.log(detailSpecialty.data.detailSpecialty.description);
        if (detailSpecialty.data && detailSpecialty.data.errCode === 0) {
            this.setState({
                description: detailSpecialty.data.detailSpecialty.description,
                doctors: detailSpecialty.data.detailSpecialty.doctors,
            })
        }

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        let { doctors, description } = this.state;
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='specialty-container' >
                    <div className='specialty-info' >
                        {description &&
                            <DetailSection
                                dataDetail={description}
                            />
                        }
                    </div>
                    {doctors && doctors.length > 0 && doctors.map((doctor, index) => {
                        return (<div key={index} className='specialty-doctor' >
                            <div className='specialty-doctor__profile' >
                                <ProfileDoctor
                                    doctorID={doctor.doctorID}
                                    isShowSchedule={false}
                                    isShowDescription={true}
                                    isShowLocation={true}
                                    isShowMoreLink={true}
                                />
                            </div>
                            <div className='specialty-doctor__schedule' >
                                <DoctorSchedule
                                    doctorId={doctor.doctorID}
                                />
                                <DoctorExtraInfo
                                    doctorId={doctor.doctorID}

                                />
                            </div>
                        </div>
                        )
                    })}

                    <div className='comment-plugin' >

                    </div>
                </div>
                <HomeFooter />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
