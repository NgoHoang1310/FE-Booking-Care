import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import './DetailSection.scss';
class DetailSection extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='section-detail' style={this.props.style} >
                    <div className='section-container' dangerouslySetInnerHTML={{ __html: this.props.dataDetail && (this.props.dataDetail.contentHTML || this.props.dataDetail) }} >
                    </div>
                </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(DetailSection);
