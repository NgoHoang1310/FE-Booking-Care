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
import Select from 'react-select';
import './ManageDoctor.scss';
import { crud_actions } from '../../../utils';
import { languages } from '../../../utils';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            allDoctor: [],
            selectedOption: '',
            hasOldData: false,

            allPrice: [],
            allPayment: [],
            allProvince: [],
            allSpecialty: [],
            allClinic: [],

            nameClinic: '',
            addressClinic: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            note: ''

        }
    }

    handleValidateInput() {
        let isValid = true;
        let arrInput = ['selectedOption', 'description', 'nameClinic', 'selectedPrice', 'selectedPayment', 'addressClinic', 'selectedProvince', 'selectedSpecialty', 'selectedClinic'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                toast.warn("Bạn chưa điền " + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSave = () => {
        let isValidInput = this.handleValidateInput();
        if (isValidInput === false)
            return;
        this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            id: this.state.selectedOption.id,
            action: this.state.hasOldData ? crud_actions.EDIT : crud_actions.CREATE,
            clinicName: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            price: this.state.selectedPrice,
            payment: this.state.selectedPayment,
            province: this.state.selectedProvince,
            specialty: this.state.selectedSpecialty,
            clinic: this.state.selectedClinic,
            note: this.state.note
        })

        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            selectedOption: '',
            hasOldData: false,
            nameClinic: '',
            addressClinic: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            note: ''
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }

    handleChange = (selectedOption) => {
        console.log(selectedOption);
        this.setState({ selectedOption });
        this.props.getDetailDoctor(selectedOption.id);
    };

    handleRequireInfoChange = (selectedOption, value) => {
        console.log(selectedOption);
        let name = value.name;
        let copyState = this.state;
        copyState[name] = selectedOption;
        this.setState({
            ...copyState,
        })
        console.log(this.state);
    }

    handleInfoChange = (event, id) => {
        let copyState = this.state;
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log(copyState);
    }

    convertInputData = (data, type) => {
        let { lang } = this.props;
        let result = [];
        if (data && data.length > 0) {
            if (type === "DOCTOR") {
                data.map((item) => {
                    return result.push({ value: `${item.firstName} ${item.lastName}`, label: `${item.firstName} ${item.lastName}`, id: item.id });
                })
            }
            if (type === 'PRICE' || type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item) => {
                    return result.push({ value: item.keyMap, label: `${lang === languages.EN ? item.valueEn : item.valueVi}` });
                });
            }

            if (type === "SPECIALTY") {
                data.map((item) => {
                    return result.push({ value: item.id, label: item.name });
                });
            }

            if (type === "CLINIC") {
                data.map((item) => {
                    return result.push({ value: item.id, label: item.name });
                });
            }

        }
        return result;
    }

    componentDidMount() {
        this.props.getAllDoctor();
        // this.props.getAllClinic();
        this.props.getRequireDoctorInfo();
    }

    componentDidUpdate(prevProps) {
        let { requireDoctorInfo, allDoctor, detailDoctor, lang, dataErr } = this.props;
        // console.log(allDoctor);
        let arrDoctor = this.convertInputData(allDoctor, 'DOCTOR');
        let arrPrice = this.convertInputData(requireDoctorInfo.prices, 'PRICE');
        let arrPayment = this.convertInputData(requireDoctorInfo.payments, 'PAYMENT');
        let arrProvince = this.convertInputData(requireDoctorInfo.provinces, 'PROVINCE');
        let arrSpecialty = this.convertInputData(requireDoctorInfo.specialties, 'SPECIALTY')
        let arrClinic = this.convertInputData(requireDoctorInfo.clinics, 'CLINIC')
        if (prevProps.allDoctor != allDoctor) {
            this.setState({
                allDoctor: arrDoctor,
            })
        }

        if (prevProps.detailDoctor != detailDoctor) {
            let { Markdown, Doctor_Info } = detailDoctor;
            this.setState({
                contentHTML: Markdown.contentHTML ? Markdown.contentHTML : '',
                contentMarkdown: Markdown.contentHTML ? Markdown.contentMarkdown : '',
                description: Markdown.contentHTML ? Markdown.description : '',
                hasOldData: Markdown.contentHTML ? true : false,
                nameClinic: Doctor_Info.nameClinic ? Doctor_Info.nameClinic : '',
                addressClinic: Doctor_Info.addressClinic ? Doctor_Info.addressClinic : '',
                selectedPrice: { label: lang === languages.EN ? Doctor_Info.priceData.valueEn : Doctor_Info.priceData.valueVi, value: Doctor_Info.priceID },
                selectedPayment: { label: lang === languages.EN ? Doctor_Info.paymentData.valueEn : Doctor_Info.paymentData.valueVi, value: Doctor_Info.paymentID },
                selectedProvince: { label: lang === languages.EN ? Doctor_Info.provinceData.valueEn : Doctor_Info.provinceData.valueVi, value: Doctor_Info.provinceID },
                // selectedSpecialty: { label: "Co xuong khop", value: Doctor_Info.specialtyID },
                note: Doctor_Info.note
            })
        }

        if (prevProps.requireDoctorInfo != requireDoctorInfo) {
            this.setState({
                allPrice: arrPrice,
                allPayment: arrPayment,
                allProvince: arrProvince,
                allSpecialty: arrSpecialty,
                allClinic: arrClinic
            })
        }

        if (prevProps.lang != lang) {
            this.setState({
                allPrice: arrPrice,
                allPayment: arrPayment,
                allProvince: arrProvince,
                allSpecialty: arrSpecialty,
                allClinic: arrClinic
            })
        }

    }



    render() {
        let { contentHTML, contentMarkdown, description, hasOldData, allPrice,
            allPayment, allProvince, allDoctor, allSpecialty, allClinic, selectedOption, selectedSpecialty, selectedClinic, selectedPrice,
            selectedPayment, selectedProvince, nameClinic, addressClinic, note } = this.state;
        return (
            <div className='manage-doctor' >
                <div className='manage-doctor__title ' ><FormattedMessage id="admin.account.manage-Doctor" /></div>

                <div className='row manage-doctor__wrapper' >
                    <div className='manage-doctor__optional' >
                        <label className='d-block p-3 fs-4' ><FormattedMessage id="doctor.choose-doctor" /></label>
                        <Select
                            name={'doctorSelection'}
                            onChange={this.handleChange}
                            className='manage-doctor__optional--input'
                            value={selectedOption}
                            options={allDoctor}
                        />
                    </div>
                    <div className='manage-doctor__info' >
                        <label className='d-block p-3 fs-4' ><FormattedMessage id="doctor.infor" /></label>
                        <textarea
                            onChange={(event) => this.handleInfoChange(event, 'description')}
                            value={description}
                        />
                    </div>
                    <div className='col-4 manage-doctor__nameClinic mt-3 '>
                        <label><FormattedMessage id="doctor.name-clinic" /></label>
                        <input
                            className='form-control'
                            value={nameClinic}
                            onChange={(event) => this.handleInfoChange(event, 'nameClinic')}
                        >
                        </input>
                    </div>
                    <div className='col-4 manage-doctor__specialty mt-3 '>
                        <label><FormattedMessage id="doctor.specialty" /></label>
                        <Select
                            name={'selectedSpecialty'}
                            onChange={this.handleRequireInfoChange}
                            options={allSpecialty}
                            value={selectedSpecialty}

                        />
                    </div>
                    <div className='col-4 manage-doctor__clinic mt-3 '>
                        <label><FormattedMessage id="doctor.clinic" /></label>
                        <Select
                            name={'selectedClinic'}
                            onChange={this.handleRequireInfoChange}
                            options={allClinic}
                            value={selectedClinic}
                        />
                    </div>
                    <div className='col-4 manage-doctor__price mt-3 '>
                        <label><FormattedMessage id="doctor.price" /></label>
                        <Select
                            name={'selectedPrice'}
                            onChange={this.handleRequireInfoChange}
                            options={allPrice}
                            value={selectedPrice}
                        />
                    </div>
                    <div className='col-4 manage-doctor__payment mt-3 '>
                        <label><FormattedMessage id="doctor.payment" /></label>
                        <Select
                            value={selectedPayment}
                            name={'selectedPayment'}
                            onChange={this.handleRequireInfoChange}
                            options={allPayment}
                        />
                    </div>
                    <div className='col-4 manage-doctor__addClinic mt-3'>
                        <label><FormattedMessage id="doctor.address-clinic" /></label>
                        <input
                            className='form-control'
                            value={addressClinic}
                            onChange={(event) => this.handleInfoChange(event, 'addressClinic')}
                        ></input>

                    </div>
                    <div className='col-4 manage-doctor__province mt-3'>
                        <label><FormattedMessage id="doctor.province" /></label>
                        <Select
                            name={'selectedProvince'}
                            onChange={this.handleRequireInfoChange}
                            options={allProvince}
                            value={selectedProvince}
                        />
                    </div>

                    <div className='col-4 manage-doctor__note mt-3'>
                        <label><FormattedMessage id="doctor.note" /></label>
                        <input
                            className='form-control'
                            value={note}
                            onChange={(event) => this.handleInfoChange(event, 'note')}
                        ></input>

                    </div>
                </div>
                <div className='manage-doctor__editor mt-5' >
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData ? 'manage-doctor__save btn-warning' : 'manage-doctor__save btn-primary'}
                    onClick={this.handleSave}
                >{hasOldData ? <FormattedMessage id="doctor.btn.save" /> : <FormattedMessage id="doctor.btn.create" />}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        detailDoctor: state.user.doctor,
        requireDoctorInfo: state.admin.requireDoctorInfo,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctor: () => dispatch(action.fetchAllDoctorStart()),
        // getAllClinic: () => dispatch(action.fetchAllClinicStart()),
        saveInfoDoctor: (data) => dispatch(action.SaveInfoDoctorStart(data)),
        getDetailDoctor: (doctorId) => dispatch(action.fetchDetailDoctorStart(doctorId)),
        getRequireDoctorInfo: () => dispatch(action.fetchRequireDoctorStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
