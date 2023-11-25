import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import './LikeAndSharePlugin.scss';

class LikeAndSharePlugin extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    async componentDidMount() {

    }


    componentDidUpdate(prevProps) {

    }

    render() {
        return (
            <React.Fragment>
                <div
                    class="fb-like"
                    data-href="https://developers.facebook.com/docs/plugins/"
                    data-width=""
                    data-layout=""
                    data-action=""
                    data-size=""
                    data-share="true"
                ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndSharePlugin);