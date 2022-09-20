import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {Input,Button,FormGroup,Label} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker}      from 'react-widgets';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { addBankAccount_Permission } from '../../shared/permissionMenu';
import * as pathmenu           from '../../shared/pathMenu';
import "react-widgets/dist/css/react-widgets.css";

export default function EditBankAccount(props) {
    reloadToHomeNotAuthorize(addBankAccount_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputNamaBank, setInputNamaBank] = useState('');
    const [ErrInputNamaBank, setErrInputNamaBank] = useState('');
    const [InputCabang, setInputCabang] = useState('');
    const [ErrInputCabang, setErrInputCabang] = useState('');
    const [InputNoRek, setInputNoRek] = useState('');
    const [ErrInputNoRek, setErrInputNoRek] = useState('');
    const [InputDateOpen, setInputDateOpen] = useState(new Date());
    const [InputCatatan1, setInputCatatan1] = useState('');
    const [InputCatatan2, setInputCatatan2] = useState('');
    const [InputIsActive, setInputIsActive] = useState(true);

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getBankAccountData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        let det = data.data;
        setInputNamaBank(det.namabank);
        setInputCabang(det.cabang);
        setInputNoRek(det.norekening);
        setInputDateOpen(moment(new Date(det.dateopen), "DD MMMM YYYY").toDate());
        setInputCatatan1(det.catatan1);
        setInputCatatan2(det.catatan2);
        setInputIsActive(det.isactive ? true:false);
        setLoading(false);
    }

    const handleInputNamaBank = (data) =>{
        let val = data.target.value;
        setInputNamaBank(val);
    }

    const handleInputCabang = (data) =>{
        let val = data.target.value;
        setInputCabang(val);
    }

    const handleInputNoRek = (data) =>{
        let val = data.target.value;
        if(val == ''){
            setInputNoRek(val);
        }else if(!isNaN(val)){
            setInputNoRek(val);
        }
    }

    const handleInputCatatan1 = (data) =>{
        let val = data.target.value;
        setInputCatatan1(val);
    }

    const handleInputCatatan2 = (data) =>{
        let val = data.target.value;
        setInputCatatan2(val);
    }

    const handleChangeIsActive = (data) =>{
        setInputIsActive(data.target.checked);
    }

    const handleDateOpen = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        setInputDateOpen(moment(data, "DD MMMM YYYY").toDate())
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputNamaBank('');
        setErrInputCabang('');
        setErrInputNoRek('');
        if(InputNamaBank == ''){
            setErrInputNamaBank(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputCabang == ''){
            setErrInputCabang(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputNoRek == ''){
            setErrInputNoRek(i18n.t('label_REQUIRED'));
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
            obj.namabank = InputNamaBank;
            obj.cabang = InputCabang;
            obj.norekening = InputNoRek;
            obj.dateopen = moment(InputDateOpen).toDate().getTime();
            obj.catatan1 = InputCatatan1;
            obj.catatan2 = InputCatatan2;
            obj.isactive = InputIsActive;
            dispatch(actions.submitEditBankAccount('/'+id,obj,succesHandlerSubmit, errorHandler));
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
            text: i18n.t(data.msgcode)
        })
    }

    return (
        <Formik
        initialValues={
            {
                namabank:InputNamaBank,
                cabang:InputCabang,
                norekening:InputNoRek,
                dateopen:InputDateOpen,
                catatan1:InputCatatan1,
                catatan2:InputCatatan2,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddBankAccount">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.editbankaccount+'/'+id} label={'label_EDIT_BANK_ACCOUNT'} labeldefault={'Edit Bank Account'} />

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="namabank">
                                {i18n.t('label_BANK_NAME')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="namabank"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="namabank"
                                onChange={val => handleInputNamaBank(val)}
                                onBlur={handleBlur}
                                value={values.namabank}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNamaBank}</div>

                            <label className="mt-3 form-label required" htmlFor="cabang">
                                {i18n.t('label_BRANCH_BANK')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="cabang"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="cabang"
                                onChange={val => handleInputCabang(val)}
                                onBlur={handleBlur}
                                value={values.cabang}
                            />
                            <div className="invalid-feedback-custom">{ErrInputCabang}</div>

                            <label className="mt-3 form-label required" htmlFor="norekening">
                                {i18n.t('label_NUMBER_ACCOUNT')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="norekening"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="norekening"
                                onChange={val => handleInputNoRek(val)}
                                onBlur={handleBlur}
                                value={values.norekening}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNoRek}</div>
                            </div>
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="dateopen">
                                {i18n.t('label_OPENING_DATE')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <DatePicker
                                    name="dateopen"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleDateOpen(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={'DD MMMM YYYY'}
                                    value={values.dateopen}
                                    // style={{width: '25%'}}
                                    // disabled={ values.allmember}                                    
                            />

                            <label className="mt-3 form-label required" htmlFor="catatan1">
                                {i18n.t('label_NOTE')+' 1'}
                            </label>
                            <Input
                                name="catatan1"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="catatan1"
                                onChange={val => handleInputCatatan1(val)}
                                onBlur={handleBlur}
                                value={values.catatan1}
                            />

                            <label className="mt-3 form-label required" htmlFor="catatan2">
                            {i18n.t('label_NOTE')+' 2'}
                            </label>
                            <Input
                                name="catatan2"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="catatan2"
                                onChange={val => handleInputCatatan2(val)}
                                onBlur={handleBlur}
                                value={values.catatan2}
                            />

                            <FormGroup check style={{marginTop:'20px'}}>
                            <Input type="checkbox" name="check" 
                            id="isactived" 
                            onChange={val => handleChangeIsActive(val)}
                            defaultChecked={values.isactive}
                            checked={values.isactive}
                            style={{transform:'scale(1.5)'}}
                            />
                            <Label for="isactived" check style={{transform:'scale(1.5)',marginLeft:'20px'}}>{i18n.t('label_IS_ACTIVE')}</Label>
                            </FormGroup>

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