import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {Input,Button} from 'reactstrap';
import * as actions                 from '../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize,inputJustNumberAndCommaDot,formatMoney, numToMoney,numConvToValDB, formatRupiah, removeFormatRupiah } from '../shared/globalFunc';
import { editPenerimaanKasBank_Permission} from '../shared/permissionMenu';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker}      from 'react-widgets';
import { formatdate} from '../shared/constantValue';
import * as pathmenu           from '../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { IconButton } from '@material-ui/core';
import '../CSS/table.css';

import SearchIcon from '@material-ui/icons/Search';
import FormSearch from '../../components/FormSearch';
import styled                       from "styled-components";
import Dialog                       from '@material-ui/core/Dialog';
const StyledDialog = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 500px;
  }
`;

export default function AddForm(props) {
    reloadToHomeNotAuthorize(editPenerimaanKasBank_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ShowQuickSearchWO, setShowQuickSearchWO] = useState(false);
    const [ShowQuickSearchINV, setShowQuickSearchINV] = useState(false);
    const [InputIndex, setInputIndex] = useState('');
    const [InputIndexIdWo, setInputIndexIdWo] = useState('');
    const [LoadingSend, setLoadingSend] = useState(false);

    const [InputNoDoc, setInputNoDoc] = useState('');
    const [InputReceiveDate, setInputReceiveDate] = useState(new Date());
    const [ErrInputReceiveDate, setErrInputReceiveDate] = useState('');

    const [InputReceiveFrom, setInputReceiveFrom] = useState('');
    const [ErrInputReceiveFrom, setErrInputReceiveFrom] = useState('');

    const [ListCOATemplate, setListCOATemplate] = useState([]);
    const [ListCOA, setListCOA] = useState([]);
    const [SelCOA, setSelCOA] = useState('');
    const [ErrSelCOA, setErrSelCOA] = useState('');

    const [ListBank, setListBank] = useState([]);
    const [SelBank, setSelBank] = useState('');
    const [ErrSelBank, setErrSelBank] = useState('');

    const [InputKeterangan, setInputKeterangan] = useState('');

    const [ListWO, setListWO] = useState([]);
    const [ListChooseYN, setListChooseYN] = useState([]);

    const [InputListItem, setInputListItem] = useState([{ idcoa:"",catatan: "",amount:"",isdownpayment:"",idinvoice:"",nodocinv:"",idworkorder:"",nodocwo:"",penyesuaian:"",ketpenyesuaian:"",nilaijasa:"",nilaireimbursement:"",nilaibuktipotong:"",nobuktipotong:"",tanggalbuktipotong:null,nilaippn:""}]);
    const [ErrInputCatatan, setErrInputCatatan] = useState('');
    const [ErrInputAmount, setErrInputAmount] = useState('');
    const [ErrNilaiBuktiPotong, setErrNilaiBuktiPotong] = useState('');
    const [ErrNoBuktiPotong, setErrNoBuktiPotong] = useState('');
    const [ErrTglBuktiPotong, setErrTglBuktiPotong] = useState('');
    const [ErrIsDownPayment, setErrIsDownPayment] = useState('');
    const [ErrSelWO, setErrSelWO] = useState('');
    const [ErrItems, setErrItems] = useState('');

    const [SelReceiveFrom, setSelReceiveFrom] = useState('');
    const ListReceiveFrom = [{value:'EMPLOYEE',label:'Employee'},{value:'CUSTOMER',label:'Customer'},{value:'VENDOR',label:'Vendor'}];
    const [InputReceiveFromName, setInputReceiveFromName] = useState('');
    const [ShowQuickSearch, setShowQuickSearch] = useState(false);

    const [InputWO, setInputWO] = useState('');
    const [InputIdWO, setInputIdWO] = useState('');
    const [DefaultCoa, setDefaultCoa] = useState('');

    const [ListItemDetail, setListItemDetail] = useState([]);

    const [ListJenisTransaksi, setListJenisTransaksi] = useState([]);
    const [SelJenisTransaksi, setSelJenisTransaksi] = useState('');
    //9995 a/ Pembayaran Customer Baru
    const [DataInvoice9995, setDataInvoice9995] = useState(null);
    const [InputInvoice9995, setInputInvoice9995] = useState('');
    const [InvoiceId9995, setInvoiceId9995] = useState('');
    const [ShowQuickSearchInvoice9995, setShowQuickSearchInvoice9995] = useState(false);

    const [valPPH, setValPPH] = useState(null);

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPenerimaanKasBankData('/template/'+id,successHandlerTemplate, errorHandler));
    }, []);

    const getReceiveFromName = (data) =>{
        if(data.idreceivetype){
            if(data.idreceivetype == 'EMPLOYEE'){
                setInputReceiveFrom(data.idemployee);
                setInputReceiveFromName(data.employeeName?data.employeeName:'');
            }else if(data.idreceivetype == 'CUSTOMER'){
                setInputReceiveFrom(data.idcustomer);
                setInputReceiveFromName(data.customerName?data.customerName:'');
            }else if(data.idreceivetype == 'VENDOR'){
                setInputReceiveFrom(data.idvendor);
                setInputReceiveFromName(data.vendorName?data.vendorName:'');
            }
        }else{
            setInputReceiveFrom("");
            setSelReceiveFrom("");
        }
        
    }

    const successHandlerTemplate = (data) =>{
        if(data.data){
            let det = data.data;
            let template = det.template;
            
            setValPPH(det.pph?det.pph:template.pph);
            setSelReceiveFrom(det.idreceivetype);
            getReceiveFromName(det);

            setInputNoDoc(det.nodocument);
            setInputReceiveDate(det.receivedate?moment(new Date(det.receivedate), formatdate).toDate():null);
            // setInputReceiveFrom(det.receivefrom);
            setSelCOA(det.idcoa);
            setSelBank(det.idbank);
            setInputKeterangan(det.keterangan);

            setListCOATemplate(template.coaOptions);
            

            let coaPenerimaanCust = template.coaOptions.filter(output => output.code == '9995');
            let jenisTrans = [];
            if(coaPenerimaanCust.length > 0){
                let el = coaPenerimaanCust[0];
                jenisTrans.push(
                    {
                        value: el.code,
                        label: el.nama,
                        idcoa: el.id,
                    }
                );
            }
            jenisTrans.push(
                {
                    value: 'LAINNYA',
                    label: 'Lainnya',
                    idcoa: 'LAINNYA',
                }
            );
            setListJenisTransaksi(jenisTrans);

            setCoa(template.coaOptions);
            // let listCOA = template.coaOptions.reduce((obj, el) => (
            //     [...obj, {
            //         value: el.id,
            //         // label: el.nama+' ('+el.code+')'
            //         label: el.nama
            //     }]
            // ), []);
            // listCOA.push({value:"nodata",label:"No Data"});

            // setListCOA(listCOA);

            // let defCOA = listCOA.filter(output => output.label == 'Pembayaran Customer');
            // let idcoa = "";
            // if(defCOA.length > 0){
            //     setDefaultCoa(defCOA[0].value);
            // }
            
            let listitems = [];
            let isCustomerBaru = false;
            setListItemDetail(data.data.details);
            if(data.data.details){
                for(let i=0; i < data.data.details.length; i++){
                    let det = data.data.details[i];
                    setInputIdWO(det.idworkorder?det.idworkorder:'');
                    setInputWO(det.nodocworkorder?det.nodocworkorder+' ('+det.noaju+')':'');
                    setInputInvoice9995(det.nodocinvoice?det.nodocinvoice:'');

                    let penyesuaian = det.penyesuaian ? det.penyesuaian:det.amount;
                    if(det.coacode == '9995'){
                        isCustomerBaru = true;
                        penyesuaian = det.penyesuaian ? det.penyesuaian:0;
                    }
                    
                    listitems.push({ idcoa:(det.coacode?det.coacode:''),catatan: det.catatan,amount:numToMoney(parseFloat(det.amount)),isdownpayment:det.isdownpayment ,idinvoice:(det.idinvoice?det.idinvoice:""),nodocinv:(det.nodocinvoice?det.nodocinvoice:""),idworkorder:(det.idworkorder?det.idworkorder:''),nodocwo:(det.nodocworkorder?det.nodocworkorder:""),penyesuaian:(penyesuaian ? formatRupiah(parseFloat(new String(penyesuaian).replaceAll('.',',')),2):0),ketpenyesuaian:det.keterangan_penyesuaian,nilaijasa:(det.nilaijasa?formatRupiah(new String(det.nilaijasa).replaceAll('.',','),2):0) ,nilaireimbursement:(det.nilaireimbursement?formatRupiah(new String(det.nilaireimbursement).replaceAll('.',','),2):0),nilaibuktipotong:(det.nilaibuktipotong?formatRupiah(new String(det.nilaibuktipotong).replaceAll('.',','),2):0),nobuktipotong:(det.nobuktipotong),tanggalbuktipotong:(det.tanggalbuktipotong?new Date(det.tanggalbuktipotong):null),nilaippn:(det.nilaippn?formatRupiah(new String(det.nilaippn).replaceAll('.',','),2):0)});
                }
            }
            if(isCustomerBaru){
                setSelJenisTransaksi('9995');
            }else{
                setSelJenisTransaksi('LAINNYA');
            }
            
            if(listitems.length > 0){
                setInputListItem(listitems);
            }
            
            setListBank(template.bankOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.namabank
                }]
            ), []));

            setListWO(template.woOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nodocument+' ('+el.namaCustomer+')'
                }]
            ), []));

            setListChooseYN([{value:'Y',label:'Yes'},{value:'N',label:'No'}])
        }
        setLoading(false);
    }

    function setCoa(coaOptions){
            //9995 = Penerimaan Customer
            //9996 = Pembayaran Customer
            let listCOA = [];
            // let coaPenerimaanCust = coaOptions.filter(output => output.code == '9995');
            // if(coaPenerimaanCust.length > 0){
            //     let el = coaPenerimaanCust[0];
            //     listCOA.push(
            //         {
            //             value: el.code,
            //             label: el.nama,
            //             idcoa: el.id,
            //         }
            //     );
            // }
            for(let i=0; i < coaOptions.length; i++){
                let el = coaOptions[i];
                if(el.code !== '9995' && el.code !== '9996'){
                    listCOA.push(
                        {
                            value: el.code,
                            label: el.nama,
                            idcoa: el.id,
                        }
                    );
                }
            }
            let coaPembayaranCust = coaOptions.filter(output => output.code == '9996');
            if(coaPembayaranCust.length > 0){
                let el = coaPembayaranCust[0];
                listCOA.push(
                    {
                        value: el.code,
                        label: el.nama,
                        idcoa: el.id,
                    }
                );
            }
            

            setListCOA(listCOA);
    }

    const handleChangeTanggalBuktiPotong = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        const list = [...InputListItem];
        if(data !== null){
            list[0]['tanggalbuktipotong'] = moment(data, formatdate).toDate();
            // setInputReceiveDate(moment(data, formatdate).toDate())
        }else{
            list[0]['tanggalbuktipotong'] = null;
        }
        setInputListItem(list);
    }

    const handleChangeJenisTransaksi = (data) =>{
        let id = data?.value ? data.value : '';
        setSelJenisTransaksi(id);
        setCoa(ListCOATemplate);
        let defCOA = [];
        if(id == '9995'){
            defCOA = ListCOATemplate.filter(output => output.code == '9995');
        }else{
            if(SelReceiveFrom == 'CUSTOMER'){
                setCoa(ListCOATemplate);
                 defCOA = ListCOATemplate.filter(output => output.code == '9996');
            }else{
                let coaOptions = ListCOATemplate.filter(output => output.code !== '9995' && output.code !== '9996');
                setCoa(coaOptions);
                defCOA = coaOptions.filter(output => output.code == '9999');
            }
        }
        
        if(defCOA.length > 0){
            // InputListItem[0].idcoa = defCOA[0].code;
            setDefaultCoa(defCOA[0].code);
            const theData = [
                {
                    'idcoa': defCOA[0].code,
                    'catatan': "",
                    'amount':'',
                    'isdownpayment':"",
                    'idinvoice':'',
                    'nodocinv':'',
                    'idworkorder':'',
                    'nodocwo':'',
                    'penyesuaian':'',
                    'ketpenyesuaian':'',
                    'nilaijasa':'',
                    'nilaireimbursement':'',
                    'nilaibuktipotong':'',
                    'nobuktipotong':'',
                    'tanggalbuktipotong':null,
                    'nilaippn':''
                }
            ];
            
            setInputListItem(theData);
            
            // setInputListItem(InputListItem);
        }
        
    }

    const handleChangeReceiveType = (data) =>{
        let id = data?.value ? data.value : '';
        setSelReceiveFrom(id);
        setInputReceiveFrom('');
        setInputReceiveFromName('');
        setSelJenisTransaksi('');
        if(id == 'CUSTOMER'){
            setCoa(ListCOATemplate);
             let defCOA = ListCOATemplate.filter(output => output.code == '9996');
            if(defCOA.length > 0){
                // InputListItem[0].idcoa = defCOA[0].code;
                setDefaultCoa(defCOA[0].code);
                const theData = [
                    {
                        'idcoa': defCOA[0].code,
                        'catatan': "",
                        'amount':'',
                        'isdownpayment':"",
                        'idinvoice':'',
                        'nodocinv':'',
                        'idworkorder':'',
                        'nodocwo':'',
                        'penyesuaian':'',
                        'ketpenyesuaian':'',
                        'nilaijasa':'',
                        'nilaireimbursement':'',
                        'nilaibuktipotong':'',
                        'nobuktipotong':'',
                        'tanggalbuktipotong':null,
                        'nilaippn':''
                    }
                ];
                
                setInputListItem(theData);
                
                // setInputListItem(InputListItem);
            }
        }else{
            let coaOptions = ListCOATemplate.filter(output => output.code !== '9995' && output.code !== '9996');
            setCoa(coaOptions);
            let defCOA = coaOptions.filter(output => output.code == '9999');
            if(defCOA.length > 0){
                setDefaultCoa(defCOA[0].code);
                const theData = [
                    {
                        'idcoa': defCOA[0].code,
                        'catatan': "",
                        'amount':'',
                        'isdownpayment':"",
                        'idinvoice':'',
                        'nodocinv':'',
                        'idworkorder':'',
                        'nodocwo':'',
                        'penyesuaian':'',
                        'ketpenyesuaian':'',
                        'nilaijasa':'',
                        'nilaireimbursement':'',
                        'nilaibuktipotong':'',
                        'nobuktipotong':'',
                        'tanggalbuktipotong':null,
                        'nilaippn':''
                    }
                ];
                
                setInputListItem(theData);
                // InputListItem[0].idcoa = defCOA[0].code;
                // setDefaultCoa(defCOA[0].code);
                // setInputListItem(InputListItem);
            }
        }
    }
    const handleShowQuickSearch = () =>{
        if(SelReceiveFrom !== ''){
            setShowQuickSearch(true);
        }
    }

    const handleQuickSeacrh = (data) =>{
        setShowQuickSearch(false);
        setInputReceiveFrom(data.id);
        if(SelReceiveFrom == 'EMPLOYEE'){
            setInputReceiveFromName(data.nama);
        }else if(SelReceiveFrom == 'CUSTOMER'){
            setInputReceiveFromName(data.customername);
        }else if(SelReceiveFrom == 'VENDOR'){
            setInputReceiveFromName(data.nama);
        }

        setInputIdWO('');
        setInputWO('');
        // setInputCustomer(data.customername);
        // setInputCustomerID(data.id);
    }

    const handleInputReceiveFrom = (data) =>{
        let val = data.target.value;
        setInputReceiveFrom(val)
    }

    const handleInputKeterangan = (data) =>{
        let val = data.target.value;
        setInputKeterangan(val)
    }

    const handleChangeCoa = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCOA(id);
    }

    const handleChangeBank = (data) =>{
        let id = data?.value ? data.value : '';
        setSelBank(id);
    }

    const handleChangeReceiveDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputReceiveDate(moment(data, formatdate).toDate())
        }else{
            setInputReceiveDate(null)
        }
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputReceiveDate('');
        setErrInputReceiveFrom('');
        setErrSelCOA('');
        setErrSelBank('');
        setErrInputCatatan('');
        setErrInputAmount('');
        setErrIsDownPayment('');
        setErrSelWO('');
        setErrItems('');
        setErrNilaiBuktiPotong('');
        setErrNoBuktiPotong('');
        setErrTglBuktiPotong('');

        let listitems = [];
        if(InputListItem.length > 0){
            for(let i=0; i < InputListItem.length; i++){
                let det = InputListItem[i];
                if(det.idcoa !== '' || det.catatan !== '' || det.amount !== ''  || det.idinvoice !== '' || det.idworkorder !== '' ){
                    // if(det.catatan == ''){
                    //     setErrInputCatatan(i18n.t('Catatan')+' '+i18n.t('label_REQUIRED'));
                    //     flag = false;
                    // }

                    if(det.amount == ''){
                        setErrInputAmount(i18n.t('Amount')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                    if(SelJenisTransaksi == '9995'){
                        if((det.nilaibuktipotong !== '' && parseFloat(removeFormatRupiah(det.nilaibuktipotong)) > 0) || det.nobuktipotong !== '' || (det.tanggalbuktipotong !== '' && det.tanggalbuktipotong !== null) ){
                            // if(det.nobuktipotong == ''){
                            //     setErrNoBuktiPotong(i18n.t('No Bukti Potong')+' '+i18n.t('label_REQUIRED'));
                            //     flag = false;
                            // }

                            // if(det.nilaibuktipotong == ''){
                            //     setErrNoBuktiPotong(i18n.t('Nilai Bukti Potong')+' '+i18n.t('label_REQUIRED'));
                            //     flag = false;
                            // }else if(parseFloat(removeFormatRupiah(det.nilaibuktipotong)) <= 0){
                            //     setErrNilaiBuktiPotong(i18n.t('Nilai Bukti Potong')+' '+i18n.t('label_REQUIRED'));
                            //     flag = false;
                            // }

                            // if(det.tanggalbuktipotong == '' || det.tanggalbuktipotong == null){
                            //     setErrTglBuktiPotong(i18n.t('Tanggal Bukti Potong')+' '+i18n.t('label_REQUIRED'));
                            //     flag = false;
                            // }
                        }
                    }

                    // if(det.isdownpayment == ''){
                    //     setErrIsDownPayment(i18n.t('DP')+' '+i18n.t('label_REQUIRED'));
                    //     flag = false;
                    // }else{
                    //     if(det.isdownpayment == 'Y'){
                    //         if(det.idworkorder == ''){
                    //             setErrSelWO(i18n.t('WO')+' '+i18n.t('label_REQUIRED'));
                    //             flag = false;
                    //         }
                    //     }
                    // }
                    listitems.push(det);
                }
            }
        }

        if(listitems.length == 0){
            setErrItems(i18n.t('Items')+' '+i18n.t('label_REQUIRED')+' , Invoice Not Found');
            flag = false;
        }

        if(InputReceiveDate == null){
            setErrInputReceiveDate(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputReceiveFrom == ''){
            setErrInputReceiveFrom(i18n.t('label_REQUIRED'));
            flag = false;
        }

        // if(SelCOA == ''){
        //     setErrSelCOA(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }

        if(SelBank == ''){
            setErrSelBank(i18n.t('label_REQUIRED'));
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
            let idwo = InputIdWO;
            setLoading(true);
            let obj = new Object();
            obj.receivedate = moment(InputReceiveDate).toDate().getTime();
            obj.receivefrom = "";

            obj.idreceivetype = SelReceiveFrom;
            if(SelReceiveFrom == 'EMPLOYEE'){
                obj.idemployee = InputReceiveFrom;
                obj.idcustomer = null;
                obj.idvendor = null;
                idwo = null;
            }else if(SelReceiveFrom == 'CUSTOMER'){
                obj.idemployee = null;
                obj.idcustomer = InputReceiveFrom;
                obj.idvendor = null;
            }else if(SelReceiveFrom == 'VENDOR'){
                obj.idemployee = null;
                obj.idcustomer = null;
                obj.idvendor = InputReceiveFrom;
                idwo = null;
            }

            obj.idcoa = null;//SelCOA;
            obj.idbank = SelBank;
            obj.keterangan = InputKeterangan;
            obj.isactive = true;
            obj.idwo = idwo;
            obj.pph = valPPH;
            let listdetails = [];
            if(InputListItem.length > 0){
                for(let i=0; i < InputListItem.length; i++){
                    let det = InputListItem[i];
                    if(det.amount !== ''){

                        let objDet = new Object();
                        
                        let filterCoa = ListCOATemplate.filter(output => output.code === det.idcoa);
                        
                        let idcoa = null;
                        if(filterCoa.length > 0){
                            
                            idcoa = filterCoa[0].id;
                        }
                        objDet.idcoa = idcoa;//det.idcoa !== '' && det.idcoa !== 'nodata' ? det.idcoa:null;
                        objDet.catatan = det.catatan;
                        if(SelJenisTransaksi == '9995'){
                            let penyesuaian = det.penyesuaian;
                            if(new String(penyesuaian).includes('(')){
                                penyesuaian = new String(penyesuaian).replaceAll('(','');
                                penyesuaian = new String(penyesuaian).replaceAll(')','');
                                penyesuaian = '-'+penyesuaian;
                            }
                            objDet.amount = removeFormatRupiah(det.amount);
                            objDet.penyesuaian = det.penyesuaian !== ''?removeFormatRupiah(penyesuaian):0;
                            objDet.nilaijasa = det.nilaijasa !== ''?removeFormatRupiah(det.nilaijasa):0;
                            objDet.nilaireimbursement =  ListItemDetail.length > 0?ListItemDetail[0].nilaireimbursement :0;//DataInvoice9995.nilaireimbursement?DataInvoice9995.nilaireimbursement:0;
                            objDet.nilaibuktipotong = det.nilaibuktipotong !== ''?removeFormatRupiah(det.nilaibuktipotong):0;
                            objDet.nobuktipotong = det.nobuktipotong;
                            objDet.tanggalbuktipotong = det.tanggalbuktipotong !== null && det.tanggalbuktipotong !== ''?new Date(det.tanggalbuktipotong).getTime() :null;
                            objDet.nilaippn = ListItemDetail.length > 0?ListItemDetail[0].nilaippn :0;//DataInvoice9995.nilaippn?DataInvoice9995.nilaippn:0;
                        }else{
                            objDet.amount = numConvToValDB(det.amount);
                            objDet.penyesuaian = numConvToValDB(det.penyesuaian);
                            objDet.nilaijasa = 0;
                            objDet.nilaireimbursement = 0;
                            objDet.nilaibuktipotong = 0;
                            objDet.nobuktipotong = '';
                            objDet.tanggalbuktipotong = null;
                            objDet.nilaippn = 0;
                        }
                        // objDet.amount = numConvToValDB(det.amount);//.replaceAll('.','').replaceAll(',','.');
                        // objDet.penyesuaian = numConvToValDB(det.penyesuaian);
                        objDet.keterangan_penyesuaian = det.ketpenyesuaian;
                        objDet.isdownpayment = "N";//det.isdownpayment;
                        objDet.idinvoice = det.idinvoice !== '' ? det.idinvoice:null;
                        objDet.idworkorder = idwo;//det.idworkorder !== '' ? det.idworkorder:null;
                        listdetails.push(objDet);
                    }
                }
            }
            obj.details = listdetails;
            dispatch(actions.submitEditPenerimaanKasBank('/'+id,obj,succesHandlerSubmit, errorHandler));
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
        setShowQuickSearchWO(false);
        setShowQuickSearchINV(false);
        setShowQuickSearchInvoice9995(false);
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const handleCopyValue9995 = (value,name, index) => {
        // const list = [...InputListItem];
        // list[index][name] = value;
        let obj = {target:{name:name,value:value}};
        handleInputChange9995(obj,index);
        // setInputListItem(list);
    }
    const handleInputChange9995 = (e, index) => {
        const { name, value } = e.target;
        let valTemp = value;
        let flag = true;
        const list = [...InputListItem];
        if(name == 'amount' || name == 'penyesuaian'){
            if (isNaN(value) && value !== '') {
                flag = false;
                if(new String(value).split(',').length >= 3){
                    flag = false;
                }else{
                    flag = true;
                }
            }
        }
        if (flag) {
            let valPriceTemp = '';
            if(new String(value).includes(',')){
                let splitComma = new String(value).split(','); 
                let angka = splitComma[0];
                let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                valPriceTemp = removeFormatRupiah(angka)+'.'+desimal;
            }else{
                valPriceTemp = removeFormatRupiah(value);
            }
            if(name == 'amount' || name == 'nilaibuktipotong'){
                let nilaireimbursement = ListItemDetail.length > 0? parseFloat(ListItemDetail[0].nilaireimbursement):0;
                let nilaippn = ListItemDetail.length > 0? parseFloat(ListItemDetail[0].nilaippn):0;
                let totalinvoice = ListItemDetail.length > 0? parseFloat(ListItemDetail[0].invtotalinvoice):0;
                let netTotalInvoice = totalinvoice - (nilaireimbursement + nilaippn);
                let totalReimbursement = nilaireimbursement + nilaippn;

                let nilaitempamount = 0;
                if(name == 'amount'){
                    nilaitempamount = valPriceTemp;
                }else{
                    nilaitempamount = list[index]['amount'];
                }
                if(new String(nilaitempamount).includes(',')){
                    let splitComma = new String(nilaitempamount).split(','); 
                    let angka = splitComma[0];
                    let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                    nilaitempamount = removeFormatRupiah(angka)+'.'+desimal;
                }else{
                    nilaitempamount = removeFormatRupiah(nilaitempamount);
                }
                nilaitempamount = parseFloat(nilaitempamount);

                let nilaijasa = nilaitempamount - totalReimbursement;
                list[index]['nilaijasa'] = formatRupiah(new String(nilaijasa).replaceAll('.',','),2);

                // let nilaibuktipotong = 0;
                // if(name == 'nilaibuktipotong'){
                //     if(valPriceTemp !== ''){
                //         nilaibuktipotong = valPriceTemp;
                //     }
                    
                // }else{
                //     let pph = valPPH;
                //     let pphPersen = parseFloat(parseFloat(pph) / 100).toFixed(2);
                    
                //     let nilaiBP = nilaijasa * pphPersen;
                    
                //     nilaibuktipotong = nilaiBP;//list[index]['nilaibuktipotong'] !== ''?list[index]['nilaibuktipotong']:0;
                //     nilaibuktipotong = new String(nilaibuktipotong).replaceAll('.',',');
                // }
                // if(new String(nilaibuktipotong).includes(',')){
                //     let splitComma = new String(nilaibuktipotong).split(','); 
                //     let angka = splitComma[0];
                //     let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                //     nilaibuktipotong = removeFormatRupiah(angka)+'.'+desimal;
                // }else{
                //     nilaibuktipotong = removeFormatRupiah(nilaibuktipotong);
                // }
                // nilaibuktipotong = parseFloat(nilaibuktipotong);
                let nilaibuktipotong = 0;
                if(name == 'nilaibuktipotong'){
                    if(valPriceTemp !== ''){
                        nilaibuktipotong = valPriceTemp;
                    }
                    
                }else {
                    nilaibuktipotong = list[index]['nilaibuktipotong'] !== ''?list[index]['nilaibuktipotong']:0;
                    nilaibuktipotong = removeFormatRupiah(nilaibuktipotong);
                }
                netTotalInvoice = netTotalInvoice - nilaibuktipotong;
                // if(name == 'amount'){
                //     list[index]['nilaibuktipotong'] = formatRupiah(new String(nilaibuktipotong).replaceAll('.',','),2);
                // }
                // 'penyesuaian':'',
                // 'ketpenyesuaian':'',

                netTotalInvoice = nilaijasa - netTotalInvoice;
                let nilaiPenyesuaian = '';
                let ketPenyesuaian = '';
                if(netTotalInvoice > 0){
                    nilaiPenyesuaian = formatRupiah(new String(netTotalInvoice).replaceAll('.',','),2);
                    ketPenyesuaian = 'Lebih Bayar';
                }else if(netTotalInvoice < 0){
                    nilaiPenyesuaian = '('+formatRupiah(new String(Math.abs(netTotalInvoice)).replaceAll('.',','),2)+')';
                    ketPenyesuaian = 'Kurang Bayar';
                }
                list[index]['penyesuaian'] = nilaiPenyesuaian;
                list[index]['ketpenyesuaian'] = ketPenyesuaian;

                list[index][name] = formatRupiah(new String(valPriceTemp).replaceAll('.',','),2);
            }else{
                list[index][name] = value;
            }
            
        }
        list[index]['idinvoice'] = ListItemDetail.length > 0?ListItemDetail[0].idinvoice:'';
        setInputListItem(list);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        let valTemp = value;
        const list = [...InputListItem];
        if(name == 'amount' || name == 'penyesuaian'){
            let flagReg = inputJustNumberAndCommaDot(value);
            if(flagReg){
                valTemp = formatMoney(value);
                list[index][name] = valTemp;
            }
        }else{
            // const list = [...InputListItem];
            list[index][name] = valTemp;
        }
        setInputListItem(list);
    };

    const handleInputDropDownChange = (e, index,name) => {
        const list = [...InputListItem];
        list[index][name] = e.value;
        setInputListItem(list);
    };    

    const handleAddClick = () => {
        let defCOA = ListCOA.filter(output => output.label == 'Pembayaran Customer');
        let idcoa  = "";
        if(defCOA.length > 0){
            idcoa = defCOA[0].value;
        }
        setInputListItem([...InputListItem, { idcoa:idcoa,catatan: "",amount:"",isdownpayment:"",idinvoice:"",nodocinv:"",idworkorder:"",nodocwo:"",penyesuaian:"",ketpenyesuaian:"",nilaijasa:"",nilaireimbursement:"",nilaibuktipotong:"",nobuktipotong:"",tanggalbuktipotong:null,nilaippn:""}]);
    };
    
    const handleRemoveClick = index => {
        const list = [...InputListItem];
        list.splice(index, 1);
        setInputListItem(list);
    };

    const handleDeleteWO = (e, index) => {
        const list = [...InputListItem];
        list[index]['idworkorder'] = '';
        list[index]['nodocwo'] = '';

        list[index]['idinvoice'] = '';
        list[index]['nodocinv'] = '';
        setInputListItem(list);
    };

    const handleDeletehINV = (e, index) => {
        const list = [...InputListItem];
        list[index]['idinvoice'] = '';
        list[index]['nodocinv'] = '';
        setInputListItem(list);
    };

    const handleShowQuickSearchWO = (e, index) => {
        setErrInputReceiveFrom("");
        if(InputReceiveFrom !== ""){
            setShowQuickSearchWO(true);
            // setInputIndex(index);
        }
    };

    const handleShowQuickSearchInv9995 = () => {
        setErrInputReceiveFrom("");
        if(InputReceiveFrom !== ""){
            setShowQuickSearchInvoice9995(true);
        }else{
            setErrInputReceiveFrom(i18n.t('label_REQUIRED'));
        }
    };

    const handleShowQuickSearchInv = (e, index) => {
        setErrInputReceiveFrom("");
        if(InputReceiveFrom !== ""){
            const list = [...InputListItem];
            setShowQuickSearchINV(true);
            setInputIndex(index);
            setInputIndexIdWo(list[index]['idworkorder']);
        }
    };

    const handleQuickSeacrhWO = (data) =>{
        setShowQuickSearchWO(false);

        setInputIdWO(data.id);
        setInputWO(data.nodocument+' - '+data.noaju);

        setLoading(true);
        dispatch(actions.getPenerimaanKasBankData('/getListInvoiceNotPaid/'+data.id,successHandlerListInvNotPaid, errorHandler));

        // const list = [...InputListItem];
        // list[InputIndex]['idworkorder'] = data.id;
        // list[InputIndex]['nodocwo'] = data.nodocument;

        // list[InputIndex]['idinvoice'] = '';
        // list[InputIndex]['nodocinv'] = '';
        // setInputListItem(list);
        // setInputIndex('');
        //idcoa:"",catatan: "",amount:"",isdownpayment:"",idinvoice:"",nodocinv:"",idworkorder:"",nodocwo:""
    }

    const successHandlerListInvNotPaid = (data) =>{
        
        const theData = data.data.reduce((obj, el) => [
            ...obj,
            {
                'idcoa': DefaultCoa,
                'catatan': "",
                'amount':numToMoney(el.totalinvoice),
                'isdownpayment':"",
                'idinvoice':el.id,
                'nodocinv':el.nodocument,
                'idworkorder':'',
                'nodocwo':'',
                'penyesuaian':'',
                'ketpenyesuaian':'',
                'nilaijasa':'',
                'nilaireimbursement':'',
                'nilaibuktipotong':'',
                'nobuktipotong':'',
                'tanggalbuktipotong':null,
                'nilaippn':''
            }
        ], []);
        
        setInputListItem(theData);
        setLoading(false);
    }

    const handleQuickSeacrhINV9995 = (data) =>{
        setShowQuickSearchInvoice9995(false);
        let listDoc = [];
        let list = data.listpenerimaaninvoice?data.listpenerimaaninvoice:[]
        if(list != null && list != undefined){
            for(let i=0; i < list.length; i++){
                let det = list[i];
                listDoc.push(det.nodocument);
            }
        }
        if(listDoc.length > 0){
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: "Invoice ini sudah ada pada document "+listDoc.join(',')
            })
        }else{
            setInvoiceId9995(data.id);
            setInputInvoice9995(data.nodocument);
            setDataInvoice9995(data);

            const list = [...InputListItem];
            if(list.length > 0){
                let pph = valPPH;
                let pphPersen = parseFloat(parseFloat(pph) / 100).toFixed(2);
                let invnilaijasa = data.nilaijasa?parseFloat(data.nilaijasa):0;
                let nilaiBP = invnilaijasa * pphPersen;
                list[0]['nilaibuktipotong'] = formatRupiah(new String(nilaiBP).replaceAll('.',','),2);
                setInputListItem(list);   
            }
        }
        
    }

    const handleQuickSeacrhINV = (data) =>{
        setShowQuickSearchINV(false);
        let idwo = data.idwo != undefined && data.idwo != null && data.idwo != ''?data.idwo:0;

        const list = [...InputListItem];
        list[InputIndex]['idinvoice'] = data.id;
        list[InputIndex]['nodocinv'] = data.nodocument;

        let noocumentwo = data.noocumentwo?data.noocumentwo:'';
        if(noocumentwo !== ''){
            list[InputIndex]['idworkorder'] = idwo;
            list[InputIndex]['nodocwo'] = data.noocumentwo;
        }
        
        setInputListItem(list);
        setInputIndex('');
    }


    return (
        <Formik
        initialValues={
            {   
                nodoc:InputNoDoc,
                receivedate:InputReceiveDate,
                receivefrom:InputReceiveFromName,
                coa:SelCOA,
                bank:SelBank,
                keterangan:InputKeterangan,
                items:InputListItem,
                SelReceiveFrom:SelReceiveFrom,
                workorder:InputWO,
                jenistransaksi:SelJenisTransaksi,
                invoice9995:InputInvoice9995,
                datainvoice9995:DataInvoice9995,
                itemdetail:ListItemDetail
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddPenerimaanKasBank">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.editpenerimaankasbank+'/'+id} label={'Edit Penerimaan Kas/Bank'} labeldefault={'Edit Penerimaan Kas/Bank'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="nodoc">
                                {i18n.t('label_NO_DOCUMENT')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="nodoc"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nodoc"
                                maxLength={30}
                                // onChange={val => handleInput(val)}
                                onBlur={handleBlur}
                                value={values.nodoc}
                                disabled={true}
                            />

                            <label className="mt-3 form-label required" htmlFor="receivedate">
                                {i18n.t('label_RECEIVE_DATE')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DatePicker
                                    name="receivedate"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleChangeReceiveDate(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.receivedate}
                                    max={new Date()}
                                    // style={{width: '25%'}}
                            />
                            <div className="invalid-feedback-custom">{ErrInputReceiveDate}</div>

                            <label className="mt-3 form-label required" htmlFor="receivefrom">
                                {i18n.t('label_RECEIVE_FROM')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'100%'}}>
                            <tbody>
                            <td style={{width:'70%'}}>
                            <Input
                                name="receivefrom"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="receivefrom"
                                maxLength={200}
                                // onChange={val => handleInputReceiveFrom(val)}
                                disabled={true}
                                onBlur={handleBlur}
                                value={values.receivefrom}
                            />
                            </td>
                            <td style={{width:'30%'}}>
                            <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="SelReceiveFrom"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeReceiveType(val)}
                                    onBlur={val => setFieldTouched("SelReceiveFrom", val?.value ? val.value : '')}
                                    data={ListReceiveFrom}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    disabled={true}
                                    value={values.SelReceiveFrom}
                                />
                            </td>

                            {/* <td>
                                <IconButton color={'primary'}
                                    onClick={() =>handleShowQuickSearch()}
                                >
                                    <SearchIcon/>
                                </IconButton>
                                </td> */}
                            </tbody>
                            </table>
                            
                            <div className="invalid-feedback-custom">{ErrInputReceiveFrom}</div>

                            <div hidden={values.workorder == "" || values.SelReceiveFrom == "" || values.SelReceiveFrom == "EMPLOYEE" || values.SelReceiveFrom == "VENDOR"}>
                            <label className="mt-3 form-label required" htmlFor="workorder">
                                {i18n.t('Work Order')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'100%'}}>
                            <tbody>
                            <tr>
                                <td>
                                <Input
                                name="workorder"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="workorder"
                                // maxLength={200}
                                // onChange={val => handleInputChange(val,i)}
                                // onBlur={handleBlur}
                                disabled={true}
                                value={values.workorder}
                                />
                                
                                </td>

                                 {/* <td >
                                <IconButton color={'primary'}
                                    onClick={val =>handleShowQuickSearchWO("","")}
                                >
                                    <SearchIcon />
                                </IconButton>
                                </td>  */}
                            </tr>
                            </tbody>
                            </table>
                            </div>

                            {/* <label className="mt-3 form-label required" htmlFor="coa">
                                {i18n.t('COA')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="coa"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeCoa(val)}
                                    onBlur={val => setFieldTouched("coa", val?.value ? val.value : '')}
                                    data={ListCOA}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.coa}
                                />
                                <div className="invalid-feedback-custom">{ErrSelCOA}</div> */}

                            <label className="mt-3 form-label required" htmlFor="bank">
                                {i18n.t('To Kas/Bank')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="coa"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeBank(val)}
                                    onBlur={val => setFieldTouched("bank", val?.value ? val.value : '')}
                                    data={ListBank}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.bank}
                                />
                                <div className="invalid-feedback-custom">{ErrSelBank}</div>

                            <label className="mt-3 form-label required" htmlFor="keterangan">
                                {i18n.t('Keterangan')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="keterangan"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="textarea"
                                id="keterangan"
                                maxLength={200}
                                onChange={val => handleInputKeterangan(val)}
                                onBlur={handleBlur}
                                value={values.keterangan}
                            />

                            <div hidden={values.SelReceiveFrom !== 'CUSTOMER'}>
                            <label className="mt-3 form-label required" htmlFor="jenistransaksi">
                                {i18n.t('Jenis Transaksi')}
                            </label>
                                <DropdownList
                                    name="jenistransaksi"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeJenisTransaksi(val)}
                                    onBlur={val => setFieldTouched("jenistransaksi", val?.value ? val.value : '')}
                                    data={ListJenisTransaksi}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    disabled={true}
                                    value={values.jenistransaksi}
                                />
                            </div>

                            <div hidden={values.jenistransaksi !== "9995" }>
                            <label className="mt-3 form-label required" htmlFor="workorder">
                                {i18n.t('Invoice')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'100%'}}>
                            <tbody>
                            <tr>
                                <td>
                               
                                <Input
                                name="invoice9995"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="invoice9995"
                                // maxLength={200}
                                // onChange={val => handleInputChange(val,i)}
                                // onBlur={handleBlur}
                                disabled={true}
                                value={values.invoice9995}
                                />
                                
                                
                                </td>

                                 {/* <td width={'10px'}>
                                <IconButton color={'primary'}
                                    onClick={val =>handleShowQuickSearchInv9995()}
                                >
                                    <SearchIcon />
                                </IconButton>
                                </td>  */}

                                {/* <td hidden={values.workorder == ''}>
                                <IconButton color={'primary'}
                                    onClick={val =>handleDeleteValueSeacrhWO()}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                                </td> */}
                            </tr>
                            </tbody>
                            </table>
                            </div>

                            </div>
                            </div>

                            <div className="invalid-feedback-custom">{ErrItems}</div>
                            <div className="invalid-feedback-custom">{ErrSelWO}</div>
                            <div className="invalid-feedback-custom">{ErrInputCatatan}</div>
                            <div className="invalid-feedback-custom">{ErrInputAmount}</div>
                            <div className="invalid-feedback-custom">{ErrNilaiBuktiPotong}</div>
                            <div className="invalid-feedback-custom">{ErrNoBuktiPotong}</div>
                            <div className="invalid-feedback-custom">{ErrTglBuktiPotong}</div>
                            {/* <div className="invalid-feedback-custom">{ErrIsDownPayment}</div> */}
                            {
                                InputListItem.length == 0?'':
                                <table id="tablegrid" hidden={values.SelReceiveFrom == 'CUSTOMER'? values.jenistransaksi !== 'LAINNYA':false}>
                                    <tr>
                                        <th>{i18n.t('Transaksi')}</th>
                                        {/* <th>{i18n.t('label_NOTE')}</th> */}
                                        <th>{i18n.t('Amount')}</th>
                                        <th>{i18n.t('Penyesuaian')}</th>
                                        <th>{i18n.t('Ket. Penyesuaian')}</th>
                                        {/* <th>{i18n.t('DP')}</th> */}
                                        {/* <th hidden={values.SelReceiveFrom == "EMPLOYEE" || values.SelReceiveFrom == "VENDOR"}>{i18n.t('label_WO_NUMBER')}</th> */}
                                        <th hidden={values.SelReceiveFrom == "EMPLOYEE" || values.SelReceiveFrom == "VENDOR"}>{i18n.t('Invoice Number')}</th>
                                        <th>{i18n.t('Action')}</th>
                                    </tr>
                                    <tbody>
                                        {
                                            InputListItem.map((x, i) => {
                                                return(
                                                    <tr>
                                                    <td>
                                                    <DropdownList
                                                        name="idcoa"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'idcoa')}
                                                        data={ListCOA}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '250px'}}
                                                        value={x.idcoa}
                                                    />
                                                    </td>
                                                    {/* <td>
                                                    <Input
                                                        name="catatan"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="textarea"
                                                        id="catatan"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.catatan}
                                                        disabled={false}
                                                    />
                                                    </td> */}
                                                    <td>
                                                    <Input
                                                        name="amount"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="amount"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.amount}
                                                        disabled={false}
                                                    />
                                                    </td>

                                                    <td>
                                                    <Input
                                                        name="penyesuaian"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="penyesuaian"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.penyesuaian}
                                                        disabled={false}
                                                    />
                                                    </td>

                                                    <td>
                                                    <Input
                                                        name="ketpenyesuaian"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="ketpenyesuaian"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.ketpenyesuaian}
                                                        disabled={false}
                                                    />
                                                    </td>
                                                    {/* <td>
                                                    <DropdownList
                                                        name="isdownpayment"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'isdownpayment')}
                                                        data={ListChooseYN}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '130px'}}
                                                        value={x.isdownpayment}
                                                    />
                                                    </td> */}

                                                    {/* <td hidden={values.SelReceiveFrom == "EMPLOYEE" || values.SelReceiveFrom == "VENDOR"}>
                                                    
                                                    <table style={{width:'100%'}}>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                        <Input
                                                        name="nodocwo"
                                                        // className={
                                                        //     touched.namebranch && errors.namebranch
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="nodocwo"
                                                        // maxLength={200}
                                                        onChange={val => handleInputChange(val,i)}
                                                        // onBlur={handleBlur}
                                                        disabled={true}
                                                        value={x.nodocwo}
                                                        />
                                                        
                                                        </td>

                                                        <td hidden={x.nodocwo !== ''}>
                                                        <IconButton color={'primary'}
                                                            onClick={val =>handleShowQuickSearchWO(val,i)}
                                                        >
                                                            <SearchIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        </td>

                                                        <td hidden={x.nodocwo == ''}>
                                                        <IconButton color={'primary'}
                                                            onClick={val =>handleDeleteWO(val,i)}
                                                        >
                                                            <DeleteIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                    </table>
                                                    </td> */}

                                                    <td hidden={values.SelReceiveFrom == "EMPLOYEE" || values.SelReceiveFrom == "VENDOR"}>
                                                    
                                                    <table style={{width:'100%'}}>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                        <Input
                                                        name="nodocinv"
                                                        // className={
                                                        //     touched.namebranch && errors.namebranch
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="nodocinv"
                                                        // maxLength={200}
                                                        onChange={val => handleInputChange(val,i)}
                                                        // onBlur={handleBlur}
                                                        disabled={true}
                                                        value={x.nodocinv}
                                                        />
                                                        
                                                        </td>
                                                        <td hidden={x.nodocinv !== ""}>
                                                        <IconButton color={'primary'}
                                                            onClick={val =>handleShowQuickSearchInv(val,i)}
                                                        >
                                                            <SearchIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        </td>
                                                        <td hidden={x.nodocinv == ''}>
                                                        <IconButton color={'primary'}
                                                            onClick={val =>handleDeletehINV(val,i)}
                                                        >
                                                            <DeleteIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                    </table>
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
                            {
                                <table id="tablegrid" hidden={values.jenistransaksi !== '9995'}>
                                <tr>
                                    <th>{i18n.t('No Invoice')}{' : '}{values.invoice9995}</th>
                                    <th>{i18n.t('Invoice')}</th>
                                    <th>{i18n.t('Terima')}</th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td>{'Total'}</td>
                                        <td>
                                        <table>
                                            <tr>
                                                <td width={'90%'} style={{fontSize:'17px'}}>
                                                {values.itemdetail.length > 0? formatRupiah(new String(values.itemdetail[0].invtotalinvoice).replaceAll('.',','),2):''}
                                                </td>
                                                <td>
                                                <IconButton color={'primary'}
                                                    onClick={() =>handleCopyValue9995((values.itemdetail.length > 0? formatRupiah(new String(values.itemdetail[0].invtotalinvoice).replaceAll('.',','),2):''),'amount',0)}
                                                >
                                                    <FileCopyIcon/>
                                                </IconButton>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        </td>
                                        <td>
                                        <Input
                                            name="amount"
                                            // className={
                                            //     touched.amount && errors.amount
                                            //         ? "w-50 input-error"
                                            //         : "w-50"
                                            // }
                                            type="text"
                                            id="amount"
                                            onChange={val => handleInputChange9995(val,0)}
                                            onBlur={handleBlur}
                                            // placeholder={i18n.t('label_AMOUNT')}
                                            // style={{width: '25%'}}
                                            // value={values.amount}
                                            style={{fontSize:'17px'}}
                                            value={InputListItem[0].amount}
                                        />
                                        </td>
                                        
                                    </tr>
                                        <tr>
                                        <td>{'Tagihan Pihak Ke-3'}</td>
                                        <td style={{fontSize:'17px'}}>{values.itemdetail.length > 0?formatRupiah(new String(values.itemdetail[0].nilaireimbursement).replaceAll('.',','),2):''}</td>
                                        <td style={{fontSize:'17px'}}>{values.itemdetail.length > 0?formatRupiah(new String(values.itemdetail[0].nilaireimbursement).replaceAll('.',','),2):''}</td>
                                        </tr>
    
                                        <tr>
                                        <td>{'PPN'}</td>
                                        <td style={{fontSize:'17px'}}>{values.itemdetail.length > 0?formatRupiah(new String(values.itemdetail[0].nilaippn).replaceAll('.',','),2):''}</td>
                                        <td style={{fontSize:'17px'}}>{values.itemdetail.length > 0?formatRupiah(new String(values.itemdetail[0].nilaippn).replaceAll('.',','),2):''}</td>
                                        </tr>
                                        <tr>
                                        <td>{'Nilai Bukti Potong'}</td>
                                        <td>{''}</td>
                                        <td>
                                        <Input
                                            name="nilaibuktipotong"
                                            // className={
                                            //     touched.amount && errors.amount
                                            //         ? "w-50 input-error"
                                            //         : "w-50"
                                            // }
                                            type="text"
                                            id="nilaibuktipotong"
                                            onChange={val => handleInputChange9995(val,0)}
                                            onBlur={handleBlur}
                                            // placeholder={i18n.t('label_AMOUNT')}
                                            // style={{width: '25%'}}
                                            // value={values.amount}
                                            style={{fontSize:'17px'}}
                                            value={InputListItem[0].nilaibuktipotong}
                                        />
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>{'Nomor Bukti Potong'}</td>
                                        <td>{''}</td>
                                        <td>
                                        <Input
                                            name="nobuktipotong"
                                            // className={
                                            //     touched.amount && errors.amount
                                            //         ? "w-50 input-error"
                                            //         : "w-50"
                                            // }
                                            type="text"
                                            id="nobuktipotong"
                                            onChange={val => handleInputChange9995(val,0)}
                                            onBlur={handleBlur}
                                            // placeholder={i18n.t('label_AMOUNT')}
                                            // style={{width: '25%'}}
                                            // value={values.amount}
                                            style={{fontSize:'17px'}}
                                            value={InputListItem[0].nobuktipotong}
                                        />
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>{'Tanggal Bukti Potong'}</td>
                                        <td>{''}</td>
                                        <td>
                                        
                                        <table>
                                            <tr>
                                                <td width={'90%'}>
                                                <DatePicker
                                                        name="tanggalbuktipotong"
                                                        // onChange={(val) => {
                                                        //         setFieldValue("startdate", val);
                                                        //     }
                                                        // }
                                                        onChange={val => handleChangeTanggalBuktiPotong(val)}
                                                        onBlur={handleBlur}
                                                        // defaultValue={Date(moment([]))}
                                                        format={formatdate}
                                                        value={InputListItem[0].tanggalbuktipotong}
                                                        style={{fontSize:'15px'}}
                                                        // max={new Date()}
                                                        // style={{width: '25%'}}
                                                />
                                                </td>
                                                <td>
                                                <IconButton color={'primary'}
                                                    onClick={() =>handleChangeTanggalBuktiPotong(null)}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>{'Jasa'}</td>
                                        <td style={{fontSize:'17px'}}>{values.itemdetail.length > 0? formatRupiah(new String(values.itemdetail[0].invnilaijasa).replaceAll('.',','),2):''}</td>
                                        <td style={{fontSize:'17px'}}>{InputListItem[0].nilaijasa}</td>
                                        </tr>
                                        <tr>
                                        <td>{'Nilai Penyesuaian'}</td>
                                        <td>{''}</td>
                                        <td style={{fontSize:'17px'}}>{InputListItem[0].penyesuaian}</td>
                                        </tr>
                                        <tr>
                                        <td>{'Ket Penyesuaian'}</td>
                                        <td>{''}</td>
                                        <td style={{fontSize:'17px'}}>{InputListItem[0].ketpenyesuaian}</td>
                                        </tr>
                                    
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
                                    open={ShowQuickSearchINV}
                                >
                                        <FormSearch
                                            showflag = {setShowQuickSearchINV}
                                            flagloadingsend = {setLoadingSend}
                                            seacrhtype = {'PENERIMAANINVOICE'}
                                            errorHandler = {errorHandler}
                                            handlesearch = {handleQuickSeacrhINV}
                                            placeholder = {'Pencarian Berdasarkan No Document atau Nama Customer'}
                                            idwo = {InputIndexIdWo}
                                            idpenerimaan = {id}
                                            idcustomer = {InputReceiveFrom}
                                        ></FormSearch>
                                        {LoadingSend && <Loading/>}
                                </StyledDialog>

                                <StyledDialog
                                    disableBackdropClick
                                    disableEscapeKeyDown
                                    maxWidth="md"
                                    fullWidth={true}
                                    // style={{height: '80%'}}
                                    open={ShowQuickSearchInvoice9995}
                                >
                                        <FormSearch
                                            showflag = {setShowQuickSearchInvoice9995}
                                            flagloadingsend = {setLoadingSend}
                                            seacrhtype = {'PENERIMAANINVOICE'}
                                            errorHandler = {errorHandler}
                                            handlesearch = {handleQuickSeacrhINV9995}
                                            placeholder = {'Pencarian Berdasarkan No Document atau Nama Customer'}
                                            idwo = {InputIdWO}
                                            idcustomer = {InputReceiveFrom}
                                        ></FormSearch>
                                        {LoadingSend && <Loading/>}
                                </StyledDialog>

                                <StyledDialog
                                    disableBackdropClick
                                    disableEscapeKeyDown
                                    maxWidth="md"
                                    fullWidth={true}
                                    // style={{height: '80%'}}
                                    open={ShowQuickSearchWO}
                                >
                                        <FormSearch
                                            showflag = {setShowQuickSearchWO}
                                            flagloadingsend = {setLoadingSend}
                                            seacrhtype = {'PENERIMAANWO'}
                                            errorHandler = {errorHandler}
                                            handlesearch = {handleQuickSeacrhWO}
                                            placeholder = {'Pencarian Berdasarkan No Document atau No AJU atau Nama Customer atau Nama Cargo'}
                                            idcustomer = {InputReceiveFrom}
                                        ></FormSearch>
                                        {LoadingSend && <Loading/>}
                                </StyledDialog>

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
                                            seacrhtype = {'PENERIMAAN-KAS-BANK'}
                                            seacrhtype1 = {SelReceiveFrom}
                                            errorHandler = {errorHandler}
                                            handlesearch = {handleQuickSeacrh}
                                            placeholder = {SelReceiveFrom == 'CUSTOMER' || SelReceiveFrom == 'VENDOR' ?'Pencarian Berdasarkan Nama Atau Alias':'Pencarian Berdasarkan Nama'}

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