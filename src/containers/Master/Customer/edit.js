import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {Input,Button} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { editCustomer_Permission } from '../../shared/permissionMenu';
import * as pathmenu           from '../../shared/pathMenu';
import momentLocalizer                 from 'react-widgets-moment';
import "react-widgets/dist/css/react-widgets.css";

export default function EditCustomer(props) {
    reloadToHomeNotAuthorize(editCustomer_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);

    const [InputNama, setInputNama] = useState('');
    const [ErrInputNama, setErrInputNama] = useState('');

    const [InputAlias, setInputAlias] = useState('');
    const [ErrInputAlias, setErrInputAlias] = useState('');

    const [InputBankName, setInputBankName] = useState('');
    const [InputNoAkunBank, setInputNoAkunBank] = useState('');
    const [InputNamaAkunBank, setInputNamaAkunBank] = useState('');
    const [InputAddress, setInputAddress] = useState('');

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCustomerData( {url:'/'+id},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        let val = data.data;
        setInputNama(val.nama);
        setInputAlias(val.alias);
        setInputAddress(val.address);
        setInputBankName(val.bank);
        setInputNoAkunBank(val.banknumber);
        setInputNamaAkunBank(val.accountbankname)
        setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrInputNama('');
        setErrInputAlias('');
        if(values.nama == ''){
            setErrInputNama(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(values.alias == ''){
            setErrInputAlias(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
    }

    const succesHandlerSubmit = (data,propsdata) => {
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

    const executeSubmit = (values) => {
        let flag = checkColumnMandatory(values);
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.nama = values.nama;
            obj.alias = values.alias;
            obj.bank = values.bankname;
            obj.banknumber = values.accnobank;
            obj.accountbankname = values.accnamebank;
            obj.address = values.address;
            dispatch(actions.submitCustomerData({url:'/'+id,payload:obj,type:'EDIT'},succesHandlerSubmit, errorHandler));
        }
    }

    const submitHandler = (values) => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit(values);
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    const errorHandler = (data,propsdata) => {
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
                nama:InputNama,
                alias:InputAlias,
                bankname:InputBankName,
                accnobank:InputNoAkunBank,
                accnamebank:InputNamaAkunBank,
                address:InputAddress
            }
        }
        validate={values => {
            const errors = {};
            setInputNama(values.nama);
            setInputAlias(values.alias)
            setInputBankName(values.bankname);
            setInputNoAkunBank(values.accnobank);
            setInputNamaAkunBank(values.accnamebank);
            setInputAddress(values.address);
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormCustomer">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.editCustomer+'/'+id} label={'Edit Customer'} labeldefault={'Edit Customer'} />

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                           
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
                                maxLength={150}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNama}</div>

                            <label className="mt-3 form-label required" htmlFor="alias">
                                {i18n.t('Alias')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="alias"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="alias"
                                maxLength={100}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.alias}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAlias}</div>

                            <label className="mt-3 form-label required" htmlFor="address">
                                {i18n.t('label_ADDRESS')}
                                {/* <span style={{color:'red'}}>*</span> */}
                            </label>
                            <Input
                                name="address"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="address"
                                maxLength={200}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.address}
                            />
                            
                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="bankname">
                                {i18n.t('Bank')}
                                {/* <span style={{color:'red'}}>*</span> */}
                            </label>
                            <Input
                                name="bankname"
                                type="text"
                                id="bankname"
                                maxLength={100}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.bankname}
                            />

                            <label className="mt-3 form-label required" htmlFor="accnobank">
                                {i18n.t('label_ACC_NO')}
                                {/* <span style={{color:'red'}}>*</span> */}
                            </label>
                            <Input
                                name="accnobank"
                                type="text"
                                id="accnobank"
                                maxLength={100}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.accnobank}
                            />

                            <label className="mt-3 form-label required" htmlFor="accnamebank">
                                {i18n.t('label_ACC_NAME')}
                                {/* <span style={{color:'red'}}>*</span> */}
                            </label>
                            <Input
                                name="accnamebank"
                                type="text"
                                id="accnamebank"
                                maxLength={100}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.accnamebank}
                            />
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
                                color={'primary'}
                                onClick={() => submitHandler(values)}
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