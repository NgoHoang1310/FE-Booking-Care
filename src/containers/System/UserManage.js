import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./userManager.scss";
import { getAllUser, deleteUser, updateUser } from '../../services/userService';
import ModalUser from '../System/modalUser'
import modalEditUser from './modalEditUser';
import ModalEditUser from './modalEditUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isShow: false,
            isShowEditModal:false,
            editUser: {},
        }
    }

    async componentDidMount() {
       await this.getAllUserById();
    }

    getAllUserById = async() => {
        let user = await getAllUser("ALL");
        if (user) {
            this.setState({
                arrUsers: user.data.userData.user,
            })
            console.log(this.state.arrUsers);
        }
    }

    handleModalUser = () => {
        this.setState({
            isShow: !this.state.isShow,
        })
    }

    handleEditModalUser = (user) => {
        this.setState({
            isShowEditModal: !this.state.isShowEditModal,
            editUser: user,
        })
    }

    doEditUser = async(user) => {
        try {
            let res = await updateUser(user);
            if(res && res.data.errCode === 0 ) {
                this.handleEditModalUser();
                await this.getAllUserById();
            }
        } catch (error) {
            console.log(error)
        }
       
    }

    async handleDeleteUser(user){
    //    try {
    //      let res = await deleteUser(user.id);
    //      if(res && res.data.errCode === 0 ) {
    //         await this.getAllUserById();
    //      }
        
    //    } catch (error) {
    //        console.log(error);
    //    }
    console.log(user)
    }

    // handleEditUser = async(user) => {

    // }

    



    render() {
        let allUser = this.state.arrUsers;
        return (
            <div className="container">
                <h2 className='title'>Manage users with React</h2>
                <button type="button" class="btn btn-primary mb-3" onClick={this.handleModalUser} >
                    <i class="fas fa-plus ms-1 me-1"></i>
                    Add New User
                </button>
                <div className='user-table w-100'>
                    <table className='w-100'>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {
                            allUser.map((value) => {
                                return (
                                    <tr>
                                        <td>{value.email}</td>
                                        <td>{value.firstName}</td>
                                        <td>{value.lastName}</td>
                                        <td>{value.address}</td>
                                        <td>
                                            <button
                                             className='btn-Edit me-5 w-25'
                                             onClick={()=> this.handleEditModalUser(value)}
                                             >Edit</button>
                                            <button  
                                            className='btn-Delete w-25'
                                            onClick={()=>this.handleDeleteUser(value)}
                                            >Delete</button>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </table>
                </div>
                <ModalUser
                    isOpen = {this.state.isShow} 
                    toggle = {this.handleModalUser}
                    getAllUserById = {this.getAllUserById}
                 />
                {
                    this.state.isShowEditModal && 
                    <ModalEditUser
                     isOpen = {this.state.isShowEditModal} 
                     toggle = {this.handleEditModalUser}
                     currentUser = {this.state.editUser}
                     editUser = {this.doEditUser}
                     />

                }
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
