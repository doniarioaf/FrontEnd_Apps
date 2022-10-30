import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../../components/Layout/ContentHeading';
// import DragDrop                     from '../../../../components/DragDrops/DragDrop';
// import {Input,Button,FormGroup,Label} from 'reactstrap';
import {Input,Button,Label,FormGroup,Container} from 'reactstrap';
import * as actions                 from '../../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../../shared/globalFunc';
import { addWorkOrder_Permission} from '../../../shared/permissionMenu';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker}      from 'react-widgets';
import { formatdate} from '../../../shared/constantValue';
import * as pathmenu           from '../../../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import '../../../CSS/table.css';


import SearchIcon from '@material-ui/icons/Search';
import FormSearch from '../../../../components/FormSearch';
import styled                       from "styled-components";
import Dialog                       from '@material-ui/core/Dialog';
const StyledDialog = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 500px;
  }
`;


export default function AddForm(props) {
    reloadToHomeNotAuthorize(addWorkOrder_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [ShowQuickSearch, setShowQuickSearch] = useState(false);
    const [LoadingSend, setLoadingSend] = useState(false);

    const [InputTanggal, setInputTanggal] = useState(new Date());
    const [InputStatus, setInputStatus] = useState('OPEN');

    const [InputCustomerID, setInputCustomerID] = useState('');
    const [InputCustomer, setInputCustomer] = useState('');
    const [ErrInputCustomer, setErrInputCustomer] = useState('');
    const [DataCustomer, setDataCustomer] = useState([]);

    const [InputNamaCargo, setInputNamaCargo] = useState('');
    const [ErrInputNamaCargo, setErrInputNamaCargo] = useState('');

    const [ListWoType, setListWoType] = useState([]);
    const [SelWoType, setSelWoType] = useState('');
    const [ErrSelWoType, setErrSelWoType] = useState('');

    const [ListModaTransport, setListModaTransport] = useState([]);
    const [SelModaTransport, setSelModaTransport] = useState('');
    const [ErrSelModaTransport, setErrSelModaTransport] = useState('');

    const [InputETD, setInputETD] = useState(new Date());
    const [ErrInputETD, setErrInputETD] = useState('');
    const [InputETA, setInputETA] = useState(new Date());
    const [ErrInputETA, setErrInputETA] = useState('');

    const [ListPort, setListPort] = useState([]);
    const [SelPortAsal, setSelPortAsal] = useState('');
    const [ErrSelPortAsal, setErrSelPortAsal] = useState('');
    const [SelPortTujuan, setSelPortTujuan] = useState('');
    const [ErrSelPortTujuan, setErrSelPortTujuan] = useState('');

    const [ListJalur, setListJalur] = useState([]);
    const [SelJalur, setSelJalur] = useState('');
    const [ErrSelJalur, setErrSelJalur] = useState('');

    const [InputNoAju, setInputNoAju] = useState('');
    const [ErrInputNoAju, setErrInputNoAju] = useState('');

    const [InputNoPen, setInputNoPen] = useState('');
    const [ErrInputNoPen, setErrInputNoPen] = useState('');

    const [InputTanggalNopen, setInputTanggalNopen] = useState(new Date());
    const [ErrInputTanggalNopen, setErrInputTanggalNopen] = useState('');

    const [InputNoBL, setInputNoBL] = useState('');
    const [ErrInputNoBL, setErrInputNoBL] = useState('');

    const [InputTanggalBL, setInputTanggalBL] = useState(new Date());
    const [ErrInputTanggalBL, setErrInputTanggalBL] = useState('');

    const [ListVendor, setListVendor] = useState([]);
    const [SelPelayaran, setSelPelayaran] = useState('');
    const [ErrSelPelayaran, setErrSelPelayaran] = useState('');
    const [SelEksportir, setSelEksportir] = useState('');
    const [ErrSelEksportir, setErrSelEksportir] = useState('');
    const [SelImportir, setSelImportir] = useState('');
    const [ErrSelImportir, setErrSelImportir] = useState('');
    const [SelQQ, setSelQQ] = useState('');
    const [ErrSelQQ, setErrSelQQ] = useState('');

    const [InputVoyageNumber, setInputVoyageNumber] = useState('');
    const [ErrInputVoyageNumber, setErrInputVoyageNumber] = useState('');

    const [InputTanggalSppbNPE, setInputTanggalSppbNPE] = useState(new Date());
    const [ErrInputTanggalSppbNPE, setErrInputTanggalSppbNPE] = useState('');

    const [InputDepo, setInputDepo] = useState('');
    const [ErrInputDepo, setErrInputDepo] = useState('');

    const [InputIsActive, setInputIsActive] = useState(true);

    const [ListPartai, setListPartai] = useState([]);
    const [InputListItem, setInputListItem] = useState([{ idpartai:"",jumlahkoli: "",jumlahkg:"",nocontainer:"",noseal:"",barang:""}]);
    const [ErrItemPartai, setErrItemPartai] = useState('');
    const [ErrItemJumlahKoli, setErrItemJumlahKoli] = useState('');
    const [ErrItemJumlahKg, setErrItemJumlahKg] = useState('');
    const [ErrItemNocantainer, setErrItemNocantainer] = useState('');
    const [ErrItemNoSeal, setErrItemNoSeal] = useState('');
    const [ErrItemBarang, setErrItemBarang] = useState('');
    

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getWorkOrderData('/template',successHandlerTemplate, errorHandler));
    }, []);

    const successHandlerTemplate = (data) =>{
        if(data.data){
            setListWoType(data.data.woTypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListModaTransport(data.data.modaTransportasiOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListJalur(data.data.jalurOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListPort(data.data.portOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.name
                }]
            ), []));

            setListVendor(data.data.vendorOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));

            setListPartai(data.data.partaiOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.name
                }]
            ), []));
        }
        setLoading(false);
    }

    const handleInputNamaCargo = (data) =>{
        let val = data.target.value;
        setInputNamaCargo(val)
    }

    const handleChangeWoType = (data) =>{
        let id = data?.value ? data.value : '';
        setSelWoType(id);
    }

    const handleChangeModaTransport = (data) =>{
        let id = data?.value ? data.value : '';
        setSelModaTransport(id);
    }

    const handleChangeETD = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputETD(moment(data, formatdate).toDate())
        }else{
            setInputETD(null)
        }
        
    }

    const handleChangeETA = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputETA(moment(data, formatdate).toDate())
        }else{
            setInputETA(null)
        }
    }

    const handleChangePortAsal = (data) =>{
        let id = data?.value ? data.value : '';
        setSelPortAsal(id);
    }

    const handleChangePortTujuan = (data) =>{
        let id = data?.value ? data.value : '';
        setSelPortTujuan(id);
    }

    const handleChangeJalur = (data) =>{
        let id = data?.value ? data.value : '';
        setSelJalur(id);
    }

    const handleInputNomorAju = (data) =>{
        let val = data.target.value;
        val = new String(val).replaceAll(' ','');
        if(val == '' || !isNaN(val)){
            setInputNoAju(val)
        }
    }

    const handleInputNoPen = (data) =>{
        let val = data.target.value;
        setInputNoPen(val);
        // if(val == '' || !isNaN(val)){
        //     setInputNoPen(val)
        // }
    }

    const handleChangeTanggalNopen = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputTanggalNopen(moment(data, formatdate).toDate())
        }else{
            setInputTanggalNopen(null)
        }
    }

    const handleInputNoBL = (data) =>{
        let val = data.target.value;
        setInputNoBL(val);
        // if(val == '' || !isNaN(val)){
        //     setInputNoBL(val)
        // }
    }

    const handleChangeTanggalBL = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputTanggalBL(moment(data, formatdate).toDate())
        }else{
            setInputTanggalBL(null)
        }
    }

    const handleChangePelayaran = (data) =>{
        let id = data?.value ? data.value : '';
        setSelPelayaran(id);
    }

    const handleChangeImportir = (data) =>{
        let id = data?.value ? data.value : '';
        setSelImportir(id);
    }

    const handleChangeEksportir = (data) =>{
        let id = data?.value ? data.value : '';
        setSelEksportir(id);
    }

    const handleChangeQQ = (data) =>{
        let id = data?.value ? data.value : '';
        setSelQQ(id);
    }

    const handleInputVoyageNumber = (data) =>{
        let val = data.target.value;
        setInputVoyageNumber(val)
        // if(val == '' || !isNaN(val)){
        //     setInputVoyageNumber(val)
        // }
    }
    
    const handleChangeTanggalSppbNpe = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputTanggalSppbNPE(moment(data, formatdate).toDate())
        }else{
            setInputTanggalSppbNPE(null)
        }
    }

    const handleInputDepo = (data) =>{
        let val = data.target.value;
        setInputDepo(val);
    }

    const handleChangeIsActive = (data) =>{
        setInputIsActive(data.target.checked);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputCustomer('');
        setErrInputNamaCargo('');
        setErrSelWoType('');
        setErrSelModaTransport('');
        setErrSelPortAsal('');
        setErrSelPortTujuan('');
        setErrSelJalur('');
        setErrInputNoAju('');
        setErrInputNoPen('');
        setErrInputNoBL('');
        setErrSelPelayaran('');
        setErrSelImportir('');
        setErrSelEksportir('');
        setErrSelQQ('');
        setErrInputVoyageNumber('');
        setErrInputDepo('');
        setErrInputTanggalSppbNPE('');
        setErrInputTanggalBL('');
        setErrInputTanggalNopen('');
        setErrInputETA('');
        setErrInputETD('');

        setErrItemPartai('');
        setErrItemJumlahKoli('');
        setErrItemJumlahKg('');
        setErrItemNocantainer('');
        setErrItemNoSeal('');
        setErrItemBarang('');
        
        if(InputListItem.length > 0){
            for(let i=0; i < InputListItem.length; i++){
                let det = InputListItem[i];
                if(det.idpartai !== '' || det.barang !== '' || det.jumlahkg !== '' || det.jumlahkoli !== '' || det.nocontainer !== '' || det.noseal !== '' ){
                    if(det.idpartai == ''){
                        setErrItemPartai(i18n.t('Partai')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.jumlahkoli == ''){
                        setErrItemJumlahKoli(i18n.t('Jumlah Koli')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.jumlahkg == ''){
                        setErrItemJumlahKg(i18n.t('Jumlah Kg')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.nocontainer == ''){
                        setErrItemNocantainer(i18n.t('No Container')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.noseal == ''){
                        setErrItemNoSeal(i18n.t('No Seal')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.barang == ''){
                        setErrItemNoSeal(i18n.t('Barang')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                }
            }
        }

        

        if(InputETA == null){
            setErrInputETA(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputETD == null){
            setErrInputETD(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputCustomer == ''){
            setErrInputCustomer(i18n.t('label_REQUIRED'));
            flag = false;
        }
        
        if(InputNamaCargo == ''){
            setErrInputNamaCargo(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelWoType == ''){
            setErrSelWoType(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelModaTransport == ''){
            setErrSelModaTransport(i18n.t('label_REQUIRED'));
            flag = false;
        }

        

        if(SelPortAsal == ''){
            setErrSelPortAsal(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelPortTujuan == ''){
            setErrSelPortTujuan(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelJalur == ''){
            setErrSelJalur(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelWoType !== 'JS' && SelWoType !== 'TR'){

            if(InputTanggalSppbNPE == ''){
                setErrInputTanggalSppbNPE(i18n.t('label_REQUIRED'));
                flag = false;
            }

            if(InputTanggalBL == ''){
                setErrInputTanggalBL(i18n.t('label_REQUIRED'));
                flag = false;
            }

            if(InputTanggalNopen == ''){
                setErrInputTanggalNopen(i18n.t('label_REQUIRED'));
                flag = false;
            }

        if(InputNoAju == ''){
            setErrInputNoAju(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputNoPen == ''){
            setErrInputNoPen(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputNoBL == ''){
            setErrInputNoBL(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelPelayaran == ''){
            setErrSelPelayaran(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelImportir == ''){
            setErrSelImportir(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelEksportir == ''){
            setErrSelEksportir(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelQQ == ''){
            setErrSelQQ(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputVoyageNumber == ''){
            setErrInputVoyageNumber(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputDepo == ''){
            setErrInputDepo(i18n.t('label_REQUIRED'));
            flag = false;
        }
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
            obj.tanggal = moment(InputTanggal).toDate().getTime();
            obj.idcustomer = InputCustomerID;
            obj.namacargo = InputNamaCargo;
            obj.status = 'OPEN';
            obj.jeniswo = SelWoType;
            obj.modatransportasi = SelModaTransport;
            obj.etd = moment(InputETD).toDate().getTime();
            obj.eta = moment(InputETA).toDate().getTime();
            obj.portasal = SelPortAsal;
            obj.porttujuan = SelPortTujuan;
            obj.jalur = SelJalur;
            obj.noaju = InputNoAju;
            obj.nopen = InputNoPen;
            obj.tanggalnopen = InputTanggalNopen !== null?moment(InputTanggalNopen).toDate().getTime():0;
            obj.nobl = InputNoBL;
            obj.tanggalbl = InputTanggalBL !== null? moment(InputTanggalBL).toDate().getTime():0;
            obj.pelayaran = SelPelayaran;
            obj.importir = SelImportir;
            obj.eksportir = SelEksportir;
            obj.qq = SelQQ;
            obj.voyagenumber = InputVoyageNumber;
            obj.tanggalsppb_npe =InputTanggalSppbNPE !== null? moment(InputTanggalSppbNPE).toDate().getTime():0;
            obj.depo = InputDepo;
            obj.isactive = InputIsActive;
            let listdetails = [];
            if(InputListItem.length > 0){
                for(let i=0; i < InputListItem.length; i++){
                    let det = InputListItem[i];
                    if(det.idpartai !== '' && det.barang !== '' && det.jumlahkg !== '' && det.jumlahkoli !== '' && det.nocontainer !== '' && det.noseal !== '' ){
                        listdetails.push(det);
                    }
                }
            }
            obj.details = listdetails;
            dispatch(actions.submitAddWorkOrder('',obj,succesHandlerSubmit, errorHandler));
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
        setShowQuickSearch(false);
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...InputListItem];
        list[index][name] = value;
        setInputListItem(list);
    };

    const handleInputDropDownChange = (e, index,name) => {
        const list = [...InputListItem];
        list[index][name] = e.value;
        setInputListItem(list);
    };    

    const handleAddClick = () => {
        setInputListItem([...InputListItem, { idpartai:"",jumlahkoli: "",jumlahkg:"",nocontainer:"",noseal:"",barang:""}]);
    };

    const handleRemoveClick = index => {
        const list = [...InputListItem];
        list.splice(index, 1);
        setInputListItem(list);
    };

    const handleQuickSeacrh = (data) =>{
        setShowQuickSearch(false);
        setInputCustomer(data.customername);
        setInputCustomerID(data.id);
    }

    const setNullTanggal = (field) =>{
        if(field == 'tanggalnopen'){
            setInputTanggalNopen(null);
        }else if(field == 'tanggalbl'){
            setInputTanggalBL(null);
        }else if(field == 'tanggalsppbnpe'){
            setInputTanggalSppbNPE(null);
        }   
    }

    return (
        <Formik
        initialValues={
            {
                tanggal:InputTanggal,
                customer:InputCustomer,
                namacargo:InputNamaCargo,
                status:InputStatus,
                wotype:SelWoType,
                modatransport:SelModaTransport,
                etd:InputETD,
                eta:InputETA,
                portasal:SelPortAsal,
                porttujuan:SelPortTujuan,
                jalur:SelJalur,
                noaju:InputNoAju,
                nopen:InputNoPen,
                tanggalnopen:InputTanggalNopen,
                nobl:InputNoBL,
                tanggalbl:InputTanggalBL,
                pelayaran:SelPelayaran,
                importir:SelImportir,
                eksportir:SelEksportir,
                qq:SelQQ,
                voyagenumber:InputVoyageNumber,
                tanggalsppbnpe:InputTanggalSppbNPE,
                depo:InputDepo,
                items:InputListItem

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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddWorkOrder">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addemployeeManggala} label={'Add Employee'} labeldefault={'Add Employee'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="tanggal">
                                {i18n.t('label_DATE')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <DatePicker
                                    name="tanggal"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    // onChange={val => handleTanggalLahir(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.tanggal}
                                    // style={{width: '25%'}}
                                    disabled={true}                       
                            />

                            <label className="mt-3 form-label required" htmlFor="status">
                                {i18n.t('Status')}
                                <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="status"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    maxLength={20}
                                    type="text"
                                    id="status"
                                    disabled={true}
                                    onBlur={handleBlur}
                                    value={values.status}
                            />

                            <label className="mt-3 form-label required" htmlFor="customer">
                                {i18n.t('label_CUSTOMER')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'110%'}}>
                            <tbody>
                            <tr>
                                <td>
                                <Input
                                name="customer"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="customer"
                                maxLength={200}
                                // onChange={val => handle(val)}
                                onBlur={handleBlur}
                                disabled={true}
                                value={values.customer}
                                />
                                
                                </td>
                                <td>
                                <IconButton color={'primary'}
                                    onClick={() =>setShowQuickSearch(true)}
                                >
                                    <SearchIcon/>
                                </IconButton>
                                </td>
                            </tr>
                            </tbody>
                            </table>
                            <div className="invalid-feedback-custom">{ErrInputCustomer}</div>

                            <label className="mt-3 form-label required" htmlFor="namacargo">
                                {i18n.t('label_CARGO_NAME')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="namacargo"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="namacargo"
                                maxLength={200}
                                onChange={val => handleInputNamaCargo(val)}
                                onBlur={handleBlur}
                                value={values.namacargo}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNamaCargo}</div>
                            

                            <label className="mt-3 form-label required" htmlFor="wotype">
                                {i18n.t('label_WO_TYPE')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="wotype"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeWoType(val)}
                                    onBlur={val => setFieldTouched("wotype", val?.value ? val.value : '')}
                                    data={ListWoType}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.wotype}
                                />
                                <div className="invalid-feedback-custom">{ErrSelWoType}</div>

                            <label className="mt-3 form-label required" htmlFor="modatransport">
                                {i18n.t('label_MODA_TRANSPORTAION')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="modatransport"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeModaTransport(val)}
                                    onBlur={val => setFieldTouched("modatransport", val?.value ? val.value : '')}
                                    data={ListModaTransport}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.modatransport}
                                />
                                <div className="invalid-feedback-custom">{ErrSelModaTransport}</div>

                            <label className="mt-3 form-label required" htmlFor="etd">
                                {i18n.t('ETD')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <DatePicker
                                    name="etd"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleChangeETD(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.etd}
                                                  
                            />
                            <div className="invalid-feedback-custom">{ErrInputETD}</div>

                            <label className="mt-3 form-label required" htmlFor="eta">
                                {i18n.t('ETA')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <DatePicker
                                    name="eta"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleChangeETA(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.eta}
                                                  
                            />
                            <div className="invalid-feedback-custom">{ErrInputETA}</div>

                            <label className="mt-3 form-label required" htmlFor="portasal">
                                {i18n.t('Port Asal')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="portasal"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangePortAsal(val)}
                                    onBlur={val => setFieldTouched("portasal", val?.value ? val.value : '')}
                                    data={ListPort}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.portasal}
                                />
                            <div className="invalid-feedback-custom">{ErrSelPortAsal}</div>

                            <label className="mt-3 form-label required" htmlFor="porttujuan">
                                {i18n.t('Port Tujuan')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="porttujuan"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangePortTujuan(val)}
                                    onBlur={val => setFieldTouched("porttujuan", val?.value ? val.value : '')}
                                    data={ListPort}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.porttujuan}
                                />
                            <div className="invalid-feedback-custom">{ErrSelPortTujuan}</div>

                            <label className="mt-3 form-label required" htmlFor="jalur">
                                {i18n.t('Penjaluran')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="jalur"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeJalur(val)}
                                    onBlur={val => setFieldTouched("jalur", val?.value ? val.value : '')}
                                    data={ListJalur}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.jalur}
                                />
                            <div className="invalid-feedback-custom">{ErrSelJalur}</div>

                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                           

                            <label className="mt-3 form-label required" htmlFor="noaju">
                                {i18n.t('label_AJU_NUMBER')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="noaju"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="noaju"
                                maxLength={20}
                                onChange={val => handleInputNomorAju(val)}
                                onBlur={handleBlur}
                                value={values.noaju}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNoAju}</div>

                            <label className="mt-3 form-label required" htmlFor="nopen">
                                {i18n.t('NOPEN')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="nopen"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nopen"
                                maxLength={20}
                                onChange={val => handleInputNoPen(val)}
                                onBlur={handleBlur}
                                value={values.nopen}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNoPen}</div>

                            <label className="mt-3 form-label required" htmlFor="tanggalnopen">
                                {i18n.t('label_NOPEN_DATE')}
                            </label>
                            <table style={{width:'100%'}}>
                                <tbody>
                                    <tr>
                                        <td>
                                        <DatePicker
                                                name="tanggalnopen"
                                                // onChange={(val) => {
                                                //         setFieldValue("startdate", val);
                                                //     }
                                                // }
                                                onChange={val => handleChangeTanggalNopen(val)}
                                                onBlur={handleBlur}
                                                // defaultValue={Date(moment([]))}
                                                format={formatdate}
                                                value={values.tanggalnopen}
                                                            
                                        />

                                        </td>
                                        <td>
                                        <IconButton color={'primary'}
                                        onClick={() => setNullTanggal('tanggalnopen')}
                                        // hidden={showplusdebit}
                                        >
                                            <DeleteIcon style={{ fontSize: 18 }}/>
                                        </IconButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="invalid-feedback-custom">{ErrInputTanggalNopen}</div>
                            
                            <label className="mt-3 form-label required" htmlFor="nobl">
                                {i18n.t('label_BL_NUMBER')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="nobl"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nobl"
                                maxLength={20}
                                onChange={val => handleInputNoBL(val)}
                                onBlur={handleBlur}
                                value={values.nobl}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNoBL}</div>

                            <label className="mt-3 form-label required" htmlFor="tanggalbl">
                                {i18n.t('label_BL_DATE')}
                            </label>

                            <table style={{width:'100%'}}>
                                <tbody>
                                    <tr>
                                        <td>
                                        <DatePicker
                                                name="tanggalbl"
                                                // onChange={(val) => {
                                                //         setFieldValue("startdate", val);
                                                //     }
                                                // }
                                                onChange={val => handleChangeTanggalBL(val)}
                                                onBlur={handleBlur}
                                                // defaultValue={Date(moment([]))}
                                                format={formatdate}
                                                value={values.tanggalbl}
                                                            
                                        />
                                        
                                        </td>
                                        <td>
                                        <IconButton color={'primary'}
                                        onClick={() => setNullTanggal('tanggalbl')}
                                        // hidden={showplusdebit}
                                        >
                                            <DeleteIcon style={{ fontSize: 18 }}/>
                                        </IconButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="invalid-feedback-custom">{ErrInputTanggalBL}</div>
                            

                            <label className="mt-3 form-label required" htmlFor="pelayaran">
                                {i18n.t('Pelayaran')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="pelayaran"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangePelayaran(val)}
                                    onBlur={val => setFieldTouched("pelayaran", val?.value ? val.value : '')}
                                    data={ListVendor}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.pelayaran}
                                />
                            <div className="invalid-feedback-custom">{ErrSelPelayaran}</div>

                            <label className="mt-3 form-label required" htmlFor="importir">
                                {i18n.t('Importir')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="importir"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeImportir(val)}
                                    onBlur={val => setFieldTouched("importir", val?.value ? val.value : '')}
                                    data={ListVendor}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.importir}
                                />
                            <div className="invalid-feedback-custom">{ErrSelImportir}</div>

                            <label className="mt-3 form-label required" htmlFor="eksportir">
                                {i18n.t('Eksportir')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="eksportir"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeEksportir(val)}
                                    onBlur={val => setFieldTouched("eksportir", val?.value ? val.value : '')}
                                    data={ListVendor}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.eksportir}
                                />
                            <div className="invalid-feedback-custom">{ErrSelEksportir}</div>

                            <label className="mt-3 form-label required" htmlFor="qq">
                                {i18n.t('QQ')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="qq"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeQQ(val)}
                                    onBlur={val => setFieldTouched("qq", val?.value ? val.value : '')}
                                    data={ListVendor}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.qq}
                                />
                            <div className="invalid-feedback-custom">{ErrSelQQ}</div>

                            <label className="mt-3 form-label required" htmlFor="voyagenumber">
                                {i18n.t('label_VOYAGE_NUMBER')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="voyagenumber"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="voyagenumber"
                                maxLength={50}
                                onChange={val => handleInputVoyageNumber(val)}
                                onBlur={handleBlur}
                                value={values.voyagenumber}
                            />
                            <div className="invalid-feedback-custom">{ErrInputVoyageNumber}</div>

                            <label className="mt-3 form-label required" htmlFor="tanggalsppbnpe">
                                {i18n.t('label_SPPB_NPE_DATE')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'100%'}}>
                                <tbody>
                                    <tr>
                                        <td>
                                        <DatePicker
                                            name="tanggalsppbnpe"
                                            // onChange={(val) => {
                                            //         setFieldValue("startdate", val);
                                            //     }
                                            // }
                                            onChange={val => handleChangeTanggalSppbNpe(val)}
                                            onBlur={handleBlur}
                                            // defaultValue={Date(moment([]))}
                                            format={formatdate}
                                            value={values.tanggalsppbnpe}
                                                        
                                        />
                                        
                                        </td>
                                        <td>
                                        <IconButton color={'primary'}
                                        onClick={() => setNullTanggal('tanggalsppbnpe')}
                                        // hidden={showplusdebit}
                                        >
                                            <DeleteIcon style={{ fontSize: 18 }}/>
                                        </IconButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="invalid-feedback-custom">{ErrInputTanggalSppbNPE}</div>

                            <label className="mt-3 form-label required" htmlFor="depo">
                                {i18n.t('Depo')}
                                <span hidden={values.wotype == 'JS' || values.wotype == 'TR'} style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="depo"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="depo"
                                maxLength={50}
                                onChange={val => handleInputDepo(val)}
                                onBlur={handleBlur}
                                value={values.depo}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDepo}</div>

                            </div>

                            </div>

                            <div className="invalid-feedback-custom">{ErrItemPartai}</div>
                            <div className="invalid-feedback-custom">{ErrItemJumlahKoli}</div>
                            <div className="invalid-feedback-custom">{ErrItemJumlahKg}</div>
                            <div className="invalid-feedback-custom">{ErrItemNocantainer}</div>
                            <div className="invalid-feedback-custom">{ErrItemNoSeal}</div>
                            <div className="invalid-feedback-custom">{ErrItemBarang}</div>
                            {
                                InputListItem.length == 0?'':
                                <table id="tablegrid">
                                    <tr>
                                        <th>{i18n.t('Partai')}</th>
                                        <th>{i18n.t('Jumlah Koli')}</th>
                                        <th>{i18n.t('Jumlah Kg')}</th>
                                        <th>{i18n.t('No Container')}</th>
                                        <th>{i18n.t('No Seal')}</th>
                                        <th>{i18n.t('Barang')}</th>
                                        <th>{i18n.t('Action')}</th>
                                    </tr>
                                    <tbody>
                                        {
                                            InputListItem.map((x, i) => {
                                                return (
                                                    <tr>
                                                        <td >
                                                        <DropdownList
                                                                name="idpartai"
                                                                filter='contains'
                                                                // placeholder={i18n.t('select.SELECT_OPTION')}
                                                                
                                                                onChange={val => handleInputDropDownChange(val,i,'idpartai')}
                                                                data={ListPartai}
                                                                textField={'label'}
                                                                valueField={'value'}
                                                                style={{width: '130px'}}
                                                                value={x.idpartai}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Input
                                                                name="jumlahkoli"
                                                                // className={
                                                                //     touched.amount && errors.amount
                                                                //         ? "w-50 input-error"
                                                                //         : "w-50"
                                                                // }
                                                                type="text"
                                                                id="jumlahkoli"
                                                                onChange={val => handleInputChange(val,i)}
                                                                onBlur={handleBlur}
                                                                // placeholder={i18n.t('label_AMOUNT')}
                                                                // style={{width: '25%'}}
                                                                // value={values.amount}
                                                                value={x.jumlahkoli}
                                                                disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                            <Input
                                                                name="jumlahkg"
                                                                // className={
                                                                //     touched.amount && errors.amount
                                                                //         ? "w-50 input-error"
                                                                //         : "w-50"
                                                                // }
                                                                type="text"
                                                                id="jumlahkg"
                                                                onChange={val => handleInputChange(val,i)}
                                                                onBlur={handleBlur}
                                                                // placeholder={i18n.t('label_AMOUNT')}
                                                                // style={{width: '25%'}}
                                                                // value={values.amount}
                                                                value={x.jumlahkg}
                                                                disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                            <Input
                                                                name="nocontainer"
                                                                // className={
                                                                //     touched.amount && errors.amount
                                                                //         ? "w-50 input-error"
                                                                //         : "w-50"
                                                                // }
                                                                type="text"
                                                                id="nocontainer"
                                                                onChange={val => handleInputChange(val,i)}
                                                                onBlur={handleBlur}
                                                                // placeholder={i18n.t('label_AMOUNT')}
                                                                // style={{width: '25%'}}
                                                                // value={values.amount}
                                                                value={x.nocontainer}
                                                                disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                            <Input
                                                                name="noseal"
                                                                // className={
                                                                //     touched.amount && errors.amount
                                                                //         ? "w-50 input-error"
                                                                //         : "w-50"
                                                                // }
                                                                type="text"
                                                                id="noseal"
                                                                onChange={val => handleInputChange(val,i)}
                                                                onBlur={handleBlur}
                                                                // placeholder={i18n.t('label_AMOUNT')}
                                                                // style={{width: '25%'}}
                                                                // value={values.amount}
                                                                value={x.noseal}
                                                                disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                            <Input
                                                                name="barang"
                                                                // className={
                                                                //     touched.amount && errors.amount
                                                                //         ? "w-50 input-error"
                                                                //         : "w-50"
                                                                // }
                                                                type="text"
                                                                id="barang"
                                                                onChange={val => handleInputChange(val,i)}
                                                                onBlur={handleBlur}
                                                                // placeholder={i18n.t('label_AMOUNT')}
                                                                // style={{width: '25%'}}
                                                                // value={values.amount}
                                                                value={x.barang}
                                                                disabled={false}
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

                        <StyledDialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            maxWidth="md"
                            fullWidth={true}
                            // style={{height: '80%'}}
                            open={ShowQuickSearch}
                        >
                                <FormSearch
                                    showflag = {setShowQuickSearch}
                                    flagloadingsend = {setLoadingSend}
                                    seacrhtype = {'CUSTOMERWO'}
                                    errorHandler = {errorHandler}
                                    handlesearch = {handleQuickSeacrh}
                                    placeholder = {'Pencarian Berdasarkan Nama Customer'}
                                ></FormSearch>
                                {LoadingSend && <Loading/>}
                        </StyledDialog>

                        </form>
                    )

                }
            }
        </Formik>

    )
    
}