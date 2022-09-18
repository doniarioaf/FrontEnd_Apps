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
import '../../CSS/table.css';

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

    const [InputListInfoKementerian, setInputListInfoKementerian] = useState([{ kementerian:"",alamat_email: "", password_email: ""}]);
    const [ErrInputKementtrian, setErrInputKementtrian] = useState('');
    const [ErrInputAlamatEmail, setErrInputAlamatEmail] = useState('');
    const [ErrInputPasswordEmail, setErrInputPasswordEmail] = useState('');

    const [InputListInfoContact, setInputListInfoContact] = useState([{ panggilan:"",namakontak: "", listnotelepon: [{notelepon:""}],email:"",noext:""}]);
    const [ErrInputPanggilan, setErrInputPanggilan] = useState('');
    const [ErrInputNamaKontak, setErrInputNamaKontak] = useState('');
    const [ErrInputNotelepon, setErrInputNotelepon] = useState('');
    const [ErrInputEmail, setErrInputEmail] = useState('');
    const [ErrInputNoExt, setErrInputNoExt] = useState('');

    const [ListPanggilan, setListPanggilan] = useState([]);

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

            setListPanggilan(data.data.panggilanOptions.reduce((obj, el) => (
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
        setErrInputKementtrian('');
        setErrInputAlamatEmail('');
        setErrInputPasswordEmail('');
        setErrInputPanggilan('');
        setErrInputNamaKontak('');
        setErrInputNotelepon('');
        setErrInputEmail('');
        setErrInputNoExt('');
        
        if(InputListInfoContact.length > 0){
            for(let i=0; i < InputListInfoContact.length; i++){
                let det = InputListInfoContact[i];
                if(det.panggilan !== '' || det.namakontak !== '' || det.email !== '' || det.noext !== ''){
                    if(det.panggilan == ''){
                        setErrInputPanggilan('Bapak/Ibu '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.namakontak == ''){
                        setErrInputNamaKontak('Nama Kontak '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.email == ''){
                        setErrInputEmail('Email '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.noext == ''){
                        setErrInputNoExt('No Ext '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.listnotelepon.length > 0){
                        for(let j=0; j < det.listnotelepon.length; j++){
                            let detnotlp = det.listnotelepon[j];
                            if(detnotlp.notelepon == ''){
                                setErrInputNotelepon('No Telepon '+i18n.t('label_REQUIRED'));
                                flag = false;
                            }
                        }
                    }else{
                        setErrInputNotelepon('No Telepon '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                }

                
            }
        }

        if(InputListInfoKementerian.length > 0){
            for(let i=0; i < InputListInfoKementerian.length; i++){
                let det = InputListInfoKementerian[i];
                if(det.kementerian !== '' || det.alamat_email !== '' || det.password_email !== ''){
                    if(det.kementerian == ''){
                        setErrInputKementtrian('Kementrian '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.alamat_email == ''){
                        setErrInputAlamatEmail('Alamat Email '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.password_email == ''){
                        setErrInputPasswordEmail('Password Email '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                }
            }
        }
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
            obj.detailsinfokementerian = InputListInfoKementerian;

            let listinfocontact =[];
            if(InputListInfoContact.length > 0){
                
                for(let i=0; i < InputListInfoContact.length; i++){
                    let det = InputListInfoContact[i];
                    let listnotelpinfocontact = '';
                    if(det.panggilan !== '' && det.namakontak !== '' && det.email !== '' && det.noext !== ''){
                        let count =0;
                        for(let j=0; j < det.listnotelepon.length; j++){
                            let no = det.listnotelepon[j].notelepon;
                            count++;
                            if(no != ''){
                                if(count == det.listnotelepon.length){
                                    listnotelpinfocontact += no;
                                }else{
                                    listnotelpinfocontact += no+',';
                                }
                            }
                        }
                        let objinfocontact = new Object();
                        objinfocontact.panggilan = det.panggilan;
                        objinfocontact.namakontak = det.namakontak;
                        objinfocontact.email = det.email;
                        objinfocontact.noext = det.noext;
                        objinfocontact.notelepon = listnotelpinfocontact;
                        listinfocontact.push(objinfocontact);
                    }
                }
            }
            obj.detailsinfocontact = listinfocontact;
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

    const handleInputChangeKementerian = (e, index) => {
        const { name, value } = e.target;
        const list = [...InputListInfoKementerian];
        list[index][name] = value;
        setInputListInfoKementerian(list);
    };

    const handleInputChangeInfoContact = (e, index) => {
        const { name, value } = e.target;
        const list = [...InputListInfoContact];
        list[index][name] = value;
        setInputListInfoContact(list);
    };
    
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...InputListNoKantor];
        list.splice(index, 1);
        setInputListNoKantor(list);
    };

    const handleRemoveClickInfoKementerian = index => {
        const list = [...InputListInfoKementerian];
        list.splice(index, 1);
        setInputListInfoKementerian(list);
    };

    const handleRemoveClickInfoContact = index => {
        const list = [...InputListInfoContact];
        list.splice(index, 1);
        setInputListInfoContact(list);
    };
    
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputListNoKantor([...InputListNoKantor, { nokantor: ""}]);
    };

    const handleAddClickInfoKementerian = () => {
        setInputListInfoKementerian([...InputListInfoKementerian, { kementerian:"",alamat_email: "", password_email: ""}]);
    };

    const handleAddClickInfoContact = () => {
        setInputListInfoContact([...InputListInfoContact, { panggilan:"",namakontak: "", listnotelepon: [{notelepon:""}],email:"",noext:""}]);
    };

    const handleInputDropDownChangeInfoContact = (e, index,name) => {
        const list = [...InputListInfoContact];
        list[index][name] = e.value;
        setInputListInfoContact(list);
    };

    const handleAddClickListNoTelpInfoContact = (paramparent,indexparent) => {
        const list = [...InputListInfoContact];
        const listnotelp = [...list[indexparent][paramparent], { notelepon: ""}];
        list[indexparent][paramparent] = listnotelp;
        setInputListInfoContact(list);
    };

    const handleRemoveClickListNoTelpInfoContact = (paramparent,indexparent,index) => {
        const list = [...InputListInfoContact];
        const listnotelp = [...list[indexparent][paramparent]];
        listnotelp.splice(index, 1);
        list[indexparent][paramparent] = listnotelp;
        setInputListInfoContact(list);
    };

    const handleInputChangeListNoTelpInfoContact = (e, paramparent,indexparent,indexchild) => {
        // let paramlist = 'listnotelepon';
        const { name, value } = e.target;
        const list = [...InputListInfoContact];
        const listnotelp = list[indexparent][paramparent];
        listnotelp[indexchild][name] = value;
        list[indexparent][paramparent] = listnotelp;
        setInputListInfoContact(list);
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
                                <div style={{marginTop:'50px'}}><h3>Informasi Kementerian</h3></div>
                                <div className="invalid-feedback-custom">{ErrInputKementtrian}</div>
                                <div className="invalid-feedback-custom">{ErrInputAlamatEmail}</div>
                                <div className="invalid-feedback-custom">{ErrInputPasswordEmail}</div>
                            {
                                InputListInfoKementerian.length == 0?'':
                                
                                <table id="tablegrid">
                                    
                                <tr>
                                    <th>{i18n.t('Kementrian')}</th>
                                    <th>{i18n.t('Alamat Email')}</th>
                                    <th>{i18n.t('Password Email')}</th>
                                    <th>{i18n.t('Action')}</th>
                                </tr>
                                {
                                    InputListInfoKementerian.map((x, i) => {
                                        return (
                                            <tr>
                                                <td>
                                                <Input
                                                name="kementerian"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="kementerian"
                                                onChange={val => handleInputChangeKementerian(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.kementerian}
                                                disabled={false}
                                                />
                                                </td>

                                                <td>
                                                <Input
                                                name="alamat_email"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="alamat_email"
                                                onChange={val => handleInputChangeKementerian(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.alamat_email}
                                                disabled={false}
                                                />
                                                </td>

                                                <td>
                                                <Input
                                                name="password_email"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="password_email"
                                                onChange={val => handleInputChangeKementerian(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.password_email}
                                                disabled={false}
                                                />
                                                </td>

                                                <td>
                                                <IconButton color={'primary'} hidden={i > 0}
                                                    onClick={() => handleAddClickInfoKementerian()}
                                                // hidden={showplusdebit}
                                                >
                                                    <AddIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                                <IconButton color={'primary'} hidden={i == 0}
                                                onClick={() => handleRemoveClickInfoKementerian(i)}
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
                            }

                                <div style={{marginTop:'50px'}}><h3>Informasi Contact</h3></div>
                                <div className="invalid-feedback-custom">{ErrInputPanggilan}</div>
                                <div className="invalid-feedback-custom">{ErrInputNamaKontak}</div>
                                <div className="invalid-feedback-custom">{ErrInputNotelepon}</div>
                                <div className="invalid-feedback-custom">{ErrInputEmail}</div>
                                <div className="invalid-feedback-custom">{ErrInputNoExt}</div>
                                {
                                    InputListInfoContact.length == 0?'':
                                    <table id="tablegrid">
                                        <tr>
                                            <th>{i18n.t('Bapal/Ibu')}</th>
                                            <th>{i18n.t('Nama Kontak')}</th>
                                            <th>{i18n.t('No Telepon')}</th>
                                            <th>{i18n.t('Email')}</th>
                                            <th>{i18n.t('No Ext')}</th>
                                            <th>{i18n.t('Action')}</th>
                                        </tr>
                                        {
                                            InputListInfoContact.map((x, i) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                        <DropdownList
                                                            name="panggilan"
                                                            filter='contains'
                                                            // placeholder={i18n.t('select.SELECT_OPTION')}
                                                            
                                                            onChange={val => handleInputDropDownChangeInfoContact(val,i,'panggilan')}
                                                            data={ListPanggilan}
                                                            textField={'label'}
                                                            valueField={'value'}
                                                            style={{width: '100px'}}
                                                            value={x.panggilan}
                                                        />
                                                        </td>

                                                        <td>
                                                        <Input
                                                            name="namakontak"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="namakontak"
                                                            onChange={val => handleInputChangeInfoContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.namakontak}
                                                            disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                        <table >
                                                            {
                                                                x.listnotelepon.map((y, j) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                            <Input
                                                                            name="notelepon"
                                                                            // className={
                                                                            //     touched.amount && errors.amount
                                                                            //         ? "w-50 input-error"
                                                                            //         : "w-50"
                                                                            // }
                                                                            type="text"
                                                                            id="notelepon"
                                                                            onChange={val => handleInputChangeListNoTelpInfoContact(val,'listnotelepon',i,j)}
                                                                            onBlur={handleBlur}
                                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                                            // style={{width: '70%'}}
                                                                            // value={values.amount}
                                                                            value={y.notelepon}
                                                                            disabled={false}
                                                                            />
                                                                            </td>
                                                                            
                                                                            <td hidden={j > 0}>
                                                                            <IconButton color={'primary'} hidden={j > 0}
                                                                                onClick={() => handleAddClickListNoTelpInfoContact('listnotelepon',i)}
                                                                            // hidden={showplusdebit}
                                                                            >
                                                                                <AddIcon style={{ fontSize: 18 }}/>
                                                                            </IconButton>
                                                                            </td>
                                                                            <td hidden={j == 0}>
                                                                            <IconButton color={'primary'} hidden={j == 0}
                                                                            onClick={() => handleRemoveClickListNoTelpInfoContact('listnotelepon',i,j)}
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
                                                        {/* <Input
                                                            name="notelepon"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="notelepon"
                                                            onChange={val => handleInputChangeInfoContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.notelepon}
                                                            disabled={false}
                                                            /> */}
                                                        </td>

                                                        <td>
                                                        <Input
                                                            name="email"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="email"
                                                            onChange={val => handleInputChangeInfoContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.email}
                                                            disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                        <Input
                                                            name="noext"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="noext"
                                                            onChange={val => handleInputChangeInfoContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.noext}
                                                            disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                        <IconButton color={'primary'} hidden={i > 0}
                                                            onClick={() => handleAddClickInfoContact()}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <AddIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        <IconButton color={'primary'} hidden={i == 0}
                                                        onClick={() => handleRemoveClickInfoContact(i)}
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
                                }

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