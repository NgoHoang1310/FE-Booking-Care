import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';
import "./ManageSpecialty.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Lightbox from 'react-image-lightbox';

import './ManageSpecialty.scss';
import CommonUtils from '../../../utils/CommonUtils';
import { createSpecialty, editSpecialty, deleteSpecialty } from '../../../services/userService';
import { Toast } from 'react-toastify';
import { languages } from '../../../utils';
import { getAllSpecialty } from '../../../services/userService';
import { crud_actions } from '../../../utils';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            id: '',
            name: '',
            image: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            previewImg: '',
            action: crud_actions.CREATE,

            specialties: [],
        }
    }

    resetInput = () => {
        this.setState({
            name: '',
            image: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            previewImg: '',
            action: crud_actions.CREATE,
        })
    }

    getAllSpecialty = async () => {
        let specialties = await getAllSpecialty();
        if (specialties && specialties.data.errCode === 0) {
            this.setState({
                specialties: specialties.data.specialties,
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

    handlePreviewImg() {
        this.setState({
            isOpen: true,
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
            response = await createSpecialty(this.state);
        }

        if (action === crud_actions.EDIT) {
            response = await editSpecialty(this.state);

        }

        if (response.data && response.data.errCode === 0) {
            toast.success(response.data.message);
            this.getAllSpecialty();
            this.resetInput();

        } else {
            toast.error(response.data.message);
        }

    }

    handleEdit = (specialty) => {
        if (specialty && specialty.id) {

            this.setState({
                action: crud_actions.EDIT,
                id: specialty.id,
                name: specialty.name,
                descriptionMarkdown: specialty.descriptionMarkdown,
                descriptionHTML: specialty.descriptionHTML,
                previewImg: new Buffer(specialty.image, 'base64').toString('binary'),
            })
        }
    }

    handleDelete = async (specialty) => {
        if (specialty && specialty.id) {
            let response = await deleteSpecialty(specialty.id);
            if (response && response.data.errCode === 0) {
                toast.success(response.data.message);
                this.getAllSpecialty();
            } else {
                toast.error(response.data.message);
            }
        }
    }

    handleCancel = () => {
        this.resetInput();
    }

    async componentDidMount() {
        this.getAllSpecialty();

    }

    componentDidUpdate(prevProps) {
    }



    render() {
        let { specialties, descriptionMarkdown, descriptionHTML, name, image, previewImg } = this.state;
        console.log(specialties);
        return (
            <div className='manage-specialty__container' >
                <h1 className='text-center' >Quản lí chuyên khoa</h1>
                <div className='manage-specialty__table w-100 mb-4'>
                    <table className='w-100' style={{ tableLayout: 'fixed' }} >
                        <tr>
                            <th>STT</th>
                            <th>Tên chuyên khoa</th>
                            <th>Thông tin chuyên khoa</th>
                            <th>Tùy chỉnh</th>
                        </tr>
                        {specialties && specialties.length > 0 && specialties.map((item, index) => {
                            return (
                                <tr key={index} className='row-specialty' style={{ height: "20px" }} >
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
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
                <div className='d-flex' >
                    <div className='manage-specialty__name  ' >
                        <label htmlFor='name' className='manage-specialty__name--heading' >Tên chuyên khoa</label>
                        <input
                            id='name'
                            className='manage-specialty__name--input'
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            value={name}
                        ></input>
                    </div>
                    {/* <div className='manage-specialty__image' >
                        <label htmlFor='image' className='manage-specialty__image--heading' >Ảnh chuyên khoa</label>
                        <input
                            type='file'
                            id='image'
                            className='manage-specialty__image--input'
                            accept='image/*'
                            onChange={(event) => this.handleUploadImg(event)}

                        ></input>
                    </div> */}
                    <div class="col-md-6 manage-specialty__image">
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
                            onClick={this.handlePreviewImg.bind(this)}
                        >
                        </div>
                    </div>
                </div>

                <div className='manage-specialty__markdown' >
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={descriptionMarkdown}
                    />
                </div>

                <button
                    className='manage-specialty__btn--cancel'
                    onClick={this.handleCancel}
                >
                    Cancel
                </button>

                <button
                    className='manage-specialty__btn--save'
                    onClick={this.handleSave}
                >
                    Save
                </button>


                {this.state.isOpen &&
                    <Lightbox
                        mainSrc={previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })
                        }
                    />

                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
