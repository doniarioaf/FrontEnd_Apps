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
import { reloadToHomeNotAuthorize,inputJustNumberAndCommaDot,formatMoney, numToMoney } from '../../shared/globalFunc';
import { editInvoice_Permission} from '../../shared/permissionMenu';
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
import { IconButton } from '@material-ui/core';
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

export default function EditForm(props) {
    reloadToHomeNotAuthorize(editInvoice_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [ShowQuickSearch, setShowQuickSearch] = useState(false);
    const [LoadingSend, setLoadingSend] = useState(false);

    const [InputNoDocument, setInputNoDocument] = useState('');
    const [InputTanggal, setInputTanggal] = useState(new Date());
    const [ErrInputTanggal, setErrInputTanggal] = useState('');

    // const [ListCustomer, setListCustomer] = useState([]);
    // const [SelCust, setSelCust] = useState('');
    // const [ErrSelCust, setErrSelCust] = useState('');

    const [InputRefNo, setInputRefNo] = useState('');
    const [ErrInputRefNo, setErrInputRefNo] = useState('');

    const [InputDeliveredTo, setInputDeliveredTo] = useState('');
    const [ErrInputDeliveredTo, setErrInputDeliveredTo] = useState('');

    const [InputDeliveredDateNew, setInputDeliveredDateNew] = useState(null);
    const [InputDeliveredDate, setInputDeliveredDate] = useState(null);
    const [ErrInputDeliveredDate, setErrInputDeliveredDate] = useState('');

    const [ListWO, setListWO] = useState([]);
    const [SelWO, setSelWO] = useState('');
    const [ErrSelWO, setErrSelWO] = useState('');

    const [ListSJ, setListSJ] = useState([]);
    const [SelSJ, setSelSJ] = useState('');

    const [ListPriceList, setListPriceList] = useState([]);
    const [SelPriceList, setSelPriceList] = useState('');

    const [ListInvoiceType, setListInvoiceType] = useState([]);
    const [SelInvoiceType, setSelInvoiceType] = useState('');
    const [ErrSelInvoiceType, setErrSelInvoiceType] = useState('');

    const [InputDiskonNota, setInputDiskonNota] = useState('');
    const [InputTotalInvoice, setInputTotalInvoice] = useState('');

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

    const [IsHideColumnWarehouse, setIsHideColumnWarehouse] = useState(false);
    const [ListSuratJalanWO, setListSuratJalanWO] = useState([]);

    const [InputPPN, setInputPPN] = useState('');
    const [InputNilaiPPN, setInputNilaiPPN] = useState(null);
    const [DataTemplate, setDataTemplate] = useState([]);

    const [ListInvoiceDP, setListInvoiceDP] = useState([]);

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInvoiceData('/template/'+id,successHandlerTemplate, errorHandler));
    }, []);

    const successHandlerTemplate = (data) =>{
        if(data.data){
            let det = data.data;
            let template = det.template;

            setListInvoiceDP(det.listDP?det.listDP:[]);
            setDataTemplate(data.data);
            setInputJalur(det.jalurwo);
            setInputJalurName(det.jalurname);
            setInputNoDocument(det.nodocument);
            setInputTanggal(det.tanggal?moment(new Date(det.tanggal), formatdate).toDate():null);
            setInputCustomerID(det.idcustomer);
            setInputCustomer(det.namaCustomer);
            setInputRefNo(det.refno);
            setInputDeliveredTo(det.deliveredto);
            setInputDeliveredDate(det.deliverydate?moment(new Date(det.deliverydate), formatdate).toDate():null);
            setSelInvoiceType(det.idinvoicetype);
            setInputDiskonNota(det.diskonnota?numToMoney(parseFloat(det.diskonnota)):'');
            setInputTotalInvoice(det.totalinvoice?numToMoney(parseFloat(det.totalinvoice)):'');
            setInputPPN(det.ppn?numToMoney(parseFloat(det.ppn)):'');
            setInputNilaiPPN(det.nilaippn?det.nilaippn:null);
            if(det.idinvoicetype == 'REIMBURSEMENT'){
                setIsHideColumnWarehouse(true);
            }
            let listitem = [];
            let idpricelist = '';
            if(det.detailsprice){
                for(let i=0; i < det.detailsprice.length; i++){
                    let dett = det.detailsprice[i];
                    let obj = new Object();
                    idpricelist = dett.idpricelist;
                    obj.idpricelist = dett.idpricelist;
                    obj.idwarehouse = dett.idwarehouse;
                    obj.warehousename = dett.warehouseName;
                    obj.idinvoicetype = dett.idinvoicetype;
                    obj.invoicetype = dett.invoicetypename;
                    obj.amount = dett.price;
                    obj.ismandatory = dett.ismandatory;// == 'Y'?'Yes':'No';
                    obj.jalur = dett.jalur;// == 'MERAH'?'Merah':'Hijau';
                    obj.qty = dett.qty;
                    obj.diskon = dett.diskon?numToMoney(parseFloat(dett.diskon)):'0';
                    obj.subtotal = dett.subtotal;
                    listitem.push(obj);
                }
                if(listitem.length > 0){
                    setInputListItem(listitem);     
                    let flag = det.nilaippn?false:true;
                    if(flag){
                        let discNota = det.diskonnota?parseFloat(det.diskonnota):'';
                        let ppn = det.ppn?parseFloat(det.ppn):'';
                        calculateTotalInvoice(listitem,discNota,ppn);
                    }
                    
                }
            }
            setSelPriceList(idpricelist);

            let idwo = det.idwo?(det.idwo == 0?'':det.idwo):'';
            setSelWO(idwo);

            // if(idwo != undefined && idwo != null && idwo !== ''){
            //     if(idwo > 0){
            //         dispatch(actions.getInvoiceData('/suratjalan/'+idwo,successHandlerSJ, errorHandler));
            //     }
            // }
            if(template.suratJalanOptions){
                let obj = new Object();
                obj.data = template.suratJalanOptions ;
                successHandlerSJ(obj);
            }

            setListInvoiceType(template.invoiceTypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            if(template.searchSuratJalanOptions){
                let obj = new Object();
                obj.data = template.searchSuratJalanOptions;
                successHandlerSj(obj);
            }

            dispatch(actions.getInvoiceData('/searchwoeditfirstload/'+det.idcustomer+'/'+idwo,successHandlerWO, errorHandler));

            // if(idwo !== ''){
            //     dispatch(actions.getInvoiceData('/searchsj/'+idwo,successHandlerSj, errorHandler));
            // }
            setSelSJ(det.idsuratjalan);

            if(det.idinvoicetype == 'REIMBURSEMENT'){
                if(template.searchPengeluaranOptions){
                    let obj = new Object();
                    obj.data = template.searchPengeluaranOptions;
                    successHandlerPengeluaran(obj);
                }
                // if(idwo !== ''){
                //     dispatch(actions.getInvoiceData('/searchpengeluaran/'+idwo,successHandlerPengeluaran, errorHandler));
                // }
            }else{
                if(template.searchPricelistOptions){
                    let obj = new Object();
                    obj.data = template.searchPricelistOptions;
                    successHandlerProses(obj);
                }
                // let obj = new Object();
                // obj.idcustomer = det.idcustomer;
                // obj.idwarehouse = det.idwarehousesuratjalan != undefined && det.idwarehousesuratjalan != null && det.idwarehousesuratjalan != '' ?det.idwarehousesuratjalan:0;
                // obj.idinvoicetype = det.idinvoicetype;
                // obj.jalur = det.jalurwo?det.jalurwo:'';
                // dispatch(actions.submitAddInvoice('/searchpricelist',obj,successHandlerProses, errorHandler));
            }

            
        }
        setLoading(false);
    }

    function successHandlerSJ(data) {
        let list = [];
        if(data.data.suratjalan){
            for(let i=0; i < data.data.suratjalan.length ; i++){
                let det = data.data.suratjalan[i];

                let obj = new Object();
                obj.nosj = det.nodocument;
                obj.warehouse = det.warehousename;
                obj.nocontainer = det.nocontainer;
                obj.tanggal = det.tanggal?moment (new Date(det.tanggal)).format(formatdate):'';
                obj.tanggalkembali = det.tanggalkembali?moment (new Date(det.tanggalkembali)).format(formatdate):'';

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
        setListSuratJalanWO(list);
    }

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

    const handleInputRefNo = (data) =>{
        let val = data.target.value;
        setInputRefNo(val);
    }

    const handleInputDeliveredTo = (data) =>{
        let val = data.target.value;
        setInputDeliveredTo(val);
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
        setListInvoiceDP([]);
        setInputRefNo(noblawb);

        setLoading(true);
        localStorage.setItem('idwo',id);

        if(SelInvoiceType == 'REIMBURSEMENT'){
            dispatch(actions.getInvoiceData('/invoicedp/'+id,successHandlerInvoiceDP, errorHandler));
        }else{  
            dispatch(actions.getInvoiceData('/suratjalan/'+id,successHandlerSJJ, errorHandler));
        }
        
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
        setSelSJ(idSj);
        dispatch(actions.getInvoiceData('/searchsj/'+idwo,successHandlerSj, errorHandler));
    }

    const successHandlerSj = (data) =>{
        if(data.data){
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
            let ppn = DataTemplate.ppn?numToMoney(parseFloat(DataTemplate.ppn)):'';
            setInputPPN(ppn);
            if(ppn !== ''){
                calculateTotalInvoice(InputListItem,InputDiskonNota,ppn);
            }
            if(SelWO !== '' && SelSJ == ''){
                setLoading(true);
                localStorage.setItem('idwo',SelWO);
                dispatch(actions.getInvoiceData('/suratjalan/'+SelWO,successHandlerSJJ, errorHandler));
            }
            
        }
        
    }

    const handleChangePriceList = (data) =>{
        let id = data?.value ? data.value : '';
        let dataval = data?.dataval ? data.dataval : '';
        
        setSelPriceList(id);
        // setInputListItem([]);
        let listitem = [];
        setIsHideColumnWarehouse(false);
        if(SelInvoiceType == 'REIMBURSEMENT'){
            setIsHideColumnWarehouse(true);
            for(let i=0; i < dataval.length; i++){
                let det = dataval[i];
                let obj = new Object();
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
                // listitem.push(obj);
            }
            // calculateTotalInvoice(listitem,InputDiskonNota);
        }else{
            setInputListItem([]);
            if(dataval.details){
                for(let i=0; i < dataval.details.length; i++){
                    let det = dataval.details[i];
                    let obj = new Object();
                    obj.idpricelist = det.idpricelist
                    obj.idwarehouse = det.idwarehouse;
                    obj.warehousename = det.warehouseName;
                    obj.idinvoicetype = det.idinvoicetype;
                    obj.invoicetype = det.invoicetypename;
                    obj.amount = det.price;
                    obj.ismandatory = det.ismandatory;// == 'Y'?'Yes':'No';
                    obj.jalur = det.jalur;// == 'MERAH'?'Merah':'Hijau';
                    obj.qty = '0';
                    obj.diskon = '0';
                    obj.subtotal = '0';
                    obj.idpengeluarankasbank = 0;
                    listitem.push(obj);
                }   
            }
        }
        if(listitem.length > 0){
            setInputListItem(listitem);     
        }
    }

    const handleChangeDiskonNota = (data) =>{
        let val = data.target.value;
        // val = new String(val).replaceAll('.','').replaceAll(',','.');
        let flagReg = inputJustNumberAndCommaDot(val);
        if(flagReg){
            val = formatMoney(val);
            let valtemp = val;
            calculateTotalInvoice(InputListItem,valtemp,InputPPN);
            setInputDiskonNota(val);
        }
        
    }

    const handleChangePPN = (data) =>{
        let val = data.target.value;
        // val = new String(val).replaceAll('.','').replaceAll(',','.');
        let flagReg = inputJustNumberAndCommaDot(val);
        if(flagReg){
            val = formatMoney(val);
            let valtemp = val;
            calculateTotalInvoice(InputListItem,InputDiskonNota,valtemp);
            setInputPPN(val);
        }
        
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrSelWO('');
        setErrInputTanggal('');
        setErrInputCustomer('');
        setErrInputRefNo('');
        setErrInputDeliveredTo('');
        setErrInputDeliveredDate('');
        setErrSelInvoiceType('');
        setErrItems('');
        setErrQty('');

        
        if(InputListItem.length > 0){
            for(let i=0; i < InputListItem.length; i++){
                let det = InputListItem[i];
                if(det.ismandatory == 'Y'){
                    if(det.qty !== ''){
                        if(parseFloat(det.qty) <= 0){
                            setErrQty(i18n.t('Qty')+' '+i18n.t('label_REQUIRED'));
                            flag = false;
                        }
                    }else{
                        setErrQty(i18n.t('Qty')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                }
            }
        }else{
            setErrItems('Items '+i18n.t('label_REQUIRED'));
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

        // if(InputRefNo == ''){
        //     setErrInputRefNo(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }

        // if(InputDeliveredTo == ''){
        //     setErrInputDeliveredTo(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }

        // if(InputDeliveredDate == null){
        //     setErrInputDeliveredDate(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }

        if(SelWO !== ''){
            let list = ListWO.filter(output => output.value == parseInt(SelWO));
            if(list.length <= 0){
                //Kemungkinan karena Status WO masih open
                setErrSelWO(i18n.t('No Wo tidak dikenal'));
                flag = false;
            }

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
            obj.tanggal = moment(InputTanggal).toDate().getTime();
            obj.idcustomer = InputCustomerID;
            obj.refno = InputRefNo;
            obj.deliveredto = InputDeliveredTo;
            obj.deliverydate = moment(InputDeliveredDate).toDate().getTime();
            obj.idwo = SelWO !== ''?SelWO:null;
            obj.idinvoicetype = SelInvoiceType;
            obj.totalinvoice = InputTotalInvoice !== ''?new String(InputTotalInvoice).replaceAll('.','').replaceAll(',','.'):0;
            obj.isactive = true;

            obj.idsuratjalan = SelSJ !== '' && SelInvoiceType !== 'DP'?SelSJ:null;
            obj.diskonnota = InputDiskonNota !== '' && SelInvoiceType !== 'DP'?new String(InputDiskonNota).replaceAll('.','').replaceAll(',','.'):0;
            obj.ppn = InputPPN !== '' && SelInvoiceType !== 'DP'?new String(InputPPN).replaceAll('.','').replaceAll(',','.'):null;
            obj.nilaippn = InputNilaiPPN !== '' ? new String(InputNilaiPPN).replaceAll('.','').replaceAll(',','.'):null;

            let listDetailsPrice = [];
            if(InputListItem.length > 0){
                for(let i=0; i < InputListItem.length; i++){
                    let det = InputListItem[i];

                    let objDetail = new Object();
                    objDetail.idwarehouse = det.idwarehouse;
                    objDetail.idinvoicetype = det.idinvoicetype;
                    objDetail.jalur = det.jalur;
                    objDetail.price = new String(det.amount).replaceAll('.','').replaceAll(',','.');
                    objDetail.ismandatory = det.ismandatory;
                    objDetail.idpricelist = det.idpricelist;
                    objDetail.qty = det.qty;
                    objDetail.diskon = new String(det.diskon).replaceAll('.','').replaceAll(',','.');
                    objDetail.subtotal = new String(det.subtotal).replaceAll('.','').replaceAll(',','.');
                    objDetail.idpengeluarankasbank = det.idpengeluarankasbank;
                    listDetailsPrice.push(objDetail);
                }
            }

            obj.detailsprice = SelInvoiceType == 'DP'?[]:listDetailsPrice;
            dispatch(actions.submitEditInvoice('/'+id,obj,succesHandlerSubmit, errorHandler));
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
        setListWO([]);
        setInputJalur('');
        setInputJalurName('');
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

    const successHandlerDistrict = (data) => {
        if(data.data){
            if(data.data.length > 0){
                setInputDeliveredTo(data.data[0].dis_name);
            }
        }
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

    const submitProses = () =>{
        
        let flag = true;
        setErrInputCustomer('');
        setErrSelInvoiceType('');
        
        if(InputCustomer == ''){
            setErrInputCustomer(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelInvoiceType == ''){
            setErrSelInvoiceType(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            if(SelInvoiceType == 'REIMBURSEMENT'){
                if(SelWO == ''){
                    flag = false;
                }
            }
        }
        
        if(flag){
            setLoading(true);
            if(SelInvoiceType == 'REIMBURSEMENT'){
                setInputListItem([]);
                setIsHideColumnWarehouse(false);
                dispatch(actions.getInvoiceData('/searchpengeluaran/'+SelWO,successHandlerPengeluaran, errorHandler));
            }else{
                let obj = new Object();
                obj.idcustomer = InputCustomerID;
                obj.idwarehouse = InputWarehouseID == ''?0:InputWarehouseID;
                obj.idinvoicetype = SelInvoiceType;
                obj.jalur = new String(InputJalur).toUpperCase();
                dispatch(actions.submitAddInvoice('/searchpricelist',obj,successHandlerProses, errorHandler));
            }
        }
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
                    let obj = new Object();
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
                calculateTotalInvoice(listitem,InputDiskonNota,InputPPN);
                setInputListItem(listitem);
            }
        }
        setLoading(false);
    }

    const successHandlerProses = (data) =>{
        // setListPriceList
        if(data.data){
            setListPriceList(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nodocument,
                    dataval:el
                }]
            ), []));
            
            if(SelPriceList !== ''){
                let arrItems = [];//[...InputListItem];
                let list = data.data.filter(output => output.id == SelPriceList);
                // console.log('data.data ',data.data);
                // console.log('SelPriceList ',SelPriceList);
                // console.log('SelPriceList ',list);
                if(list.length > 0){
                for(let i=0; i < list[0].details.length; i++){
                    let det = list[0].details[i];
                    // console.log('listitems det ',det);
                    // let listitems = InputListItem.filter(output => 
                    //     output.idpricelist == SelPriceList &&
                    //     output.idwarehouse == det.idwarehouse &&
                    //     output.idinvoicetype == det.idinvoicetype &&
                    //     output.ismandatory == det.ismandatory &&
                    //     output.jalur == det.jalur
                    //     );
                    let flag = true;
                    // if(listitems.length > 0){
                    //     let qtyItems = listitems[0].qty;
                    //     if(qtyItems !== ''){
                    //         qtyItems = new String(qtyItems).replaceAll('.','');
                    //         if(!isNaN(qtyItems)){
                    //             if(parseInt(qtyItems) == 0){
                    //                 flag = true;
                    //             }
                    //         }
                    //     }else{
                    //         flag = true;
                    //     }
                    // }else{
                    //     flag = true;
                    // }
                    
                    if(flag){
                            let obj = new Object();
                            obj.idpricelist = det.idpricelist
                            obj.idwarehouse = det.idwarehouse;
                            obj.warehousename = det.warehouseName;
                            obj.idinvoicetype = det.idinvoicetype;
                            obj.invoicetype = det.invoicetypename;
                            obj.amount = det.price;
                            obj.ismandatory = det.ismandatory;// == 'Y'?'Yes':'No';
                            obj.jalur = det.jalur;// == 'MERAH'?'Merah':'Hijau';
                            obj.qty = '0';
                            obj.diskon = '0';
                            obj.subtotal = '0';
                            obj.idpengeluarankasbank = 0;
                            arrItems.push(obj);
                    }
                }
            }
                setInputListItem(arrItems);
            }
            // for(let i=0; i < dataval.details.length; i++){
            //     let det = dataval.details[i];
            //     let obj = new Object();
            //     obj.idpricelist = det.idpricelist
            //     obj.idwarehouse = det.idwarehouse;
            //     obj.warehousename = det.warehouseName;
            //     obj.idinvoicetype = det.idinvoicetype;
            //     obj.invoicetype = det.invoicetypename;
            //     obj.amount = det.price;
            //     obj.ismandatory = det.ismandatory;// == 'Y'?'Yes':'No';
            //     obj.jalur = det.jalur;// == 'MERAH'?'Merah':'Hijau';
            //     obj.qty = '0';
            //     obj.diskon = '0';
            //     obj.subtotal = '0';
            //     obj.idpengeluarankasbank = 0;
            //     listitem.push(obj);
            // }
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

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        let valTemp = value;
        const list = [...InputListItem];
        
        if(name == 'diskon'){
            let flagReg = inputJustNumberAndCommaDot(value);
            if(flagReg){
                valTemp = new String(valTemp).replaceAll('.','').replaceAll(',','.');
                valTemp = formatMoney(value);
                list[index][name] = valTemp;
            }
            list[index]['subtotal'] = calculateSubTotal(list[index]['amount'],valTemp,list[index]['qty']);
        }else if(name == 'qty'){
            if(!isNaN(value)){
                list[index][name] = value;
                if(value == 0){
                    list[index]['diskon'] = '0';
                }
                list[index]['subtotal'] = calculateSubTotal(list[index]['amount'],list[index]['diskon'],value);
            }
        }else if(name == 'amount'){
            let flagReg = inputJustNumberAndCommaDot(value);
            if(flagReg){
                valTemp = new String(valTemp).replaceAll('.','').replaceAll(',','.');
                valTemp = formatMoney(value);
                list[index][name] = valTemp;
            }
            list[index]['subtotal'] = calculateSubTotal(valTemp,list[index]['diskon'],list[index]['qty']);
        }else{
            // const list = [...InputListItem];
            list[index][name] = valTemp;
        }
        calculateTotalInvoice(list,InputDiskonNota,InputPPN);
        setInputListItem(list);
    };
    const calculateTotalInvoice = (list,diskonnota,ppn) => {
        let total = 0;
        for(let i=0; i < list.length; i++){
            let det = list[i];
            if(det.subtotal){
                if(det.subtotal !== '' && !isNaN(det.subtotal)){
                    total = total + parseFloat(det.subtotal);
                }
            }
        }
        let diskonVal = new String(diskonnota).replaceAll('.','').replaceAll(',','.');
        if(!isNaN(diskonVal) && diskonVal !== ''){
            if(parseFloat(diskonVal) >= 50){
                total = total - parseFloat(diskonVal);
            }else{
                total = total - ( (parseFloat(diskonVal) / 100) * total );
            }
        }

        //20230801
        setInputNilaiPPN(null);
        if(ppn !== undefined && ppn !== null && ppn !== ""){
            ppn = new String(ppn).replaceAll('.','').replaceAll(',','.');
            if(!isNaN(ppn)){
                ppn = parseFloat(ppn);
                let valPPN = parseFloat(ppn / 100);
                let totalPPN = total * valPPN;
                setInputNilaiPPN(totalPPN);
                total = total + totalPPN;
            }
        }
        setInputTotalInvoice(numToMoney(total));
    }
    const calculateSubTotal = (amount,diskon,qty) => {
        let amountval = new String(amount).replaceAll('.','').replaceAll(',','.');
        let subtotal = parseFloat(amountval) * parseFloat(qty);
        let diskonVal = new String(diskon).replaceAll('.','').replaceAll(',','.');
        
        if(isNaN(subtotal)){
            subtotal = '0';
        }else{
            if(!isNaN(diskonVal) && diskonVal !== ''){
                if(parseFloat(diskonVal) >= 50){
                    subtotal = subtotal - parseFloat(diskonVal);
                }else{
                    subtotal = subtotal - ( (parseFloat(diskonVal) / 100) * subtotal );
                }
            }
            
        }
        if(parseFloat(qty) == 0){
            subtotal = '0';
        }
        return isNaN(subtotal)?'0':subtotal;
    }

    return (
        <Formik
        initialValues={
            {
                tanggal:InputTanggal,
                customer:InputCustomer,
                refno:InputRefNo,
                deliveredto:InputDeliveredTo,
                delivereddate:InputDeliveredDate,
                wo:SelWO,
                sj:SelSJ,
                invtype:SelInvoiceType,
                discnota:InputDiskonNota,
                ppn:InputPPN,
                total:InputTotalInvoice,
                pricelist:SelPriceList,
                items:InputListItem,
                nodoc:InputNoDocument,
                jalurname:InputJalurName
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormEditInvoice">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.editInvoice+'/'+id} label={'Edit Invoice'} labeldefault={'Edit Invoice'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="nodoc">
                                {i18n.t('No Document')}
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
                                // maxLength={30}
                                // onChange={val => handleInputDeliveredTo(val)}
                                // onBlur={handleBlur}
                                disabled={true}
                                value={values.nodoc}
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

                            {/* <label className="mt-3 form-label required" htmlFor="deliveredto">
                                {i18n.t('Delivered To')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="deliveredto"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="deliveredto"
                                // maxLength={30}
                                onChange={val => handleInputDeliveredTo(val)}
                                onBlur={handleBlur}
                                disabled={true}
                                value={values.deliveredto}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDeliveredTo}</div> */}

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
                            <div className="invalid-feedback-custom">{ErrSelWO}</div>

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

                            <table id="tablegrid" hidden={values.invtype !== 'REIMBURSEMENT'}>
                                <tr>
                                    <th>{'No Invoice'}</th>
                                    <th>{'Tanggal'}</th>
                                    <th>{'Jumlah'}</th>
                                </tr>
                                <tbody>
                                    {
                                        ListInvoiceDP.map((x, i) => {
                                            return (
                                            <tr>
                                                <td>{x.nodocument}</td>
                                                <td>{x.tanggal?moment (new Date(x.tanggal)).format(formatdate):''}</td>
                                                <td>{numToMoney(parseFloat(x.totalinvoice))}</td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            </div>
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
                                    onChange={val => handleChangeTanggal(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.tanggal}
                                    // style={{width: '25%'}}
                                    disabled={false}                       
                            />
                            <div className="invalid-feedback-custom">{ErrInputTanggal}</div>

                            <label className="mt-3 form-label required" htmlFor="invtype">
                                {i18n.t('Invoice Type')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="invtype"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeInvType(val)}
                                    onBlur={val => setFieldTouched("invtype", val?.value ? val.value : '')}
                                    data={ListInvoiceType}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    disabled={true}
                                    value={values.invtype}
                                />
                                <div className="invalid-feedback-custom">{ErrSelInvoiceType}</div>

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
                            <label className="mt-3 form-label required" htmlFor="ppn">
                                {i18n.t('PPN')}
                            </label>
                            <Input
                                name="ppn"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="ppn"
                                maxLength={30}
                                onChange={val => handleChangePPN(val)}
                                onBlur={handleBlur}
                                value={values.ppn}
                                disabled={SelInvoiceType == 'REIMBURSEMENT'}
                            />
                            <label className="mt-3 form-label required" htmlFor="discnota">
                                {i18n.t('Diskon Nota')}
                            </label>
                            <Input
                                name="discnota"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="discnota"
                                maxLength={30}
                                onChange={val => handleChangeDiskonNota(val)}
                                onBlur={handleBlur}
                                value={values.discnota}
                                disabled={SelInvoiceType == 'REIMBURSEMENT'}
                            />
                            </div>

                            <label className="mt-3 form-label required" htmlFor="total">
                                {i18n.t(values.invtype == 'DP'?'DP':'Total Invoice')}
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
                                // onChange={val => handleChangeDiskonNota(val)}
                                onBlur={handleBlur}
                                value={values.total}
                                disabled={true}
                            />
                            

                            </div>
                            </div>

                            <div hidden={values.invtype == 'DP'}>
                            <div className="invalid-feedback-custom">{ErrItems}</div>
                            <div className="invalid-feedback-custom">{ErrQty}</div>
                            <table>
                            <tbody>
                                <tr>
                                    <td>
                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="pricelist"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangePriceList(val)}
                                        onBlur={val => setFieldTouched("pricelist", val?.value ? val.value : '')}
                                        data={ListPriceList}
                                        textField={'label'}
                                        valueField={'value'}
                                        style={{width: '300px'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.pricelist}
                                    />
                                    </td>
                                    <td>
                                    <Button
                                        onClick={() => submitProses()}
                                    >
                                    {'Proses'}
                                    </Button>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                            {
                                // values.items.length == 0?'':
                                <table id="tablegrid">
                                    <tr>
                                    <th hidden={IsHideColumnWarehouse}>{i18n.t('Warehouse')}</th>
                                        <th>{i18n.t('Invoice Type')}</th>
                                        <th>{i18n.t('Harga')}</th>
                                        {/* <th>{i18n.t('Is Mandatory')}</th> */}
                                        {/* <th>{i18n.t('Jalur')}</th> */}
                                        <th>{i18n.t('Qty')}</th>
                                        <th>{i18n.t('Diskon')}</th>
                                        <th>{i18n.t('Sub Total')}</th>
                                        
                                    </tr>
                                    <tbody>
                                        {
                                            values.items.map((x, i) => {
                                                return (
                                                <tr>
                                                    <td width={'350px'} hidden={IsHideColumnWarehouse}>
                                                    <Input
                                                        name="warehousename"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="warehousename"
                                                        // onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.warehousename}
                                                        disabled={true}
                                                    />
                                                    </td>
                                                    <td>
                                                    <Input
                                                        name="invoicetype"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="invoicetype"
                                                        // onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.invoicetype}
                                                        disabled={true}
                                                    />
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
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.amount !== ''?numToMoney(parseFloat(new String(x.amount).replaceAll('.',''))):'0'}
                                                        disabled={false}
                                                    />
                                                    </td>
                                                    {/* <td>
                                                    <Input
                                                        name="ismandatory"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="ismandatory"
                                                        // onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        style={{width: '80px'}}
                                                        // value={values.amount}
                                                        value={x.ismandatory == 'Y'?'Yes':'No'}
                                                        disabled={true}
                                                    />
                                                    </td> */}
                                                    {/* <td>
                                                    <Input
                                                        name="jalur"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="jalur"
                                                        // onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.jalur == 'MERAH'?'Merah':'Hijau'}
                                                        style={{backgroundColor:x.jalur !== ''? (x.jalur == 'HIJAU'?'greenyellow':'red'):''}}
                                                        disabled={true}
                                                    />
                                                    </td> */}
                                                    <td>
                                                    <Input
                                                        name="qty"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="qty"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.qty}
                                                        disabled={SelInvoiceType == 'REIMBURSEMENT'}
                                                    />
                                                    </td>
                                                    <td>
                                                    <Input
                                                        name="diskon"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="diskon"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.diskon}
                                                        disabled={SelInvoiceType == 'REIMBURSEMENT'}
                                                    />
                                                    </td>
                                                    <td>
                                                    <Input
                                                        name="subtotal"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="subtotal"
                                                        // onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.subtotal !== '' && !isNaN(x.subtotal) ? numToMoney(parseFloat(x.subtotal)):x.subtotal}
                                                        disabled={true}
                                                    />
                                                    </td>
                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                
                            }
                            

                        {
                                        <table id="tablegrid" hidden={SelInvoiceType == 'REIMBURSEMENT'} >
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