import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { languages, crud_actions } from '../../../utils/constant';
import { CommonUtils } from '../../../utils'
import * as action from '../../../store/actions'
import './UserRedux.scss'
import TableManage from './TableManageUser';
import { toast } from 'react-toastify';

class UserRedux extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrGender: [],
      arrRole: [],
      arrPosition: [],
      previewImg: '',
      isOpen: false,
      inputDisable: false,
      action: '',

      id: '',
      email: '',
      password: '',
      phone: '',
      firstName: '',
      lastName: '',
      address: '',
      sex: '',
      role: '',
      position: '',
      avatar: ''
    }

  }

  handleEdit = (user) => {
    let imgBase64 = '';
    if (user.image) {
      imgBase64 = new Buffer(user.image, 'base64').toString('binary');
    }
    this.setState({
      action: crud_actions.EDIT,
      inputDisable: true,
      id: user.id,
      email: user.email,
      password: 'hardcode',
      phone: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      sex: user.gender,
      role: user.roleID,
      position: user.positionID,
      previewImg: imgBase64
    })
  }

  async handleUploadImg(element) {
    let files = element.target.files[0];
    if (files) {
      let base64 = await CommonUtils.getBase64(files);
      console.log(typeof files);
      console.log(base64);
      const objectUrl = URL.createObjectURL(files)
      this.setState({
        previewImg: objectUrl,
        avatar: base64,
      })
    }
    // setPreview(objectUrl)
  }

  handlePreviewImg() {
    this.setState({
      isOpen: true,
    })

  }

  handleSaveUser() {
    let isValid = this.handleValidate();
    let { action } = this.state;
    if (isValid === false) return;

    if (action === crud_actions.CREATE) {
      this.props.createUser({
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.sex,
        role: this.state.role,
        position: this.state.position,
        avatar: this.state.avatar
      })
    }
    if (action === crud_actions.EDIT) {
      this.props.editUser({
        id: this.state.id,
        phone: this.state.phone,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.sex,
        role: this.state.role,
        position: this.state.position,
        avatar: this.state.avatar
      })
    }

    // this.props.getUser();

  }

  handleValidate() {
    let isValid = true;
    let arrInput = ['firstName', 'lastName', 'email', 'password', 'address', 'sex', 'role', 'position'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.warn("Bạn chưa điền " + arrInput[i]);
        break;
      }
    }
    return isValid;
  }

  handleOnChange(event, id) {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState
    })
  }

  componentDidMount() {
    this.props.getGender();
    this.props.getRole();
    this.props.getPosition();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataGender != this.props.dataGender) {
      this.setState({
        arrGender: this.props.dataGender,
      })
    }
    if (prevProps.dataRole != this.props.dataRole) {
      this.setState({
        arrRole: this.props.dataRole,
      })
    }
    if (prevProps.dataPosition != this.props.dataPosition) {
      this.setState({
        arrPosition: this.props.dataPosition,
      })
    }
    if (prevProps.dataUser != this.props.dataUser) {
      this.setState({
        email: '',
        password: '',
        phone: '',
        firstName: '',
        lastName: '',
        address: '',
        sex: '',
        role: '',
        position: '',
        action: crud_actions.CREATE,
        inputDisable: false,
        previewImg: '',
      })
    }
  }




  render() {
    let { firstName, lastName, email, password, sex, role, address, phone, position, inputDisable, action } = this.state;
    let genders = this.state.arrGender;
    let roles = this.state.arrRole;
    let positions = this.state.arrPosition;
    let language = this.props.lang;
    return (
      <React.Fragment>
        <div className="title text-center" >User redux</div>
        <div className='main' >
          <div className='container' >
            <div className='row' >
              <div class="col-12 mt-5">
                <form class="row g-2 ms-5 me-5">
                  <div class="col-md-6">
                    <label for="validationDefault01" class="form-label"><FormattedMessage id="manage-user.firstName" /></label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationDefault01"
                      placeholder="VD: NGO"
                      name="firstName"
                      value={firstName}
                      onInput={(event) => this.handleOnChange(event, 'firstName')}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="validationDefault02" class="form-label"><FormattedMessage id="manage-user.lastName" /></label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationDefault02"
                      placeholder="VD: HOANG"
                      name="lastName"
                      value={lastName}
                      onInput={(event) => this.handleOnChange(event, 'lastName')}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="validationDefault01" class="form-label"><FormattedMessage id="manage-user.email" /></label>
                    <input
                      disabled={inputDisable}
                      type="email"
                      class="form-control"
                      name="email"
                      value={email}
                      onInput={(event) => this.handleOnChange(event, 'email')}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="validationDefault02" class="form-label"><FormattedMessage id="manage-user.password" /></label>
                    <input
                      disabled={inputDisable}
                      type="password"
                      class="form-control"
                      name="password"
                      value={password}
                      onInput={(event) => this.handleOnChange(event, 'password')}
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="validationDefault03" class="form-label"><FormattedMessage id="manage-user.address" /></label>
                    <input
                      type="text"
                      class="form-control"
                      name="address"
                      value={address}
                      onInput={(event) => this.handleOnChange(event, 'address')}
                    />
                  </div>
                  <div class="col-md-3">
                    <label for="validationDefault04" class="form-label"><FormattedMessage id="manage-user.gender" /></label>
                    <select value={sex} class="form-select" name="gender" onInput={(event) => this.handleOnChange(event, 'sex')} >
                      <option selected disabled value={''} >Choose...</option>
                      {genders && genders.length > 0 && genders.map(function (gender, index) {

                        return (
                          <option value={gender.keyMap} >{(language == languages.VI) ? gender.valueVi : gender.valueEn}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label for="validationDefault04" class="form-label"><FormattedMessage id="manage-user.role" /></label>
                    <select value={role} class="form-select" name="role" onInput={(event) => this.handleOnChange(event, 'role')} >
                      <option selected disabled value={''}>Choose...</option>
                      {roles && roles.length > 0 && roles.map(function (role, index) {
                        return (
                          <option value={role.keyMap} >{(language == languages.VI) ? role.valueVi : role.valueEn}</option>
                        );
                      })}
                    </select>
                  </div>

                  <div class="col-md-6">
                    <div>
                      <label for="previewImg" class="form-label previewImg-Btn"><FormattedMessage id="manage-user.prevImg" /></label>
                    </div>
                    <input id='previewImg' type='file' hidden onChange={(event) => this.handleUploadImg(event)}  ></input>
                    <div className='previewImg-wrapper' style={{ backgroundImage: `url(${this.state.previewImg})` }} onClick={() => this.handlePreviewImg()} >
                    </div>
                  </div>
                  <div class="col-md-3">
                    <label for="validationDefault04" class="form-label"><FormattedMessage id="manage-user.position" /></label>
                    <select value={position} class="form-select" name="position" onInput={(event) => this.handleOnChange(event, 'position')} >
                      <option selected disabled value={''} >Choose...</option>
                      {positions && positions.length > 0 && positions.map(function (position, index) {
                        return (
                          <option value={position.keyMap} >{(language == languages.VI) ? position.valueVi : position.valueEn}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label for="validationDefault03" class="form-label"><FormattedMessage id="manage-user.phone" /></label>
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      value={phone}
                      onInput={(event) => this.handleOnChange(event, 'phone')}
                    />
                  </div>
                  <div class="col-12">
                    <button type='button' class={(action === crud_actions.EDIT) ? "btn btn-warning pe-3 ps-3" : "btn btn-primary pe-3 ps-3"} onClick={this.handleSaveUser.bind(this)} ><FormattedMessage id="manage-user.submit" /></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen &&
          <Lightbox
            mainSrc={this.state.previewImg}
            onCloseRequest={() => this.setState({ isOpen: false })
            }
          />

        }
        <TableManage
          handleEditUser={this.handleEdit}
        />
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {
    lang: state.app.language,
    dataGender: state.admin.genders,
    dataRole: state.admin.roles,
    dataPosition: state.admin.positions,
    dataUser: state.admin.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGender: () => dispatch(action.fetchGenderStart()),
    getRole: () => dispatch(action.fetchRoleStart()),
    getPosition: () => dispatch(action.fetchPositionStart()),
    createUser: (data) => dispatch(action.createNewUser(data)),
    editUser: (data) => dispatch(action.EditUserStart(data)),
    // getUser: () => dispatch(action.fetchUserStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
