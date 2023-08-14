import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {Input,Button,FormGroup,Label} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize,formatMoney, inputJustNumberAndCommaDot } from '../../shared/globalFunc';
import { addParameterManggala_Permission } from '../../shared/permissionMenu';
import { formatdate } from '../../shared/constantValue';
import * as pathmenu           from '../../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import { DatePicker}      from 'react-widgets';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import "react-widgets/dist/css/react-widgets.css";

export default function AddParameterManggala(props) {
    reloadToHomeNotAuthorize(addParameterManggala_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [InputNama, setInputNama] = useState('');
    const [ErrInputNama, setErrInputNama] = useState('');
    const [Inputvalue, setInputvalue] = useState('');
    const [ErrInputvalue, setErrInputvalue] = useState('');
    const [InputIsActive, setInputIsActive] = useState(true);

    const [ListParamType, setListParamType] = useState('');
    const [SelParamType, setSelParamType] = useState('TEXT');
    const [ErrSelParamType, setErrSelParamType] = useState('');

    const [ParamDate, setParamDate] = useState(new Date());
    const [ErrParamDate, setErrParamDate] = useState('');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getParameterManggalaData('/template',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            setListParamType(data.data.parameterTypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));
        }
        setLoading(false);
    }

    const handleInputNama = (data) =>{
        let val = data.target.value;
        setInputNama(val);
    }

    const handleInputValue = (data) =>{
        let val = data.target.value;
        if(SelParamType == 'NUMBER'){
            let flagReg = inputJustNumberAndCommaDot(val);
            if(flagReg){
                setInputvalue(formatMoney(val));
            }
        }else{
            setInputvalue(val);
        }
        
    }

    const handleChangeParamType = (data) =>{
        let id = data?.value ? data.value : '';
        setSelParamType(id);
        setParamDate(null);
        setInputvalue('');
    }

    const handleParamDate = (data) =>{
        if(data !== null){
            setParamDate(moment(data, formatdate).toDate());
        }else{
            setParamDate(null)
        }
    }
    

    const handleChangeIsActive = (data) =>{
        setInputIsActive(data.target.checked);
    }

    

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputNama('');
        setErrInputvalue('');
        setErrSelParamType('');
        setErrParamDate('');
        if(InputNama == ''){
            setErrInputNama(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelParamType == ''){
            setErrSelParamType(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            if(SelParamType == 'DATE'){
                if(ParamDate == null || ParamDate == ''){
                    setErrParamDate(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }else if(SelParamType == 'NUMBER'){
                let temp = new String(Inputvalue).replaceAll('.','').replaceAll(',','.');
                if(Inputvalue == '' || isNaN(temp)){
                    setErrInputvalue(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }else{
                if(Inputvalue == ''){
                    setErrInputvalue(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }
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
            // obj.code = InputCode;
            obj.paramname = InputNama;
            obj.paramtype = SelParamType;
            if(SelParamType == 'DATE'){
                obj.paramdate = moment(ParamDate).toDate().getTime();
                obj.paramvalue = '';
            }else if(SelParamType == 'NUMBER'){
                obj.paramdate = null;
                obj.paramvalue = new String(Inputvalue).replaceAll('.','').replaceAll(',','.');
            }else{
                obj.paramdate = null;
                obj.paramvalue = Inputvalue;
            }
            
            obj.isactive = InputIsActive;
            dispatch(actions.submitAddParameterManggala('',obj,succesHandlerSubmit, errorHandler));
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
                nama:new String(InputNama).toUpperCase().replaceAll(" ",""),
                value:Inputvalue,
                paramtype:SelParamType,
                paramdate:ParamDate,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormParameter">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addparameter} label={'Add Parameter'} labeldefault={'Add Parameter'} />

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
                                maxLength={100}
                                onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNama}</div>

                            <label className="mt-3 form-label required" htmlFor="paramtype">
                                {i18n.t('Type')}
                            <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="paramtype"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeParamType(val)}
                                onBlur={val => setFieldTouched("paramtype", val?.value ? val.value : '')}
                                data={ListParamType}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.paramtype}
                            />
                            <div className="invalid-feedback-custom">{ErrSelParamType}</div>

                            <label className="mt-3 form-label required" htmlFor="value">
                                {i18n.t('Value')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <div hidden={values.paramtype == 'NUMBER' || values.paramtype == 'TEXT'}>
                            <DatePicker
                                    name="paramdate"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleParamDate(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.paramdate}
                                    
                                    // style={{width: '25%'}}
                                    // disabled={ values.allmember}                                    
                            />
                            <div className="invalid-feedback-custom">{ErrParamDate}</div>
                            </div>

                            <div hidden={values.paramtype == 'DATE'}>
                            
                            <Input
                                name="value"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="value"
                                maxLength={100}
                                onChange={val => handleInputValue(val)}
                                onBlur={handleBlur}
                                value={values.value}
                            />
                            <div className="invalid-feedback-custom">{ErrInputvalue}</div>
                            </div>

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