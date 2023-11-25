import React, { Component, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import DatePicker from 'react-flatpickr';



import './ManageHandbook.scss';
import CommonUtils from '../../../utils/CommonUtils';
import { getAllHandbook, createHandbook, editHandbook, deleteHandbook } from '../../../services/userService';
import { Toast } from 'react-toastify';
import { crud_actions } from '../../../utils';
import { languages } from '../../../utils';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handbooks: [],

            title: '',
            image: '',
            author: '',
            release: new Date(),
            descriptionMarkdown: '',
            descriptionHTML: '',
            previewImg: '',
            action: crud_actions.CREATE
        }
    }

    resetInput() {
        this.setState({
            title: '',
            image: '',
            author: '',
            release: new Date(),
            descriptionMarkdown: '',
            descriptionHTML: '',
            previewImg: '',
            action: crud_actions.CREATE
        })
    }

    handleGetAllHandbook = async () => {
        let handbooks = await getAllHandbook();
        console.log(handbooks);
        if (handbooks && handbooks.data.errCode === 0) {
            this.setState({
                handbooks: handbooks.data.handbooks,
            })
        }
    }

    handleEditorChange = ({ text, html }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    async handleUploadImg(element) {
        let files = element.target.files[0];
        if (files) {
            let base64 = await CommonUtils.getBase64(files);
            console.log(base64);
            const objectUrl = URL.createObjectURL(files)
            this.setState({
                image: base64,
                previewImg: objectUrl
            })
        }
        // setPreview(objectUrl)
    }

    handleDateChange = (date) => {
        this.setState({
            release: new Date(date).getTime(),
        })
    }

    handleOnChangeInput = (event, id) => {
        let copyState = this.state;
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSave = async () => {
        let { action } = this.state;
        let response = '';
        if (action === crud_actions.CREATE) {
            response = await createHandbook(this.state);
        }

        if (action === crud_actions.EDIT) {
            response = await editHandbook(this.state);

        }

        if (response.data && response.data.errCode === 0) {
            toast.success(response.data.message);
            this.handleGetAllHandbook();
            this.resetInput();
        } else {
            toast.error(response.data.message);
        }

    }

    handleEdit = (handbook) => {
        if (handbook && handbook.id) {
            this.setState({
                action: crud_actions.EDIT,
                id: handbook.id,
                title: handbook.title,
                descriptionMarkdown: handbook.descriptionMarkdown,
                descriptionHTML: handbook.descriptionHTML,
                author: handbook.author,
                release: handbook.release,
                previewImg: new Buffer(handbook.image, 'base64').toString('binary'),
            })
        }
    }

    handleDelete = async (handbook) => {
        if (handbook && handbook.id) {
            let response = await deleteHandbook(handbook.id);
            if (response && response.data.errCode === 0) {
                toast.success(response.data.message);
                this.handleGetAllHandbook();
            } else {
                toast.error(response.data.message);
            }
        }
    }

    handleCancel = () => {
        this.resetInput();
    }

    componentDidMount() {
        this.handleGetAllHandbook();
    }

    componentDidUpdate(prevProps) {
    }



    render() {
        // console.log(this.state);
        let { handbooks, descriptionMarkdown, descriptionHTML, title, image, author, previewImg, release } = this.state;
        return (
            <div className='manage-handbook__container' >
                <h1 className='text-center' >Quản lí phòng khám</h1>
                <div className='manage-handbook__table w-100 mb-4'>
                    <table className='w-100' style={{ tableLayout: 'fixed' }} >
                        <tr className='row-handbook' >
                            <th>STT</th>
                            <th>Tiêu đề</th>
                            <th>Tác giả</th>
                            <th>Ngày phát hành</th>
                            <th>Nội dung</th>
                            <th>Tùy chỉnh</th>
                        </tr>


                        {handbooks && handbooks.length > 0 && handbooks.map((item, index) => {
                            return (
                                <tr key={index} className='row-handbook' style={{ height: "20px" }} >
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.release}</td>
                                    <td>{item.descriptionMarkdown}</td>
                                    <td>
                                        <button
                                            className='btn-Edit me-5 w-25'
                                            onClick={() => this.handleEdit(item)}
                                        >Edit</button>
                                        <button
                                            className='btn-Delete w-25'
                                            onClick={() => this.handleDelete(item)}
                                        >Delete</button>
                                    </td>
                                </tr>

                            );
                        })}

                    </table>
                </div>
                <div className='row' >
                    <div className='col-6 manage-handbook__name  ' >
                        <label htmlFor='name' className='manage-handbook__name--heading' >Tiêu đề</label>
                        <input
                            id='name'
                            className='manage-handbook__name--input'
                            onChange={(event) => this.handleOnChangeInput(event, 'title')}
                            value={title}
                        ></input>
                    </div>
                    <div class="col-md-6 manage-handbook__image">
                        <div>
                            <label for="previewImg" class="form-label previewImg-Btn"><FormattedMessage id="manage-user.prevImg" /></label>
                        </div>
                        <input
                            id='previewImg'
                            type='file'
                            hidden
                            onChange={(event) => this.handleUploadImg(event)}
                        ></input>
                        <div className='previewImg-wrapper'
                            style={{ backgroundImage: `url(${previewImg})` }}
                        // onClick={this.handlePreviewImg.bind(this)}
                        >
                        </div>
                    </div>
                    <div className='col-6 manage-handbook__author'>
                        <label htmlFor='name' className='manage-handbook__author--heading' >Tác giả</label>
                        <input
                            id='author'
                            className='manage-handbook__author--input'
                            onChange={(event) => this.handleOnChangeInput(event, 'author')}
                            value={author}
                        ></input>
                    </div>
                    <div className='col-6 manage-handbook__date-picked' >
                        <label className='d-block ' >Ngày phát hành</label>
                        <DatePicker
                            className='date-picker'
                            value={new Date(+release)}
                            options={{ minDate: 'today', dateFormat: "d-m-Y" }}
                            onChange={(selectedDates, dateStr) => this.handleDateChange(selectedDates[0])}
                        />
                    </div>
                </div>

                <div className='manage-handbook__markdown' >
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={descriptionMarkdown}
                    />

                </div>

                <button
                    className='manage-handbook__btn--cancel'
                    onClick={this.handleCancel}
                >
                    Cancel
                </button>

                <button
                    className='manage-handbook__btn--save'
                    onClick={this.handleSave}
                >
                    Save
                </button>

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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);

