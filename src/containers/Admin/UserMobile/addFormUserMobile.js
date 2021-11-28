import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {Input,Button} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import Select from 'react-select';
import {mappingMessageError} from '../../../containers/shared/globalFunc';

export default function AddFormUserMobile(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputUsername, setInputUsername] = useState('');
    const [ErrInputUsername, setErrInputUsername] = useState('');

    const [InputNama, setInputNama] = useState('');
    const [ErrInputNama, setErrInputNama] = useState('');

    const [InputPassword, setInputPassword] = useState('');
    const [InputConfirmPassword, setInputConfirmPassword] = useState('');
    const [ErrInputPassword, setErrInputPassword] = useState('');

    const [InputEmail, setInputEmail] = useState('');
    const [ErrInputEmail, setErrInputEmail] = useState('');

    const [InputNoTlp, setInputNoTlp] = useState('');
    const [ErrInputNoTlp, setErrInputNoTlp] = useState('');

    const [InputAddress, setInputAddress] = useState('');
    const [ErrInputAddress, setErrInputAddress] = useState('');

    const [selectedRoles, setSelectedRoles] = useState([]);
    const [ListRoles, setListRoles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [ErrRoles, setErrRoles] = useState('');

    const [SelectedCallPlans, setSelectedCallPlans] = useState([]);
    const [ListCallPlans, setListCallPlans] = useState([]);
    const [CallPlans, setCallPlans] = useState([]);
    const [ErrCallPlans, setErrCallPlans] = useState('');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCallPlanData('',successHandlerCallPlan, errorHandler));
        dispatch(actions.getRoleData('',successHandler, errorHandler));
    }, []);

    function successHandlerCallPlan(data) {
        if(data.data){
            setListCallPlans(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
        }
    }

    function successHandler(data) {
        if(data.data){
            setListRoles(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
        }
        setLoading(false);

    }

    const handleInputUsername = (data) =>{
        let val = data.target.value;
        setInputUsername(val);
    }

    const handleInputNama = (data) =>{
        let val = data.target.value;
        setInputNama(val);
    }

    const handleInputPassword = (data) =>{
        let val = data.target.value;
        setInputPassword(val);
    }

    const handleInputConfirmPassword = (data) =>{
        let val = data.target.value;
        setInputConfirmPassword(val);
    }

    const handleInputEmail = (data) =>{
        let val = data.target.value;
        setInputEmail(val);
    }

    const handleInputNoTlp = (data) =>{
        let val = data.target.value;
        setInputNoTlp(val);
    }

    const handleInputAddress = (data) =>{
        let val = data.target.value;
        setInputAddress(val);
    }

    const handleRolesChange = (data) =>{
        let temp = [];        
        if(data !== null && data.length > 0){
          for(var i=0; i < data.length ; i++){
            temp.push(data[i].value);
          }
        }
        setRoles(temp);
    }

    const handleCallPlansChange = (data) =>{
        let temp = [];        
        if(data !== null && data.length > 0){
          for(var i=0; i < data.length ; i++){
            temp.push(data[i].value);
          }
        }
        setCallPlans(temp);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputUsername('');
        setErrInputNama('');
        setErrInputPassword('');
        setErrInputEmail('');
        setErrInputNoTlp('');
        setErrInputAddress('');
        setErrRoles('');
        setErrCallPlans('');

        if(InputUsername == ''){
            setErrInputUsername(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputNama == ''){
            setErrInputNama(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputPassword == ''){
            setErrInputPassword(i18n.t('label_REQUIRED'));
            flag = false;
        }else if(InputPassword !== InputConfirmPassword){
            setErrInputPassword(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputEmail == ''){
            setErrInputEmail(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputNoTlp == ''){
            setErrInputNoTlp(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputAddress == ''){
            setErrInputAddress(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(roles.length == 0){
            setErrRoles(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(CallPlans.length == 0){
            setErrRoles(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
    }

    const submitHandler = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit();
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.username = InputUsername;
            obj.password = InputPassword;
            obj.nama = InputNama;
            obj.notelepon = InputNoTlp;
            obj.address = InputAddress;
            obj.email = InputAddress;
            obj.roles = roles;
            obj.callplans = CallPlans;
            obj.imei = '';
            dispatch(actions.submitAddUserMobile(obj,succesHandlerSubmit, errorHandler));
        }
    }

    const succesHandlerSubmit = (data) => {
        console.log('succesHandlerSubmit ',data);
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.goBack();
            }
        })
    }


    function errorHandler(error) {
        setLoading(false);
        let arrMsg = mappingMessageError(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: arrMsg.length > 0?i18n.t('label_ERROR.'+arrMsg[0].replaceAll('.','_')):'Error'
        })
    }

    return (
        <Formik
        initialValues={
            {
                nama:InputNama,
                username:InputUsername,
                password:InputPassword,
                confirmpassword:InputConfirmPassword,
                notlp:InputNoTlp,
                email:InputEmail,
                address:InputAddress,
            }
        }
        validate={values => {
            const errors = {};
            return errors;
        }}
        enableReinitialize="true"
        onSubmit={(values) => {
           
        }}
        >
            {
                formikProps => {
                    const {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldTouched,
                        setFieldValue,
                    } = formikProps;

                    return(
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddUser">
                            <ContentWrapper>
                            <div className="content-heading"  >
                            <span>{i18n.t('label_ADD_MOBILE_USER')}</span>
                            </div>

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
                            </label>
                            <Input
                                name="nama"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nama"
                                onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNama}</div>

                            <label className="mt-3 form-label required" htmlFor="username">
                                {i18n.t('label_USERNAME')}
                            </label>
                            <Input
                                name="username"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="username"
                                onChange={val => handleInputUsername(val)}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            <div className="invalid-feedback-custom">{ErrInputUsername}</div>

                            <label className="mt-3 form-label required" htmlFor="password">
                                {i18n.t('label_PASSWORD')}
                            </label>
                            <Input
                                name="password"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="password"
                                id="password"
                                onChange={val => handleInputPassword(val)}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <div className="invalid-feedback-custom">{ErrInputPassword}</div>

                            <label className="mt-3 form-label required" htmlFor="confirmpassword">
                                {i18n.t('label_CONFIRM_PASSWORD')}
                            </label>
                            <Input
                                name="confirmpassword"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="password"
                                id="confirmpassword"
                                onChange={val => handleInputConfirmPassword(val)}
                                onBlur={handleBlur}
                                value={values.confirmpassword}
                            />

                            <label className="mt-3 form-label required" htmlFor="notlp">
                                {i18n.t('label_CONTACT_NUMBER')}
                            </label>
                            <Input
                                name="notlp"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="notlp"
                                onChange={val => handleInputNoTlp(val)}
                                onBlur={handleBlur}
                                value={values.notlp}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNoTlp}</div>
                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="email">
                                {i18n.t('Email')}
                            </label>
                            <Input
                                name="email"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="email"
                                onChange={val => handleInputEmail(val)}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <div className="invalid-feedback-custom">{ErrInputEmail}</div>

                            <label className="mt-3 form-label required" htmlFor="address">
                                {i18n.t('label_ADDRESS')}
                            </label>
                            <Input
                                name="address"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="address"
                                onChange={val => handleInputAddress(val)}
                                onBlur={handleBlur}
                                value={values.address}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAddress}</div>

                            <label className="mt-3 form-label required" htmlFor="role">
                                {i18n.t('Role')}
                            </label>
                            <Select
                                // defaultValue={[options[0], options[1]]}
                                defaultValue={selectedRoles}
                                isMulti
                                name="colors"
                                options={ListRoles}
                                onChange={val => handleRolesChange(val)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                // placeholder={i18n.t('select.SELECT_OPTION')}
                            />
                            <div className="invalid-feedback-custom">{ErrRoles}</div>

                            <label className="mt-3 form-label required" htmlFor="role">
                                {i18n.t('label_CALL_PLAN')}
                            </label>
                            <Select
                                // defaultValue={[options[0], options[1]]}
                                defaultValue={SelectedCallPlans}
                                isMulti
                                name="colors"
                                options={ListCallPlans}
                                onChange={val => handleCallPlansChange(val)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                // placeholder={i18n.t('select.SELECT_OPTION')}
                            />
                            <div className="invalid-feedback-custom">{ErrCallPlans}</div>

                            </div>

                            </div>
                            </ContentWrapper>
                            {loading && <Loading/>}
                            <Button
                            // disabled={props.activeStep === 0}
                                style={{marginLeft:"20%"}}
                                onClick={() => history.goBack()}
                            >
                            {/* {i18n.t('common.BACK')} */}
                            {'Cancel'}
                            </Button>

                            <Button
                                style={{marginLeft:"1%"}}
                                onClick={() => submitHandler()}
                            >
                            {'Submit'}
                            </Button>
                        </form>

                    )

                }
            }

        </Formik>

    )
}