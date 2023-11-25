import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faL } from '@fortawesome/free-solid-svg-icons';
import './ProfileDoctor.scss';
import * as action from '../../../store/actions';
import moment from 'moment';
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { languages } from '../../../utils';
import { getProfileDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { toNumber } from 'lodash';
import { isEmpty } from 'lodash';


class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDescription: false,
            isShowSchedule: false,
            isShowLocation: false,
            isShowMoreLink: false,
            dataSchedule: '',
            dataDoctor: ''
        }
    }

    async componentDidMount() {
        let doctorId = this.props.dataSchedule ? this.props.dataSchedule.doctorID : this.props.doctorID;
        console.log(doctorId);
        let response = await getProfileDoctor(doctorId);
        if (response && !isEmpty(response)) {
            this.setState({
                dataDoctor: response,
                dataSchedule: this.props.dataSchedule,
                isShowSchedule: this.props.isShowSchedule,
                isShowDescription: this.props.isShowDescription,
                isShowLocation: this.props.isShowLocation,
                isShowMoreLink: this.props.isShowMoreLink
            })
            if (this.props.getProfileDoctor) {
                this.props.getProfileDoctor(response);
            }
        }
    }


    componentDidUpdate(prevProps) {

    }



    render() {
        let { dataSchedule, dataDoctor, isShowSchedule, isShowDescription, isShowLocation, isShowMoreLink } = this.state;
        let imgBase64;
        let detailDoctor = dataDoctor ? dataDoctor.data.detailDoctor : "";

        return (
            <div className='profile-doctor-introduction' >
                <div className='profile-doctor__image' style={{ backgroundImage: `url(${imgBase64 = new Buffer(detailDoctor && detailDoctor.image, 'base64').toString('binary')})` }}  >
                    {isShowMoreLink &&
                        <Link to={`/detail-doctor/${detailDoctor.id}`} className='view-more' >Xem thêm</Link>
                    }
                </div>
                <div className='profile-doctor__introduce' >
                    <h2 className='profile-doctor__introduce--name' >
                        {`${detailDoctor && (this.props.lang === languages.EN ? detailDoctor.positionData.valueEn : detailDoctor.positionData.valueVi)},
                         ${detailDoctor && detailDoctor.firstName} ${detailDoctor && detailDoctor.lastName}`}
                    </h2>
                    {isShowDescription &&
                        <p className='detail-doctor__introduce--profile' >
                            {detailDoctor.Markdown && detailDoctor.Markdown.description}
                        </p>
                    }
                    {isShowSchedule &&
                        <p className='profile-doctor__introduce--schedule' >
                            {`${dataSchedule && (this.props.lang === languages.EN ? dataSchedule.timeData.valueEn : dataSchedule.timeData.valueVi)} - ${dataSchedule && moment(new Date(Number(dataSchedule.date))).format('DD/MM/YYYY')}`}
                        </p>
                    }
                    {isShowLocation &&
                        <p className='profile-doctor__introduce--location' >
                            <i class="fa-solid fa-location-dot"></i>
                            {`${detailDoctor && (this.props.lang === languages.EN ? detailDoctor.Doctor_Info.provinceData.valueEn : detailDoctor.Doctor_Info.provinceData.valueVi)}`}
                        </p>
                    }
                </div>
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
