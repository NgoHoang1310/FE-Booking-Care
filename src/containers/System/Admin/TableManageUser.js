import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';
import "../userManager.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
class TableManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
        }
    }

    handleEdit(user) {
        this.props.handleEditUser(user)
    }

    handleDelete(id) {
        this.props.deleteUser(id);
    }
    componentDidMount() {
        this.props.getUser();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataUser != this.props.dataUser) {
            this.setState({
                arrUser: this.props.dataUser,
            })
        }
    }



    render() {
        let users = this.state.arrUser;
        return (
            <div className="container">
                <h2 className='title'>Manage users with React</h2>
                <div className='user-table w-100 mb-4'>
                    <table className='w-100'>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Role</th>
                            <th>Position</th>
                            <th>Phone</th>
                            <th>Action</th>

                        </tr>
                        {users.map((user, index) => {
                            return (
                                <tr>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.roleID}</td>
                                    <td>{user.positionID}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        <button
                                            key={index}
                                            className='btn-Edit me-5 w-25'
                                            onClick={() => { this.handleEdit(user) }}
                                        >Edit</button>
                                        <button
                                            key={index}
                                            className='btn-Delete w-25'
                                            onClick={() => { this.handleDelete(user.id) }}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        dataUser: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(action.fetchUserStart()),
        deleteUser: (userId) => dispatch(action.DeleteUserStart(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);
