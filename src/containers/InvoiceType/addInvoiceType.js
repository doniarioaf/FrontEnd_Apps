import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {Input,Button,FormGroup,Label} from 'reactstrap';
import * as actions                 from '../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../shared/globalFunc';
import { addInvoiceType_Permission } from '../shared/permissionMenu';
import * as pathmenu           from '../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

export default function AddPartai(props) {
    reloadToHomeNotAuthorize(addInvoiceType_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ListInvoiceType, setListInvoiceType] = useState([]);
    const [SelInvoiceType, setSelInvoiceType] = useState('');
    const [ErrSelInvoiceType, setErrSelInvoiceType] = useState('');
    const [InputNama, setInputNama] = useState('');
    const [ErrInputNama, setErrInputNama] = useState('');
    const [InputIsActive, setInputIsActive] = useState(true);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInvoiceTypeData('/template',successHandlerTemplate, errorHandler));
    }, []);    

    const successHandlerTemplate = (data) =>{
        if(data.data){
            setListInvoiceType(data.data.invoiceTypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));
        }

        setLoading(false);
    }

    const handleChangeInvoiceType = (data) =>{
        let id = data?.value ? data.value : '';
        setSelInvoiceType(id);
    }

    const handleInputNama = (data) =>{
        let val = data.target.value;
        setInputNama(val);
    }

    
    const handleChangeIsActive = (data) =>{
        setInputIsActive(data.target.checked);
    }

    

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputNama('');
        setErrSelInvoiceType('');
        if(InputNama == ''){
            setErrInputNama(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelInvoiceType == ''){
            setErrSelInvoiceType(i18n.t('label_REQUIRED'));
            flag = false;
        }

        return flag;
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

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.invoicetype = SelInvoiceType;
            obj.nama = InputNama;
            obj.isactive = InputIsActive;
            dispatch(actions.submitAddInvoiceType('',obj,succesHandlerSubmit, errorHandler));
        }
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
            text: data.msg
        })
    }

    return (
        <Formik
        initialValues={
            {
                invoicetype:SelInvoiceType,
                nama:InputNama,
                isactive:InputIsActive
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormPartai">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addInvoiceType} label={'label_ADD_INVOICE_TYPE'} labeldefault={'Add Invoice type'} />

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                                
                            <label className="mt-3 form-label required" htmlFor="invoicetype">
                                {i18n.t('label_INVOICE_TYPE')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="invoicetype"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeInvoiceType(val)}
                                    onBlur={val => setFieldTouched("invoicetype", val?.value ? val.value : '')}
                                    data={ListInvoiceType}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.invoicetype}
                                />
                                <div className="invalid-feedback-custom">{ErrSelInvoiceType}</div>

                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="nama"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nama"
                                maxLength={200}
                                onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNama}</div>

                            

                            {/* <FormGroup check style={{marginTop:'20px'}}>
                            <Input type="checkbox" name="check" 
                            id="isactived" 
                            onChange={val => handleChangeIsActive(val)}
                            defaultChecked={values.isactive}
                            checked={values.isactive}
                            style={{transform:'scale(1.5)'}}
                            />
                            <Label for="isactived" check style={{transform:'scale(1.5)',marginLeft:'20px'}}>{i18n.t('label_IS_ACTIVE')}</Label>
                            </FormGroup> */}
                            
                            </div>
                            
                            </div>
                            
                            </ContentWrapper>
                            {loading && <Loading/>}
                            <div className="row justify-content-center" style={{marginTop:'-30px',marginBottom:'20px'}}>
                            <Button
                            // disabled={props.activeStep === 0}
                                // style={{marginLeft:"20%"}}
                                onClick={() => history.goBack()}
                            >
                            {/* {i18n.t('common.BACK')} */}
                            {'Cancel'}
                            </Button>

                            <Button
                                // style={{marginLeft:"1%"}}
                                onClick={() => submitHandler()}
                            >
                            {'Submit'}
                            </Button>
                            </div>
                        </form>
                    )
                }
            }
        </Formik>
    )
}