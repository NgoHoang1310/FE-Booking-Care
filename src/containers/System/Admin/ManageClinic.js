import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';
import "./ManageClinic.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import './ManageClinic.scss';
import CommonUtils from '../../../utils/CommonUtils';
import { createClinic, editClinic, getAllClinic, deleteClinic } from '../../../services/userService';
import { Toast } from 'react-toastify';
import { crud_actions } from '../../../utils';
import { languages } from '../../../utils';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],

            name: '',
            address: '',
            image: '',
            banner: '',
            introductionHTML: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            previewImg: '',
            previewBanner: '',
            action: crud_actions.CREATE
        }
    }

    resetInput() {
        this.setState({
            name: '',
            address: '',
            image: '',
            banner: '',
            introductionHTML: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            previewImg: '',
            previewBanner: '',
            action: crud_actions.CREATE
        })
    }

    handleGetAllClinic = async () => {
        let clinics = await getAllClinic();
        if (clinics && clinics.data.errCode === 0) {
            this.setState({
                clinics: clinics.data.clinics,
            })
        }
    }

    handleEditorChange = ({ text, html }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    async handleUploadImg(element, id) {
        let files = element.target.files[0];
        if (files) {
            let base64 = await CommonUtils.getBase64(files);
            console.log(base64);
            const objectUrl = URL.createObjectURL(files)
            if (id === 'AVATAR') {
                this.setState({
                    image: base64,
                    previewImg: objectUrl
                })

            }

            if (id === 'BANNER') {
                this.setState({
                    banner: base64,
                    previewBanner: objectUrl
                })

            }
        }
        // setPreview(objectUrl)
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
            response = await createClinic(this.state);
        }

        if (action === crud_actions.EDIT) {
            response = await editClinic(this.state);

        }

        if (response.data && response.data.errCode === 0) {
            toast.success(response.data.message);
            this.handleGetAllClinic();
            this.resetInput();
        } else {
            toast.error(response.data.message);
        }

    }

    handleEdit = (clinic) => {
        if (clinic && clinic.id) {

            this.setState({
                action: crud_actions.EDIT,
                id: clinic.id,
                name: clinic.name,
                descriptionMarkdown: clinic.descriptionMarkdown,
                descriptionHTML: clinic.descriptionHTML,
                introductionHTML: clinic.introductionHTML,
                address: clinic.address,
                previewImg: new Buffer(clinic.image, 'base64').toString('binary'),
                previewBanner: new Buffer(clinic.banner, 'base64').toString('binary'),
            })
        }
    }

    handleDelete = async (clinic) => {
        if (clinic && clinic.id) {
            let response = await deleteClinic(clinic.id);
            if (response && response.data.errCode === 0) {
                toast.success(response.data.message);
                this.handleGetAllClinic();
            } else {
                toast.error(response.data.message);
            }
        }
    }

    handleCancel = () => {
        this.resetInput();
    }

    componentDidMount() {
        this.handleGetAllClinic();
    }

    componentDidUpdate(prevProps) {
    }



    render() {
        // console.log(this.state);
        let { clinics, descriptionMarkdown, descriptionHTML, name, image, address, introductionHTML, previewBanner, previewImg } = this.state;
        console.log(clinics);
        return (
            <div className='manage-clinic__container' >
                <h1 className='text-center' >Quản lí phòng khám</h1>
                <div className='manage-clinic__table w-100 mb-4'>
                    <table className='w-100' style={{ tableLayout: 'fixed' }} >
                        <tr className='row-clinic' >
                            <th>STT</th>
                            <th>Tên phòng khám</th>
                            <th>Lời giới thiệu</th>
                            <th>Thông tin phòng khám</th>
                            <th>Địa chỉ phòng khám</th>
                            <th>Tùy chỉnh</th>
                        </tr>


                        {clinics && clinics.length > 0 && clinics.map((item, index) => {
                            return (
                                <tr key={index} className='row-clinic' style={{ height: "20px" }} >
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.introductionHTML}</td>
                                    <td>{item.descriptionMarkdown}</td>
                                    <td>{item.address}</td>
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
                    <div className='col-6 manage-clinic__name  ' >
                        <label htmlFor='name' className='manage-clinic__name--heading' >Tên phòng khám</label>
                        <input
                            id='name'
                            className='manage-clinic__name--input'
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            value={name}
                        ></input>
                    </div>
                    {/* <div className='col-6 manage-clinic__image' >
                        <label htmlFor='image' className='manage-clinic__image--heading' >Ảnh phòng khám</label>
                        <input
                            type='file'
                            id='image'
                            className='manage-clinic__image--input'
                            accept='image/*'
                            onChange={(event) => this.handleUploadImg(event, 'AVATAR')}

                        ></input>
                    </div> */}
                    <div class="col-md-6 manage-clinic__image">
                        <div>
                            <label for="previewImg" class="form-label previewImg-Btn"><FormattedMessage id="manage-user.prevImg" /></label>
                        </div>
                        <input
                            id='previewImg'
                            type='file'
                            hidden
                            onChange={(event) => this.handleUploadImg(event, 'AVATAR')}
                        ></input>
                        <div className='previewImg-wrapper'
                            style={{ backgroundImage: `url(${previewImg})` }}
                        // onClick={this.handlePreviewImg.bind(this)}
                        >
                        </div>
                    </div>
                    <div className='col-6 manage-clinic__address'>
                        <label htmlFor='name' className='manage-clinic__address--heading' >Địa chỉ</label>
                        <input
                            id='address'
                            className='manage-clinic__address--input'
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            value={address}
                        ></input>
                    </div>
                    {/* <div className='col-6 manage-clinic__image' >
                        <label htmlFor='image' className='manage-clinic__image--heading' >Ảnh bìa</label>
                        <input
                            type='file'
                            id='image'
                            className='manage-clinic__image--input'
                            accept='image/*'
                            onChange={(event) => this.handleUploadImg(event, 'BANNER')}

                        ></input>
                    </div> */}
                    <div class="col-md-6 manage-clinic__image">
                        <div>
                            <label for="previewBanner" class="form-label previewImg-Btn"><FormattedMessage id="manage-user.prevImg" /></label>
                        </div>
                        <input
                            id='previewBanner'
                            type='file'
                            hidden
                            onChange={(event) => this.handleUploadImg(event, 'BANNER')}
                        ></input>
                        <div className='previewImg-wrapper'
                            style={{ backgroundImage: `url(${previewBanner})` }}
                        // onClick={this.handlePreviewImg.bind(this)}
                        >
                        </div>
                    </div>
                    <div className='col-6 manage-clinic__introduction mt-3' >
                        <label className='d-block' >Giới thiệu</label>
                        <textarea
                            className='w-100'
                            onChange={(event) => this.handleOnChangeInput(event, 'introductionHTML')}
                            value={introductionHTML}
                        />
                    </div>
                </div>

                <div className='manage-clinic__markdown' >
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={descriptionMarkdown}
                    />
                </div>

                <button
                    className='manage-clinic__btn--cancel'
                    onClick={this.handleCancel}
                >
                    Cancel
                </button>

                <button
                    className='manage-clinic__btn--save'
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
