import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
// import {Input,Button,FormGroup,Label} from 'reactstrap';
import {Input,Button,Label,FormGroup} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { addBankAccount_Permission } from '../../shared/permissionMenu';
import * as pathmenu           from '../../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';

export default function AddCustomerManggala(props) {
    reloadToHomeNotAuthorize(addBankAccount_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ListCustomerType, setListCustomerType] = useState([]);
    const [SelCustomerType, setSelCustomerType] = useState('');
    const [ErrSelCustomerType, setErrSelCustomerType] = useState('');

    const [InputCustomerName, setInputCustomerName] = useState('');
    const [ErrInputCustomerName, setErrInputCustomerName] = useState('');

    const [InputAlis, setInputAlias] = useState('');
    const [ErrInputAlis, setErrInputAlias] = useState('');
    const [InputAlamat, setInputAlamat] = useState('');
    const [ErrInputAlamat, setErrInputAlamat] = useState('');

    const [ListProvinsi, setListProvinsi] = useState([]);
    const [SelProvinsi, setSelProvinsi] = useState('');
    const [ErrSelProvinsi, setErrSelProvinsi] = useState('');

    const [ListCity, setListCity] = useState([]);
    const [SelCity, setSelCity] = useState('');
    const [ErrSelCity, setErrSelCity] = useState('');

    const [ListKodePos, setListKodePos] = useState([]);
    const [SelKodePos, setSelKodePos] = useState('');
    const [ErrSelKodePos, setErrSelKodePos] = useState('');
    const [InputNpwp, setInputNpwp] = useState('');
    const [ErrInputNpwp, setErrInputNpwp] = useState('');
    const [InputNib, setInputNib] = useState('');
    const [ErrInputNib, setErrInputNib] = useState('');
    const [InputIsActive, setInputIsActive] = useState(true);
    const [InputListNoKantor, setInputListNoKantor] = useState([{ nokantor: ""}]);

    const [DataTemplate, setDataTemplate] = useState([]);
    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCustomerManggalaData('/template',successHandlerTemplate, errorHandler));
    }, []);

    const successHandlerTemplate = (data) =>{
        if(data.data){
            setDataTemplate(data.data);
            setListCustomerType(data.data.customertypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListProvinsi(data.data.provinceOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.prov_id,
                    label: el.prov_name
                }]
            ), []));
        }
        setLoading(false);
    }
    const handleChangeCustomerType = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCustomerType(id);
    }

    const handleInputCustomerName = (data) =>{
        let val = data.target.value;
        setInputCustomerName(val)
    }

    const handleInputAlias = (data) =>{
        let val = data.target.value;
        setInputAlias(val)
    }

    const handleInputAlamat = (data) =>{
        let val = data.target.value;
        setInputAlamat(val)
    }

    const handleChangeProvinsi = (data) =>{
        let id = data?.value ? data.value : '';
        setSelProvinsi(id);
        setSelKodePos('');
        setListKodePos([]);
        setSelCity('');
        let listfilteroutput = DataTemplate.cityOptions.filter(output => output.prov_id == id);
        if(listfilteroutput.length > 0){
            setListCity(listfilteroutput.reduce((obj, el) => (
                [...obj, {
                    value: el.city_id,
                    label: el.city_name
                }]
            ), []));
        }else{
            setListCity([]);
        }
        
    }

    const handleChangeKota = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCity(id);
        setSelKodePos('');
        setListKodePos([]);
        setLoading(true);
        dispatch(actions.getAddressData('/postalcodebycityandprovince?cityid='+id+'&provid='+SelProvinsi,successHandlerPostalCode, errorHandler));
    }
    const successHandlerPostalCode = (data) =>{
        const result = Object.values(
            data.data.reduce((acc, obj) => ({ ...acc, [obj.postal_code]: obj }), {})
        );
        setListKodePos(result.reduce((obj, el) => (
            [...obj, {
                value: el.postal_code,
                label: el.postal_code
            }]
        ), []));
        setLoading(false);
    }

    const handleChangeKodePos = (data) =>{
        let id = data?.value ? data.value : '';
        setSelKodePos(id);
    }

    const handleInputNpwp = (data) =>{
        let val = data.target.value;
        setInputNpwp(val)
    }

    const handleInputNib = (data) =>{
        let val = data.target.value;
        setInputNib(val)
    }

    const handleChangeIsActive = (data) =>{
        setInputIsActive(data.target.checked);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputNib('');
        setErrInputCustomerName('');
        setErrInputNpwp('');
        setErrSelProvinsi('');
        setErrSelCity('');
        setErrSelKodePos('');
        setErrSelCustomerType('');

        if(InputNib == ''){
            setErrInputNib(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputCustomerName == ''){
            setErrInputCustomerName(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputNpwp == ''){
            setErrInputNpwp(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelProvinsi == ''){
            setErrSelProvinsi(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelCity == ''){
            setErrSelCity(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelKodePos == ''){
            setErrSelKodePos(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelCustomerType == ''){
            setErrSelCustomerType(i18n.t('label_REQUIRED'));
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
            obj.customertype = SelCustomerType;
            obj.customername = InputCustomerName;
            obj.alias = InputAlis;
            obj.alamat = InputAlamat;
            obj.provinsi = SelProvinsi;
            obj.kota = SelCity;
            obj.kodepos = SelKodePos;
            obj.npwp = InputNpwp;
            obj.nib = InputNib;
            obj.isactive = InputIsActive;
            let listnotelp = '';
            if(InputListNoKantor.length > 0){
                let count =0;
                for(let i=0; i < InputListNoKantor.length; i++){
                    let no = InputListNoKantor[i].nokantor;
                    count++;
                    if(no != ''){
                        if(count == InputListNoKantor.length){
                            listnotelp += no;
                        }else{
                            listnotelp += no+',';
                        }
                        
                    }
                    
                }
            }
            obj.telpkantor = listnotelp;
            dispatch(actions.submitAddCustomerManggala('',obj,succesHandlerSubmit, errorHandler));
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

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...InputListNoKantor];
        list[index][name] = value;
        setInputListNoKantor(list);
        
    };
    
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...InputListNoKantor];
        list.splice(index, 1);
        setInputListNoKantor(list);
    };
    
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputListNoKantor([...InputListNoKantor, { nokantor: ""}]);
    };

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
                customertype:SelCustomerType,
                customername:InputCustomerName,
                alias:InputAlis,
                alamat:InputAlamat,
                provinsi:SelProvinsi,
                city:SelCity,
                npwp:InputNpwp,
                nib:InputNib,
                kodepos:SelKodePos,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddCustomerManggala">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addcustomers} label={'Add Customer'} labeldefault={'Add Customer'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">

                            <label className="mt-3 form-label required" htmlFor="customertype">
                                {i18n.t('PT / CV')}
                                <span style={{color:'red'}}>*</span>
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
                            <div className="invalid-feedback-custom">{ErrSelCustomerType}</div>

                            <label className="mt-3 form-label required" htmlFor="customername">
                                {i18n.t('Name')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="customername"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="customername"
                                onChange={val => handleInputCustomerName(val)}
                                onBlur={handleBlur}
                                value={values.customername}
                            />
                            <div className="invalid-feedback-custom">{ErrInputCustomerName}</div>

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
                                onChange={val => handleInputAlias(val)}
                                onBlur={handleBlur}
                                value={values.alias}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAlis}</div>

                            
                            <label className="mt-3 form-label required" htmlFor="npwp">
                                {i18n.t('NPWP')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <Input
                                name="npwp"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="npwp"
                                onChange={val => handleInputNpwp(val)}
                                onBlur={handleBlur}
                                value={values.npwp}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNpwp}</div>

                            <label className="mt-3 form-label required" htmlFor="nib">
                                {i18n.t('NIB')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <Input
                                name="nib"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nib"
                                onChange={val => handleInputNib(val)}
                                onBlur={handleBlur}
                                value={values.nib}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNib}</div>

                            <label className="mt-3 form-label required" htmlFor="ntp">
                                {i18n.t('No Telp Kantor')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'120%'}}>
                                {
                                    InputListNoKantor.map((x, i) => {
                                        return (
                                            <tr>
                                                <td>
                                                <Input
                                                name="nokantor"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="nokantor"
                                                onChange={val => handleInputChange(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.nokantor}
                                                disabled={false}
                                                />
                                                </td>
                                                
                                                <td hidden={i > 0}>
                                                <IconButton color={'primary'} hidden={i > 0}
                                                    onClick={() => handleAddClick()}
                                                // hidden={showplusdebit}
                                                >
                                                    <AddIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                                </td>
                                                <td hidden={i == 0}>
                                                <IconButton color={'primary'} hidden={i == 0}
                                                onClick={() => handleRemoveClick(i)}
                                                // hidden={showplusdebit}
                                                >
                                                    <RemoveIcon style={{ fontSize: 18 }}/>
                                                </IconButton>    
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            
                            <label className="mt-3 form-label required" htmlFor="provinsi">
                                {i18n.t('Provinsi')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="provinsi"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeProvinsi(val)}
                                onBlur={val => setFieldTouched("provinsi", val?.value ? val.value : '')}
                                data={ListProvinsi}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.provinsi}
                            />
                            <div className="invalid-feedback-custom">{ErrSelProvinsi}</div>

                            <label className="mt-3 form-label required" htmlFor="city">
                                {i18n.t('Kota')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="city"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeKota(val)}
                                onBlur={val => setFieldTouched("city", val?.value ? val.value : '')}
                                data={ListCity}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.city}
                            />
                            <div className="invalid-feedback-custom">{ErrSelCity}</div>

                            <label className="mt-3 form-label required" htmlFor="kodepos">
                                {i18n.t('Kode Pos')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="kodepos"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeKodePos(val)}
                                onBlur={val => setFieldTouched("kodepos", val?.value ? val.value : '')}
                                data={ListKodePos}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.kodepos}
                            />
                            <div className="invalid-feedback-custom">{ErrSelKodePos}</div>

                            <label className="mt-3 form-label required" htmlFor="alamat">
                                {i18n.t('Alamat')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                    name="alamat"
                                    type="textarea"
                                    id="alamat"
                                    onChange={val => handleInputAlamat(val)}
                                    onBlur={handleBlur}
                                    value={values.alamat}
                                    disabled={false}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAlamat}</div>

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
                                disabled={loading}
                            >
                            {/* {i18n.t('common.BACK')} */}
                            {'Cancel'}
                            </Button>

                            <Button
                                // style={{marginLeft:"1%"}}
                                onClick={() => submitHandler()}
                                disabled={loading}
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