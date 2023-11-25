import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import './DetailHandbook.scss';
import HomeHeader from '../homeHeader';
import HomeFooter from '../homeFooter';

import DetailSection from '../section/DetailSection';
import * as action from '../../../store/actions';
import { languages } from '../../../utils';
import { CommonUtils } from '../../../utils';
import { getDetailHandbook } from '../../../services/userService';
import HandBookSection from '../section/handBookSection';
import { settings } from '../../../utils/constant';

class DetailHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailHandbook: '',
        }
    }

    getDetailHandbook = async () => {
        let detailHandbook = await getDetailHandbook(this.props.match.params.id);
        if (detailHandbook && detailHandbook.data.errCode === 0) {
            this.setState({
                detailHandbook: detailHandbook.data.detailHandbook,
            })
        }
    }


    componentDidMount() {
        this.getDetailHandbook();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.getDetailHandbook();
        }
    }

    render() {
        let { detailHandbook } = this.state;
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='detail-handbook-container' >
                    <div className='detail-handbook__banner'  >
                        <div className='overlay' ></div>
                        <h1 className='detail-handbook__banner--title' >{detailHandbook.title}</h1>
                    </div>
                    <div className='detail-handbook__content' >
                        <img src={CommonUtils.encodeBase64(detailHandbook.image || 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg')} className='detail-handbook__content--img' ></img>
                        <h2 className='detail-handbook__content--title' >
                            {detailHandbook.title}
                        </h2>
                        <div className='detail-handbook__content--info' >
                            <p className='info-detail' >Sản phẩm của: <span className='highline' >Booking care</span></p>
                            <p className='info-detail' >Tác giả: <span className='highline' >{detailHandbook.author}</span></p>
                            <p className='info-detail' >Xuất bản: <span className='highline' >{moment(Number(detailHandbook.release)).format('DD-MM-YYYY')}</span></p>
                        </div>
                        <div className='detail-handbook__content--main' >
                            <DetailSection dataDetail={detailHandbook.descriptionHTML} />
                        </div>
                    </div>
                    <div className='detail-handbook__suggestion' >
                        <HandBookSection {...settings} isShowHeader id={this.props.match.params.id} />
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


export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
