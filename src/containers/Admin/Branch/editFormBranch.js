import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {Input,Button,FormGroup,Label} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import { createMuiTheme} from '@material-ui/core/styles';
import {useDispatch}   from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
// import { AddInternalUser_Permission } from '../../../../shared/PermissionForFeatures';


export default function EditFormBranch(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputName, setInputName] = useState('');
    const [ErrInputName, setErrInputName] = useState('');
    const [InputContactNumber, setInputContactNumber] = useState('');
    const [ErrInputContactNumber, setErrInputContactNumber] = useState('');
    const [InputDisplayName, setInputDisplayName] = useState('');
    const [ErrInputDisplayName, setErrInputDisplayName] = useState('');
    const [InputAddress, setInputAddress] = useState('');
    const [ErrInputAddress, setErrInputAddress] = useState('');
    const [InputEmail, setInputEmail] = useState('');
    const [ErrInputEmail, setErrInputEmail] = useState('');

    const [CheckIsActived, setCheckIsActived] = useState(true);
    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getBranchData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        setLoading(false);
        let val = data.data;
        setInputName(val.nama);
        setInputContactNumber(val.contactnumber);
        setInputDisplayName(val.displayname);
        setInputAddress(val.address);
        setInputEmail(val.email);
        setCheckIsActived(val.isactive == true?true:false);
    }

    const handleInputContactNumber = (data) =>{
        let val = data.target.value;
        if(!isNaN(val)){
            setInputContactNumber(val);
        }
    }

    const handleInputDisplayName = (data) =>{
        let val = data.target.value;
        setInputDisplayName(val)
    }

    const handleInputAddrees = (data) =>{
        let val = data.target.value;
        setInputAddress(val)
    }

    const handleInputEmail = (data) =>{
        let val = data.target.value;
        setInputEmail(val)
    }

    const handleInputName = (data) =>{
        let val = data.target.value;
        setInputName(val);
    }

    const handleChangeIsActive = (data) =>{
        setCheckIsActived(data.target.checked);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputName('');
        setErrInputContactNumber('');
        setErrInputDisplayName('');
        setErrInputAddress('');
        setErrInputEmail('')
        if(InputName == ''){
            setErrInputName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputContactNumber == ''){
            setErrInputContactNumber(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputDisplayName == ''){
            setErrInputDisplayName(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputAddress == ''){
            setErrInputAddress(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputEmail == ''){
            setErrInputEmail(i18n.t('label_REQUIRED'));
            flag = false;
        }

        return flag;
    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.nama = InputName;
            obj.contactnumber = InputContactNumber;
            obj.displayname = InputDisplayName;
            obj.address = InputAddress;
            obj.email = InputEmail;
            obj.isactive = CheckIsActived;
            dispatch(actions.submitEditBranch(id,obj,succesHandlerSubmit, errorHandler));
        }
    }

    const succesHandlerSubmit = (data) => {
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

    const errorHandler = (data) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + data
        })
      }

      return (
        <Formik
        initialValues={
            {
            namebranch:InputName,
            contactnumber:InputContactNumber,
            displayname:InputDisplayName,
            address:InputAddress,
            email:InputEmail,
            isactived:CheckIsActived,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddBranch">
                            <ContentWrapper>
                            <div className="content-heading"  >
                            <span>{i18n.t('label_EDIT_BRANCH')}</span>
                            </div>
                            <label className="mt-3 form-label required" htmlFor="namebranch">
                                {i18n.t('label_NAME')}
                            </label>
                            <Input
                                name="namebranch"
                                className={
                                    touched.namebranch && errors.namebranch
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="namebranch"
                                onChange={val => handleInputName(val)}
                                onBlur={handleBlur}
                                value={values.namebranch}
                            />
                            <div className="invalid-feedback-custom">{ErrInputName}</div>

                            <label className="mt-3 form-label required" htmlFor="displayname">
                                {i18n.t('label_DISPLAY_NAME')}
                            </label>
                            <Input
                                name="displayname"
                                className={
                                    touched.displayname && errors.displayname
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="displayname"
                                onChange={val => handleInputDisplayName(val)}
                                onBlur={handleBlur}
                                value={values.displayname}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDisplayName}</div>

                            <label className="mt-3 form-label required" htmlFor="contactnumber">
                                {i18n.t('label_CONTACT_NUMBER')}
                            </label>
                            <Input
                                name="contactnumber"
                                className={
                                    touched.contactnumber && errors.contactnumber
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="contactnumber"
                                onChange={val => handleInputContactNumber(val)}
                                onBlur={handleBlur}
                                value={values.contactnumber}
                            />
                            <div className="invalid-feedback-custom">{ErrInputContactNumber}</div>

                            <label className="mt-3 form-label required" htmlFor="address">
                                {i18n.t('label_ADDRESS')}
                            </label>
                            <Input
                                name="address"
                                className={
                                    touched.address && errors.address
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="address"
                                onChange={val => handleInputAddrees(val)}
                                onBlur={handleBlur}
                                value={values.address}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAddress}</div>

                            <label className="mt-3 form-label required" htmlFor="email">
                                {i18n.t('Email')}
                            </label>
                            <Input
                                name="email"
                                className={
                                    touched.email && errors.email
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="email"
                                onChange={val => handleInputEmail(val)}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <div className="invalid-feedback-custom">{ErrInputEmail}</div>

                            <FormGroup check style={{marginTop:'20px'}}>
                            <Input type="checkbox" name="check" 
                            id="isactived" 
                            onChange={val => handleChangeIsActive(val)}
                            defaultChecked={values.isactived}
                            checked={values.isactived}
                            style={{transform:'scale(1.5)'}}
                            />
                            <Label for="isactived" check style={{transform:'scale(1.5)',marginLeft:'20px'}}>{i18n.t('label_IS_ACTIVE')}</Label>
                            </FormGroup>
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