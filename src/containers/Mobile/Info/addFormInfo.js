import React, {useState,useEffect}    from 'react';
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
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
// import { AddInternalUser_Permission } from '../../../../shared/PermissionForFeatures';

export default function AddFormInfo(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ListType, setListType] = useState([]);
    const [SelType, setSelType] = useState('');
    const [ErrSelType, setErrSelType] = useState('');

    const [InputQuestion, setInputQuestion] = useState('');
    const [ErrInputQuestion, setErrInputQuestion] = useState('');

    const [InputSequence, setInputSequence] = useState('');
    const [ErrInputSequence, setErrInputSequence] = useState('');

    const [ListCustomerType, setListCustomerType] = useState([]);
    const [SelCustomerType, setSelCustomerType] = useState('');
    const [ErrCustomerType, setErrCustomerType] = useState('');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInfoData('/template',successHandlerTemplate, errorHandler));
    }, []);

    function successHandlerTemplate(data) {
        if(data.data){
            setListCustomerType(data.data.customertypeoptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));

            setListType(data.data.typeoptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
        }
        setLoading(false);
    }

    const handleChangeCustomerType = (data) =>{
        let selValue = data?.value ? data.value : '';
        setSelCustomerType(selValue);
    }

    const handleChangeType = (data) =>{
        let selValue = data?.value ? data.value : '';
        setSelType(selValue);
    }

    const handleInputQuestion = (data) =>{
        let val = data.target.value;
        setInputQuestion(val);
    }

    const handleInputSequence = (data) =>{
        let val = data.target.value;
        if(!isNaN(val)){
            setInputSequence(val);
        }
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputQuestion('');
        setErrInputSequence('');
        setErrSelType('');
        setErrCustomerType('');

        if(InputQuestion == ''){
            setErrInputQuestion(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputSequence == ''){
            setErrInputSequence(i18n.t('label_REQUIRED'));
            flag = false;
        }

        return flag;
    }

    const executeSubmit = () => {
        // let flag = checkColumnMandatory();
        // if(flag){
        //     setLoading(true);
        //     let obj = new Object();
        //     obj.nama = InputName;
        //     obj.description = InputDescription;
        //     dispatch(actions.submitAddCustomerType(obj,succesHandlerSubmit, errorHandler));
        // }
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
                    question:InputQuestion,
                    sequence:InputSequence,
                    customertype:SelCustomerType,
                    infotype:SelType,
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
                            <span>{i18n.t('Add Info')}</span>
                            </div>

                            <label className="mt-3 form-label required" htmlFor="question">
                                {i18n.t('Question')}
                            </label>
                            <Input
                                name="question"
                                className={
                                    touched.question && errors.question
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="question"
                                onChange={val => handleInputQuestion(val)}
                                onBlur={handleBlur}
                                value={values.question}
                            />
                            <div className="invalid-feedback-custom">{ErrInputQuestion}</div>

                            <label className="mt-3 form-label required" htmlFor="description">
                                {i18n.t('Sequence')}
                            </label>
                            <Input
                                name="sequence"
                                className={
                                    touched.sequence && errors.sequence
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="sequence"
                                onChange={val => handleInputSequence(val)}
                                onBlur={handleBlur}
                                value={values.sequence}
                            />
                            <div className="invalid-feedback-custom">{ErrInputSequence}</div>

                            <label className="mt-3 form-label required" htmlFor="infotype">
                                {i18n.t('Info type')}
                            </label>

                            <DropdownList
                                className={
                                    touched.infotype && errors.infotype
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                name="infotype"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeType(val)}
                                onBlur={val => setFieldTouched("infotype", val?.value ? val.value : '')}
                                data={ListType}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.infotype}
                            />
                            <div className="invalid-feedback-custom">{ErrSelType}</div>

                            <label className="mt-3 form-label required" htmlFor="customertype">
                                {i18n.t('customer type')}
                            </label>

                            <DropdownList
                                className={
                                    touched.customertype && errors.customertype
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                name="customertype"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeCustomerType(val)}
                                onBlur={val => setFieldTouched("customertype", val?.value ? val.value : '')}
                                data={ListCustomerType}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.customertype}
                            />
                            <div className="invalid-feedback-custom">{ErrCustomerType}</div>

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