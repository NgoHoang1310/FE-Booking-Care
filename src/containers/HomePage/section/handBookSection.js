import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';


import './slider.scss';
import { getAllHandbook } from '../../../services/userService';
import { CommonUtils } from '../../../utils';

class HandBookSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handbooks: []
        }
    }

    getAllHandbook = async () => {
        let handbooks = await getAllHandbook();
        if (handbooks.data && handbooks.data.errCode === 0) {
            this.setState({
                handbooks: handbooks.data.handbooks,
            })
        }
    }

    handleViewDetailHandbook = (id) => {
        this.props.history.push(`/detail-handbook/${id}`);
    }

    async componentDidMount() {
        this.getAllHandbook();
    }




    render() {
        let { handbooks } = this.state;
        // console.log(this.props.id);
        return (
            <div className='section'>
                <div className='section-container'>
                    {this.props.isShowHeader
                        &&
                        <div className='silder-heading'>
                            <h3 className='slider-title'><FormattedMessage id="manage-section.handbook" /></h3>
                            <div className='slider-more-btn'>
                                <a href=''><FormattedMessage id="common.more" /></a>
                            </div>
                        </div>
                    }
                    <div className='section-content'>
                        <Slider {...this.props}>
                            {handbooks && handbooks.length > 0 && handbooks.map((item, index) => {
                                if (item.id != this.props.id) {
                                    return (
                                        <div
                                            key={index}
                                            className='list-item'
                                            onClick={() => this.handleViewDetailHandbook(item.id)}

                                        >
                                            <div
                                                className='img-container handbook-img'
                                                style={{
                                                    backgroundImage: `url(${CommonUtils.encodeBase64(item.image)})`,
                                                    backgroundSize: 'contain',
                                                }}
                                            ></div>
                                            <a href=''>{item.title}</a>

                                        </div>

                                    );


                                }
                            })
                                ||
                                <div class="w-100 d-flex justify-content-center text-primary m-5">
                                    <div class="spinner-grow text-success" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            }

                        </Slider>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux: (lang) => dispatch(changeLanguage(lang))

    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBookSection));
