import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {Input,Button} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { addCustomer_Permission } from '../../shared/permissionMenu';


export default function AddFormCompany(props) {
    reloadToHomeNotAuthorize(addCustomer_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputName, setInputName] = useState('');
    const [ErrInputName, setErrInputName] = useState('');

    const [InputCustomerCode, setInputCustomerCode] = useState('');
    const [InputContactPerson, setInputContactPerson] = useState('');
    const [ErrInputContactPerson, setErrInputContactPerson] = useState('');

    const [InputAddress, setInputAddress] = useState('');
    const [ErrInputAddress, setErrInputAddress] = useState('');

    const [InputProvinsi, setInputProvinsi] = useState('');
    const [ErrInputProvinsi, setErrInputProvinsi] = useState('');

    const [InputCity, setInputCity] = useState('');
    const [ErrInputCity, setErrInputCity] = useState('');

    const [InputAreaName, setInputAreaName] = useState('');
    const [ErrInputAreaName, setErrInputAreaName] = useState('');

    const [InputSubAreaName, setInputSubAreaName] = useState('');
    const [ErrInputSubAreaName, setErrInputSubAreaName] = useState('');

    const [InputPhone, setInputPhone] = useState('');
    const [ErrInputPhone, setErrInputPhone] = useState('');

    const [InputLatitude, setInputLatitude] = useState('');
    const [ErrInputLatitude, setErrInputLatitude] = useState('');

    const [InputLongitude, setInputLongitude] = useState('');
    const [ErrInputLongitude, setErrInputLongitude] = useState('');

    const [ListCustomerType, setListCustomerType] = useState([]);
    const [SelCustomerType, setSelCustomerType] = useState('');
    const [ErrCustomerType, setErrCustomerType] = useState('');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCustomerData('/template',successHandlerTemplate, errorHandler));
    }, []);

    function successHandlerTemplate(data) {
        if(data.data){
            setListCustomerType(data.data.customertypeoptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
        }
        setLoading(false);
    }

    const handleInputName = (data) =>{
        let val = data.target.value;
        setInputName(val);
    }

    const handleInputCustCode = (data) =>{
        let val = data.target.value;
        setInputCustomerCode(val);
    }

    const handleInputContactPerson = (data) =>{
        let val = data.target.value;
        setInputContactPerson(val);
    }

    const handleInputAddress = (data) =>{
        let val = data.target.value;
        setInputAddress(val);
    }

    const handleInputProvinsi = (data) =>{
        let val = data.target.value;
        setInputProvinsi(val);
    }

    const handleInputCity = (data) =>{
        let val = data.target.value;
        setInputCity(val);
    }

    const handleInputAreaName = (data) =>{
        let val = data.target.value;
        setInputAreaName(val);
    }

    const handleInputSubAreaName = (data) =>{
        let val = data.target.value;
        setInputSubAreaName(val);
    }
    const handleInputPhone = (data) =>{
        let val = data.target.value;
        if(!isNaN(val)){
            setInputPhone(val);
        }
        
    }

    const handleInputLatitude = (data) =>{
        let val = data.target.value;
        setInputLatitude(val);
    }

    const handleInputLongitude = (data) =>{
        let val = data.target.value;
        setInputLongitude(val);
    }

    const handleChangeCustomerType = (data) =>{
        let selValue = data?.value ? data.value : '';
        setSelCustomerType(selValue);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputName('');
        setErrInputAddress('');
        setErrInputProvinsi('');
        setErrInputCity('');
        setErrInputAreaName('');
        setErrInputSubAreaName('');
        setErrInputPhone('');
        // setErrInputLatitude('');
        // setErrInputLongitude('');
        setErrCustomerType('');
        setErrInputContactPerson('');

        if(InputName == ''){
            setErrInputName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputAddress == ''){
            setErrInputAddress(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputProvinsi == ''){
            setErrInputProvinsi(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputCity == ''){
            setErrInputCity(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputAreaName == ''){
            setErrInputAreaName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputSubAreaName == ''){
            setErrInputSubAreaName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputPhone == ''){
            setErrInputPhone(i18n.t('label_REQUIRED'));
            flag = false;
        }
        // if(InputLatitude == ''){
        //     setErrInputLatitude(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }
        // if(InputLongitude == ''){
        //     setErrInputLongitude(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }
        if(SelCustomerType == ''){
            setErrCustomerType(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputContactPerson == ''){
            setErrInputContactPerson(i18n.t('label_REQUIRED'));
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
            obj.nama = InputName;
            obj.address = InputAddress;
            obj.provinsi = InputProvinsi;
            obj.city = InputCity;
            obj.areaname = InputAreaName;
            obj.subarename = InputSubAreaName;
            obj.phone = InputPhone;
            obj.latitude = InputLatitude;
            obj.longitude = InputLongitude;
            obj.idcustomertype = SelCustomerType;
            obj.contactperson = InputContactPerson;
            obj.customercode = InputCustomerCode;
            dispatch(actions.submitAddCustomer(obj,succesHandlerSubmit, errorHandler));
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
                nama:InputName,
                address:InputAddress,
                provinsi:InputProvinsi,
                city:InputCity,
                areaname:InputAreaName,
                subareaname:InputSubAreaName,
                phone:InputPhone,
                latitude:InputLatitude,
                longitude:InputLongitude,
                customertype:SelCustomerType,
                contactperson:InputContactPerson,
                customercode:InputCustomerCode,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="formAddCustomer">
                            <ContentWrapper>
                            <div className="content-heading" >
                            <span>{i18n.t('label_ADD_CUSTOMER')}</span>
                            </div>

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
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
                                onChange={val => handleInputName(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputName}</div>

                            <label className="mt-3 form-label required" htmlFor="customercode">
                                {i18n.t('Customer Code')}
                            </label>
                            <Input
                                name="customercode"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="customercode"
                                onChange={val => handleInputCustCode(val)}
                                onBlur={handleBlur}
                                value={values.customercode}
                            />
                            
                            <label className="mt-3 form-label required" htmlFor="contactperson">
                                {i18n.t('Contact Person')}
                            </label>
                            <Input
                                name="contactperson"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="contactperson"
                                onChange={val => handleInputContactPerson(val)}
                                onBlur={handleBlur}
                                value={values.contactperson}
                            />
                            <div className="invalid-feedback-custom">{ErrInputContactPerson}</div>

                            <label className="mt-3 form-label required" htmlFor="phone">
                                {i18n.t('label_CONTACT_NUMBER')}
                            </label>
                            <Input
                                name="phone"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="phone"
                                onChange={val => handleInputPhone(val)}
                                onBlur={handleBlur}
                                value={values.phone}
                            />
                            <div className="invalid-feedback-custom">{ErrInputPhone}</div>

                            <label className="mt-3 form-label required" htmlFor="address">
                                {i18n.t('label_ADDRESS')}
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
                                onChange={val => handleInputAddress(val)}
                                onBlur={handleBlur}
                                value={values.address}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAddress}</div>

                            <label className="mt-3 form-label required" htmlFor="provinsi">
                                {i18n.t('Provinsi')}
                            </label>
                            <Input
                                name="provinsi"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="provinsi"
                                onChange={val => handleInputProvinsi(val)}
                                onBlur={handleBlur}
                                value={values.provinsi}
                            />
                            <div className="invalid-feedback-custom">{ErrInputProvinsi}</div>
                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="city">
                                {i18n.t('label_CITY')}
                            </label>
                            <Input
                                name="city"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="city"
                                onChange={val => handleInputCity(val)}
                                onBlur={handleBlur}
                                value={values.city}
                            />
                            <div className="invalid-feedback-custom">{ErrInputCity}</div>
                            
                            <label className="mt-3 form-label required" htmlFor="areaname">
                                {i18n.t('Area Name')}
                            </label>
                            <Input
                                name="areaname"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="areaname"
                                onChange={val => handleInputAreaName(val)}
                                onBlur={handleBlur}
                                value={values.areaname}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAreaName}</div>

                            <label className="mt-3 form-label required" htmlFor="subareaname">
                                {i18n.t('Sub Area Name')}
                            </label>
                            <Input
                                name="subareaname"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="subareaname"
                                onChange={val => handleInputSubAreaName(val)}
                                onBlur={handleBlur}
                                value={values.subareaname}
                            />
                            <div className="invalid-feedback-custom">{ErrInputSubAreaName}</div>

                            <label className="mt-3 form-label required" htmlFor="latitude">
                                {i18n.t('Latitude')}
                            </label>
                            <Input
                                name="latitude"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="latitude"
                                onChange={val => handleInputLatitude(val)}
                                onBlur={handleBlur}
                                value={values.latitude}
                            />
                            <div className="invalid-feedback-custom">{ErrInputLatitude}</div>

                            <label className="mt-3 form-label required" htmlFor="longitude">
                                {i18n.t('Longitude')}
                            </label>
                            <Input
                                name="longitude"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="longitude"
                                onChange={val => handleInputLongitude(val)}
                                onBlur={handleBlur}
                                value={values.longitude}
                            />
                            <div className="invalid-feedback-custom">{ErrInputLongitude}</div>

                            <label className="mt-3 form-label required" htmlFor="customertype">
                                {i18n.t('label_CUSTOMER_TYPE')}
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
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