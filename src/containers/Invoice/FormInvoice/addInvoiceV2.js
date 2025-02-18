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
import { reloadToHomeNotAuthorize,inputJustNumberAndCommaDot,formatMoney, numToMoney, removeFormatRupiah, formatRupiah } from '../../shared/globalFunc';
import { addInvoice_Permission} from '../../shared/permissionMenu';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker}      from 'react-widgets';
import { formatdate} from '../../shared/constantValue';
import * as pathmenu           from '../../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
// import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, setRef } from '@material-ui/core';
import '../../CSS/table.css';

import SearchIcon from '@material-ui/icons/Search';
import FormSearch from '../../../components/FormSearch';
import styled                       from "styled-components";
import Dialog                       from '@material-ui/core/Dialog';
const StyledDialog = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 500px;
  }
`;

export default function AddForm(props) {
    reloadToHomeNotAuthorize(addInvoice_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [ShowQuickSearch, setShowQuickSearch] = useState(false);
    const [LoadingSend, setLoadingSend] = useState(false);

    const [InputInvoiceNumber, setInputInvoiceNumber] = useState('');
    const [ErrInputInvoiceNumber, setErrInputInvoiceNumber] = useState('');

    const [InputInvoiceNumberJasa, setInputInvoiceNumberJasa] = useState('');
    const [ErrInputInvoiceNumberJasa, setErrInputInvoiceNumberJasa] = useState('');

    const [InputNilaiJasa, setInputNilaiJasa] = useState('');
    const [ErrInputNilaiJasa, setErrInputNilaiJasa] = useState('');

    const [InputNilaiReimbursement, setInputNilaiReimbursement] = useState('');
    const [ErrInputNilaiReimbursement, setErrInputNilaiReimbursement] = useState('');

    const [InputInvoiceNumberReimbursement, setInputInvoiceNumberReimbursement] = useState('');
    const [ErrInputInvoiceNumberReimbursement, setErrInputInvoiceNumberReimbursement] = useState('');

    const [InputNoFakturPajak, setInputNoFakturPajak] = useState('');


    const [InputTanggal, setInputTanggal] = useState(new Date());
    const [ErrInputTanggal, setErrInputTanggal] = useState('');

    // const [ListCustomer, setListCustomer] = useState([]);
    // const [SelCust, setSelCust] = useState('');
    // const [ErrSelCust, setErrSelCust] = useState('');

    const [InputRefNo, setInputRefNo] = useState('');
    const [ErrInputRefNo, setErrInputRefNo] = useState('');

    const [InputDeliveredTo, setInputDeliveredTo] = useState('');
    const [ErrInputDeliveredTo, setErrInputDeliveredTo] = useState('');

    const [InputDeliveredDate, setInputDeliveredDate] = useState(null);
    const [ErrInputDeliveredDate, setErrInputDeliveredDate] = useState('');

    const [ListWO, setListWO] = useState([]);
    const [SelWO, setSelWO] = useState('');

    const [ListSJ, setListSJ] = useState([]);
    const [SelSJ, setSelSJ] = useState('');

    const [ListPriceList, setListPriceList] = useState([]);
    const [SelPriceList, setSelPriceList] = useState('');

    const [ListInvoiceType, setListInvoiceType] = useState([]);
    const [SelInvoiceType, setSelInvoiceType] = useState('JASA');
    const [ErrSelInvoiceType, setErrSelInvoiceType] = useState('');

    const [InputDiskonNota, setInputDiskonNota] = useState('');
    const [InputTotalInvoice, setInputTotalInvoice] = useState('');

    const [InputPPN, setInputPPN] = useState('');
    const [InputNilaiPPN, setInputNilaiPPN] = useState(null);

    // const [InputListItem, setInputListItem] = useState([{ idinvoicetype:"",invoicetype:"",amount: "",ismandatory:"",jalur:"",qty:"",diskon:"",subtotal:""}]);
    const [InputListItem, setInputListItem] = useState([])
    const [ErrQty, setErrQty] = useState('');
    const [ErrItems, setErrItems] = useState('');

    
    const [InputWarehouseID, setInputWarehouseID] = useState('');
    const [InputJalur, setInputJalur] = useState('');
    const [InputJalurName, setInputJalurName] = useState('');
    const [InputCustomerID, setInputCustomerID] = useState('');
    const [InputCustomer, setInputCustomer] = useState('');
    const [ErrInputCustomer, setErrInputCustomer] = useState('');
    const [ListSuratJalanWO, setListSuratJalanWO] = useState([]);
    const [IsHideColumnWarehouse, setIsHideColumnWarehouse] = useState(false);
    const [DataTemplate, setDataTemplate] = useState([]);

    const [ListInvoiceDP, setListInvoiceDP] = useState([]);

    const [InputNotes1, setInputNotes1] = useState('');
    const [InputNotes2, setInputNotes2] = useState('');

    useEffect(() => {
        // setLoading(true);
        // dispatch(actions.getInvoiceData('/template',successHandlerTemplate, errorHandler));
    }, []);

    // const successHandlerTemplate = (data) =>{
    //     setDataTemplate(data.data);
    //     if(data.data){
    //         setListInvoiceType(data.data.invoiceTypeOptions.reduce((obj, el) => (
    //             [...obj, {
    //                 value: el.code,
    //                 label: el.codename
    //             }]
    //         ), []));

    //         setInputPPN(data.data.defaultPPN?numToMoney(parseFloat(data.data.defaultPPN)):'');
    //     }
        
    //     setLoading(false);
    // }

    const handleChangeTanggal = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputTanggal(moment(data, formatdate).toDate())
        }else{
            setInputTanggal(null)
        }
    }

    const handleChangeDeliveryDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputDeliveredDate(moment(data, formatdate).toDate())
        }else{
            setInputDeliveredDate(null)
        }
    }
    const handleInputInvoiceNumber = (data) =>{
        let val = data.target.value;
        setInputInvoiceNumber(val);
        setInputInvoiceNumberJasa("INVJ-"+val);
        setInputInvoiceNumberReimbursement("INVR-"+val);
    }

    const handleInputNilaiJasa = (data) =>{
        // let val = data.target.value;
        let value = data.target.value;
        let flag = true;
        if (isNaN(value) && value !== '') {
            flag = false;
            if(new String(value).split(',').length >= 3){
                flag = false;
            }else{
                flag = true;
            }
        }
        let valPriceTemp = '';
        if(new String(value).includes(',')){
            let splitComma = new String(value).split(','); 
            let angka = splitComma[0];
            let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
            valPriceTemp = removeFormatRupiah(angka)+','+desimal;
        }else{
            valPriceTemp = removeFormatRupiah(value);
        }
        if (flag) {
            let nilai = formatRupiah(valPriceTemp,2);
            setInputNilaiJasa(nilai);
            calculateTotalInvoice(InputNilaiPPN,nilai, InputNilaiReimbursement);
        }
    }

    const handleInputNilaiReimbursement = (data) =>{
        let value = data.target.value;
        let flag = true;
        if (isNaN(value) && value !== '') {
            flag = false;
            if(new String(value).split(',').length >= 3){
                flag = false;
            }else{
                flag = true;
            }
        }
        let valPriceTemp = '';
        if(new String(value).includes(',')){
            let splitComma = new String(value).split(','); 
            let angka = splitComma[0];
            let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
            valPriceTemp = removeFormatRupiah(angka)+','+desimal;
        }else{
            valPriceTemp = removeFormatRupiah(value);
        }
        if (flag) {
            let nilai = formatRupiah(valPriceTemp,2);
            setInputNilaiReimbursement(nilai);
            calculateTotalInvoice(InputNilaiPPN,InputNilaiJasa, nilai);
        }
    }

    const handleInputNoFakturPajak = (data) =>{
        let val = data.target.value;
        setInputNoFakturPajak(val);
    }

    const handleInputRefNo = (data) =>{
        let val = data.target.value;
        setInputRefNo(val);
    }

    const handleInputNotes1 = (data) =>{
        let val = data.target.value;
        setInputNotes1(val);
    }

    const handleChangeWo = (data) =>{
        let id = data?.value ? data.value : '';
        let jalur = data?.jalur ? data.jalur : '';
        let jalurname = data?.jalurname ? data.jalurname : '';
        let noblawb = data?.noblawb ? data.noblawb : '';
        setSelWO(id);
        setInputJalur(jalur);
        setInputJalurName(jalurname);
        setSelSJ('');
        setListSJ([]);
        setInputWarehouseID('');
        setSelPriceList('');
        setListPriceList([]);
        setInputListItem([]);
        setListSuratJalanWO([]);
        setInputRefNo(noblawb);
        setListInvoiceDP([]);
        localStorage.setItem('idwo',id);

        setLoading(true);
        dispatch(actions.getInvoiceData('/suratjalan/'+id,successHandlerSJJ, errorHandler));
        
        // if(SelInvoiceType == 'REIMBURSEMENT'){
        //     setLoading(true);
        //     dispatch(actions.getInvoiceData('/invoicedp/'+id,successHandlerInvoiceDP, errorHandler));
        //     // dispatch(actions.getInvoiceData('/searchpengeluaran/'+id,successHandlerPengeluaran, errorHandler));
        // }else{
        //     setLoading(true);
        //     dispatch(actions.getInvoiceData('/suratjalan/'+id,successHandlerSJJ, errorHandler));
        // }
        // dispatch(actions.getInvoiceData('/searchsj/'+id,successHandlerSj, errorHandler));
    }
    function successHandlerInvoiceDP(data) {
        setListInvoiceDP(data.data?data.data:[]);
        setLoading(false);
    }
    function successHandlerSJJ(data) {
        let list = [];
        let delivDate = null;
        let idSj = '';
        if(data.data.suratjalan){
            for(let i=0; i < data.data.suratjalan.length ; i++){
                let det = data.data.suratjalan[i];

                let obj = new Object();
                obj.nosj = det.nodocument;
                obj.warehouse = det.warehousename;
                obj.nocontainer = det.nocontainer;
                obj.tanggal = det.tanggal?moment (new Date(det.tanggal)).format(formatdate):'';
                obj.tanggalkembali = det.tanggalkembali?moment (new Date(det.tanggalkembali)).format(formatdate):null;

                if(delivDate == null && det.tanggalkembali){
                    delivDate = new Date(det.tanggalkembali);
                    idSj = det.id;
                }else if(det.tanggalkembali && delivDate > new Date(det.tanggalkembali)){
                    delivDate = new Date(det.tanggalkembali);
                    idSj = det.id;
                }
                if(data.data.partaiwo){
                    let listpartai = data.data.partaiwo.filter(output => output.nocontainer == det.nocontainer);
                    if(listpartai.length > 0){
                        for(let j=0; j < listpartai.length ; j++){
                            let obj1 = new Object();
                            obj1 = obj;
                            obj1.partai = listpartai[j].partainame;
                            list.push(obj1);
                        }
                    }else{
                        obj.partai = '';
                        list.push(obj);
                    }
                }else{
                    obj.partai = '';
                    list.push(obj);
                }
                
            }
            
        }
        
        if(delivDate != null){
            setInputDeliveredDate(moment(new Date(delivDate), formatdate).toDate());
        }else{
            setInputDeliveredDate(null);
        }
        

        setListSuratJalanWO(list);

        let idwo = localStorage.getItem('idwo');
        localStorage.setItem('idSj',idSj);
        setSelSJ(idSj);
        dispatch(actions.getInvoiceData('/searchsj/'+idwo,successHandlerSj, errorHandler));
    }

    const successHandlerSj = (data) =>{
        let idSj = localStorage.getItem('idSj');
        if(data.data){
            let getSJ = data.data.filter(output => output.id == idSj);
            if(getSJ.length > 0){
                setInputWarehouseID(getSJ[0].idwarehouse);
            }
            setListSJ(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nodocument,
                    idwarehouse: el.idwarehouse,
                    nodoc: el.nodocument,
                }]
            ), []));
        }
        setLoading(false);
    }

    const handleChangeSj = (data) =>{
        let id = data?.value ? data.value : '';
        let nodoc = data?.nodoc ? data.nodoc : '';
        let idwarehouse = data?.idwarehouse ? data.idwarehouse : '';
        
        setSelSJ(id);
        setInputWarehouseID(idwarehouse);
        setSelPriceList('');
        setListPriceList([]);
        setInputListItem([]);

        let list = ListSuratJalanWO.filter(output => output.nosj == nodoc);
        if(list.length > 0){
            if(list[0].tanggalkembali){
                setInputDeliveredDate(moment(new Date(list[0].tanggalkembali), formatdate).toDate());
            }
        }else{
            setInputDeliveredDate(null);
        }
    }

    const handleChangeInvType = (data) =>{
        let id = data?.value ? data.value : '';
        setSelInvoiceType(id);

        setSelPriceList('');
        setListPriceList([]);
        setInputListItem([]);
        setListSuratJalanWO([]);
        setInputDeliveredDate(null);
        setInputDiskonNota('');
        setInputTotalInvoice('');

        if(id == 'REIMBURSEMENT'){
            setSelSJ('');
            setInputPPN('');
            setInputNilaiPPN(null);

            if(SelWO !== ""){
                setLoading(true);
                dispatch(actions.getInvoiceData('/invoicedp/'+SelWO,successHandlerInvoiceDP, errorHandler));
            }
        }else{
            let ppn = DataTemplate.defaultPPN?numToMoney(parseFloat(DataTemplate.defaultPPN)):'';
            setInputPPN(ppn);
            if(ppn !== ''){
                calculateTotalInvoice(InputListItem,InputDiskonNota,ppn,InputNilaiPPN);
            }
            if(SelWO !== '' && SelSJ == ''){
                setLoading(true);
                localStorage.setItem('idwo',SelWO);
                dispatch(actions.getInvoiceData('/suratjalan/'+SelWO,successHandlerSJJ, errorHandler));
            }
            
        }
    }

    const handleChangeNilaiPPN = (data) =>{
        // let val = data.target.value;
        // // val = new String(val).replaceAll('.','').replaceAll(',','.');
        // let flagReg = inputJustNumberAndCommaDot(val);
        // if(flagReg){
        //     val = formatMoney(val);
        //     let valtemp = val;
        //     calculateTotalInvoice(InputListItem,InputDiskonNota,InputPPN,valtemp);
        //     setInputNilaiPPN(val);
        // }
        let value = data.target.value;
        let flag = true;
        if (isNaN(value) && value !== '') {
            flag = false;
            if(new String(value).split(',').length >= 3){
                flag = false;
            }else{
                flag = true;
            }
        }
        let valPriceTemp = '';
        if(new String(value).includes(',')){
            let splitComma = new String(value).split(','); 
            let angka = splitComma[0];
            let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
            valPriceTemp = removeFormatRupiah(angka)+','+desimal;
        }else{
            valPriceTemp = removeFormatRupiah(value);
        }
        if (flag) {
            let nilai = formatRupiah(valPriceTemp,2);
            setInputNilaiPPN(nilai);
            calculateTotalInvoice(nilai,InputNilaiJasa,InputNilaiReimbursement);
        }
        
    }

   

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputTanggal('');
        setErrInputCustomer('');
        setErrInputInvoiceNumber('');
        setErrInputInvoiceNumberJasa('');
        setErrInputInvoiceNumberReimbursement('');
        setErrInputNilaiJasa('');
        setErrInputNilaiReimbursement('');
        setErrInputRefNo('');
        setErrInputDeliveredTo('');
        setErrInputDeliveredDate('');
        setErrSelInvoiceType('');
        setErrItems('');
        setErrQty('');

       
        if(InputInvoiceNumber == ''){
            setErrInputInvoiceNumber(i18n.t('label_REQUIRED'));
            flag = false;
        }
        
        if(InputTanggal == null){
            setErrInputTanggal(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputCustomerID == ''){
            setErrInputCustomer(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelInvoiceType == ''){
            setErrSelInvoiceType(i18n.t('label_REQUIRED'));
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
            obj.invoicenumber = InputInvoiceNumber;
            obj.tanggal = moment(InputTanggal).toDate().getTime();
            obj.idcustomer = InputCustomerID;
            obj.refno = InputRefNo;
            obj.nodocumentreimbursement = InputInvoiceNumberReimbursement;
            obj.nilaijasa = InputNilaiJasa !== ''?removeFormatRupiah(InputNilaiJasa):0;
            obj.nilaireimbursement = InputNilaiReimbursement !== ''?removeFormatRupiah(InputNilaiReimbursement):0;
            obj.nodocumentjasa = InputInvoiceNumberJasa;
            obj.deliveredto = InputDeliveredTo;
            obj.deliverydate = moment(InputDeliveredDate).toDate().getTime();
            obj.idwo = SelWO !== ''?SelWO:null;
            obj.totalinvoice = InputTotalInvoice !== ''?removeFormatRupiah(InputTotalInvoice):0;
            obj.isactive = true;
            obj.idsuratjalan = SelSJ !== '' && SelInvoiceType !== 'DP'?SelSJ:null;
            obj.nilaippn = InputNilaiPPN !== ''?removeFormatRupiah(InputNilaiPPN):0;
            obj.notes1 = InputNotes1;
            obj.nofakturpajak = InputNoFakturPajak;
            dispatch(actions.submitAddInvoice('/v2',obj,succesHandlerSubmit, errorHandler));
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

    const handleQuickSeacrh = (data) =>{
        setShowQuickSearch(false);
        setInputCustomer(data.customername);
        setInputCustomerID(data.id);
        setSelWO('');
        setInputJalur('');
        setInputJalurName('');
        setListWO([]);
        setSelSJ('');
        setListSJ([]);
        setSelPriceList('');
        setListPriceList([]);
        setInputWarehouseID('');
        setInputDeliveredTo('');
        setLoading(true);
        // dispatch(actions.getInvoiceData('/getdistrict/'+data.kodepos,successHandlerDistrict, errorHandler));
        dispatch(actions.getInvoiceData('/searchwo/'+data.id,successHandlerWO, errorHandler));
    }
    
    const successHandlerWO = (data) => {
        if(data.data){
            setListWO(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nodocument+' - AJU '+el.noaju,
                    jalur: el.jalur,
                    jalurname: el.jalurname,
                    noblawb: el.nobl,
                }]
            ), []));
        }
        setLoading(false);
    }
    
    const successHandlerPengeluaran = (data) =>{
        //let filterid = RowsBranch.filter(output => output.id == SelBranch);
        setIsHideColumnWarehouse(true);
        if(data.data){
            setListPriceList(data.data.headers.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nodocument,
                    dataval:data.data?.details?data.data.details.filter(output => output.idpengeluarankasbank == el.id):[]
                }]
            ), []));
            
            if(data.data.details){
                let listitem = [];
                let dataval = data.data.details;
                for(let i=0; i < dataval.length; i++){
                    let det = dataval[i];
                    let getNodoc = data.data.headers.filter(output => output.id == det.idpengeluarankasbank);
                    let nodoc = '';
                    if(getNodoc.length > 0){
                        nodoc = getNodoc[0].nodocument;
                    }
                    let obj = new Object();
                    obj.nodocument = nodoc;
                    obj.ischeck = false;
                    obj.idpricelist = 0;
                    obj.idwarehouse = 0;
                    obj.warehousename = '';
                    obj.idinvoicetype = det.idinvoiceitem;
                    obj.invoicetype = det.invoiceitemName;
                    obj.amount = det.amount;
                    obj.ismandatory = 'N';// == 'Y'?'Yes':'No';
                    obj.jalur = '';// == 'MERAH'?'Merah':'Hijau';
                    obj.qty = '1';
                    obj.diskon = '0';
                    obj.subtotal = det.amount;
                    obj.idpengeluarankasbank = det.idpengeluarankasbank;
                    listitem.push(obj);
                }
                calculateTotalInvoice(listitem,InputDiskonNota,InputPPN,InputNilaiPPN);
                setInputListItem(listitem);
            }
            
        }
        setLoading(false);
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

     const calculateTotalInvoice = (ppnjasa,nilaijasa, nilaireimbursement) => {
        
        let ppnJasaTemp = 0;
        if(ppnjasa !== '' && ppnjasa !== null && ppnjasa !== undefined){
            ppnJasaTemp = removeFormatRupiah(ppnjasa);
        }
        
        let nilaiJasaTemp = 0;
        if(nilaijasa !== '' && nilaijasa !== null && nilaijasa !== undefined){
            nilaiJasaTemp = removeFormatRupiah(nilaijasa);
        }
        let nilaiReimbursementTemp = 0;
        if(nilaireimbursement !== '' && nilaireimbursement !== null && nilaireimbursement !== undefined){
            nilaiReimbursementTemp = removeFormatRupiah(nilaireimbursement);
        }
        let total = parseFloat(ppnJasaTemp) + parseFloat(nilaiJasaTemp) + parseFloat(nilaiReimbursementTemp);
        setInputTotalInvoice(formatRupiah(total,2));
        
    }
    
    return (
        <Formik
        initialValues={
            {
                invoicenumber:InputInvoiceNumber,
                invoicenumberjasa:InputInvoiceNumberJasa,
                invoicenumberreimbursement:InputInvoiceNumberReimbursement,
                nilaijasa:InputNilaiJasa,
                nilaireimbursement:InputNilaiReimbursement,
                tanggal:InputTanggal,
                customer:InputCustomer,
                refno:InputRefNo,
                deliveredto:InputDeliveredTo,
                delivereddate:InputDeliveredDate,
                wo:SelWO,
                sj:SelSJ,
                nilaippn:InputNilaiPPN,
                total:InputTotalInvoice,
                jalurname:InputJalurName,
                notes1:InputNotes1,
                nofakturpajak:InputNoFakturPajak,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddInvoice">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addInvoice} label={'Add Invoice'} labeldefault={'Add Invoice'} />
                            <div className="row mt-2">
                            
                            <div className="mt-1 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="invoicenumber">
                                {i18n.t('Invoice Number')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="invoicenumber"
                                type="text"
                                id="invoicenumber"
                                maxLength={50}
                                onChange={val => handleInputInvoiceNumber(val)}
                                onBlur={handleBlur}
                                value={values.invoicenumber}
                                // disabled={true}
                            />
                            <div className="invalid-feedback-custom">{ErrInputInvoiceNumber}</div>

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
                                    onChange={val => handleChangeTanggal(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.tanggal}
                                    // style={{width: '25%'}}
                                    disabled={false}                       
                            />
                            <div className="invalid-feedback-custom">{ErrInputTanggal}</div>

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

                            <label className="mt-3 form-label required" htmlFor="wo">
                                {i18n.t('Work Order')}
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="wo"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeWo(val)}
                                onBlur={val => setFieldTouched("wo", val?.value ? val.value : '')}
                                data={ListWO}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.wo}
                            />

                            <div hidden={values.invtype == 'DP'}>
                            <label className="mt-3 form-label required" htmlFor="jalurname">
                                {i18n.t('Penjaluran')}
                            </label>
                            <Input
                                name="jalurname"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="jalurname"
                                // maxLength={30}
                                // onChange={val => handleInputDeliveredTo(val)}
                                onBlur={handleBlur}
                                disabled={true}
                                value={values.jalurname}
                            />

                            <div hidden={SelInvoiceType == 'REIMBURSEMENT'}>
                            <label className="mt-3 form-label required" htmlFor="sj">
                                {i18n.t('Surat Jalan')}
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="sj"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeSj(val)}
                                    onBlur={val => setFieldTouched("sj", val?.value ? val.value : '')}
                                    data={ListSJ}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.sj}
                                    disabled={SelInvoiceType == 'REIMBURSEMENT'}
                                />
                            </div>
                            </div>


                            <label className="mt-3 form-label required" htmlFor="refno">
                                {i18n.t('Ref. No')}
                                {/* <span style={{color:'red'}}>*</span> */}
                            </label>
                            <Input
                                name="refno"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="refno"
                                maxLength={30}
                                onChange={val => handleInputRefNo(val)}
                                onBlur={handleBlur}
                                value={values.refno}
                                disabled={true}
                            />
                            <div className="invalid-feedback-custom">{ErrInputRefNo}</div>

                            <label className="mt-3 form-label required" htmlFor="delivereddate">
                                {i18n.t('Delivery Date')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <DatePicker
                                    name="delivereddate"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleChangeDeliveryDate(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.delivereddate}
                                    // style={{width: '25%'}}
                                    disabled={true}                       
                            />
                            <div className="invalid-feedback-custom">{ErrInputDeliveredDate}</div>

                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            
                            <label className="mt-3 form-label required" htmlFor="invoicenumber">
                                {i18n.t('No Invoice Jasa')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="invoicenumberjasa"
                                type="text"
                                id="invoicenumberjasa"
                                maxLength={50}
                                // onChange={val => handleInputInvoiceNumber(val)}
                                onBlur={handleBlur}
                                value={values.invoicenumberjasa}
                                disabled={true}
                            />

                            <label className="mt-3 form-label" htmlFor="nilaijasa">
                                {'Nilai Jasa'}
                            </label>
                            <Input
                                name="nilaijasa"
                                type="text"
                                id="nilaijasa"
                                maxLength={200}
                                onChange={val => handleInputNilaiJasa(val)}
                                onBlur={handleBlur}
                                value={values.nilaijasa}
                                disabled={values.wo == ''}
                            />

                            <label className="mt-3 form-label required" htmlFor="invoicenumber">
                                {i18n.t('No Invoice Tagihan Pihak Ke-3')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="invoicenumberreimbursement"
                                type="text"
                                id="invoicenumberreimbursement"
                                maxLength={50}
                                // onChange={val => handleInputInvoiceNumber(val)}
                                onBlur={handleBlur}
                                value={values.invoicenumberreimbursement}
                                disabled={true}
                            />
                            <label className="mt-3 form-label" htmlFor="nilaireimbursement">
                                {'Tagihan Pihak Ke-3'}
                            </label>
                            <Input
                                name="nilaireimbursement"
                                type="text"
                                id="nilaireimbursement"
                                maxLength={200}
                                onChange={val => handleInputNilaiReimbursement(val)}
                                onBlur={handleBlur}
                                value={values.nilaireimbursement}
                                disabled={values.wo == ''}
                            />

                            <label className="mt-3 form-label required" htmlFor="nilaippn">
                                {i18n.t('PPN Jasa')}
                            </label>
                            <Input
                                name="nilaippn"
                                type="text"
                                id="nilaippn"
                                onChange={val => handleChangeNilaiPPN(val)}
                                onBlur={handleBlur}
                                // value={values.nilaippn !== ''?numToMoney(values.nilaippn):''}
                                value={values.nilaippn}
                                disabled={values.wo == ''}
                            />
                            

                            <label className="mt-3 form-label required" htmlFor="total">
                                {('Total Invoice')}
                            </label>
                            <Input
                                name="total"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="total"
                                // maxLength={30}
                                // onChange={val => handleChangeTotalInvoice(val)}
                                onBlur={handleBlur}
                                value={values.total}
                                disabled={true}
                            />

                            <label className="mt-3 form-label" htmlFor="notes1">
                                {'Catatan'}
                            </label>
                            <Input
                                name="notes1"
                                type="text"
                                id="notes1"
                                maxLength={200}
                                onChange={val => handleInputNotes1(val)}
                                onBlur={handleBlur}
                                value={values.notes1}
                            />

                            <label className="mt-3 form-label" htmlFor="nofakturpajak">
                                {'No. Faktur Pajak'}
                            </label>
                            <Input
                                name="nofakturpajak"
                                type="text"
                                id="nofakturpajak"
                                maxLength={200}
                                onChange={val => handleInputNoFakturPajak(val)}
                                onBlur={handleBlur}
                                value={values.nofakturpajak}
                            />
                              </div>
                            
                            </div>

                            <div hidden={values.invtype == 'DP'}>
                            
                            {
                                    <table id="tablegrid" hidden={SelInvoiceType == 'REIMBURSEMENT'}>
                                        <tr>
                                            <th>{i18n.t('No Surat Jalan')}</th>
                                            <th>{i18n.t('Gudang')}</th>
                                            <th>{i18n.t('No Container')}</th>
                                            <th>{i18n.t('Tanggal Loading/Unloading')}</th>
                                            {/* <th>{i18n.t('Partai')}</th> */}
                                        </tr>
                                        <tbody>
                                            {
                                                ListSuratJalanWO.map((x, i) => {
                                                    return(
                                                        <tr>
                                                            <td>{x.nosj}</td>
                                                            <td>{x.warehouse}</td>
                                                            <td>{x.nocontainer}</td>
                                                            <td>{x.tanggalkembali !== null?x.tanggalkembali:''}</td>
                                                            {/* <td>{x.partai}</td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    
                                }
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
                                            seacrhtype = {'CUSTOMERINVOICE'}
                                            errorHandler = {errorHandler}
                                            handlesearch = {handleQuickSeacrh}
                                            placeholder = {'Pencarian Berdasarkan Nama Atau Alias'}
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