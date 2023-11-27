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
import { editInvoiceType_Permission } from '../shared/permissionMenu';
import * as pathmenu           from '../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

export default function AddPartai(props) {
    reloadToHomeNotAuthorize(editInvoiceType_Permission,'TRANSACTION');
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

    const [ListCOA, setListCOA] = useState([]);
    const [SelCOA, setSelCOA] = useState('');

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInvoiceTypeData('/'+id,successHandlerData, errorHandler));
    }, []);    

    const successHandlerData = (data) =>{
        if(data.data){
            let det = data.data;
            let template = det.template;
            setListInvoiceType(template.invoiceTypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            let listcoa = template.coaOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama+' ('+el.code+')'
                }]
            ), []);
            listcoa.push(
                {
                    value: 'nodata',
                    label: 'No Data'
                }
                )
            setListCOA(listcoa);

            setSelInvoiceType(det.invoicetype);
            setInputNama(det.nama);
            setInputIsActive(det.isactive?true:false);
            if(det.idcoa !== null && det.idcoa !== undefined){
                if(parseInt(det.idcoa) > 0){
                    setSelCOA(parseInt(det.idcoa));
                }else{
                    setSelCOA('nodata');    
                }
                
            }else{
                setSelCOA('nodata');
            }
        }

        setLoading(false);
    }

    const handleChangeCoa = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCOA(id);
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
            if(SelCOA == '' || SelCOA == 'nodata'){
                obj.idcoa = null;
            }else{
                obj.idcoa = SelCOA;
            }
            dispatch(actions.submitEditInvoiceType('/'+id,obj,succesHandlerSubmit, errorHandler));
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
                isactive:InputIsActive,
                coa:SelCOA
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormEditInvoiceType">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.editInvoiceType+'/'+id} label={'label_EDIT_INVOICE_TYPE'} labeldefault={'Edit Invoice type'} />

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

                            {/* <label className="mt-3 form-label" htmlFor="coa">
                                {i18n.t('COA')}
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="coa"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeCoa(val)}
                                    onBlur={val => setFieldTouched("coa", val?.value ? val.value : '')}
                                    data={ListCOA}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.coa}
                                /> */}

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