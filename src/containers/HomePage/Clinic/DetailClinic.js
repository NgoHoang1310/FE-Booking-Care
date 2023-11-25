import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import './DetailClinic.scss';
import HomeHeader from '../homeHeader';
import HomeFooter from '../homeFooter';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import DetailSection from '../section/DetailSection';
import { getDetailClinic } from '../../../services/userService';
import * as action from '../../../store/actions';
import { languages } from '../../../utils';
import { CommonUtils } from '../../../utils';
class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: '',
            description: '',
            introduction: '',
            name: '',
            address: '',
            image: '',
            banner: '',
        }
    }


    async componentDidMount() {
        let DetailClinic = await getDetailClinic(this.props.match.params.id);
        console.log(DetailClinic);
        if (DetailClinic.data && DetailClinic.data.errCode === 0) {
            this.setState({
                description: DetailClinic.data.detailClinic.description,
                doctors: DetailClinic.data.detailClinic.doctors,
                introduction: DetailClinic.data.detailClinic.introduction,
                name: DetailClinic.data.detailClinic.name,
                address: DetailClinic.data.detailClinic.address,
                image: DetailClinic.data.detailClinic.image,
                banner: DetailClinic.data.detailClinic.banner,
            })
        }

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        let { doctors, description, introduction, name, image, banner, address } = this.state;
        console.log(introduction);
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='clinic-container' >
                    <div className='clinic-banner' style={{ backgroundImage: `url(${CommonUtils.encodeBase64(banner)})` }} >
                        <div className='clinic-header' >
                            <img src={CommonUtils.encodeBase64(image)} className='clinic-header__image' ></img>
                            <div className='clinic-header__content' >
                                <h3 className='clinic-header__content--name' >{name}</h3>
                                <p className='clinic-header__content--address' >{address}</p>
                            </div>
                        </div>
                    </div>
                    <div className='clinic-wrapper' >
                        <div className='clinic-wrapper__introduction' >
                            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </div>
                        <div className='clinic-wrapper__description' >
                            {introduction}
                        </div>
                        <div className='clinic-wrapper__detail' >
                            <h5 className='clinic-wrapper__detail--heading' >Lời giới thiệu</h5>
                            {description &&
                                <DetailSection
                                    dataDetail={description}
                                />
                            }
                        </div>
                        <div className='clinic-wrapper__doctor' >
                            <h5 className='clinic-wrapper__doctor--heading' >Bác sĩ</h5>
                            {doctors && doctors.length > 0 && doctors.map((doctor, index) => {
                                return (<div key={index} className='clinic-doctor' >
                                    <div className='clinic-doctor__profile' >
                                        <ProfileDoctor
                                            doctorID={doctor.doctorID}
                                            isShowSchedule={false}
                                            isShowDescription={true}
                                            isShowLocation={true}
                                            isShowMoreLink={true}
                                        />
                                    </div>
                                    <div className='clinic-doctor__schedule' >
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
                        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
