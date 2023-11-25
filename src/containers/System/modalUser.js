import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {createUser} from '../../services/userService'
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            address: "",
            gender: "",
            roleId: "",

        };
    }

    handleOnchangeInput = (event, id) => {
            let copyState = this.state;
             copyState[id] = event.target.value;
             this.setState({
               ...copyState
             })
    }

    handleCreateUser = async() => {
        let userData = await createUser(this.state);
        if(userData) {
            this.setState({
                errCode: userData.data.errCode,
                errMessage: userData.data.message,
            })
            if(this.state.errCode === 0){
                this.props.toggle();
                await this.props.getAllUserById();
            }
        }
        alert(this.state.errMessage)
    }


    componentDidMount() {
    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}
                size="lg"
            >

                <ModalHeader toggle={this.props.toggle}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="col-12 mt-5">
                        <form className="row g-2 ms-5 me-5" action="/create" method="post">
                            <div className="col-md-6">
                                <label htmlFor="validationDefault01" className="form-label">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="validationDefault01"
                                    placeholder="VD: NGO"
                                    name="firstName"
                                    onChange={(event) => {this.handleOnchangeInput(event, 'firstName')}}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="validationDefault02" className="form-label">Last name</label>
                                <input
                                 type="text"
                                  className="form-control"
                                   id="validationDefault02"
                                    placeholder="VD: HOANG"
                                     name="lastName"
                                     onChange={(event) => {this.handleOnchangeInput(event, 'lastName')}}
                                    value={this.state.lastName}

                                      />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="validationDefault01" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    onChange={(event) => {this.handleOnchangeInput(event, 'email')}}
                                    value={this.state.email}

                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="validationDefault02" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                    value={this.state.password}

                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="validationDefault03" className="form-label">Address</label>
                                <input
                                 type="text"
                                  className="form-control"
                                   name="address"
                                   onChange={(event) => {this.handleOnchangeInput(event, 'address')}}
                                   value={this.state.address}
                                    />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="validationDefault04" className="form-label">Sex</label>
                                <select
                                 className="form-select"
                                  name="gender"
                                    onChange={(event) => {this.handleOnchangeInput(event, 'gender')}}
                                    value={this.state.gender}
                                     >
                                    <option selected disabled value="">Choose...</option>
                                    <option value="1" >Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="validationDefault04" className="form-label">Role</label>
                                <select
                                className="form-select"
                                 name="role"  onChange={(event) => {this.handleOnchangeInput(event, 'roleId')}}
                                 value={this.state.roleId}
                                 >
                                    <option selected disabled value="">Choose...</option>
                                    <option value="1" >R1</option>
                                    <option value="2">R2</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleCreateUser}>
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


