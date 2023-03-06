import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../../components/Layout/ContentHeading';
import {Input,Button,FormGroup,Label} from 'reactstrap';
import * as actions                 from '../../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../../shared/globalFunc';
import { addVendor_Permission } from '../../../shared/permissionMenu';
import * as pathmenu           from '../../../shared/pathMenu';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';
import '../../../CSS/table.css';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import InputMask                    from 'react-input-mask';

export default function AddVendor(props) {
    reloadToHomeNotAuthorize(addVendor_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [SelVendorCategory, setSelVendorCategory] = useState('');
    const [ErrSelVendorCategory, setErrSelVendorCategory] = useState('');
    const [ListVendorCategory, setListVendorCategory] = useState([]);

    const [SelBadanUsaha, setSelBadanUsaha] = useState('');
    const [ErrSelBadanUsaha, setErrSelBadanUsaha] = useState('');
    const [ListBadanUsaha, setListBadanUsaha] = useState([]);

    const [InputNama, setInputNama] = useState('');
    const [ErrInputNama, setErrInputNama] = useState('');

    const [InputAlias, setInputAlias] = useState('');
    const [ErrInputAlias, setErrInputAlias] = useState('');

    const [InputNpwp, setInputNpwp] = useState('');
    const [ErrInputNpwp, setErrInputNpwp] = useState('');

    const [InputAddress, setInputAddress] = useState('');
    const [ErrInputAddress, setErrInputAddress] = useState('');
    const [InputAlamat2, setInputAlamat2] = useState('');
    const [InputAlamat3, setInputAlamat3] = useState('');

    const [SelProvince, setSelProvince] = useState('');
    const [ErrSelProvince, setErrSelProvince] = useState('');
    const [ListProvince, setListProvince] = useState([]);

    const [SelCity, setSelCity] = useState('');
    const [ErrSelCity, setErrSelCity] = useState('');
    const [ListCity, setListCity] = useState([]);

    const [ListDistrict, setListDistrict] = useState([]);
    const [SelDistrict, setSelDistrict] = useState('');
    const [ErrSelDistrict, setErrSelDistrict] = useState('');

    const [DataKodePos, setDataKodePos] = useState([]);
    const [SelKodePos, setSelKodePos] = useState('');
    const [ErrSelKodePos, setErrSelKodePos] = useState('');
    const [ListKodePos, setListKodePos] = useState([]);

    const [DataTemplate, setDataTemplate] = useState([]);

    const [InputIsActive, setInputIsActive] = useState(true);

    const [InputListBank, setInputListBank] = useState([{ norek:"",atasnama: "",bank:""}]);
    const [ErrBankNorek, setErrBankNorek] = useState('');
    const [ErrBankAtasNama, setErrBankAtasNama] = useState('');
    const [ErrBankName, setErrBankName] = useState('');

    const [ListPanggilan, setListPanggilan] = useState([]);
    const [InputListInfoContact, setInputListInfoContact] = useState([{ panggilan:"",namakontak: "",nocontacthp:[{contacthp:""}],email:"", contactofficenumber: "",extention:""}]);
    const [ErrPanggilan, setErrPanggilan] = useState('');
    const [ErrNamaKontak, setErrNamaKontak] = useState('');
    const [ErrNoContactHp, setErrNoContactHp] = useState('');
    const [ErrEmail, setErrEmail] = useState('');
    const [ErrContactOfficeNumber, setErrContactOfficeNumber] = useState('');
    const [ErrExtention, setErrExtention] = useState('');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getVendorData('/template',successHandlertemplate, errorHandler));
    }, []);

    const successHandlertemplate = (data) =>{
        if(data.data){
            setDataTemplate(data.data);
            setListBadanUsaha(data.data.badanUsahaOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListProvince(data.data.provinceOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.prov_id,
                    label: el.prov_name
                }]
            ), []));

            setListVendorCategory(data.data.vendorCategoryOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.categoryname
                }]
            ), []));

            setListPanggilan(data.data.panggilanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setLoading(false);
        }
    }

    const handleChangeVendorCategory = (data) =>{
        let id = data?.value ? data.value : '';
        setSelVendorCategory(id);
    }

    const handleChangeJenisBadanUsaha = (data) =>{
        let id = data?.value ? data.value : '';
        setSelBadanUsaha(id);
    }
    const handleInputNama = (data) =>{
        let val = data.target.value;
        setInputNama(val);
    }
    const handleInputAlias = (data) =>{
        let val = data.target.value;
        setInputAlias(val);
    }

    const handleInputNpwp = (data) =>{
        let val = data.target.value;
        setInputNpwp(val);
        // let value = new String(val).replaceAll('.','').replaceAll('-','');
        // let flag = false;
        // if(new String(val).includes('.')){
        //     flag = true;
        // }
        // if(new String(val).includes('-')){
        //     flag = true;
        // }
        // if(!isNaN(value)){
        //     flag = true;
        // }else{
        //     flag = false;
        // }
        // if(flag){
        //     setInputNpwp(val);
        // }else if(val == ''){
        //     setInputNpwp('');
        // }
        
    }

    const handleInputAddress = (data) =>{
        let val = data.target.value;
        setInputAddress(val);
    }

    const handleInputAlamat2 = (data) =>{
        let val = data.target.value;
        setInputAlamat2(val)
    }

    const handleInputAlamat3 = (data) =>{
        let val = data.target.value;
        setInputAlamat3(val)
    }

    const handleChangeProvinsi = (data) =>{
        let id = data?.value ? data.value : '';
        setSelProvince(id);
        setSelKodePos('');
        setListKodePos([]);
        setSelCity('');
        setSelDistrict('');
        setListDistrict([]);
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
        // setKosongAreaKirim();
        setSelDistrict('');
        setListDistrict([]);

        let listfilteroutput = DataTemplate.districtOptions.filter(output => output.city_id == id);
        if(listfilteroutput.length > 0){
            setListDistrict(listfilteroutput.reduce((obj, el) => (
                [...obj, {
                    value: el.dis_id,
                    label: el.dis_name
                }]
            ), []));
        }else{
            setListDistrict([]);
        }

        // setLoading(true);
        // dispatch(actions.getAddressData('/postalcodebycityandprovince?cityid='+id+'&provid='+SelProvince,successHandlerPostalCode, errorHandler));
    }

    const handleChangeDistrict = (data) =>{
        let id = data?.value ? data.value : '';

        // setKosongAreaKirim();
        setSelKodePos('');
        setListKodePos([]);
        setSelDistrict(id);

        setLoading(true);
        dispatch(actions.getAddressData('/postalcodebydistrict?districtid='+id,successHandlerPostalCode, errorHandler));

        
    }

    const successHandlerPostalCode = (data) =>{
        setDataKodePos(data.data);
        //Distinct
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
        // setKosongAreaKirim();
        // setLoading(true);
        // dispatch(actions.getAddressData('/districtbypostalcode?postalcode='+id,successHandlerDistrictPostalCode, errorHandler));
    }
    
    

    const handleChangeIsActive = (data) =>{
        setInputIsActive(data.target.checked);
    }

    

    const checkColumnMandatory = () => {
        let flag = true;
        setErrSelVendorCategory('');
        setErrSelBadanUsaha('');
        setErrInputNama('');
        setErrInputAlias('');
        setErrInputNpwp('');
        setErrInputAddress('');
        setErrSelProvince('');
        setErrSelDistrict('');
        setErrSelCity('');
        setErrSelKodePos('');

        setErrBankName('');
        setErrBankAtasNama('');
        setErrBankNorek('');

        setErrPanggilan('');
        setErrNamaKontak('');
        setErrNoContactHp('');
        setErrEmail('');
        setErrContactOfficeNumber('');
        setErrExtention('');

        if(InputListInfoContact.length > 0){
            for(let i=0; i < InputListInfoContact.length; i++){
                let det = InputListInfoContact[i];
                if(det.panggilan !== '' || det.namakontak !== '' || det.email !== '' || det.contactofficenumber !== '' || det.extention !== ''){
                    if(det.panggilan == ''){
                        setErrPanggilan('Bapak/Ibu '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.namakontak == ''){
                        setErrNamaKontak(i18n.t('label_CONTACT_NAME')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.email == ''){
                        setErrEmail('Email '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.contactofficenumber == ''){
                        setErrContactOfficeNumber(i18n.t('label_PHONE_OFFICE')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.extention == ''){
                        setErrExtention('Extention '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.nocontacthp.length > 0){
                        for(let j=0; j < det.nocontacthp.length; j++){
                            let detnotlp = det.nocontacthp[j];
                            if(detnotlp.notelepon == ''){
                                setErrNoContactHp(i18n.t('label_CONTACT_NUMBER')+' '+i18n.t('label_REQUIRED'));
                                flag = false;
                            }
                        }
                    }else{
                        setErrNoContactHp(i18n.t('label_CONTACT_NUMBER')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                }
            }
        }

        if(InputListBank.length > 0){
            for(let i=0; i < InputListBank.length; i++){
                let det = InputListBank[i];
                if(det.bank !== '' || det.atasnama !== '' || det.norek !== '' ){
                    if(det.bank == ''){
                        setErrBankName(i18n.t('Bank')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.atasnama == ''){
                        setErrBankAtasNama(i18n.t('label_ACCOUNT_NAME')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.norek == ''){
                        setErrBankNorek(i18n.t('label_NUMBER_ACCOUNT')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                }
            }
        }

        if(SelVendorCategory == ''){
            setErrSelVendorCategory(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelBadanUsaha == ''){
            setErrSelBadanUsaha(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputNama == ''){
            setErrInputNama(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputAlias == ''){
            setErrInputAlias(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputNpwp == ''){
            setErrInputNpwp(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputAddress == ''){
            setErrInputAddress(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelProvince == ''){
            setErrSelProvince(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelCity == ''){
            setErrSelCity(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelDistrict == ''){
            setErrSelDistrict(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelKodePos == ''){
            setErrSelKodePos(i18n.t('label_REQUIRED'));
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
            obj.idvendorcategory = SelVendorCategory;
            obj.code = "";
            obj.jenisbadanusaha = SelBadanUsaha;
            obj.nama = InputNama;
            obj.alias = InputAlias;
            obj.npwp = InputNpwp;
            obj.address = InputAddress;
            obj.alamat2 = InputAlamat2;
            obj.alamat3 = InputAlamat3;
            obj.provinsi = SelProvince;
            obj.kota = SelCity;
            obj.district = SelDistrict;
            obj.kodepos = SelKodePos;
            obj.isactive = InputIsActive;
            obj.detailsbank = InputListBank;

            let listinfocontact =[];
            if(InputListInfoContact.length > 0){
                for(let i=0; i < InputListInfoContact.length; i++){
                    let det = InputListInfoContact[i];
                    let listnotelpinfocontact = '';
                    let count =0;
                    for(let j=0; j < det.nocontacthp.length; j++){
                        let no = det.nocontacthp[j].contacthp;
                        count++;
                        if(no != ''){
                            if(count == det.nocontacthp.length){
                                listnotelpinfocontact += no;
                            }else{
                                listnotelpinfocontact += no+',';
                            }
                        }
                    }

                    let objinfocontact = new Object();
                        objinfocontact.panggilan = det.panggilan;
                        objinfocontact.namakontak = det.namakontak;
                        objinfocontact.nocontacthp = listnotelpinfocontact;
                        objinfocontact.email = det.email;
                        objinfocontact.contactofficenumber = det.contactofficenumber;
                        objinfocontact.extention = det.extention;
                        listinfocontact.push(objinfocontact);
                }
            }
            obj.detailscontact = listinfocontact;
            dispatch(actions.submitAddVendor('',obj,succesHandlerSubmit, errorHandler));
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

    const handleInputChangeBank = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        // if(name == 'norek'){
        //     if(isNaN(value) && value !== ''){
        //         flag = false;
        //     }
        // }
        if(flag){
            const list = [...InputListBank];
            list[index][name] = value;
            setInputListBank(list);
        }
        
    };
    const handleRemoveClickBank = index => {
        const list = [...InputListBank];
        list.splice(index, 1);
        setInputListBank(list);
    };
    const handleAddClickBank = () => {
        setInputListBank([...InputListBank, { norek:"",atasnama: "",bank:""}]);
    };

    const handleInputDropDownChangeContact = (e, index,name) => {
        const list = [...InputListInfoContact];
        list[index][name] = e.value;
        setInputListInfoContact(list);
    };

    const handleInputChangeContact = (e, index) => {
        const { name, value } = e.target;
        const list = [...InputListInfoContact];
        list[index][name] = value;
        setInputListInfoContact(list);
    };

    const handleRemoveClickContact = index => {
        const list = [...InputListInfoContact];
        list.splice(index, 1);
        setInputListInfoContact(list);
    };
    const handleAddClickContact = () => {
        setInputListInfoContact([...InputListInfoContact, { panggilan:"",namakontak: "",nocontacthp:[{contacthp:""}],email:"", contactofficenumber: "",extention:""}]);
    };

    const handleAddClickListContactHp = (paramparent,indexparent) => {
        const list = [...InputListInfoContact];
        const listval = [...list[indexparent][paramparent], { contacthp: ""}];
        list[indexparent][paramparent] = listval;
        setInputListInfoContact(list);
    };

    const handleRemoveClickListContactHp = (paramparent,indexparent,index) => {
        const list = [...InputListInfoContact];
        const listval = [...list[indexparent][paramparent]];
        listval.splice(index, 1);
        list[indexparent][paramparent] = listval;
        setInputListInfoContact(list);
    };

    const handleInputChangeListContactHp = (e, paramparent,indexparent,indexchild) => {
        // let paramlist = 'listnotelepon';
        const { name, value } = e.target;
        const list = [...InputListInfoContact];
        const listnotelp = list[indexparent][paramparent];
        listnotelp[indexchild][name] = value;
        list[indexparent][paramparent] = listnotelp;
        setInputListInfoContact(list);
    };

    return (
        <Formik
        initialValues={
            {
                vendorcategory:SelVendorCategory,
                badanusaha:SelBadanUsaha,
                nama:InputNama,
                alias:InputAlias,
                npwp:InputNpwp,
                address:InputAddress,
                alamat2:InputAlamat2,
                alamat3:InputAlamat3,
                provinsi:SelProvince,
                district:SelDistrict,
                city:SelCity,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddBankAccount">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addvendor} label={'label_ADD_VENDOR'} labeldefault={'Add Vendor'} />

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">

                            <label className="mt-3 form-label required" htmlFor="vendorcategory">
                                {i18n.t('label_CATEGORY')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="vendorcategory"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeVendorCategory(val)}
                                onBlur={val => setFieldTouched("vendorcategory", val?.value ? val.value : '')}
                                data={ListVendorCategory}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.vendorcategory}
                            />
                            <div className="invalid-feedback-custom">{ErrSelVendorCategory}</div>

                            <label className="mt-3 form-label required" htmlFor="badanusaha">
                                {i18n.t('PT / CV')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="badanusaha"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeJenisBadanUsaha(val)}
                                onBlur={val => setFieldTouched("badanusaha", val?.value ? val.value : '')}
                                data={ListBadanUsaha}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.badanusaha}
                            />
                            <div className="invalid-feedback-custom">{ErrSelBadanUsaha}</div>

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
                                onChange={val => handleInputNama(val)}
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
                                onChange={val => handleInputAlias(val)}
                                onBlur={handleBlur}
                                value={values.alias}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAlias}</div>

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
                                // mask="99.999.999.9-999.999"
                                // tag={InputMask}
                                maxLength={40}
                                onChange={val => handleInputNpwp(val)}
                                onBlur={handleBlur}
                                value={values.npwp}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNpwp}</div>

                            
                            
                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            
                            <label className="mt-3 form-label required" htmlFor="provinsi">
                                {i18n.t('label_PROVINCE')}
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
                                data={ListProvince}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.provinsi}
                            />
                            <div className="invalid-feedback-custom">{ErrSelProvince}</div>

                            <label className="mt-3 form-label required" htmlFor="city">
                                {i18n.t('label_CITY')}
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

                            <label className="mt-3 form-label required" htmlFor="district">
                                {i18n.t('Kecamatan')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="district"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeDistrict(val)}
                                onBlur={val => setFieldTouched("district", val?.value ? val.value : '')}
                                data={ListDistrict}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.district}
                            />
                            <div className="invalid-feedback-custom">{ErrSelDistrict}</div>

                            <label className="mt-3 form-label required" htmlFor="kodepos">
                                {i18n.t('label_POSTAL_CODE')}
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

                            <label className="mt-3 form-label required" htmlFor="address">
                                {i18n.t('label_ADDRESS')+' 1'}
                                <span style={{color:'red'}}>*</span>
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

                            <label className="mt-3 form-label required" htmlFor="alamat2">
                            {i18n.t('label_ADDRESS')+' 2'}
                            </label>
                            <Input
                                    name="alamat2"
                                    type="text"
                                    id="alamat2"
                                    onChange={val => handleInputAlamat2(val)}
                                    onBlur={handleBlur}
                                    value={values.alamat2}
                                    disabled={false}
                            />


                            <label className="mt-3 form-label required" htmlFor="alamat3">
                            {i18n.t('label_ADDRESS')+' 3'}
                            </label>
                            <Input
                                    name="alamat3"
                                    type="text"
                                    id="alamat3"
                                    onChange={val => handleInputAlamat3(val)}
                                    onBlur={handleBlur}
                                    value={values.alamat3}
                                    disabled={false}
                            />


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

                            <div style={{marginTop:'0px'}}><h3>{i18n.t('Bank')}</h3></div>
                            <div className="invalid-feedback-custom">{ErrBankName}</div>
                            <div className="invalid-feedback-custom">{ErrBankAtasNama}</div>
                            <div className="invalid-feedback-custom">{ErrBankNorek}</div>
                            {
                                InputListBank.length == 0?'':
                                <table id="tablegrid">
                                    <tr>
                                        <th>{i18n.t('Bank')}</th>
                                        <th>{i18n.t('label_ACCOUNT_NAME')}</th>
                                        <th>{i18n.t('label_NUMBER_ACCOUNT')}</th>
                                        <th>{i18n.t('Action')}</th>
                                    </tr>
                                    <tbody>
                                        {
                                            InputListBank.map((x, i) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                        <Input
                                                            name="bank"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="bank"
                                                            onChange={val => handleInputChangeBank(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.bank}
                                                            disabled={false}
                                                        />
                                                        </td>
                                                        
                                                        <td>
                                                        <Input
                                                            name="atasnama"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="atasnama"
                                                            onChange={val => handleInputChangeBank(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.atasnama}
                                                            disabled={false}
                                                        />
                                                        </td>

                                                        <td>
                                                        <Input
                                                            name="norek"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="norek"
                                                            onChange={val => handleInputChangeBank(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.norek}
                                                            disabled={false}
                                                        />
                                                        </td>

                                                        <td>
                                                            <IconButton color={'primary'} hidden={i > 0}
                                                                onClick={() => handleAddClickBank()}
                                                            // hidden={showplusdebit}
                                                            >
                                                                <AddIcon style={{ fontSize: 18 }}/>
                                                            </IconButton>
                                                            <IconButton color={'primary'} hidden={i == 0}
                                                            onClick={() => handleRemoveClickBank(i)}
                                                            // hidden={showplusdebit}
                                                            >
                                                                <RemoveIcon style={{ fontSize: 18 }}/>
                                                            </IconButton>    
                                                            </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            }

                            <div style={{marginTop:'50px'}}><h3>{i18n.t('label_CONTACT_INFORMATION')}</h3></div>
                            <div className="invalid-feedback-custom">{ErrPanggilan}</div>
                            <div className="invalid-feedback-custom">{ErrNamaKontak}</div>
                            <div className="invalid-feedback-custom">{ErrNoContactHp}</div>
                            <div className="invalid-feedback-custom">{ErrEmail}</div>
                            <div className="invalid-feedback-custom">{ErrContactOfficeNumber}</div>
                            <div className="invalid-feedback-custom">{ErrExtention}</div>
                            {
                                InputListInfoContact.length == 0?'':
                                <table id="tablegrid">
                                    <tbody>
                                    <tr>
                                        <th>{i18n.t('Bapak/Ibu')}</th>
                                        <th>{i18n.t('label_CONTACT_NAME')}</th>
                                        <th>{i18n.t('label_CONTACT_NUMBER')}</th>
                                        <th>{i18n.t('Email')}</th>
                                        <th>{i18n.t('label_PHONE_OFFICE')}</th>
                                        <th>{i18n.t('Extention')}</th>
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
                                                            
                                                            onChange={val => handleInputDropDownChangeContact(val,i,'panggilan')}
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
                                                            onChange={val => handleInputChangeContact(val,i)}
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
                                                        <tbody>
                                                            {
                                                                x.nocontacthp.map((y, j) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                            <Input
                                                                            name="contacthp"
                                                                            // className={
                                                                            //     touched.amount && errors.amount
                                                                            //         ? "w-50 input-error"
                                                                            //         : "w-50"
                                                                            // }
                                                                            type="text"
                                                                            id="contacthp"
                                                                            onChange={val => handleInputChangeListContactHp(val,'nocontacthp',i,j)}
                                                                            onBlur={handleBlur}
                                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                                            // style={{width: '70%'}}
                                                                            // value={values.amount}
                                                                            value={y.contacthp}
                                                                            disabled={false}
                                                                            />
                                                                            </td>
                                                                            <td hidden={j > 0}>
                                                                            <IconButton color={'primary'} hidden={j > 0}
                                                                                onClick={() => handleAddClickListContactHp('nocontacthp',i)}
                                                                            // hidden={showplusdebit}
                                                                            >
                                                                                <AddIcon style={{ fontSize: 18 }}/>
                                                                            </IconButton>
                                                                            </td>
                                                                            <td hidden={j == 0}>
                                                                            <IconButton color={'primary'} hidden={j == 0}
                                                                            onClick={() => handleRemoveClickListContactHp('nocontacthp',i,j)}
                                                                            // hidden={showplusdebit}
                                                                            >
                                                                                <RemoveIcon style={{ fontSize: 18 }}/>
                                                                            </IconButton>    
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
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
                                                            onChange={val => handleInputChangeContact(val,i)}
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
                                                            name="contactofficenumber"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="contactofficenumber"
                                                            onChange={val => handleInputChangeContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.contactofficenumber}
                                                            disabled={false}
                                                            />
                                                    </td>

                                                    <td>
                                                        <Input
                                                            name="extention"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="extention"
                                                            onChange={val => handleInputChangeContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.extention}
                                                            disabled={false}
                                                            />
                                                    </td>

                                                    <td>
                                                        <IconButton color={'primary'} hidden={i > 0}
                                                            onClick={() => handleAddClickContact()}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <AddIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        <IconButton color={'primary'} hidden={i == 0}
                                                        onClick={() => handleRemoveClickContact(i)}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <RemoveIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>    
                                                        </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            }

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