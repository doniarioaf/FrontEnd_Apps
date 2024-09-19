import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import DragDrop                     from '../../../components/DragDrops/DragDrop';
// import {Input,Button,FormGroup,Label} from 'reactstrap';
import {Input,Button,Label,FormGroup,Container} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize,isGetPermissions } from '../../shared/globalFunc';
import { addEmployeeManggala_Permission,readSalaryEmployeeManggala_Permission,createSalaryEmployeeManggala_Permission,editSalaryEmployeeManggala_Permission } from '../../shared/permissionMenu';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker}      from 'react-widgets';

import * as pathmenu           from '../../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';
import '../../CSS/table.css';
import { numToMoney } from '../../shared/globalFunc';
import { formatdate } from '../../shared/constantValue';

export default function AddEmployeeManggala(props) {
    reloadToHomeNotAuthorize(addEmployeeManggala_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ListStatusKaryawan, setListStatusKaryawan] = useState([]);
    const [SelStatusKaryawan, setSelStatusKaryawan] = useState('');
    const [ErrSelStatusKaryawan, setErrSelStatusKaryawan] = useState('');

    const [ListJabatan, setListJabatan] = useState([]);
    const [SelJabatan, setSelJabatan] = useState('');
    const [ErrSelJabatan, setErrSelJabatan] = useState('');

    const [InputName, setInputName] = useState('');
    const [ErrInputName, setErrInputName] = useState('');

    const [InputNoIdentitas, setInputNoIdentitas] = useState('');
    const [ErrInputNoIdentitas, setErrInputNoIdentitas] = useState('');

    const [InputAlamat, setInputAlamat] = useState('');
    const [ErrInputAlamat, setErrInputAlamat] = useState('');
    const [InputAlamat2, setInputAlamat2] = useState('');
    const [InputAlamat3, setInputAlamat3] = useState('');

    const [InputTanggalLahir, setInputTanggalLahir] = useState(new Date());
    const [ErrInputTanggalLahir, setErrInputTanggalLahir] = useState('');

    const [ListStatus, setListStatus] = useState([]);
    const [SelStatus, setSelStatus] = useState('');
    const [ErrSelStatus, setErrSelStatus] = useState('');

    const [ListJenisKelamin, setListJenisKelamin] = useState([]);
    const [SelJenisKelamin, setSelJenisKelamin] = useState('');
    const [ErrSelJenisKelamin, setErrSelJenisKelamin] = useState('');

    const [InputNamePasangan, setInputNamePasangan] = useState('');
    const [ErrInputNamePasangan, setErrInputNamePasangan] = useState('');

    const [InputTanggalLahirPasangan, setInputTanggalLahirPasangan] = useState(new Date());
    const [ErrInputTanggalLahirPasangan, setErrInputTanggalLahirPasangan] = useState('');


    const [InputBank, setInputBank] = useState('');
    const [ErrInputBank, setErrInputBank] = useState('');

    const [InputNoRek, setInputNoRek] = useState('');
    const [ErrInputNoRek, setErrInputNoRek] = useState('');

    const [InputAtasNama, setInputAtasNama] = useState('');
    const [ErrInputAtasNama, setErrInputAtasNama] = useState('');

    const [InputGaji, setInputGaji] = useState('');
    const [ErrInputGaji, setErrInputGaji] = useState('');

    const [InputTanggalMulai, setInputTanggalMulai] = useState(new Date());
    const [ErrInputTanggalMulai, setErrInputTanggalMulai] = useState('');

    const [InputTanggalResign, setInputTanggalResign] = useState(null);

    const [InputIsActive, setInputIsActive] = useState(true);

    const [DataTemplate, setDataTemplate] = useState([]);

    const [InputListInfoFamily, setInputListInfoFamily] = useState([{ namaanak:"",tanggallahir: new Date(),jeniskelamin:"",status:""}]);
    const [ErrInfoFamilyNamaAnak, setErrInfoFamilyNamaAnak] = useState('');
    const [ErrInfoFamilyJenisKelamin, setErrInfoFamilyJenisKelamin] = useState('');
    const [ErrInfoFamilyStatus, setErrInfoFamilyStatus] = useState('');
    const [ErrInfoFamilyTanggalLahir, setErrInfoFamilyTanggalLahir] = useState('');


    const [documents, setDocuments] = useState({
        mainpicture: null,
        count: 0,
    });

    const flagEditCreate = isGetPermissions(createSalaryEmployeeManggala_Permission,'TRANSACTION') || isGetPermissions(editSalaryEmployeeManggala_Permission,'TRANSACTION');
    const flagRead = isGetPermissions(readSalaryEmployeeManggala_Permission,'READ')

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getEmployeeManggalaData('/template',successHandlerTemplate, errorHandler));
    }, []);

    const successHandlerTemplate = (data) =>{
        if(data.data){
            setDataTemplate(data.data);

            setListStatusKaryawan(data.data.statusKaryawanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListJabatan(data.data.jabatanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListStatus(data.data.statusOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListJenisKelamin(data.data.jeniskelaminOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            
        }

        setLoading(false);
    }

        const cekAksesGaji = (action) =>{
            let flag = false;

            if(action == 'IS_HIDE'){
                if(flagEditCreate){
                    flag = false;
                }else if(flagRead){
                    flag = false;
                }else{
                    flag = true;
                }
            }
            
            if(action == 'IS_ONLY_READ'){
                if(flagEditCreate){
                    flag = false;
                }else if(flagRead){
                    flag = true;
                }else{
                    flag = true;
                }
            }
            
            return flag;
        }
        const handleChangeStatusKaryawan = (data) =>{
            let id = data?.value ? data.value : '';
            setSelStatusKaryawan(id);
        }

        const handleChangeJabatan = (data) =>{
            let id = data?.value ? data.value : '';
            setSelJabatan(id);
        }
        const handleChangeStatus = (data) =>{
            let id = data?.value ? data.value : '';
            setSelStatus(id);
        }

        const handleChangeJenisKelamin = (data) =>{
            let id = data?.value ? data.value : '';
            setSelJenisKelamin(id);
        }

        const handleInputNama = (data) =>{
            let val = data.target.value;
            setInputName(val)
        }
        const handleInputNamaPasangan = (data) =>{
            let val = data.target.value;
            setInputNamePasangan(val)
        }

        const handleInputNoIdentitas = (data) =>{
            let val = data.target.value;
            setInputNoIdentitas(val);
            // if(val == ''){
            //     setInputNoIdentitas('');
            // }else if(!isNaN(val)){
            //     setInputNoIdentitas(val)
            // }
            // setInputNoIdentitas(val)
        }

        const handleInputAlamat = (data) =>{
            let val = data.target.value;
            setInputAlamat(val)
        }

        const handleInputAlamat2 = (data) =>{
            let val = data.target.value;
            setInputAlamat2(val)
        }
    
        const handleInputAlamat3 = (data) =>{
            let val = data.target.value;
            setInputAlamat3(val)
        }

        const handleTanggalLahir = (data) =>{
            if(data !== null){
                setInputTanggalLahir(moment(data, formatdate).toDate());
            }else{
                setInputTanggalLahir(null)
            }
        }

        const handleTanggalLahirPasangan = (data) =>{
            if(data !== null){
                setInputTanggalLahirPasangan(moment(data, formatdate).toDate())
            }else{
                setInputTanggalLahirPasangan(null)
            }
        }
        const handleInputNamaBank = (data) =>{
            let val = data.target.value;
            setInputBank(val)
        }
        const handleInputNorek = (data) =>{
            let val = data.target.value;
            setInputNoRek(val);
            // if(val == ''){
            //     setInputNoRek('');
            // }else if(!isNaN(val)){
            //     setInputNoRek(val);
            // }
            
        }
        const handleInputAtasNama = (data) =>{
            let val = data.target.value;
            setInputAtasNama(val)
        }
        const handleTanggalMulai = (data) =>{
            if(data !== null){
                setInputTanggalMulai(moment(data, formatdate).toDate())
            }else{
                setInputTanggalMulai(null)
            }
        }
        const handleTanggalResign = (data) =>{
            if(data !== null){
                setInputTanggalResign(moment(data, formatdate).toDate())
            }else{
                setInputTanggalResign(null)
            }            
        }
        const handleInputGaji = (data) =>{
            let val = data.target.value;
            val = new String(val).replaceAll('.','');
            setInputGaji(val)
        }
        const handleChangeIsActive = (data) =>{
            setInputIsActive(data.target.checked);
        }

        const checkColumnMandatory = () => {
            let flag = true;
            setErrSelStatusKaryawan('');
            setErrSelJabatan('');
            setErrInputName('');
            // setErrInputNoIdentitas('');
            // setErrInputAlamat('');
            setErrSelStatus('');
            // setErrInputNamePasangan('');
            // setErrInputBank('');
            // setErrInputNoRek('');
            // setErrInputAtasNama('');
            // setErrInputGaji('');
            setErrSelJenisKelamin('');

            // setErrInfoFamilyNamaAnak('');
            // setErrInfoFamilyJenisKelamin('');
            // setErrInfoFamilyStatus('');

            // setErrInputTanggalLahir('');
            // setErrInputTanggalLahirPasangan('');
            // setErrInputTanggalMulai('');
            // setErrInfoFamilyTanggalLahir('');
            
            // if(InputListInfoFamily.length > 0){
            //     for(let i=0; i < InputListInfoFamily.length; i++){
            //         let det = InputListInfoFamily[i];
            //         if(det.namaanak !== '' || det.jeniskelamin !== '' || det.status !== '' ){
            //             if(det.namaanak == ''){
            //                 setErrInfoFamilyNamaAnak(i18n.t('label_CHILD_NAME')+' '+i18n.t('label_REQUIRED'));
            //                 flag = false;
            //             }

            //             if(det.jeniskelamin == ''){
            //                 setErrInfoFamilyJenisKelamin(i18n.t('label_GENDER')+' '+i18n.t('label_REQUIRED'));
            //                 flag = false;
            //             }

            //             if(det.status == ''){
            //                 setErrInfoFamilyStatus('Status '+i18n.t('label_REQUIRED'));
            //                 flag = false;
            //             }

            //             if(det.tanggallahir == null){
            //                 setErrInfoFamilyTanggalLahir(i18n.t('label_DATE_OF_BIRTH')+' '+i18n.t('label_REQUIRED'));
            //                 flag = false;
            //             }
            //         }
            //     }
            // }

            // if(InputTanggalLahir == null){
            //     setErrInputTanggalLahir(i18n.t('label_REQUIRED'));
            //     flag = false;
            // }

            // if(InputTanggalMulai == null){
            //     setErrInputTanggalMulai(i18n.t('label_REQUIRED'));
            //     flag = false;
            // }

            if(SelStatusKaryawan == ''){
                setErrSelStatusKaryawan(i18n.t('label_REQUIRED'));
                flag = false;
            }

            if(SelJabatan == ''){
                setErrSelJabatan(i18n.t('label_REQUIRED'));
                flag = false;
            }

            if(InputName == ''){
                setErrInputName(i18n.t('label_REQUIRED'));
                flag = false;
            }

            // if(InputNoIdentitas == ''){
            //     setErrInputNoIdentitas(i18n.t('label_REQUIRED'));
            //     flag = false;
            // }

            // if(InputAlamat == ''){
            //     setErrInputAlamat(i18n.t('label_REQUIRED'));
            //     flag = false;
            // }

            if(SelStatus == ''){
                setErrSelStatus(i18n.t('label_REQUIRED'));
                flag = false;
            }
            // else{
            //     if(SelStatus == 'MENIKAH'){
            //         if(InputNamePasangan == ''){
            //             setErrInputNamePasangan(i18n.t('label_REQUIRED'));
            //             flag = false;
            //         }

            //         if(InputTanggalLahirPasangan == null){
            //             setErrInputTanggalLahirPasangan(i18n.t('label_REQUIRED'));
            //             flag = false;
            //         }
                    
            //     }
            // }
            // if(InputBank == ''){
            //     setErrInputBank(i18n.t('label_REQUIRED'));
            //     flag = false;
            // }
            // if(InputNoRek == ''){
            //     setErrInputNoRek(i18n.t('label_REQUIRED'));
            //     flag = false;
            // }

            // if(InputAtasNama == ''){
            //     setErrInputAtasNama(i18n.t('label_REQUIRED'));
            //     flag = false;
            // }

            // if(!cekAksesGaji('IS_ONLY_READ')){
            //     if(InputGaji == ''){
            //         setErrInputGaji(i18n.t('label_REQUIRED'));
            //         flag = false;
            //     }    
            // }
            if(SelJenisKelamin == ''){
                setErrSelJenisKelamin(i18n.t('label_REQUIRED'));
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
                obj.statuskaryawan = SelStatusKaryawan;
                obj.jabatan = SelJabatan;
                obj.nama = InputName;
                obj.noidentitas = InputNoIdentitas;
                obj.alamat = InputAlamat;
                obj.alamat2 = InputAlamat2;
                obj.alamat3 = InputAlamat3;
                obj.tanggallahir = moment(InputTanggalLahir).toDate().getTime();
                obj.status = SelStatus;
                if(SelStatus == 'MENIKAH'){
                    obj.namapasangan = InputNamePasangan;
                    obj.tanggallahirpasangan = InputTanggalLahirPasangan !== null?moment(InputTanggalLahirPasangan).toDate().getTime():null;
                }else{
                    obj.namapasangan = '';
                    obj.tanggallahirpasangan = null;
                }
                
                obj.namabank = InputBank;
                obj.norekening = InputNoRek;
                obj.atasnama = InputAtasNama;
                obj.tanggalmulai = moment(InputTanggalMulai).toDate().getTime();
                obj.tanggalresign = InputTanggalResign !== null?moment(InputTanggalResign).toDate().getTime():null;

                obj.gaji = new String(InputGaji).replaceAll('.','');
                obj.jeniskelamin = SelJenisKelamin;
                obj.isactive = InputIsActive;

                let listinfofamily =[];
                if(InputListInfoFamily.length > 0){
                    for(let i=0; i < InputListInfoFamily.length; i++){
                        let det = InputListInfoFamily[i];
                        
                        if(det.namaanak !== '' && det.jeniskelamin !== '' && det.status !== '' && det.tanggallahir !== null){
                            let objinfofamily = new Object();
                            objinfofamily.namaanak = det.namaanak;
                            objinfofamily.tanggallahir = moment(det.tanggallahir).toDate().getTime();
                            objinfofamily.jeniskelamin = det.jeniskelamin;
                            objinfofamily.status = det.status;
                            listinfofamily.push(objinfofamily);
                        }
                       
                    }
                }
                obj.detailsInfoFamily = listinfofamily;
                dispatch(actions.submitAddEmployeeManggalaData('',obj,succesHandlerSubmit, errorHandler));

            }
        }

        const succesHandlerSubmit = (data) => {
            if(documents.mainpicture !== null && documents.mainpicture !== undefined && documents.mainpicture !== ''){
                setLoading(true);
                let formData = new FormData();
                formData.append("file", documents.mainpicture);
                dispatch(actions.submitAddEmployeeManggalaData('/uploadimage/'+data.data,formData,succesHandlerUploadImage, errorHandler));
            }else{
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
            
        }

        const succesHandlerUploadImage = (data) => {
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

        const handleDatePickerChange = (value,index,name) =>{
            const list = [...InputListInfoFamily];
            list[index][name] = value;
            setInputListInfoFamily(list);
        }
    

        const handleInputChange = (e, index) => {
            const { name, value } = e.target;
            const list = [...InputListInfoFamily];
            list[index][name] = value;
            setInputListInfoFamily(list);
        };

        const handleInputDropDownChange = (e, index,name) => {
            const list = [...InputListInfoFamily];
            list[index][name] = e.value;
            setInputListInfoFamily(list);
        };

        const handleRemoveClick = index => {
            const list = [...InputListInfoFamily];
            list.splice(index, 1);
            setInputListInfoFamily(list);
        };

        const handleAddClick = () => {
            setInputListInfoFamily([...InputListInfoFamily, { namaanak:"",tanggallahir: new Date(),jeniskelamin:"",status:""}]);
        };

        const imageHandle = (name, file, theCount) => {
            setDocuments(prevDoc => ({
                ...prevDoc,
                [name]: file,
                count: prevDoc.count + theCount
            }));
        }

        const handleRemove = (thePath,type) => {
            if(type === 'mainpicture'){
                // setMainPicture(true);
                setDocuments({
                    mainpicture : null
                });
            }
    
        }

        const img = {
            width: "50%",
            height: "50%"
        };

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
                    statuskaryawan:SelStatusKaryawan,
                    jabatan:SelJabatan,
                    nama:InputName,
                    noidentitas:InputNoIdentitas,
                    alamat:InputAlamat,
                    alamat2:InputAlamat2,
                    alamat3:InputAlamat3,
                    tanggallahir:InputTanggalLahir,
                    status:SelStatus,
                    namapasangan:InputNamePasangan,
                    tanggallahirpasangan:InputTanggalLahirPasangan,
                    bank:InputBank,
                    norek:InputNoRek,
                    atasnama:InputAtasNama,
                    tanggalmulai:InputTanggalMulai,
                    tanggalresign:InputTanggalResign,
                    gaji:new String(InputGaji).replaceAll('.',''),
                    jeniskelamin:SelJenisKelamin,
                    isactive:InputIsActive,
                    mainpicture:documents.mainpicture
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
                            <form className="mb-6" onSubmit={handleSubmit}  name="FormAddEmployeeManggala">
                                <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.addemployeeManggala} label={'Add Employee'} labeldefault={'Add Employee'} />
                                
                                <div className="row mt-2">
                                
                                <div className="mt-2 col-lg-6 ft-detail mb-5">
                                <label className="mt-3 form-label required" htmlFor="statuskaryawan">
                                {'Status '+i18n.t('label_EMPLOYEE')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="statuskaryawan"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeStatusKaryawan(val)}
                                    onBlur={val => setFieldTouched("statuskaryawan", val?.value ? val.value : '')}
                                    data={ListStatusKaryawan}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.statuskaryawan}
                                />
                                <div className="invalid-feedback-custom">{ErrSelStatusKaryawan}</div>

                                <label className="mt-3 form-label required" htmlFor="jabatan">
                                {i18n.t('label_POSITION')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="jabatan"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeJabatan(val)}
                                    onBlur={val => setFieldTouched("jabatan", val?.value ? val.value : '')}
                                    data={ListJabatan}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.jabatan}
                                />
                                <div className="invalid-feedback-custom">{ErrSelJabatan}</div>

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
                                <div className="invalid-feedback-custom">{ErrInputName}</div>

                                <label className="mt-3 form-label required" htmlFor="status">
                                {i18n.t('label_GENDER')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="jeniskelamin"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeJenisKelamin(val)}
                                    onBlur={val => setFieldTouched("jeniskelamin", val?.value ? val.value : '')}
                                    data={ListJenisKelamin}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.jeniskelamin}
                                />
                                <div className="invalid-feedback-custom">{ErrSelJenisKelamin}</div>

                                <div hidden={cekAksesGaji('IS_HIDE')}>
                                <label className="mt-3 form-label required" htmlFor="gaji">
                                {i18n.t('label_SALARY')}
                                {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <Input
                                    name="gaji"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    maxLength={20}
                                    type="text"
                                    id="gaji"
                                    disabled={cekAksesGaji('IS_ONLY_READ')}
                                    onChange={val => handleInputGaji(val)}
                                    onBlur={handleBlur}
                                    value={values.gaji !== ''?numToMoney(parseFloat(values.gaji)):''}
                                />
                                <div className="invalid-feedback-custom">{ErrInputGaji}</div>
                                </div>

                                

                                <label className="mt-3 form-label required" htmlFor="noidentitas">
                                {i18n.t('label_NUMBER_IDENTITY')}
                                {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <Input
                                    name="noidentitas"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="noidentitas"
                                    maxLength={30}
                                    onChange={val => handleInputNoIdentitas(val)}
                                    onBlur={handleBlur}
                                    value={values.noidentitas}
                                />
                                <div className="invalid-feedback-custom">{ErrInputNoIdentitas}</div>

                                <label className="mt-3 form-label required" htmlFor="tanggallahir">
                                    {i18n.t('label_DATE_OF_BIRTH')}
                                    {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <DatePicker
                                        name="tanggallahir"
                                        // onChange={(val) => {
                                        //         setFieldValue("startdate", val);
                                        //     }
                                        // }
                                        onChange={val => handleTanggalLahir(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={formatdate}
                                        value={values.tanggallahir}
                                        // style={{width: '25%'}}
                                        // disabled={ values.allmember}                                    
                                />
                                <div className="invalid-feedback-custom">{ErrInputTanggalLahir}</div>

                                <label className="mt-3 form-label required" htmlFor="alamat">
                                {i18n.t('label_ADDRESS')+' 1'}
                                {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <Input
                                    name="alamat"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="alamat"
                                    maxLength={255}
                                    onChange={val => handleInputAlamat(val)}
                                    onBlur={handleBlur}
                                    value={values.alamat}
                                />
                                <div className="invalid-feedback-custom">{ErrInputAlamat}</div>

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

                                </div>

                                <div className="mt-2 col-lg-6 ft-detail mb-5">
                                <label className="mt-3 form-label required" htmlFor="status">
                                {i18n.t('Status')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="status"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeStatus(val)}
                                    onBlur={val => setFieldTouched("status", val?.value ? val.value : '')}
                                    data={ListStatus}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.status}
                                />
                                <div className="invalid-feedback-custom">{ErrSelStatus}</div>

                                <div hidden={ !(values.status == 'MENIKAH')}>
                                <label className="mt-3 form-label required" htmlFor="namapasangan">
                                {i18n.t('label_COUPLE_NAME')}
                                {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <Input
                                    name="namapasangan"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    maxLength={200}
                                    id="namapasangan"
                                    onChange={val => handleInputNamaPasangan(val)}
                                    onBlur={handleBlur}
                                    value={values.namapasangan}
                                />
                                <div className="invalid-feedback-custom">{ErrInputNamePasangan}</div>

                                <label className="mt-3 form-label required" htmlFor="tanggallahirpasangan">
                                    {i18n.t('label_COUPLE_BIRTH_DATE')}
                                    {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <DatePicker
                                        name="tanggallahirpasangan"
                                        // onChange={(val) => {
                                        //         setFieldValue("startdate", val);
                                        //     }
                                        // }
                                        onChange={val => handleTanggalLahirPasangan(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={formatdate}
                                        value={values.tanggallahirpasangan}
                                        
                                        // style={{width: '25%'}}
                                        // disabled={ values.allmember}                                    
                                />
                                <div className="invalid-feedback-custom">{ErrInputTanggalLahirPasangan}</div>
                                </div>

                                <label className="mt-3 form-label required" htmlFor="bank">
                                {i18n.t('Bank')}
                                {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <Input
                                    name="bank"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="bank"
                                    maxLength={100}
                                    onChange={val => handleInputNamaBank(val)}
                                    onBlur={handleBlur}
                                    value={values.bank}
                                />
                                <div className="invalid-feedback-custom">{ErrInputBank}</div>

                                <label className="mt-3 form-label required" htmlFor="norek">
                                {i18n.t('label_NUMBER_ACCOUNT')}
                                {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <Input
                                    name="norek"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="norek"
                                    maxLength={30}
                                    onChange={val => handleInputNorek(val)}
                                    onBlur={handleBlur}
                                    value={values.norek}
                                />
                                <div className="invalid-feedback-custom">{ErrInputNoRek}</div>

                                <label className="mt-3 form-label required" htmlFor="atasnama">
                                {i18n.t('label_ON_BEHALF_OF')}
                                {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <Input
                                    name="atasnama"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="atasnama"
                                    maxLength={200}
                                    onChange={val => handleInputAtasNama(val)}
                                    onBlur={handleBlur}
                                    value={values.atasnama}
                                />
                                <div className="invalid-feedback-custom">{ErrInputAtasNama}</div>

                                <label className="mt-3 form-label required" htmlFor="tanggalmulai">
                                    {i18n.t('label_START_DATE')}
                                    {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <DatePicker
                                        name="tanggalmulai"
                                        // onChange={(val) => {
                                        //         setFieldValue("startdate", val);
                                        //     }
                                        // }
                                        onChange={val => handleTanggalMulai(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={formatdate}
                                        value={values.tanggalmulai}
                                        // style={{width: '25%'}}
                                        // disabled={ values.allmember}                                    
                                />
                                <div className="invalid-feedback-custom">{ErrInputTanggalMulai}</div>

                                <label className="mt-3 form-label required" htmlFor="tanggalresign">
                                    {i18n.t('label_RESIGN_DATE')}
                                    {/* <span style={{color:'red'}}>*</span> */}
                                </label>
                                <DatePicker
                                        name="tanggalresign"
                                        // onChange={(val) => {
                                        //         setFieldValue("startdate", val);
                                        //     }
                                        // }
                                        onChange={val => handleTanggalResign(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={formatdate}
                                        value={values.tanggalresign}
                                        // style={{width: '25%'}}
                                        // disabled={ values.allmember}                                    
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

                                
                                <label className="mt-3 form-label required" htmlFor="tanggalresign">
                                    {i18n.t('Foto')}
                                </label>

                                {
                                    values.mainpicture == null ? (
                                        <Container className="container-md">
                                        {/* <p className="lead text-center required">{i18n.t('member.data-add.UPLOAD_PHOTO')}</p> */}
                                        <DragDrop page="promotionmanagement" name="mainpicture"  setPhotos={imageHandle} acceptFileTypes={'image/jpeg, image/png'}/>
                                        {/* <div className="invalid-feedback-custom" style={{textAlign:"center"}}>{ErrMainPicture}</div> */}
                                        </Container>
                                    ):(
                                        <div key={"keymainpicture"} className="mb-3 center-parent">
                                            <img src={values.mainpicture.preview} style={img} alt="File Preview"/>
                                            <Button  close style={{position: 'relative', left: 20, float: 'none'}}
                                                onClick={() => handleRemove(values.mainpicture.path,'mainpicture')} > X </Button>
                                        </div>
                                    )
                                }
                                
                                
                                </div>

                                </div>

                                <div style={{marginTop:'0px'}}><h3>{i18n.t('label_FAMILY_INFO')}</h3></div>
                                <div className="invalid-feedback-custom">{ErrInfoFamilyNamaAnak}</div>
                                <div className="invalid-feedback-custom">{ErrInfoFamilyJenisKelamin}</div>
                                <div className="invalid-feedback-custom">{ErrInfoFamilyStatus}</div>
                                <div className="invalid-feedback-custom">{ErrInfoFamilyTanggalLahir}</div>
                                {
                                    InputListInfoFamily.length == 0?'':
                                    <table id="tablegrid">
                                        <tr>
                                            <th>{i18n.t('label_CHILD_NAME')}</th>
                                            <th>{i18n.t('label_DATE_OF_BIRTH')}</th>
                                            <th>{i18n.t('label_GENDER')}</th>
                                            <th>{i18n.t('Status')}</th>
                                            <th>{i18n.t('Action')}</th>
                                        </tr>
                                        <tbody>
                                            {
                                                InputListInfoFamily.map((x, i) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                            <Input
                                                                name="namaanak"
                                                                // className={
                                                                //     touched.amount && errors.amount
                                                                //         ? "w-50 input-error"
                                                                //         : "w-50"
                                                                // }
                                                                type="text"
                                                                id="namaanak"
                                                                onChange={val => handleInputChange(val,i)}
                                                                onBlur={handleBlur}
                                                                // placeholder={i18n.t('label_AMOUNT')}
                                                                // style={{width: '25%'}}
                                                                // value={values.amount}
                                                                value={x.namaanak}
                                                                disabled={false}
                                                            />
                                                            </td>
                                                            <td>
                                                            <DatePicker
                                                                    name="tanggallahir"
                                                                    // onChange={(val) => {
                                                                    //         setFieldValue("startdate", val);
                                                                    //     }
                                                                    // }
                                                                    onChange={val => handleDatePickerChange(val,i,"tanggallahir")}
                                                                    onBlur={handleBlur}
                                                                    // defaultValue={Date(moment([]))}
                                                                    format={formatdate}
                                                                    value={x.tanggallahir}
                                                                    // style={{width: '25%'}}
                                                                    // disabled={ values.allmember}                                    
                                                            />
                                                            </td>
                                                            <td>
                                                            <DropdownList
                                                                name="jeniskelamin"
                                                                filter='contains'
                                                                // placeholder={i18n.t('select.SELECT_OPTION')}
                                                                
                                                                onChange={val => handleInputDropDownChange(val,i,'jeniskelamin')}
                                                                data={ListJenisKelamin}
                                                                textField={'label'}
                                                                valueField={'value'}
                                                                style={{width: '100px'}}
                                                                value={x.jeniskelamin}
                                                            />
                                                            </td>
                                                            <td>
                                                            <DropdownList
                                                                name="status"
                                                                filter='contains'
                                                                // placeholder={i18n.t('select.SELECT_OPTION')}
                                                                
                                                                onChange={val => handleInputDropDownChange(val,i,'status')}
                                                                data={ListStatus}
                                                                textField={'label'}
                                                                valueField={'value'}
                                                                style={{width: '100px'}}
                                                                value={x.status}
                                                            />
                                                            </td>
                                                            <td>
                                                            <IconButton color={'primary'} hidden={i > 0}
                                                                onClick={() => handleAddClick()}
                                                            // hidden={showplusdebit}
                                                            >
                                                                <AddIcon style={{ fontSize: 18 }}/>
                                                            </IconButton>
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